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
import { SyncOutlined } from '@ant-design/icons';

const Home = ({ status, canResetPassword }) => {
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
            window.location.href = route('dashboard');
        }
        else {
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
      
      <div className="flex flex-col max-w-lg mt-5">
      <span className="2xl:text-4xl lg:text-4xl text-2xl text-center lg:text-left tracking-widest font-black">
        <span className="text-[#FFFFFF] ">Experience </span>
        <span className="text-[#FFFFFF]">quality dental care </span>
        <span className="text-[#FFFFFF] ">with a smile</span>
      </span>

      <div className="text-white lg:text-lg text-base text-center mt-3 lg:mt-0 lg:text-left lg:text-clip leading-5">
      <p>
        {isExpanded
          ? "Our clinic focuses on enhancing your smile, ensuring a healthy, radiant one, and promoting confidence through dental health and beauty. Schedule an appointment today for a brighter, healthier you."
          : "Our clinic focuses on enhancing your smile, ensuring a healthy, radiant one..."}
      </p>
      <button
        className="text-[#ffffff] hover:underline"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? 'See Less' : 'See More...'}
      </button>
      
    </div>

      <div className="flex justify-center lg:justify-start mt-7 lg:m-7">
      <Link href={route('guest.appointment')}>
        <SecondaryButton onClick={showModal}>
          Request Appointment Here!
        </SecondaryButton>
      </Link>     
    </div>
      </div>

      <div className="lg:block">

        {user ? (
          <>
          {/* <div className="hidden lg:block">'
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
              </div> */}
          </>
        ) : (
          <>
             <div className="relative text-white lg:py-[4rem] md:py-[2rem] lg:mt-0 mt-4 md:px-[2rem] px-2 py-2 md:shadow-xl md:rounded-tl-3xl md:rounded-br-3xl md:border md:border-solid md:border-white">

              <div className="flex flex-col items-center">
                  <div className="flex items-center sm:flex-row lg:flex-row">
                      <span className="font-extrabold text-xs md:text-sm tracking-widest">Welcome To</span>
                      <img src="/images/image.png" alt="Logo" className="h-10 w-10 mr-2" />
                      <span style={{ color: '#FF4200' }} className="mr-2 text-xs md:text-sm tracking-widest">SMTC</span>
                      <span style={{ color: '#2938DA' }} className="md:text-sm tracking-widest">Dental Care</span>
                  </div>
                  <span className="text-xs sm:text-xs lg:text-xs tracking-widest pb-5">General Dentistry & Orthodontics w/ Dental X-Ray</span>
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
                          className="flex flex-1 mt-1 w-full md:text-sm text-xs"
                          size={size}
                          autoComplete="current-password"
                          onChange={(e) => setData('password', e.target.value)}
                      />

                      <InputError message={errors.password} className="mt-2" />
                  </div>

                  <div className="flex justify-between mt-4">
                      <label className="flex items-center">
                          <Checkbox
                              name="remember"
                              checked={data.remember}
                              onChange={(e) => setData('remember', e.target.checked)}
                          />
                          <span className="ms-2 text-xs text-white">Remember me</span>
                      {canResetPassword && (
                          <Link
                              href={route('password.request')}
                              className="underline text-xs text-white hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                              Forgot your password?
                          </Link>
                      )}
                      </label>
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
    
    <div className='h-[23rem] lg:h-[100vh] flex flex-col lg:justify-center justify-end md:p-0 p-2'>

    <div className="flex flex-col items-center md:w-[30rem] lg:mt-0 justify-center rounded-tl-3xl rounded-br-3xl shadow-md p-2">
    <span className="2xl:text-3xl lg:text-3xl text-lg text-center lg:text-left tracking-widest font-black">
        <span className="text-[#FF4200]">Lifelong  </span>
        <span className="text-[#2938DA]">Dental Care </span>
      </span>
      
      <span className="text-xs lg:text-base text-center pt-3">Your family deserves a dentist who provides not only emergency dental services but also supports and enhances oral health at every stage of life. We offer comprehensive family dentistry services designed to benefit every member of your family.</span>
    </div>
    </div>


    <div className="flex flex-col lg:flex-row items-center lg:justify-center md:w-full md:max-w-full md:pt-20 lg:gap-28 lg:h-[100vh] md:h-[55rem] h-[40rem] w-[100vw] bg-white mb-[6rem] ">
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