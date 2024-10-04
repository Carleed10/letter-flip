import React from 'react'
import Typical from'react-typical'
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
      <Typical
          steps={[
            'LETTER FLIP', 2000, // Type "Letter Flip" and hold for 2 seconds
            '', 1000,            // Erase the text and hold for 1 second
            'LETTER FLIP', 3000, // Type it again with a longer delay (3 seconds)
            '', 1000,            // Erase the text again and hold for 1 second
            'LETTER FLIP', 4000, // Type it again with an even longer delay (4 seconds)
            '', 1000,            // Erase the text again
          ]}
          loop={Infinity}
          wrapper="span"
        />
      </h2>

      </div>
    </div>

    
    
    </>
  )
}

export default Intro