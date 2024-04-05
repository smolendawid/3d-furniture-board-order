// Header.tsx
import React from 'react'

interface HeaderProps {
  appName: string
}

const Header: React.FC<HeaderProps> = ({ appName }) => {
  return (
    <header className='bg-blue-500 text-white p-4'>
      <div className='container mx-auto flex justify-between items-center'>
        <h1 className='text-lg font-bold'>{appName}</h1>
        <button className='bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded'>
          My Account
        </button>
      </div>
    </header>
  )
}

export default Header
