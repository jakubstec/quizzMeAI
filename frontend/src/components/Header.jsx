import React from 'react'

const Header = ({isQuizDisplayed}) => {
  return (
    <header className='text-3xl -mb-4 center justify-between items-center p-4 bg-white text-black'>
      <div className='logo'>
        <h1 className='mb-2'>quizzme.ai</h1>
        {!isQuizDisplayed && (
        <p className='text-sm'>tool that generates your unique quiz based on the note you upload! <br/> powered by <a className="text-blue-400" href="https://gemini.google.com/">google's gemini ai</a></p>    
        )}
      </div>
      
    </header>
  )
}

export default Header
