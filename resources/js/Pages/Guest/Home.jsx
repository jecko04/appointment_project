import React, { useState } from 'react'
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { Link } from '@inertiajs/react';
import { FaLocationDot } from "react-icons/fa6";
import { TbDental } from "react-icons/tb";
import { LuCalendarCheck2 } from "react-icons/lu";
import { Modal, Button, Carousel  } from 'antd';

const Home = () => {

  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const showModal = () => {
    setModalOpen(true);
  }
  const handleOk = () => {
    setModalOpen(false);
  }
  const handleCancel = () => {
    setModalOpen(false);
  }

  const contentStyle = {
    height: 'auto',       
    color: '#fff',
    padding: '2px',            
    textAlign: 'center',
    objectFit: 'cover',        
    borderRadius: '8px',
  };

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
      <Link href={route('guest.appointment')}>
        <SecondaryButton onClick={showModal}>
          Request Appointment
        </SecondaryButton>
      </Link>     
    </div>
      </div>
      <div className="hidden lg:block">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480" fill="#FF4200" transform="scale(-1, 1) translate(-480, 0)"
        className="w-96 h-96 absolute lg:inset-x-32 xl:inset-x-72 2xl:inset-x-96"
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

    <div className="flex flex-col lg:flex-row justify-center w-full md:w-auto lg:w-full lg:max-w-full lg:mt-24 m-12 lg:gap-28 gap-96">
      <div className="flex flex-col max-w-md">
          
          <span className="text-sm text-gray-500">Why choose us?</span>

        <span className="2xl:text-3xl lg:text-3xl text-lg text-center lg:text-left tracking-widest font-black">
          <span className="text-[#FF4200]">Exceptional </span>
          <span className="text-[#2938DA]">Dentistry </span>
        </span>

        <span className="text-xs lg:text-base text-center lg:text-start">Your journey to a radiant smile starts with choosing a trusted dentist. We offer a comprehensive range of general and cosmetic dental services to meet your family's needs.
        </span>

        <div className="mt-2">
          {/* <img src="/images/image2.jpg" alt="" className="rounded-bl-3xl rounded-tr-3xl"/> */}
          <Carousel autoplay>
          <div>
            <img src="/images/image1.jpg" alt="" className="" style={contentStyle}/>
          </div>
          <div>
          <img src="/images/image2.jpg" alt="" className="" style={contentStyle}/>
          </div>
          <div>
          <img src="/images/image3.jpg" alt="" className="" style={contentStyle}/>
          </div>
        </Carousel>
    </div>

      </div>

        <div className="flex flex-wrap items-center w-full max-w-md mt-4">
                
                <div className="flex flex-col sm:shadow-lg sm:px-5 sm:py-7 rounded-bl-3xl rounded-tr-3xl absolute lg:w-full lg:max-w-72 lg:bottom-72 2xl:right-1/4 lg:right-96 sm:bottom-80 bottom-96 left-10 sm:left-52 lg:left-1/2">
                  <div className="flex lg:text-lg text-sm font-black gap-1">
                <FaLocationDot className="text-2xl "/>
                    <span>Accessible </span>
                    <span className="text-[#2938DA]">Locations</span>
                  </div>
                  
                  <span className="w-full max-w-72 text-balance">
                    Visit us at any of our easily reachable clinics, making dental care close to home.</span>
                </div>

                <div className="flex flex-col sm:shadow-lg sm:px-5 sm:py-7 rounded-bl-3xl rounded-tr-3xl absolute lg:w-full lg:max-w-72 2xl:right-72 lg:right-40 lg:bottom-36  sm:bottom-40 bottom-72 left-10 sm:left-72 lg:left-2/3" >
                <div className="flex lg:text-lg text-sm font-black gap-1">
                <TbDental className="text-2xl"/>
                  <span>Full-Service </span>
                  <span className="text-[#2938DA]">Dental Care</span>
                </div>
                  
                  <span className="w-full max-w-72 text-balance">
                    Offering a wide range of dental treatments for all ages, from routine checkups to advanced cosmetic procedures.</span>
                </div>

                <div className="flex flex-col sm:shadow-lg sm:px-5 sm:py-7 rounded-bl-3xl rounded-tr-3xl absolute lg:w-full lg:max-w-72 lg:right-96 lg:bottom-0 sm:bottom-4 bottom-52 left-10 sm:left-52 lg:left-1/2">
                <div className="flex lg:text-lg text-sm font-black gap-1">
                <LuCalendarCheck2 className="text-2xl "/>
                  <span>Hassle-Free </span>
                  <span className="text-[#2938DA]">Appointments</span>
                </div>
                  
                  <span className="w-full max-w-72 text-balance">
                    Booking an appointment is quick and simple—call us or schedule online in just a few clicks.</span>
                </div>
        </div>
        
      </div>
    </div>

    </>
  )
}

export default Home