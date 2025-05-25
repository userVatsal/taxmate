import { VATReturn } from './vat-calculator'
import { CorporationTaxEstimate } from './corporation-tax'
import { TaxDeadline } from './tax-deadlines'

export type ExportFormat = 'csv' | 'excel' | 'json' | 'pdf'

export interface ExportOptions {
  format: ExportFormat
  includeMetadata?: boolean
  dateRange?: {
    start: Date
    end: Date
  }
  filters?: {
    type?: string[]
    status?: string[]
  }
}

export class ExportService {
  static async exportVATData(data: VATReturn[], options: ExportOptions): Promise<Buffer> {
    const filteredData = this.filterDataByDateRange(data, options.dateRange)
    return this.convertToFormat(filteredData, options)
  }

  static async exportCorporationTaxData(
    data: CorporationTaxEstimate[],
    options: ExportOptions
  ): Promise<Buffer> {
    const filteredData = this.filterDataByDateRange(
      data.map(item => ({
        startDate: item.financialYear.startDate,
        endDate: item.financialYear.endDate,
        ...item
      })),
      options.dateRange
    )
    return this.convertToFormat(filteredData, options)
  }

  static async exportDeadlines(data: TaxDeadline[], options: ExportOptions): Promise<Buffer> {
    const filteredData = this.filterDeadlines(data, options)
    return this.convertToFormat(filteredData, options)
  }

  private static filterDataByDateRange<T extends { startDate: Date; endDate: Date }>(
    data: T[],
    dateRange?: { start: Date; end: Date }
  ): T[] {
    if (!dateRange) return data

    return data.filter(item => {
      return (
        item.startDate >= dateRange.start &&
        item.endDate <= dateRange.end
      )
    })
  }

  private static filterDeadlines(deadlines: TaxDeadline[], options: ExportOptions): TaxDeadline[] {
    let filtered = deadlines

    if (options.dateRange) {
      filtered = filtered.filter(d => {
        return d.dueDate >= options.dateRange!.start && d.dueDate <= options.dateRange!.end
      })
    }

    if (options.filters?.type) {
      filtered = filtered.filter(d => options.filters!.type!.includes(d.type))
    }

    if (options.filters?.status) {
      filtered = filtered.filter(d => options.filters!.status!.includes(d.status))
    }

    return filtered
  }

  private static async convertToFormat(data: any, options: ExportOptions): Promise<Buffer> {
    switch (options.format) {
      case 'csv':
        return this.convertToCSV(data)
      case 'excel':
        return this.convertToExcel(data)
      case 'json':
        return this.convertToJSON(data, options.includeMetadata)
      case 'pdf':
        return this.convertToPDF(data)
      default:
        throw new Error(`Unsupported export format: ${options.format}`)
    }
  }

  private static async convertToCSV(data: any[]): Promise<Buffer> {
    if (data.length === 0) return Buffer.from('')

    const headers = Object.keys(data[0])
    const rows = data.map(item => headers.map(header => item[header]))
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n')

    return Buffer.from(csvContent)
  }

  private static async convertToExcel(data: any[]): Promise<Buffer> {
    // Implementation would use a library like ExcelJS
    // For now, return CSV format
    return this.convertToCSV(data)
  }

  private static async convertToJSON(data: any[], includeMetadata?: boolean): Promise<Buffer> {
    const exportData = includeMetadata
      ? {
          metadata: {
            exportedAt: new Date().toISOString(),
            recordCount: data.length,
          },
          data,
        }
      : data

    return Buffer.from(JSON.stringify(exportData, null, 2))
  }

  private static async convertToPDF(data: any[]): Promise<Buffer> {
    // Implementation would use a PDF generation library
    // For now, return JSON format
    return this.convertToJSON(data, true)
  }
} 