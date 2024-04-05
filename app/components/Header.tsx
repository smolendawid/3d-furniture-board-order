import React, { useState } from 'react'

interface HeaderProps {
  appName: string
}

const Header: React.FC<HeaderProps> = ({ appName }) => {
  // State to manage the selected language
  const [language, setLanguage] = useState<'pl' | 'sk'>('pl') // Default to Polish ('pl')

  // Function to toggle the language
  const toggleLanguage = (lang: 'pl' | 'sk') => {
    setLanguage(lang)
  }

  return (
    <header className='bg-blue-500 text-white p-4'>
      <div className='container mx-auto flex justify-between items-center'>
        <h1 className='text-lg font-bold'>{appName}</h1>
        <div>
          {/* Flags as buttons to select language */}
          <button
            onClick={() => toggleLanguage('pl')}
            className={`mr-2 ${language === 'pl' ? 'border-2 border-white' : ''}`}
          >
            🇵🇱
          </button>
          <button
            onClick={() => toggleLanguage('sk')}
            className={`${language === 'sk' ? 'border-2 border-white' : ''}`}
          >
            🇸🇰
          </button>
        </div>
        <button className='bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded'>
          Moje konto
        </button>
      </div>
    </header>
  )
}

export default Header
