import React from 'react'
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import Navbar from '../Navbar/Navbar';
import { Head } from '@inertiajs/react';
import { IoCheckmarkDone } from "react-icons/io5";
import { Divider, Image } from 'antd';


const About = ({ auth }) => {
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
        <span className='text-[#FF4200] ml-1'>About</span>
        <span className='text-[#2938DA] ml-1'>Us</span>
        </div>
        
        <div className='flex flex-col md:flex md:flex-row justify-evenly py-10 md:px-40 gap-5'>
          <div className='flex flex-col gap-5'>
          <span className='text-[#FF4200] ml-1 text-xl font-black'>Providing exceptional dental care with 
            <span className='text-[#2938DA] ml-1'>heart</span> and 
            <span className='text-[#2938DA] ml-1'>dedication</span>
          </span>
        
          <span className='text-sm'>We're a dedicated team of enthusiastic, values-driven dental professionals that are committed to giving outstanding treatment to everyone, from the young to the young at heart. To provide exceptional dental care, we blend cutting-edge technology with a warm and welcoming environment.</span>
          <span className='text-sm'>Discover all of your dental needs (and more) at our modern, intelligently built facility, which is dedicated to your comfort and well-being.</span>
        
          <img src="/images/image3.jpg" alt="" className='h-52 rounded-md'/>
          </div>

          <div className='flex flex-col rounded-md shadow-md p-5 gap-5'>
            <div className='flex'>
              <span className='text-[#FF4200] ml-1 text-xl font-black'>Your 
                <span className='text-[#2938DA] ml-1'>Smile</span> Comes 
                <span className='text-[#2938DA] ml-1'>First!</span>
              </span>
            </div>
            <div className='flex flex-col gap-5 px-5 text-sm'>
            <span>At SMTC Dental Care, caring for your teeth is a seamless and enjoyable experience. You’ll find everything you deserve — convenient appointments, top-notch care, and a host of patient comforts. Plus, even more benefits:</span>
            <div className='flex items-center'>
            <IoCheckmarkDone className='text-3xl mr-1 text-[#2938DA]'/>
            <span>Our team provides personalized treatment plans tailored to your unique needs.</span>
            </div>
            <div className='flex items-center'>
            <IoCheckmarkDone className='text-3xl mr-1 text-[#2938DA]'/>
            <span>We prioritize your comfort with modern facilities and gentle care techniques.</span>
            </div>
            <div className='flex items-center'>
            <IoCheckmarkDone className='text-3xl mr-1 text-[#2938DA]'/>
            <span>Receive expert advice on maintaining your oral health for lasting results.</span>
            </div>
            <div className='flex items-center'>
            <IoCheckmarkDone className='text-3xl mr-1 text-[#2938DA]'/>
            <span>Experience a welcoming environment where your well-being is our top priority.</span>
            </div>
            </div>
            
          </div>
        </div>

        <div className='flex flex-col justify-center items-center md:px-40'>
          <span className='text-[#2938DA] text-xl font-black'><span className='text-[#FF4200]'>Specialized</span> Cosmetic Dentistry Services</span>
          <Divider/>
          <span className='text-sm text-center'>
            Experience the perfect blend of artistry and science with our cosmetic dentistry services. Whether you’re looking to enhance your smile or maintain its brilliance, we deliver personalized care that meets your needs. Our team is committed to providing top-tier treatments in a comfortable and welcoming environment, ensuring exceptional results.
          </span>
        </div>
        
        <div className='flex flex-col gap-4 justify-center md:p-5'>
          <div className='flex flex-col md:flex md:flex-row gap-2 mt-4'>
            <Image
            width={400}
            src="/images/5.png"
            />
            <Image
            width={400}
            src="/images/6.png"
            />
          </div>
          <div className='flex flex-col md:flex md:flex-row gap-2'>
            <Image
            width={400}
            src="/images/7.png"
            />
            <Image
            width={400}
            src="/images/8.png"
            />
          </div>
        </div>

        <div className=''>
            <span className='text-[#FF4200] text-xl font-black flex justify-center mt-4'>Meet the <span className='text-[#2938DA]'>Doctor</span></span>
          <div className='flex flex-col md:flex md:flex-row gap-5 md:gap-40 mt-4 items-center'>
            <img src="/images/10.png" alt="" className='h-72 rounded-lg' />
            <div className='flex flex-col rounded-md shadow-md gap-4 p-6'>
              <span className='text-lg font-black'>Dr. Sunshine Mayflor Tompong - Cabantac</span>
              <span className='text-xs md:text-sm w-64 md:w-96'>
                Dr. Tompong-Cabantac brings a wealth of experience and dedication to every patient. With a gentle approach and a commitment to personalized care, she ensures that each visit is as comfortable as possible. From preventive care to advanced treatments, Dr. Tompong-Cabantac strives to help her patients achieve optimal oral health. Her expertise, combined with a passion for patient education, empowers individuals to maintain healthy smiles for life. Whether addressing routine check-ups or complex dental issues, she is dedicated to delivering exceptional results with a warm, compassionate touch.
              </span>
            </div>
          </div>
        </div>

      </div>
    </main>
    </div>
    </div>
    </div>
    <Footer/>
    </div>
    </>
  )
}

export default About