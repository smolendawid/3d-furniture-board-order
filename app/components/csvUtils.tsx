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

export function downloadBoardsAsCsv(boards: Board[]): void {
  const headers = 
    'Name,Width,Height,Depth,Material Name,Material ImageURL,Quantity,Veneer A,Veneer B,Veneer C,Veneer D\n';
  
    console.log(boards)
  const csvRows = boards.flatMap(board =>
    board.cuts.map(cut => 
      `${cut.name},${cut.width},${cut.height},${cut.depth},"${board.material.name}","${board.material.imageURL}",${cut.quantity},${cut.veneerA},${cut.veneerB},${cut.veneerC},${cut.veneerD}`
    )
  ).join('\n');

  const csvContent = headers + csvRows;
  downloadCsv(csvContent, 'boards.csv');
}