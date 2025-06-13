import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FileUpload } from './FileUpload'

describe('FileUpload', () => {
  const mockOnUpload = vi.fn()

  it('renders upload button and input', () => {
    render(<FileUpload onUpload={mockOnUpload} />)

    expect(screen.getByText(/upload file/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/file input/i)).toBeInTheDocument()
  })

  it('accepts only CSV files', async () => {
    render(<FileUpload onUpload={mockOnUpload} />)

    const file = new File(['test'], 'test.txt', { type: 'text/plain' })
    const input = screen.getByLabelText(/file input/i)

    await userEvent.upload(input, file)

    expect(screen.getByText(/only csv files are allowed/i)).toBeInTheDocument()
  })

  it('handles valid CSV file upload', async () => {
    render(<FileUpload onUpload={mockOnUpload} />)

    const file = new File(['test'], 'test.csv', { type: 'text/csv' })
    const input = screen.getByLabelText(/file input/i)

    await userEvent.upload(input, file)

    expect(screen.getByText(/test.csv/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /upload/i })).toBeEnabled()
  })

  it('calls onUpload with file when upload button is clicked', async () => {
    render(<FileUpload onUpload={mockOnUpload} />)

    const file = new File(['test'], 'test.csv', { type: 'text/csv' })
    const input = screen.getByLabelText(/file input/i)

    await userEvent.upload(input, file)
    await userEvent.click(screen.getByRole('button', { name: /upload/i }))

    expect(mockOnUpload).toHaveBeenCalledWith(file)
  })

  it('shows loading state during upload', async () => {
    render(<FileUpload onUpload={mockOnUpload} isLoading={true} />)

    expect(screen.getByText(/uploading/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /uploading/i })).toBeDisabled()
  })
}) 