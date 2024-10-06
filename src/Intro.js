import React from 'react'
import { Typewriter } from 'react-simple-typewriter';
import { useNavigate } from 'react-router-dom'

const Intro = () => {
    const navigate = useNavigate()

    setTimeout(() => {
        navigate('/wafle')
    }, 5000);
  

  return (
    <>

    <div className="wrap">
      <div className="all2">

      <h2>
      <Typewriter
        words={['LETTER FLIP', '', 'LETTER FLIP', '', 'LETTER FLIP']}
        loop={Infinity}
        cursor
        cursorStyle="|"
        typeSpeed={100}
        deleteSpeed={50}
        delaySpeed={1000}
      />
    </h2>

      </div>
    </div>

    
    
    </>
  )
}

export default Intro