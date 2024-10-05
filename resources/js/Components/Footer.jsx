import { React } from 'react'
import Logo from '@/Components/Logo';
import { IoIosCall } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { BsFacebook } from "react-icons/bs";
import { FaSquareXTwitter } from "react-icons/fa6";
import { Link } from '@inertiajs/react';
import { FaTwitter } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";



const Footer = () => {
  return (
    <footer className="bg-[#FADC12] lg:h-72 w-full flex lg:flex-row flex-col lg:mt-20 justify-center items-center gap-10">
      <div className="">
      <div className="flex flex-col items-center lg:items-start max-w-md">

        <span className="2xl:text-2xl lg:text-2xl text-sm text-center tracking-widest font-black">
          <Logo/>
        </span>

        <span className="text-xs lg:text-base text-center lg:text-start">
         Our dental team is dedicated to providing exceptional dental care to our patients. At OralCare, you'll discorver a new reason to smile, right in your neighborhood.
        </span>

      </div>
      </div>

      <div className="">
      <div className="flex flex-col max-w-md">

        <span className="2xl:text-3xl lg:text-3xl text-sm text-center lg:text-left tracking-widest font-black">
        <span className="font-black text-2xl">Locations</span>
        </span>

        <div className="divide-y-2 divide-black py-4 ">
        <div className="flex flex-col item text-xs lg:text-sm text-center lg:text-start mb-3">
          <div className="flex items-start md:items-center flex-nowrap">
          <FaLocationDot className="text-lg "/>
          <span className="text-left md:text-nowrap">Ynares, DMJ Bldg, A. Mabini St, Rodriguez, Rizal</span>
          </div>
         
         <div className="flex items-center ">
         <IoIosCall className="text-lg"/>
         <span>0933 821 2439</span>
         </div>
        </div>

        <div className="flex flex-col item text-xs lg:text-sm text-center lg:text-start">
          <div className="flex items-start md:items-center flex-nowrap mt-3">
          <FaLocationDot className="text-lg "/>
          <span className="text-left md:text-nowrap">P4JR+4J4, L.M.Santos St, Rosario, Rodriguez, 1860 Rizal</span>
          </div>
         
         <div className="flex items-center">
         <IoIosCall className="text-lg"/>
         <span>0933 821 2439</span>
         </div>
        </div>
        </div>

      </div>
      </div>

      <div className="">
      <div className="flex flex-col max-w-md">
          
      <span className="2xl:text-3xl lg:text-3xl text-lg text-center lg:text-left tracking-widest font-black">
        <span className="font-black text-2xl">Socials</span>
        </span>

        <span className="flex flex-row gap-4">
          <Link href='/'>
            <BsFacebook className="text-2xl hover:text-[#FF4200]"/>
          </Link>
          <Link href='/'>
            <FaSquareXTwitter className="text-2xl hover:text-[#FF4200]"/>
          </Link>
          <Link href='/'>
            <AiFillInstagram className="text-2xl hover:text-[#FF4200]"/>
          </Link>
        </span>

        <span className="text-xs mt-20">
        Copyright © 2024 SMTC Dental Care, All rights reserved.
        </span>

      </div>
      
      </div>

      
    </footer>
  )
}

export default Footer