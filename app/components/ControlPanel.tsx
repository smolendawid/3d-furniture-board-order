'use client'

import CutCard from './CutCard'
import BoardCard from './BoardCard'
import { Cut } from '../models/Cut'
import { Board, Material } from '../models/Board'
import React from 'react'
import { materials } from './materialImages' // Update this path accordingly
import { downloadBoardsAsCsv } from './csvUtils'

interface Props {
  addCut: (index: number) => void
  addBoard: () => void
  updateCut: (
    boardIntex: number,
    cardIndex: number,
    changes: Partial<Cut>
  ) => void
  boards: Board[]
  selectedCutIndex: number | null
  selectedBoardIndex: number | null
  handleCutClick: (boardIndex: number, cutIndex: number) => void
  handleMaterialChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void
  selectedMaterial: Material
}

const ControlPanel: React.FC<Props> = ({
  addCut,
  addBoard,
  updateCut,
  boards,
  selectedCutIndex,
  selectedBoardIndex,
  handleCutClick,
  handleMaterialChange,
  selectedMaterial,
}) => {
  return (
    <div className='p-4 bg-custom-background md:h-screen'>
      <div>
        <ul>
          {boards.map((board, boardIndex) => (
            <li key={boardIndex} className='mt-2'>
              <BoardCard
                board={board}
                addCut={addCut}
                updateCut={updateCut}
                selectedCutIndex={selectedCutIndex}
                selectedBoardIndex={selectedBoardIndex}
                handleCutClick={handleCutClick}
                boardIndex={boardIndex}
                handleMaterialChange={handleMaterialChange}
                selectedMaterial={selectedMaterial}
              />
            </li>
          ))}
        </ul>
        <div className='flex justify-center items-center p-4'>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={addBoard}
          >
            Dodaj Płytę
          </button>
        </div>
        <div className='flex justify-center items-center p-4'>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={() => downloadBoardsAsCsv(boards)}
          >
            Wyślij zamówienie
          </button>
        </div>
      </div>
    </div>
  )
}

export default ControlPanel
