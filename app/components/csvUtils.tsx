import { Board } from '../models/Board'
import { Cut } from '../models/Cut'

// Utility function to download data as a CSV file
export function downloadCsv(csvContent: string, fileName: string): void {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Function to generate CSV content from cuts and initiate download
export function downloadCutsAsCsv(cuts: Board[]): void {
  const headers =
    'Name,Width,Height,Depth,Material Name,Material ImageURL,Quantity,Veneer A,Veneer B,Veneer C,Veneer D\n'
  const csvRows = cuts
    .map(
      (cut) =>
        `${cut.name},${cut.width},${cut.height},${cut.depth},"${cut.material.name}","${cut.material.imageURL}",${cut.quantity},${cut.veneerA},${cut.veneerB},${cut.veneerC},${cut.veneerD}`
    )
    .join('\n')
  const csvContent = headers + csvRows
  downloadCsv(csvContent, 'cuts.csv')
}
