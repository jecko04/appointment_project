import { Head } from '@inertiajs/react'
import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '@/Components/Footer'
import { Divider } from 'antd'
import { FaLocationDot } from 'react-icons/fa6'
import { IoIosCall } from 'react-icons/io'

const Location = ({auth}) => {

  return (
    <>
    <div className='bg-gradient-to-t from-white to-[#FADC12]/30'>    
      <Head title="SMTC - Dental Care" />
      <div className="text-xs">
        <div className="items-center justify-center selection:text-white">
          <div className="flex flex-col lg:w-full pt-2">
            <header>
              <Navbar auth={auth} />
            </header>
            <main className="mt-6 lg:mx-28">
                <span className='text-2xl font-black text-[#FF4200] flex justify-center mb-20'>Location</span>
                <div className='flex flex-col gap-20 md:px-7 p-2'>
                    <div className='flex flex-col md:flex-row w-full justify-between'>
                        <div className='flex flex-col gap-2 md:items-start items-center'>
                            <span className='text-lg md:text-xl font-black'>SMTC Dental Care Burgos Location</span>
                            <span className='text-xl font-black'>Main Branch</span>
                            <Divider/>
                            <span className='text-sm font-medium'>Monday to Saturday</span>
                            <span className='text-sm font-medium'>9:00 AM - 5:00 PM</span>
                            <div className='flex flex-col gap-2 md:items-start items-center'>
                            <div className='flex flex-row '>

                                <FaLocationDot className="text-sm "/>
                                <span className="text-left md:text-wrap text-sm">Ynares, DMJ Bldg, A. Mabini St, Rodriguez, Rizal</span>
                            </div>
                            <div className='flex flex-row'>
                                <IoIosCall className="text-sm"/>
                                <span className='text-sm'>0933 821 2439</span>
                            </div>                                 
                            </div>
                        </div>
                        <div className='relative shadow-2xl'>  
                        <iframe 
                            className='w-[300px] h-[400px] xl:w-[600px] xl:h-[330px]'
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=SMTC%20Dental%20Care&zoom=10&maptype=roadmap">
                        </iframe>
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row w-full justify-between lg:mb-0 mb-7'>
                        <div className='flex flex-col gap-2 md:items-start items-center'>
                            <span className='text-lg md:text-xl font-black'>SMTC Dental Care Montalban</span>
                            <span className='text-lg md:text-xl font-black'>Robinson</span>
                            <span className='text-xl font-black'>Second Branch</span>
                            <Divider/>
                            <span className='text-sm font-medium'>Monday to Saturday</span>
                            <span className='text-sm font-medium'>9:00 AM - 5:00 PM</span>
                            <div className='flex flex-col gap-2'>
                            <div className='flex flex-row md:items-start items-center'>

                                <FaLocationDot className="text-sm "/>
                                <span className="text-left md:text-wrap text-sm">P4JR+4J4, L.M.Santos St, Rosario, Rodriguez, 1860 Rizal</span>
                            </div>
                            <div className='flex flex-row'>
                                <IoIosCall className="text-sm"/>
                                <span className='text-sm'>0933 821 2439</span>
                            </div>                                 
                            </div>
                        </div>
                        <div className='relative shadow-2xl'> 
                        <iframe 
                            className='w-[300px] h-[400px] xl:w-[600px] xl:h-[330px]'
                            loading="lazy" 
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=SMTC%20Dental%20Care%20Second&zoom=10&maptype=roadmap">
                        </iframe>
                        </div>
                    </div>
                </div>
            </main>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default Location