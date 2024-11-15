import React, { useEffect, useState } from 'react'
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { Link, useForm, usePage } from '@inertiajs/react';
import { FaLocationDot } from "react-icons/fa6";
import { TbDental } from "react-icons/tb";
import { LuCalendarCheck2 } from "react-icons/lu";
import { Modal, Button, Carousel, Input, notification, Divider  } from 'antd';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import Checkbox from '@/Components/Checkbox';
import { SyncOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FaRegArrowAltCircleRight } from "react-icons/fa";



const Home = ({ status, canResetPassword = true }) => {
  const user= usePage().props.auth.user;

  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [size, setSize] = useState('large');

  const { data, setData, post, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
});
console.log(canResetPassword);

const submit = async (e) => {
    e.preventDefault();

    setProcessing(true);

    try {
        const response = await fetch(route('login'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
              },
            body: JSON.stringify(data),
            //onFinish: () => reset('password'),
        });
        const result = await response.json();
        
        if (response.ok) {
          notification.success({
              message: 'Success',
              description: result.message || 'Login successfully!',
              placement: 'bottomRight',
              duration: 3,
          });
          window.location.href = result.redirect;
      } else if (response.status === 403) {
          notification.warning({
              message: 'Email Verification Required',
              description: result.message || 'Please verify your email before logging in.',
              placement: 'bottomRight',
              duration: 3,
          });
          window.location.href = result.redirect; 
      } else {
          notification.error({
              message: 'Error',
              description: result.message || 'Login Failed!',
              placement: 'bottomRight',
              duration: 3,
          });
      }
    }
    catch (error) {
        notification.error({
            message: 'Submission Error',
            description: error.message || 'An error occurred during the submission.',
            placement: 'bottomRight',
            duration: 3,
        });
    }
    finally {
        setProcessing(false);
        reset('password');
    }
    
};


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


  useEffect(() => {
      const handleResize = () => {
          if (window.innerWidth < 768) { 
              setSize('medium');
          } else {
              setSize('large');
          }
      };

      window.addEventListener('resize', handleResize);
      handleResize(); 

      return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
    <div className="flex flex-col items-center justify-center lg:gap-0 gap-24">
    
    <div className='relative h-svh w-full'>
        <span 
        className='absolute inset-0 bg-cover bg-center bg-fixed lg:h-full h-[41.5rem]' 
        style={{
          backgroundImage: 'url("/images/image3.jpg")',
          zIndex: 0, 
        }}
        />
      <span className='absolute inset-0 bg-black opacity-50 z-10 lg:h-full h-[41.5rem]' />
      <div className="flex flex-col lg:flex-row items-center justify-center gap-0 lg:gap-14 lg:h-[100vh] relative z-20 md:p-0 p-3">

      {/* <div className="relative z-30"> */}

      <Carousel 
        autoplay
        effect="fade" 
        dotPosition='top'
        arrows 
        infinite={false}
        className="w-[20rem] lg:w-[40rem] mx-auto"  
      >
        {/* First Slide */}
        <div className="flex justify-center items-center h-full"> 
          <div className="flex flex-col px-[2rem] mt-5">
            <span className="2xl:text-4xl lg:text-4xl text-2xl text-center lg:text-left tracking-widest font-black">
              <span className="text-yellow-500">Unsure About Your Dental Needs?</span>
              <span className="text-blue-500"> Start with a Consultation</span>
            </span>

            <div className="text-white lg:text-lg text-base text-center mt-3 lg:mt-0 lg:text-left lg:text-clip leading-5">
              <p className='text-xs lg:text-lg'>
                Not sure which dental treatment is right for you? Begin with a consultation! Our dental professionals will assess your needs and recommend the best treatment options tailored to you.
              </p>
            </div>

            <div className="flex justify-center lg:justify-start mt-2 lg:m-7">
              <Link href={route('guest.consultation')}>
                <SecondaryButton onClick={showModal}>
                  Schedule Your Consultation Here!
                </SecondaryButton>
              </Link>     
            </div>
          </div>
        </div>

        {/* Second Slide */}
        <div className="flex justify-center items-center h-full"> 
          <div className="flex flex-col  px-[2rem] mt-5">
            <span className="2xl:text-4xl lg:text-4xl text-2xl text-center lg:text-left tracking-widest font-black">
              <span className="text-yellow-500">Know What You Need?</span>
              <span className="text-blue-500"> Book Your Treatment Directly</span>
            </span>

            <div className="text-white lg:text-lg text-base text-center mt-3 lg:mt-0 lg:text-left lg:text-clip leading-5">
              <p className='text-xs lg:text-lg'>
                Already aware of the treatment you require? Book directly with us. Our experienced team is ready to provide the care you need to achieve your dental health goals.
              </p>
            </div>

            <div className="flex justify-center lg:justify-start mt-2 lg:m-7">
              <Link href={route('guest.appointment')}>
                <SecondaryButton onClick={showModal}>
                  Book Your Treatment Here!
                </SecondaryButton>
              </Link>     
            </div>
          </div>
        </div>
      </Carousel>
      {/* </div> */}



      <div className="lg:block">
        {user ? (
          <>
          </>
        ) : (
          <>
             <div className="relative text-black bg-white/10 backdrop:blur-xl lg:py-[4rem] md:py-[2rem] lg:mt-0 mt-4 md:px-[2rem] px-2 py-2 md:shadow-xl md:rounded-tl-3xl md:rounded-br-3xl md:border md:border-solid md:border-white">

              <div className="flex flex-col items-center">
                  <div className="flex items-center sm:flex-row lg:flex-row">
                      <span className="font-extrabold text-xs md:text-sm tracking-widest text-white">Welcome To</span>
                      <img src="/images/image.png" alt="Logo" className="h-10 w-10 mr-2" />
                      <span style={{ color: '#FF4200' }} className="mr-2 text-xs md:text-sm tracking-widest text-white">SMTC</span>
                      <span style={{ color: '#2938DA' }} className="md:text-sm tracking-widest text-white">Dental Care</span>
                  </div>
                  <span className="text-xs sm:text-xs lg:text-xs tracking-widest pb-5 text-white">General Dentistry & Orthodontics w/ Dental X-Ray</span>
              </div>

              {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

              <form onSubmit={submit}>
                  <div>
                      <InputLabel htmlFor="email" value="Email" className='text-white' />

                      <TextInput
                          id="email"
                          type="email"
                          name="email"
                          value={data.email}
                          className="mt-1 block w-full md:text-sm text-xs"
                          autoComplete="username"
                          isFocused={true}
                          onChange={(e) => setData('email', e.target.value)}
                      />

                      <InputError message={errors.email} className="mt-2" />
                  </div>

                  <div className="mt-4">
                      <InputLabel htmlFor="password" value="Password" className='text-white'/>

                      <Input.Password
                          id="password"
                          type="password"
                          name="password"
                          value={data.password}
                          className="flex flex-1 mt-1 w-full md:text-sm text-xs "
                          size={size}
                          autoComplete="current-password"
                          onChange={(e) => setData('password', e.target.value)}
                      />

                      <InputError message={errors.password} className="mt-2" />
                  </div>

                  <div className="mt-4 flex justify-between">
                      <label className="flex items-center ">
                          <Checkbox
                              name="remember"
                              checked={data.remember}
                              onChange={(e) => setData('remember', e.target.checked)}
                          />
                          <span className="ms-2 text-xs text-white">Remember me</span>
                      </label>
                      {canResetPassword && (
                          <Link
                              href={route('password.request')}
                              className="underline text-xs text-white hover:text-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                              Forgot your password?
                          </Link>
                      )}
                  </div>

                  <div className="flex items-center justify-between mt-4">
                      <Link
                      href={route('register')}
                      className="underline text-xs text-white hover:text-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                          Haven't created an account yet?
                      </Link>
                      <div className='ml-2'>
                      <PrimaryButton disabled={processing}>
                      {processing ? <SyncOutlined spin /> : 'Login'}
                      </PrimaryButton>
                      </div>
                  </div>
              </form>
              </div>

          </>
        )}
        
      </div>
      
        </div>
    </div>
    
    <div className=' flex flex-col lg:flex-row md:p-0 lg:p-2'>

    <div className="flex flex-col items-center md:w-[30rem] w-full lg:mt-4 lg:p-[2rem]">
      <span className="2xl:text-3xl lg:text-3xl text-lg text-center lg:text-left tracking-widest font-black">
        <span className="text-[#FF4200]">Our  </span>
        <span className="text-[#2938DA]">Dental Serivces </span>
      </span>
  
      <div className="flex flex-col lg:flex-row gap-6 justify-center lg:mt-8 lg:h-[30rem] ">
      
      {/* Preventive and Basic Care */}
      <div className="bg-white rounded-lg shadow-lg w-[20rem] flex flex-col items-start ">
        <img src="/images/image6.jpg" alt="" className="w-full h-[13rem] object-cover mb-4 rounded-t-md"  />
        <ul className="list-none ml-1 space-y-2 text-blue-400 p-6">
        <span className="text-[#FF4200] text-xl font-semibold mb-4">Preventive and Basic Care</span>
          <li className="flex items-center text-lg">
            <IoMdCheckmarkCircleOutline className="text-blue-400 mr-2" />
            Tooth Cleaning
          </li>
          <li className="flex items-center text-lg">
            <IoMdCheckmarkCircleOutline className="text-blue-400 mr-2" />
            Consultation
          </li>
        </ul>
      </div>

      {/* Restorative Treatments */}
      <div className="bg-white rounded-lg shadow-lg w-[20rem] flex flex-col items-start">
      <img src="/images/image7.jpg" alt="" className="w-full h-[13rem] object-cover mb-4 rounded-t-md"  />

        <ul className="list-none ml-1 space-y-2 text-blue-400 p-6">
        <span className="text-[#2938DA] text-xl font-semibold mb-4">Restorative Treatments</span>
          <li className="flex items-center text-lg">
            <IoMdCheckmarkCircleOutline className="text-blue-400 mr-2" />
            Tooth Filling
          </li>
          <li className="flex items-center text-lg">
            <IoMdCheckmarkCircleOutline className="text-blue-400 mr-2" />
            Tooth Whitening
          </li>
          <li className="flex items-center text-lg">
            <IoMdCheckmarkCircleOutline className="text-blue-400 mr-2" />
            Flexible Denture
          </li>
          <li className="flex items-center text-lg">
            <IoMdCheckmarkCircleOutline className="text-blue-400 mr-2" />
            Acrylic Denture
          </li>
        </ul>
      </div>

      {/* Surgical and Specialty Treatments */}
      <div className="bg-white rounded-lg shadow-lg w-[20rem] flex flex-col items-start">
      <img src="/images/image8.jpg" alt="" className="w-full h-[13rem] object-cover mb-4 rounded-t-md"  />

        <ul className="list-none ml-1 space-y-2 text-blue-400 p-6">
        <span className="text-[#FF4200] text-xl font-semibold mb-4">Surgical and Specialty Treatments</span>
          <li className="flex items-center text-lg">
            <IoMdCheckmarkCircleOutline className="text-blue-400 mr-2" />
            Tooth Extraction
          </li>
          <li className="flex items-center text-lg">
            <IoMdCheckmarkCircleOutline className="text-blue-400 mr-2" />
            Dental Surgery
          </li>
          <li className="flex items-center text-lg">
            <IoMdCheckmarkCircleOutline className="text-blue-400 mr-2" />
            Orthodontic Treatment
          </li>
        </ul>
      </div>

    </div>
      <div className='mt-4 flex flex-col lg:flex-row'>
        <Link href={route('guest.consultation')}>
          <Button className='text-xl bg-[#FF4200] text-white px-[2.53rem] lg:px-[7.8rem] lg:py-[1.4rem]'>
            Book a Consultation Here!
          </Button>
        </Link>

        <Link href={route('guest.appointment')}>
          <Button className='text-xl bg-[#FF4200] text-white px-[1.3rem] lg:px-[7.8rem] lg:py-[1.4rem]'>
            Book a Dental Treatment Here! 
          </Button>
        </Link>
      </div>
  
    </div>
    </div>

    <div className='lg:h-[100vh] flex flex-col justify-center items-center bg-white w-full'>

        <span className="2xl:text-3xl lg:text-3xl text-2xl text-center lg:text-left tracking-widest font-black mt-[3rem]">
          <span className="text-blue-500">Our  </span>
          <span className="text-blue-500">Dentist </span>
        </span>
        <div className='flex flex-col lg:flex-row gap-10 items-end justify-center  w-full mb-12 bg-w'>
        <div className="bg-white rounded-lg rounded-t-full shadow-lg w-[20rem] flex flex-col items-start ">
        <img src="/images/10.png" alt="" className="w-full h-[25rem] object-cover mb-4 rounded-t-full"  />
        <ul className="list-none ml-1 space-y-2 text-blue-400 p-6">
        <span className="text-[#FF4200] text-xl font-semibold mb-4">Dr. Sunshine Mayflor Tompong - Cabantac</span>
        <div className='flex items-end'>
        
        </div>
        </ul>
      </div>
      <div className="bg-white rounded-lg shadow-lg w-[20rem] flex flex-col items-start ">
        {/* <img src="/images/image6.jpg" alt="" className="w-full h-[25rem] object-cover mb-4 rounded-t-full"  /> */}
        <ul className="list-none ml-1 space-y-2 text-blue-400 p-6">
        <span className="text-[#FF4200] text-xl font-semibold mb-4">Dr. Sunshine Mayflor Tompong - Cabantac</span>
        <li className="flex items-center text-lg">
          <IoMdCheckmarkCircleOutline className="text-blue-400 mr-2" />
          20 years experienced (example)
        </li>

        <li className="flex items-center text-lg">
          <IoMdCheckmarkCircleOutline className="text-blue-400 mr-2" />
          Specializes in general dentistry
        </li>

        <li className="flex items-center text-lg">
          <IoMdCheckmarkCircleOutline className="text-blue-400 mr-2" />
          Member of the Philippine Dental Association
        </li>
        </ul>
      </div>
        </div>

    </div>


    <div className="flex flex-col lg:flex-row items-center lg:justify-center md:w-full md:max-w-full md:pt-20 lg:gap-28 lg:h-[100vh] md:h-[55rem] h-[40rem] w-[100vw] mb-[6rem] ">
      <div className="flex flex-col md:max-w-md max-w-full">
          
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

        <div className=" flex flex-wrap items-center w-full max-w-md mt-4">
                
                <div className="flex flex-col sm:shadow-lg sm:px-5 sm:py-7 rounded-bl-3xl rounded-tr-3xl absolute lg:w-full lg:max-w-72 lg:bottom-72 2xl:right-1/4 lg:right-96 translate-y-[9rem] md:-translate-y-[2rem] lg:-translate-y-[5rem] sm:bottom-80 bottom-96 left-10 sm:left-52 lg:left-1/2">
                  <div className="flex lg:text-lg text-sm font-black gap-1">
                <FaLocationDot className="text-2xl "/>
                    <span>Accessible </span>
                    <span className="text-[#2938DA]">Locations</span>
                  </div>
                  
                  <span className="w-full max-w-72 text-balance">
                    Visit us at any of our easily reachable clinics, making dental care close to home.</span>
                </div>

                <div className="flex flex-col sm:shadow-lg sm:px-5 sm:py-7 rounded-bl-3xl rounded-tr-3xl absolute lg:w-full lg:max-w-72 2xl:right-72 lg:right-40 lg:bottom-36 translate-y-[10rem] md:-translate-y-[3rem] lg:-translate-y-[6rem] sm:bottom-40 bottom-72 left-10 sm:left-72 lg:left-2/3" >
                <div className="flex lg:text-lg text-sm font-black gap-1">
                <TbDental className="text-2xl"/>
                  <span>Full-Service </span>
                  <span className="text-[#2938DA]">Dental Care</span>
                </div>
                  
                  <span className="w-full max-w-72 text-balance">
                    Offering a wide range of dental treatments for all ages, from routine checkups to advanced cosmetic procedures.</span>
                </div>

                <div className="flex flex-col sm:shadow-lg sm:px-5 sm:py-7 rounded-bl-3xl rounded-tr-3xl absolute lg:w-full lg:max-w-72 lg:right-96 lg:bottom-0 translate-y-[11rem] md:-translate-y-[4rem] lg:-translate-y-[7rem] sm:bottom-4 bottom-52 left-10 sm:left-52 lg:left-1/2">
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