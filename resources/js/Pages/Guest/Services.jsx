import React from 'react'
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import Navbar from '../Navbar/Navbar';
import { Head } from '@inertiajs/react';

const Services = ({ auth }) => {
  return (
    <>
    <Header/>
    <Head title="SMTC - Dental Care" />
    <div className="text-xs">
        <div className="items-center justify-center selection:text-white">
          <div className="flex flex-col lg:w-full lg:mt-2">
    <header>
      <Navbar auth={auth} />
    </header>
    <main>

    </main>
    </div>
    </div>
    </div>
    <Footer/>
    </>
  )
}

export default Services