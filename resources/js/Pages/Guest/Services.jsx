import React, { useEffect, useState } from 'react'
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import Navbar from '../Navbar/Navbar';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button, Card, Modal, Input, Select, Space, Tag  } from 'antd';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/TertiaryButton';
import TextInput from '@/Components/TextInput';
import { SearchOutlined } from '@ant-design/icons';

const Services = ({ auth }) => {

  const {categories, branches} = usePage().props;
  const { Option } = Select;

  const [data, setData] = useState({
    selectedBranch: '',
    selectedBranchName: '',
  });

  useEffect(() => {
    if (branches.length > 0) {
        setData({ selectedBranch: branches[0].Branch_ID }); // Pre-select the first branch
    }
}, [branches]);

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
        <div className="items-center justify-center selection:text-blue-500 ">
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
          OUR DENTAL SERVICES
        </span>
    </div>
    <div className='px-10 py-12 flex flex-col gap-3'>
    <InputLabel htmlFor="branches" value="Select Branch"/>
    <div className='flex justify-between w-full' >
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
      </div>

      <div className='flex flex-wrap gap-x-5'>
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
            className='shadow-lg mb-4 rounded-lg border border-gray-200'
            style={{ width: "100%", maxWidth: "39rem" }}
          >
            <div className='flex flex-col md:flex-row items-start md:items-center'>
              {/* <img src="/images/image.png" alt="" className='w-16 h-16 md:w-20 md:h-20 rounded-full mb-4 md:mb-0 md:mr-4' /> */}
              <div className='p-4 flex flex-col justify-between w-full'>
                <div className='mb-3'>
                  <p className='font-semibold text-lg text-gray-800'>Branch Name:</p>
                  <p className='text-gray-600'>{category.Branch ? category.Branch.BranchName : 'N/A'}</p>
                </div>
                <div className='mb-3'>
                  <p className='font-semibold text-lg text-gray-800'>Description:</p>
                  <p className='text-gray-600'>{category.Description}</p>
                </div>
                <div className='mb-3'>
                  <p className='font-semibold text-lg text-gray-800'>Duration:</p>
                  <p className='text-gray-600'>{category.Duration}</p>
                </div>
                <div className='mb-3'>
                  <p className='font-semibold text-lg text-gray-800'>Frequency:</p>
                  <p className='text-gray-600'>{category.Frequency}</p>
                </div>
                <div className='mb-3'>
                  <p className='font-semibold text-lg text-gray-800'>Price:</p>
                  <p className='text-gray-600'>{category.Price}</p>
                </div>
                <div className='flex justify-end'>
                  <Link href={route('guest.appointment')}>
                    <Button 
                      type='primary' 
                      size='small' 
                      className='w-full md:w-auto' 
                      style={{ padding: "10px 20px", backgroundColor: '#ff4200', borderColor: '#ff4200' }}
                    >
                      Get Appointment
                    </Button>
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