import { React, useState } from 'react'
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { Link } from '@inertiajs/react';
import { FaLocationDot } from "react-icons/fa6";
import { TbDental } from "react-icons/tb";
import { LuCalendarCheck2 } from "react-icons/lu";



const Home = () => {

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
    <div className="flex flex-col items-center justify-center">

    <div className="flex items-center justify-center gap-28">
      <div className="flex flex-col max-w-lg ">
      <span className="2xl:text-4xl lg:text-4xl text-2xl text-center lg:text-left tracking-widest font-black">
        <span className="text-[#FF4200] lg:bg-[#FADC12]">Experience </span>
        <span className="text-[#2938DA]">quality dental care </span>
        <span className="text-[#FF4200] lg:bg-[#FADC12]">with a smile</span>
      </span>

      <div className="text-gray-500 lg:text-lg text-base text-center mt-3 lg:mt-0 lg:text-left lg:text-clip leading-5">
      <p>
        {isExpanded
          ? "Our clinic focuses on enhancing your smile, ensuring a healthy, radiant one, and promoting confidence through dental health and beauty. Schedule an appointment today for a brighter, healthier you."
          : "Our clinic focuses on enhancing your smile, ensuring a healthy, radiant one..."}
      </p>
      <button
        className="text-[#2938DA] hover:underline"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? 'See Less' : 'See More...'}
      </button>
      
    </div>

      <div className="flex justify-center lg:justify-start mt-7 lg:m-7">
        <Link >
        <SecondaryButton >
            Request Appointment
          </SecondaryButton>
        </Link>
    </div>
      </div>
      <div className="hidden 2xl:block xl:block">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480" fill="#FF4200" transform="scale(-1, 1) translate(-480, 0)"
        className="w-96 h-96 absolute xl:inset-x-72 2xl:inset-x-96"
        >
            <path d="M0 0h230c138 0 250 112 250 250v230H250C112 480 0 368 0 230V0Z"></path>
        </svg>
        <img 
          src="/images/1.png" 
          alt="img"
          className='relative w-96 h-96 z-auto mt-10'
         />        
      </div>
    </div>
    
    <div className="flex flex-col items-center w-full max-w-96 lg:mt-24 mt-12">
    <span className="2xl:text-3xl lg:text-3xl text-lg text-center lg:text-left tracking-widest font-black">
        <span className="text-[#FF4200]">Lifelong  </span>
        <span className="text-[#2938DA]">Dental Care </span>
      </span>
      
      <span className="text-xs lg:text-base text-center">Your family deserves a dentist who provides not only emergency dental services but also supports and enhances oral health at every stage of life. We offer comprehensive family dentistry services designed to benefit every member of your family.</span>
    </div>

    <div className="flex items-start justify-center w-full lg:mt-24 m-12 gap-28">
      <div className="flex flex-col max-w-md">
          
          <span className="text-sm text-gray-500">Why choose us?</span>

        <span className="2xl:text-3xl lg:text-3xl text-lg text-center lg:text-left tracking-widest font-black">
          <span className="text-[#FF4200]">Exceptional </span>
          <span className="text-[#2938DA]">Dentistry </span>
        </span>

        <span className="text-xs lg:text-base text-center lg:text-start">Your journey to a radiant smile starts with choosing a trusted dentist. We offer a comprehensive range of general and cosmetic dental services to meet your family's needs.
        </span>

        <div className="mt-2">
          <img src="/images/2.png" alt="" className="rounded-bl-3xl rounded-tr-3xl"/>
    </div>

      </div>

        <div className="flex flex-wrap items-center w-full max-w-md">
                
                <div className="flex flex-col shadow-lg px-5 py-7 rounded-bl-3xl rounded-tr-3xl absolute bottom-72 right-96">
                  <div className="flex text-lg font-black gap-1">
                <FaLocationDot className="text-2xl "/>
                    <span>Accessible </span>
                    <span className="text-[#2938DA]">Locations</span>
                  </div>
                  
                  <span className="w-full max-w-72">
                    Visit us at any of our easily reachable clinics, making dental care close to home.</span>
                </div>

                <div className="flex flex-col shadow-lg px-5 py-7 rounded-bl-3xl rounded-tr-3xl absolute right-40 bottom-36" >
                <div className="flex text-lg font-black gap-1">
                <TbDental className="text-2xl"/>
                  <span>Full-Service </span>
                  <span className="text-[#2938DA]">Dental Care</span>
                </div>
                  
                  <span className="w-full max-w-72">
                    Offering a wide range of dental treatments for all ages, from routine checkups to advanced cosmetic procedures.</span>
                </div>

                <div className="flex flex-col shadow-lg px-5 py-7 rounded-bl-3xl rounded-tr-3xl absolute right-96 bottom-4">
                <div className="flex text-lg font-black gap-1">
                <LuCalendarCheck2 className="text-2xl "/>
                  <span>Hassle-Free </span>
                  <span className="text-[#2938DA]">Appointments</span>
                </div>
                  
                  <span className="w-full max-w-72">
                    Booking an appointment is quick and simple—call us or schedule online in just a few clicks.</span>
                </div>
        </div>
        
      </div>
    </div>

    </>
  )
}

export default Home