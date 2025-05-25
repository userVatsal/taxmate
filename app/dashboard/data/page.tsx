"use client"

import { DataImportExport } from "@/components/data-import-export"

export default function DataPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Data Management</h1>
      <DataImportExport />
    </div>
  )
} 