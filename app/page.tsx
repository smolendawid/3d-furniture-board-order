// pages/index.tsx
'use client'

import React, { useState, useEffect } from 'react'

import Head from 'next/head'
import Header from './components/Header'
import Footer from './components/Footer'
import Loading from './components/Loading'
import ControlPanel from './components/ControlPanel'
import Renderer from './components/Renderer'
import { Item } from './models/Item'
import { materials } from './components/materialImages'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [items, setItems] = useState<Item[]>([])
  const [selectedCardIndex, setSelectedCardIndex] = useState<number>(0)

  const handleCardClick = (index: number) => {
    setSelectedCardIndex(index)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500) // Change the delay as needed

    return () => clearTimeout(timer)
  }, [])

  // Function to add a new item
  const addItem = () => {
    const newItem: Item = {
      name: `Item ${items.length + 1}`,
      width: Math.round(Math.random() * 100),
      height: Math.round(Math.random() * 100),
      material: materials[0],
    }
    setItems([...items, newItem])
  }
  const updateItem = (index: number, changes: Partial<Item>) => {
    // Clone the current items to not mutate the original state directly
    const updatedItems = [...items]

    // Check if the item exists at the given index
    if (updatedItems[index]) {
      // Apply the changes to the item at the given index
      updatedItems[index] = { ...updatedItems[index], ...changes }

      // Update the state with the modified items array
      setItems(updatedItems)
    } else {
      console.error('Item not found at the given index')
    }
  }
  return (
    <>
      {/* <Loading isLoading={isLoading} /> */}
      {!isLoading && (
        <div>
          <Head>
            <title>My Next.js App</title>
            <meta name='description' content='Welcome to my Next.js app' />
          </Head>

          <Header appName='App name' />

          <main className='flex flex-wrap h-screen'>
            <div className='w-2/5 h-screen'>
              <ControlPanel
                addItem={addItem}
                updateItem={updateItem}
                items={items}
                selectedCardIndex={selectedCardIndex}
                handleCardClick={handleCardClick}
              />
            </div>
            <div className='w-3/5 h-screen bg-custom-background'>
              {items.length !== 0 && (
                <Renderer item={items[selectedCardIndex]} />
              )}
            </div>
          </main>
        </div>
      )}
    </>
  )
}
