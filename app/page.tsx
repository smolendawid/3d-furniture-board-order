// pages/index.tsx
'use client'

import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Header from './components/Header'
import Footer from './components/Footer'
import Loading from './components/Loading'
import ControlPanel from './components/ControlPanel'
import Renderer from './components/Renderer'
import { Cut } from './models/Cut'
import { Board } from './models/Board'
import { materials } from './components/materialImages'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [boards, setBoards] = useState<Board[]>([])
  const [selectedBoardIndex, setSelectedBoardIndex] = useState<number>(0)
  const [selectedCutIndex, setSelectedCutIndex] = useState<number>(0)

  useEffect(() => {
    console.log(boards)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500) // Change the delay as needed
    return () => clearTimeout(timer)
  }, [boards])

  const handleBoardClick = (index: number) => {
    setSelectedBoardIndex(index)
  }

  const handleCutClick = (boardIndex: number, cutIndex: number) => {
    setSelectedBoardIndex(boardIndex)
    setSelectedCutIndex(cutIndex)
  }

  const addCut = (index: number) => {
    const newCut: Cut = {
      name: `Cięcie ${1}`,
      width: 80,
      height: 120,
      depth: 2,
      quantity: 1,
      veneerA: false,
      veneerB: false,
      veneerC: false,
      veneerD: false,
    }

    const updatedBoards = [...boards]
    if (updatedBoards[index]) {
      updatedBoards[index].cuts.push(newCut)
      setBoards(updatedBoards)
    }
  }

  const addBoard = () => {
    const newBoard: Board = {
      material: materials[0],
      cuts: [],
    }
    setBoards([...boards, newBoard])
  }

  const updateCut = (changes: Partial<Cut>) => {
    // Clone the current cuts to not mutate the original state directly
    const updatedBoards = [...boards]

    // Check if the cut exists at the given index
    if (updatedBoards[selectedBoardIndex]) {
      // Apply the changes to the cut at the given index
      updatedBoards[selectedCutIndex] = {
        ...updatedBoards[selectedBoardIndex][selectedCutIndex],
        ...changes,
      }

      // Update the state with the modified cuts array
      setBoards(updatedBoards)
    } else {
      console.error('Item not found at the given index')
    }
  }

  return (
    <>
      <Loading isLoading={isLoading} />
      {!isLoading && (
        <div>
          <Head>
            <title>My Next.js App</title>
            <meta name='description' content='Welcome to my Next.js app' />
          </Head>

          <Header appName='Zamawianie Cięcia' />

          <main className='flex flex-wrap md:h-screen'>
            <div className='w-full md:w-2/5 md:h-screen'>
              <ControlPanel
                addCut={addCut}
                addBoard={addBoard}
                updateCut={updateCut}
                boards={boards}
                selectedBoardIndex={selectedBoardIndex}
                selectedCutIndex={selectedCutIndex}
                handleBoardClick={handleBoardClick}
                handleCutClick={handleCutClick}
              />
            </div>
            <div className='w-full md:w-3/5 md:h-screen bg-custom-background'>
              {boards[selectedBoardIndex] &&
                boards[selectedBoardIndex].cuts.length !== 0 && (
                  <Renderer
                    cuts={boards[selectedBoardIndex].cuts}
                    material={boards[selectedBoardIndex].material}
                  />
                )}
            </div>
          </main>
        </div>
      )}
    </>
  )
}
