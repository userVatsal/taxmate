import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Upload, X } from 'lucide-react'

interface FileUploadProps {
  onUpload: (file: File) => Promise<void>
  isLoading?: boolean
}

export function FileUpload({ onUpload, isLoading = false }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (!selectedFile) return

    // Validate file type
    if (!selectedFile.name.endsWith('.csv')) {
      setError('Please upload a CSV file')
      return
    }

    setFile(selectedFile)
    setError(null)
  }

  const handleUpload = async () => {
    if (!file) return

    try {
      await onUpload(file)
      setFile(null)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload file')
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-8 h-8 mb-4 text-gray-500" />
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">CSV files only</p>
          </div>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            accept=".csv"
            onChange={handleFileChange}
            disabled={isLoading}
          />
        </label>
      </div>

      {file && (
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">{file.name}</span>
            <span className="text-sm text-gray-500">
              ({(file.size / 1024).toFixed(1)} KB)
            </span>
          </div>
          <button
            type="button"
            onClick={() => setFile(null)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {error && (
        <div className="text-sm text-red-500">{error}</div>
      )}

      {file && (
        <Button
          onClick={handleUpload}
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? 'Uploading...' : 'Upload File'}
        </Button>
      )}
    </div>
  )
} 