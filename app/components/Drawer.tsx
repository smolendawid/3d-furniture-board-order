import React, { useState, useEffect } from 'react'
import FancyInput from './FancyInput'

interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  handleOnApprove: () => void
}

const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  handleOnApprove,
}) => {
  const [isHidden, setIsHidden] = useState(!isOpen)
  const [contactDetails, setContactDetails] = useState({
    email: '',
    phoneNumber: '',
  })

  useEffect(() => {
    setIsHidden(!isOpen)
  }, [isOpen])

  const handleClose = () => {
    setIsHidden(true)
    onClose()
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setContactDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  return (
    <div
      id='drawer-example'
      className={`fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform ${
        isHidden ? 'translate-x-full' : 'translate-x-0'
      } bg-white w-1/2 dark:bg-gray-800`}
      tabIndex={-1}
      aria-labelledby='drawer-label'
    >
      <h5
        id='drawer-label'
        className='inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400'
      >
        <svg
          className='w-4 h-4 me-2.5'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='currentColor'
          viewBox='0 0 20 20'
        >
          <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z' />
        </svg>
        Zamówienie
      </h5>
      <button
        type='button'
        onClick={handleClose}
        className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white'
      >
        <svg
          className='w-3 h-3'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 14 14'
        >
          <path
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
          />
        </svg>
        <span className='sr-only'>Close menu</span>
      </button>
      <p className='mb-6 text-sm text-gray-500 dark:text-gray-400'>
        Wpisz swój numer telefonu lub e-mail by złoyć zamówienie. Skontaktujemy
        się z Tobą w celu uzgodnienia szczegółów i wyceny.
      </p>
      <div className='flex justify-center mb-6'>
        <div>
          <FancyInput
            label='E-mail'
            inputSize='medium'
            value={contactDetails.email}
            onChange={handleChange}
            name='email'
          />
          <FancyInput
            label='Numer telefonu'
            inputSize='medium'
            value={contactDetails.phoneNumber}
            onChange={handleChange}
            name='phoneNumber'
          />
        </div>
      </div>
      <div className='flex justify-center'>
        <button
          type='button'
          className='inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
          onClick={() => handleOnApprove()}
        >
          Potwierdź zamówienie
          <svg
            className='rtl:rotate-180 w-3.5 h-3.5 ms-2'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 14 10'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M1 5h12m0 0L9 1m4 4L9 9'
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
export default Drawer
