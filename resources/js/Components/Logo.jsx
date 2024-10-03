import React from 'react'

const Logo = () => {
  return (
    <>
    <div className="flex items-center">
    <img
        src="/images/image.png"
        alt="SMTC Dental Care Logo"
        className="h-12 w-12 mr-2"
    />
    <div className="flex flex-row">
        <span className="text-[#FF4200] font-semibold mr-1">SMTC</span>
        <span className="text-[#2938DA] font-medium mr-1">Dental </span>
        <span className="text-[#2938DA] font-medium">Care</span>
    </div>
</div>
    </>
  )
}

export default Logo