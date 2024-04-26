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
import Drawer from './components/Drawer'
import { downloadBoardsAsCsv } from './components/csvUtils'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [boards, setBoards] = useState<Board[]>([])
  const [selectedBoardIndex, setSelectedBoardIndex] = useState<number>(0)
  const [selectedCutIndex, setSelectedCutIndex] = useState<number>(0)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500) // Change the delay as needed
    return () => clearTimeout(timer)
  }, [boards])

  const handleCutClick = (boardIndex: number, cutIndex: number) => {
    setSelectedBoardIndex(boardIndex)
    setSelectedCutIndex(cutIndex)
  }

  const handleOrder = (boards: Board[]) => {
    setIsDrawerOpen(true)
  }

  const handleOnApprove = () => {
    downloadBoardsAsCsv(boards)
  }

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen)
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

  const updateCut = (
    boardIndex: number,
    cutIndex: number,
    changes: Partial<Cut>
  ) => {
    const updatedBoards = [...boards]
    const updatedCuts = [...updatedBoards[boardIndex].cuts]

    // Check if the cut exists at the given index
    if (updatedCuts[cutIndex]) {
      updatedCuts[cutIndex] = {
        ...updatedCuts[cutIndex],
        ...changes,
      }

      updatedBoards[boardIndex].cuts = updatedCuts
      setBoards(updatedBoards)
    } else {
      console.error('Item not found at the given index')
    }
  }

  return (
    <>
      <Loading isLoading={isLoading} />
      {!isLoading && (
        <div className='bg-custom-background'>
          <Head>
            <title>My Next.js App</title>
            <meta name='description' content='Welcome to my Next.js app' />
          </Head>

          <Header appName='Zamawianie Cięcia' />

          <main className='flex flex-wrap md:h-screen)]'>
            <div className='w-full md:w-1/2 md:min-h-screen overflow-auto bg-custom-background'>
              <ControlPanel
                addCut={addCut}
                addBoard={addBoard}
                updateCut={updateCut}
                boards={boards}
                selectedBoardIndex={selectedBoardIndex}
                selectedCutIndex={selectedCutIndex}
                handleCutClick={handleCutClick}
                handleOrder={handleOrder}
              />
            </div>
            <div className='w-full md:w-1/2 md:h-100vh fixed right-0 bg-custom-background'>
              {boards[selectedBoardIndex] &&
                boards[selectedBoardIndex].cuts.length !== 0 && (
                  <Renderer
                    cut={boards[selectedBoardIndex].cuts[selectedCutIndex]}
                    material={boards[selectedBoardIndex].material}
                  />
                )}
            </div>

            {/* Drawer component */}
            <Drawer
              isOpen={isDrawerOpen}
              onClose={toggleDrawer}
              handleOnApprove={handleOnApprove}
            />
          </main>
        </div>
      )}
    </>
  )
}
