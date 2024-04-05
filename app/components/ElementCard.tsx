import React, { useState, useEffect } from 'react'
import { Item, Material } from '../models/Item'
import { materials } from './materialImages' // Update this path accordingly

interface ElementCardProps {
  item: Item
  updateItem: (index: number, changes: Partial<Item>) => void
  index: number
  materials: Material[] // Updated to use MaterialType array
}

interface ElementCardProps {
  item: Item
  updateItem: (index: number, changes: Partial<Item>) => void
  index: number
}

const ElementCard: React.FC<
  ElementCardProps & {
    isSelected: boolean
    onCardClick: (index: number) => void
  }
> = ({ item, updateItem, index, isSelected, onCardClick }) => {
  const [editableItem, setEditableItem] = useState<Item>(item)
  const [selectedMaterialImage, setSelectedMaterialImage] = useState<string>('')

  useEffect(() => {
    setEditableItem(item)
    // Update the selected material image based on the initial item.material.imageURL
    setSelectedMaterialImage(item.material.imageURL)
  }, [item])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    const updatedValue =
      name === 'width' || name === 'height' ? parseInt(value) : value
    let updatedItem = { ...editableItem }

    if (name === 'material') {
      // Find the material object by name
      const material = materials.find((material) => material.name === value)
      if (material) {
        updatedItem = { ...updatedItem, material }
        setSelectedMaterialImage(material.imageURL)
      }
    } else {
      updatedItem = { ...updatedItem, [name]: updatedValue }
    }

    setEditableItem(updatedItem)
    updateItem(index, updatedItem)
  }

  const handleClick = () => {
    onCardClick(index)
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
        value={editableItem.name}
        onChange={handleChange}
        name='name'
      />
      <div className='grid grid-cols-3 gap-4'>
        <input
          className='border rounded w-full p-2'
          type='number'
          placeholder='width'
          value={editableItem.width}
          onChange={handleChange}
          name='width'
        />
        <input
          className='border rounded w-full p-2'
          type='number'
          placeholder='height'
          value={editableItem.height}
          onChange={handleChange}
          name='height'
        />

        <div className='flex items-center'>
          <select
            className='border rounded w-full p-2'
            value={editableItem.material.name}
            onChange={handleChange}
            name='material'
          >
            {materials.map((material, index) => (
              <option key={index} value={material.name}>
                {material.name}
              </option>
            ))}
          </select>
          <img
            src={selectedMaterialImage}
            style={{ width: '48px', height: '48px', paddingLeft: '8px' }}
          />
        </div>
      </div>
    </div>
  )
}

export default ElementCard
