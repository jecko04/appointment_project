import React, { useState } from 'react'
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import Navbar from '../Navbar/Navbar';
import { Head, usePage } from '@inertiajs/react';
import { Card, Dropdown, Select, Space, Tag  } from 'antd';
import { DownOutlined, SyncOutlined } from '@ant-design/icons';
import InputLabel from '@/Components/InputLabel';

const Services = ({ auth }) => {

  const {categories, branches} = usePage().props;
  const { Option } = Select;

  const [data, setData] = useState({
    selectedBranch: '',
  });


  const handleBranchChange = (value) => {
    const selectBranchName = branches.find(branch => branch.Branch_ID === parseInt(value));
    setData((prevData) => ({
      ...prevData,
      selectedBranch: value, 
      selectedBranchName: selectBranchName ? selectBranchName.BranchName : '',
    }));
  }

  console.log(categories);
  console.log(branches);


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
      <div className='p-10 flex flex-col gap-3'>
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

        <Card
        key='key' 
        type="inner" 
        title={`Services`} 
        hoverable
        size="small"
        className='shadow-lg mb-2'
        extra={<a href='#'>Show more</a>}
        >
          <div className='flex justify-between'>
                <div className='flex items-center'>
                <img src="/images/image.png" alt="" className='w-10 h-10 hidden md:block'/>
                <div className='p-2'>
                <p>Branch Name: </p>
                <p>Services: </p>
                </div>
                </div>
                <p>Status: 
                <Tag icon={<SyncOutlined spin />} color="processing" className='ml-1'>
                    pending
                </Tag>
                </p>
                </div>
        </Card>
        </div>

    </main>
    </div>
    </div>
    </div>
    <Footer/>
    </>
  )
}

export default Services