import { NextResponse } from 'next/server'
import { ExportService, ExportOptions } from '@/lib/services/export-service'
import { getServerSession } from 'next-auth'
import authOptions from '@/lib/auth'

function getContentType(format: string): string {
  switch (format) {
    case 'csv':
      return 'text/csv'
    case 'excel':
      return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    case 'json':
      return 'application/json'
    case 'pdf':
      return 'application/pdf'
    default:
      return 'application/octet-stream'
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { type, data, options } = body

    let exportBuffer: Buffer

    switch (type) {
      case 'vat':
        exportBuffer = await ExportService.exportVATData(data, options as ExportOptions)
        break
      case 'corporation_tax':
        exportBuffer = await ExportService.exportCorporationTaxData(data, options as ExportOptions)
        break
      case 'deadlines':
        exportBuffer = await ExportService.exportDeadlines(data, options as ExportOptions)
        break
      default:
        return NextResponse.json(
          { error: 'Invalid export type' },
          { status: 400 }
        )
    }

    const headers = new Headers()
    headers.set('Content-Type', getContentType(options.format))
    headers.set(
      'Content-Disposition',
      `attachment; filename="tax-export-${new Date().toISOString()}.${options.format}"`
    )

    return new NextResponse(exportBuffer, { headers })
  } catch (error) {
    console.error('Export error:', error)
    return NextResponse.json(
      { error: 'Failed to export data' },
      { status: 500 }
    )
  }
} 