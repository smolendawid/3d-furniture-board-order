import { Item } from '../models/Item'
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

// Function to generate CSV content from items and initiate download
export function downloadItemsAsCsv(items: Item[]): void {
  const headers =
    'Name,Width,Height,Depth,Material Name,Material ImageURL,Quantity,Veneer A,Veneer B,Veneer C,Veneer D\n'
  const csvRows = items
    .map(
      (item) =>
        `${item.name},${item.width},${item.height},${item.depth},"${item.material.name}","${item.material.imageURL}",${item.quantity},${item.veneerA},${item.veneerB},${item.veneerC},${item.veneerD}`
    )
    .join('\n')
  const csvContent = headers + csvRows
  downloadCsv(csvContent, 'items.csv')
}
