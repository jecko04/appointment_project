import React, { useEffect, useState } from 'react'
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import Navbar from '../Navbar/Navbar';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button, Card, Dropdown, Select, Space, Tag  } from 'antd';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/TertiaryButton';

const Services = ({ auth }) => {

  const {categories, branches} = usePage().props;
  const { Option } = Select;

  const [data, setData] = useState({
    selectedBranch: '',
    selectedBranchName: '',
  });

  const handleBranchChange = (value) => {
    const selectBranchName = branches.find(branch => branch.Branch_ID === parseInt(value));
    setData((prevData) => ({
      ...prevData,
      selectedBranch: value, 
      selectedBranchName: selectBranchName ? selectBranchName.BranchName : '',
    }));
  }

  return (
    <>
    <div className='bg-gradient-to-t from-white to-[#FADC12]/30'>
    <Head title="SMTC - Dental Care" />
    <div className="text-xs">
        <div className="items-center justify-center selection:text-white ">
          <div className="flex flex-col lg:w-full pt-2">
    <header>
      <Navbar auth={auth} />
    </header>
    <main>
    <div className='relative h-svh'>
        <span 
        className='absolute inset-0 bg-cover bg-center bg-fixed h-full' 
        style={{
          backgroundImage: 'url("/images/image1.jpg")',
          zIndex: 0, 
        }}
        />
        <span className='absolute inset-0 bg-black opacity-50 z-10' />
        <span className='text-[#FFFFFF] text-3xl font-black flex flex-col items-center pt-44 md:pt-64 relative z-20'>
          SERVICES
        </span>
    </div>
    <div className='px-10 py-12 flex flex-col gap-3'>
    <InputLabel htmlFor="branches" value="Select Branch"/>
        <Select
        id="branches"
        name="branches"
        className="w-60 md:w-80"
        size="large"
        placeholder="Select a branch"
        onChange={handleBranchChange}
        value={data.selectedBranch || null} 
        required
        >
        {branches.map((branch) => (
          <Option key={branch.Branch_ID} value={branch.Branch_ID}>
            {branch.BranchName}
          </Option>
        ))}
        </Select>

        <div className='flex flex-wrap gap-x-5' >
        {categories && categories.length > 0 ? (
          data.selectedBranch ? (
            categories
              .filter(category => category.Branch && category.Branch.Branch_ID == data.selectedBranch)
              .map((category, index) => (
                <Card
                  key={index}
                  type="inner"
                  title={category.Title}
                  hoverable
                  size="small"
                  className='shadow-lg mb-2'
                  style={{ width:"39rem" }}
                >
                  <div className='flex'>
                    <img src="/images/image.png" alt="" className='w-10 h-10 hidden md:block' />
                    <div className='p-2 flex flex-col md:flex-row justify-between w-full'>
                      <div>
                        <p>Branch Name: {category.Branch ? category.Branch.BranchName : ''}</p>
                        <p>Description: {category.Description}</p>
                        <p>Duration: {category.Duration}</p>
                      </div>
                      <div>
                        <p>Frequency: {category.Frequency}</p>
                        <p>Price: {category.Price}</p>
                        <Link href={(route('guest.appointment'))}>
                          <Button type='primary' size='small' style={{ padding: "13px", backgroundColor: '#ff4200' }} className='w-full'>Get Appointment</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
          ) : (
            <span className='text-center mt-6 text-lg'>Please select a branch to view services</span>
          )
        ) : (
          <span className='text-center mt-6 text-lg'>No data available</span>
        )}
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

export default Services