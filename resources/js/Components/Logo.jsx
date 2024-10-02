import React from 'react'

const Logo = () => {
  return (
    <>
    <div className='relative flex flex-nowrap items-center'>
    <img src="/images/image.png" alt="Logo" className='h-12 w-12 mr-2' /> 
    <span style={{ color: '#FF4200' }} className='mr-1'>SMTC</span> 
    <span style={{ color: '#2938DA' }}>Dental Care</span>
    </div>
    </>
  )
}

export default Logo