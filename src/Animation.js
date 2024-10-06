import React from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react'; 

const Animation = ({children}) => {

    useEffect(() => {
        AOS.init()
      }, []);

  return (
    <>
      {children}
    </>
  )
}

export default Animation
