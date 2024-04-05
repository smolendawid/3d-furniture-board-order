import { useEffect, useState } from 'react'

const Loading = ({ isLoading }: { isLoading: boolean }) => {
  const [shouldAnimateOut, setShouldAnimateOut] = useState(false)

  useEffect(() => {
    if (!isLoading) {
      // Start the fade-out or blur-out animation after a delay
      const timeoutId = setTimeout(() => setShouldAnimateOut(true), 400) // Adjust time as needed
      return () => clearTimeout(timeoutId)
    }
  }, [isLoading])

  // Add 'pointer-events-none' to make the element non-interactive after the animation.
  // Optionally add 'opacity-0' if you want it to become fully transparent and non-obstructive.
  const containerClass = `fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-white ${shouldAnimateOut ? 'animate-fadeOut pointer-events-none opacity-0' : ''}`

  return (
    <div className={containerClass}>
      <div
        className={`animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 ${shouldAnimateOut ? 'opacity-0' : ''}`}
      ></div>
      <p
        className={`text-center text-lg mt-4 ${shouldAnimateOut ? 'opacity-0' : ''}`}
      >
        Loading...
      </p>
    </div>
  )
}

export default Loading
