import React, { useState, useEffect } from 'react'
import { Cut } from '../models/Cut'
import { materials } from './materialImages'
import CutCard from './CutCard'
import { Board } from '../models/Board'
import { Material } from '../models/Board'

interface Props {
  addCut: (boardIndex: number) => void
  updateCut: (
    boardIntex: number,
    cardIndex: number,
    changes: Partial<Cut>
  ) => void
  board: Board
  selectedCutIndex: number | null
  selectedBoardIndex: number | null
  handleCutClick: (boardIndex: number, cardIndex: number) => void
  boardIndex: number
}

const BoardCard: React.FC<Props> = ({
  addCut,
  updateCut,
  board,
  selectedCutIndex,
  selectedBoardIndex,
  handleCutClick,
  boardIndex,
}) => {
  //   const [editableCut, setEditableCut] = useState<Cut>(cut)
  const [selectedMaterialImage, setSelectedMaterialImage] = useState<string>('')

  const handleMaterialChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    if (name === 'material') {
      const material = materials.find((material) => material.name === value)
      if (material) {
        setSelectedMaterialImage(material.imageURL)
      }
    }
  }
  useEffect(() => {
    setSelectedMaterialImage(board.material.imageURL)
  }, [board])

  return (
    <div className={`bg-white rounded p-4 w-9/10 max-w-4xl mx-auto text-black`}>
      <div className='flex items-center'>
        <select
          className='border rounded w-full p-2'
          // value={editableCut.material.name}
          onChange={handleMaterialChange}
          name='material'
        >
          {materials.map((material, index) => (
            <option key={index} value={material.name}>
              {material.name}
            </option>
          ))}
        </select>
        <img
          className='p-2'
          src={selectedMaterialImage}
          style={{ width: '48px', height: '48px', paddingLeft: '8px' }}
        />
      </div>
      <ul>
        {board.cuts!.map((cut, cardIndex) => (
          <li key={cardIndex} className='mt-2'>
            <CutCard
              cut={cut}
              updateCut={updateCut}
              cardIndex={cardIndex}
              boardIndex={boardIndex}
              isSelected={
                selectedCutIndex === cardIndex &&
                selectedBoardIndex === boardIndex
              }
              onCutClick={handleCutClick}
            ></CutCard>
          </li>
        ))}
      </ul>
      <div className='flex justify-center items-center p-4'>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          onClick={() => addCut(boardIndex)}
        >
          Dodaj Cięcie
        </button>
      </div>
    </div>
  )
}

export default BoardCard
