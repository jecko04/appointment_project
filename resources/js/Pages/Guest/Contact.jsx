import React from 'react'
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import Navbar from '../Navbar/Navbar';
import { Head } from '@inertiajs/react';
import { Divider, Input } from 'antd';
import { IoIosCall } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { BsFacebook } from "react-icons/bs";
import { FaSquareXTwitter } from "react-icons/fa6";
import { Link } from '@inertiajs/react';
import { FaTwitter } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import Logo from '@/Components/Logo';

const Contact = ({ auth }) => {
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
    <main>
      <div className='flex flex-col justify-center items-center text-center md:text-left'>
        <div className='flex text-xl font-black mt-4'>
        <span className='text-[#FF4200] ml-1'>Contact</span>
        <span className='text-[#2938DA] ml-1'>Us</span>
        </div>

        <div className='flex flex-col md:flex md:flex-row gap-5 my-10'>
        <div className='flex flex-col'>
        <div className='flex text-xl font-black mt-4'>
          <span className='text-[#FF4200] ml-1'>Visit</span>
          <span className='text-[#2938DA] ml-1'>Us!</span>
        </div>
        <div className='p-5 md:flex md:flex-col items-center'>
        <div className='flex flex-row justify-center gap-2 mt-4'>
            <img
            src="/images/image1.jpg"
            className='md:rounded-tl-xl w-36 h-36 md:w-48 md:h-48'
            />
            <img
            className=' md:rounded-tr-xl  w-36 h-36 md:w-48 md:h-48'
            src="/images/image2.jpg"

            />
          </div>
          <div className='flex gap-2 justify-center mt-2'>
            <img
            className='md:rounded-bl-xl  w-36 h-36 md:w-48 md:h-48'
            src="/images/image3.jpg"

            />
            <img
            className='md:rounded-br-xl  w-36 h-36 md:w-48 md:h-48'
            src="/images/image4.jpg"
            style={{ 
             }}

            />
          </div>
        </div>
        </div>

        <div className='flex flex-col gap-4 rounded-xl shadow-xl bg-white items-center p-8 '>
          <div className='flex text-xl font-black mt-4'>
            <span className='text-[#FF4200] ml-1'>Open</span>
            <span className='text-[#2938DA] ml-1'>Hours</span>
          </div>

          <div className='flex flex-col gap-2'>
            <span className='text-sm font-medium'>Monday to Saturday</span>
            <span className='text-sm font-medium'>9:00 AM - 5:00 PM</span>
          </div>
          <Divider/>

          <div className="flex flex-col md:flex md:flex-row gap-5">
            <div className="flex flex-col max-w-md">

              <span className="2xl:text-3xl lg:text-3xl text-sm text-center lg:text-left tracking-widest font-black">
              <span className="font-black text-xl">Locations</span>
              </span>

              <div className="divide-y-2 divide-black py-4 ">
              <div className="flex flex-col item text-xs lg:text-xs text-center lg:text-start mb-3">
                <div className="flex items-start md:items-center flex-nowrap">
                <FaLocationDot className="text-sm "/>
                <span className="text-left md:text-nowrap">Ynares, DMJ Bldg, A. Mabini St, Rodriguez, Rizal</span>
                </div>
              
              <div className="flex items-center ">
              <IoIosCall className="text-sm"/>
              <span>0933 821 2439</span>
              </div>
              </div>

              <div className="flex flex-col item text-xs lg:text-xs text-center lg:text-start">
                <div className="flex items-start md:items-center flex-nowrap mt-3">
                <FaLocationDot className="text-sm"/>
                <span className="text-left md:text-nowrap">P4JR+4J4, L.M.Santos St, Rosario, Rodriguez, 1860 Rizal</span>
                </div>
              
              <div className="flex items-center">
              <IoIosCall className="text-sm"/>
              <span>0933 821 2439</span>
              </div>
              </div>
            </div>
          </div>

          <div className="">
            <div className="flex flex-col items-center justify-center lg:items-start max-w-md">

              <span className="2xl:text-sm lg:text-sm text-sm text-center tracking-widest font-black">
                <Logo/>
              </span>

              <span className="text-xs lg:text-xs text-center lg:text-start w-40">
              Our dental team is dedicated to providing exceptional dental care to our patients. At OralCare, you'll discorver a new reason to smile, right in your neighborhood.
              </span>

            </div>
          </div>
      </div>
        </div>
        </div>

      </div>
    </main>
    </div>
    </div>
    </div>
    <Header/>
    </div>
    </>
  )
}

export default Contact