'use client'

import ElementCard from './ElementCard'
import { Item } from '../models/Item'
import React, { useState } from 'react'
import { materials } from './materialImages' // Update this path accordingly

interface Props {
  addItem: () => void
  updateItem: (index: number, changes: Partial<Item>) => void
  items: Item[]
  selectedCardIndex: number | null
  handleCardClick: (index: number) => void
}

const ControlPanel: React.FC<Props> = ({
  addItem,
  updateItem,
  items,
  selectedCardIndex,
  handleCardClick,
}) => {
  return (
    <div className='p-4 bg-custom-background h-screen'>
      <div>
        <ul>
          {items.map((item, index) => (
            <li key={index} className='mt-2'>
              <ElementCard
                item={item}
                updateItem={updateItem}
                index={index}
                isSelected={selectedCardIndex === index}
                materials={materials}
                onCardClick={handleCardClick}
              ></ElementCard>
            </li>
          ))}
        </ul>
        <div className='flex justify-center items-center p-4'>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={addItem}
          >
            Dodaj Płytę
          </button>
        </div>
      </div>
    </div>
  )
}

export default ControlPanel
