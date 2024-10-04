import React from 'react'
import Logo from '@/Components/Logo';

const Footer = () => {
  return (
    <footer className="bg-[#FADC12] h-72 w-full flex flex-row  mt-20">
      <div className="p-14">
      <div className="flex flex-col max-w-md">

        <span className="2xl:text-2xl lg:text-2xl text-lg text-center lg:text-left tracking-widest font-black">
          <Logo/>
        </span>

        <span className="text-xs lg:text-base text-center lg:text-start">
         Our dental team is dedicated to providing exceptional dental care to our patients. At OralCare, you'll discorver a new reason to smile, right in your neighborhood.
        </span>

      </div>
      </div>

      <div className="p-14">
      <div className="flex flex-col max-w-md">

        <span className="2xl:text-3xl lg:text-3xl text-lg text-center lg:text-left tracking-widest font-black">
        <span className="font-black text-2xl">Locations</span>
        </span>

        <span className="text-xs lg:text-base text-center lg:text-start">
         Our dental team is dedicated to providing exceptional dental care to our patients. At OralCare, you'll discorver a new reason to smile, right in your neighborhood.
        </span>

      </div>
      </div>

      <div className="p-14">
      <div className="flex flex-col max-w-md">
          
        <span className="2xl:text-3xl lg:text-3xl text-lg text-center lg:text-left tracking-widest font-black">
          <Logo/>
        </span>

        <span className="text-xs lg:text-base text-center lg:text-start">
         Our dental team is dedicated to providing exceptional dental care to our patients. At OralCare, you'll discorver a new reason to smile, right in your neighborhood.
        </span>

      </div>
      </div>

      
    </footer>
  )
}

export default Footer