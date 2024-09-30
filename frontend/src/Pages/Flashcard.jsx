import React from 'react'
import { Navbar } from '../components/Navbar/Navbar'
import { DisplayFlashcard } from '../components/DisplayFlashcard/DisplayFlashcard'

export const Flashcard = () => {
  return (
    <div>
        <Navbar />
        <DisplayFlashcard />
    </div>
  )
}
