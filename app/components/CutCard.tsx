import React, { useState, useEffect } from 'react'
import { Cut, Material } from '../models/Cut'
import { materials } from './materialImages' // Update this path accordingly

interface CutCardProps {
  cut: Cut
  updateCut: (index: number, changes: Partial<Cut>) => void
  cardIndex: number
  boardIndex: number
}

const CutCard: React.FC<
  CutCardProps & {
    isSelected: boolean
    onCutClick: (boardIndex: number, cutIndex: number) => void
  }
> = ({ cut, updateCut, cardIndex, boardIndex, isSelected, onCutClick }) => {
  const [editableCut, setEditableCut] = useState<Cut>(cut)

  useEffect(() => {
    setEditableCut(cut)
  }, [cut])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    let updatedValue: any = value // Temporarily allowing any type

    // Convert string to boolean if field is one of the veneer fields
    if (
      name === 'veneerA' ||
      name === 'veneerB' ||
      name === 'veneerC' ||
      name === 'veneerD'
    ) {
      updatedValue = value === 'true'
    } else if (name === 'width' || name === 'height') {
      // Convert to integer for width and height
      updatedValue = parseInt(value)
    }

    let updatedCut = { ...editableCut, [name]: updatedValue }

    setEditableCut(updatedCut)
    updateCut(boardIndex, cardIndex, updatedCut)
  }

  const handleClick = () => {
    onCutClick(boardIndex, cardIndex)
  }

  const selectionClass = isSelected ? 'border-4 border-blue-500' : ''

  return (
    <div
      className={`bg-white rounded p-4 w-9/10 max-w-4xl mx-auto text-black ${selectionClass}`}
      onClick={handleClick}
    >
      <input
        className='block border rounded w-full p-2 mb-4'
        type='text'
        placeholder='name'
        value={editableCut.name}
        onChange={handleChange}
        name='name'
      />
      <div className='grid grid-cols-4 gap-4'>
        <input
          className='border rounded w-full p-2'
          type='number'
          placeholder='width'
          value={editableCut.width}
          onChange={handleChange}
          name='width'
        />
        <input
          className='border rounded w-full p-2'
          type='number'
          placeholder='height'
          value={editableCut.height}
          onChange={handleChange}
          name='height'
        />
        <input
          className='border rounded w-full p-2'
          type='number'
          placeholder='quantity'
          value={editableCut.quantity}
          onChange={handleChange}
          name='quantity'
        />
      </div>
      <div className='grid grid-cols-4 gap-4 p-4'>
        {['veneerA', 'veneerB', 'veneerC', 'veneerD'].map(
          (veneerField, index) => (
            <div key={veneerField} className='flex items-center'>
              <label className='mr-2'>{`Okleina ${index + 1}`}</label>
              <input
                type='checkbox'
                checked={editableCut[veneerField] === true} // Direct comparison to boolean true
                onChange={(e) => {
                  // Adapt the event to fit handleChange's expectations
                  handleChange({
                    target: {
                      name: veneerField,
                      value: e.target.checked ? 'true' : 'false', // Convert boolean to string
                      type: 'checkbox', // Indicate the type of input (optional, depending on your further use cases)
                    },
                  } as React.ChangeEvent<HTMLInputElement>) // Type casting to match expected type
                }}
                name={veneerField}
              />
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default CutCard
