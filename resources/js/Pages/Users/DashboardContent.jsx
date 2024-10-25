import { usePage } from '@inertiajs/react';
import React, { useState } from 'react'
import { Card, Tag, Modal } from 'antd';
import {
    CheckCircleOutlined,
    ClockCircleOutlined,
    CloseCircleOutlined,
    ExclamationCircleOutlined,
    MinusCircleOutlined,
    SyncOutlined,
  } from '@ant-design/icons';
import { GiDuration } from "react-icons/gi";
import { MdOutlineDescription } from "react-icons/md";
import { IoMdPricetags } from "react-icons/io";
import { FiUser } from "react-icons/fi";
import { RiBuildingLine } from "react-icons/ri";
import { TbDental } from "react-icons/tb";
import { SlList } from "react-icons/sl";
import { FaLocationDot } from "react-icons/fa6";
import Logo from '@/Components/Logo';



const DashboardContent = () => {

    const {appointmentDetails, branches, categories, user} = usePage().props;

    console.log(appointmentDetails);
    console.log(user);
  return (
    <>
    

    <div className='px-4 py-3'>
    
         {appointmentDetails && appointmentDetails.length > 0 ? (
    appointmentDetails.map((appointmentDetail) => {
        const branchName = branches
            .filter(b => b.Branch_ID === appointmentDetail.selectedBranch)
            .map(b => b.BranchName)
            .join(', ') || 'No Branch Found'; 

        const location = branches
        .filter(l => l.Branch_ID === appointmentDetail.selectedBranch)
        .flatMap(l => [l.BuildingNumber, l.Street, l.Barangay, l.City, l.Province, l.PostalCode])
        .join(', ') || 'No Branch Found'; 

        console.log(location);

        const userName = user
            .filter(u => u.id === appointmentDetail.user_id)
            .map(u => u.name)
            .join(', ') || 'No Name Found'; 

        const services = categories
        .filter(s => s.Categories_ID === appointmentDetail.selectServices)
        .map(s => s.Title)
        .join(', ') || 'No Services Found'; 

        const description = categories
        .filter(des => des.Categories_ID === appointmentDetail.selectServices)
        .map(des => des.Description)
        .join(', ') || 'No Description Found'; 
        
        const duration = categories
        .filter(dur => dur.Categories_ID === appointmentDetail.selectServices)
        .map(dur => dur.Duration)
        .join(', ') || 'No Description Found';

        const frequency = categories
        .filter(f => f.Categories_ID === appointmentDetail.selectServices)
        .map(f => f.Frequency)
        .join(', ') || 'No Description Found';

        const price = categories
        .filter(p => p.Categories_ID === appointmentDetail.selectServices)
        .map(p => p.Price)
        .join(', ') || 'No Description Found';
        console.log(appointmentDetail.selectServices);

        const [isModalOpen, setIsModalOpen] = useState(false);

        const showModal = () => {
            setIsModalOpen(true);
        }
        const cancelModal = () => {
            setIsModalOpen(false);
        }

        return (

            
            
            <Card
                key={appointmentDetail.id} 
                type="inner" 
                title={`Appointment ID: ${appointmentDetail.id}`} 
                hoverable
                size="small"
                className='shadow-lg mb-2'
                extra={<a onClick={showModal}>Show more</a>}
            >
                <div className='flex justify-between'>
                <div className='flex items-center'>
                <img src="/images/image.png" alt="" className='w-10 h-10 hidden md:block'/>
                <div className='p-2'>
                <p>Branch Name: {branchName}</p>
                <p>Services: {services}</p>
                </div>
                </div>
                <p>Status: 
                    {appointmentDetail.status === 'pending' ? (
                        <Tag icon={<SyncOutlined spin />} color="processing" className="ml-1">
                            {appointmentDetail.status}
                        </Tag>
                    ) : appointmentDetail.status === 'approved' ? (
                        <Tag icon={<CheckCircleOutlined />} color="success">
                            {appointmentDetail.status}
                        </Tag>
                    ) : null}
                </p>
                </div>
                <Modal
                    title={<Logo/>}
                    open={isModalOpen}
                    onCancel={cancelModal}
                    width={600}
                    footer={[
                    ]}
                    >
                    <>
                    <div className='flex flex-col gap-2'>
                    <div className='flex gap-5'>
                        <div className='flex flex-col'>
                            <span className='text-gray-500'>Fullname</span>
                            <div className='flex gap-2 items-center'>
                            <FiUser/>
                            <p>{userName}</p>
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <span className='text-gray-500'>Services</span>
                            <div className='flex gap-2 items-center'>
                            <TbDental/>
                            <p>{services}</p>
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <span className='text-gray-500'>Branch Name</span>
                            <div className='flex gap-2 items-center'>
                            <RiBuildingLine/>
                            <p>{branchName}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div >
                        <div className='flex flex-col'>
                            <span className='text-gray-500'>Description</span>
                            <div className='flex gap-2 items-center'>
                            <MdOutlineDescription/>
                            <p>{description}</p>
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <span className='text-gray-500'>Duration</span>
                            <div className='flex gap-2 items-center'>
                            <GiDuration/>
                            <p>{duration}</p>
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <span className='text-gray-500'>Frequency</span>
                            <div className='flex gap-2 items-center'>
                            <SlList/>
                            <p>{frequency}</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center gap-2 mt-3'>
                        <FaLocationDot/>
                        <p>Location: {location}</p>
                    </div>
                    <div className='flex items-center gap-2'>
                    <IoMdPricetags/>
                    <p>Price: {price}</p>
                    </div>
                    </div>
                    
                    </>
                </Modal>
            </Card>
        );
    })
) : (
    <p>No appointment details available.</p>
)}
    </div>

    </>

  )
}

export default DashboardContent