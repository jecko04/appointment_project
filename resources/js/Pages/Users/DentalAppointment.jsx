import React, { useState, useEffect } from 'react'
import { Table, Button, Modal, Space, Segmented, QRCode, DatePicker, TimePicker, notification, Tag, Popover, Pagination, Empty } from "antd";
import { Head, useForm, usePage, Link} from '@inertiajs/react';
import { DownloadOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import Logo from '@/Components/Logo';
import moment from 'moment';
import dayjs from 'dayjs';
import PrimaryButton from '@/Components/PrimaryButton';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import BarLoader from 'react-spinners/BarLoader';
import TextInput from '@/Components/TextInput';

const AppointmentDetails = ({ auth }) => {
    const { appointmentDetails, branches, categories, users, office_hours} = usePage().props;

    const user= usePage().props.auth.user;
    
    
    const {data, setData, errors }= useForm({
      id: '',
      fullname: '',
      selectedBranchName: '',
      selectedServices: '',
      appointment_date: '',
      appointment_time: '',
      qr_code: '',
      

      selectedBranch: null,
      selectServices: null,
      status: '',
    })

  useEffect(() => {
    if (appointmentDetails && appointmentDetails.length > 0) {
      const appointment = appointmentDetails[0];
      setData({
        ...data,
        selectedBranch: appointment.selectedBranch || '',
        selectServices: appointment.selectServices || '',
      });
    }
  }, [appointmentDetails]);

  const cancelAppointment = async () => {
      setProcessing(true);
      
      try {
          const formattedData = {
              ...data,
              id: appointmentDetails[0]?.id, 
              status: 'cancelled'
          };
  
          const response = await fetch(route('appointment.cancelled', formattedData), {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            },
            body: JSON.stringify(formattedData),
          });

          if (response.ok) {
            const result = await response.json();
            notification.success({
                message: 'Success',
                description: 'Cancelled Appointment!',
                placement: 'bottomRight',
            });
            setIsDeleteModalOpen(false);
            window.location.href = route('appointment');

          } else {
              notification.error({
                  message: 'Error',
                  description: 'There was an error with your appointment.',
                  placement: 'bottomRight',
              });
          }
      } catch (error) {
          console.error("Error during appointment submission:", error);
      } finally {
          setProcessing(false);
      }
  }

    const [processing, setProcessing] = useState();
    const [isQRModalOpen, setQRModalOpen] = useState(false);
    const [isReschedModalOpen, setReschedModalOpen] = useState(false);
    const [currentQRCode, setCurrentQRCode] = useState({
      fullname: '',
      selectedBranchName: '',
      selectedServices: '',
      appointment_date: '',
      appointment_time: '',
      qr_code: '',
    });
    const [renderType, setRenderType] = useState('canvas');
    const [selectedRecord, setSelectedRecord] = useState(null); 
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [open, setOpen] = useState(false);

    const hide = () => {
      const timer = setTimeout(() => {
        setOpen(false);
      }, 3000)
    };
    const handleOpenChange = (newOpen) => {
      setOpen(newOpen);
    };

    const showQRModal = (qrCode) => {
      setCurrentQRCode(qrCode);
      setQRModalOpen(true);
    };
  
    const handleQROk = () => {
      setQRModalOpen(false);
    };

    const handleQRCancel = () => {
      setQRModalOpen(false);
    };

    const reschedHandleOk = () => {
      setReschedModalOpen(false);
    };

    const reschedHandleCancel = () => {
      setReschedModalOpen(false);
    };
    
    const downloadCanvasQRCode = () => {
      const canvas = document.getElementById('myqrcode')?.querySelector('canvas');
      if (canvas) {
        const url = canvas.toDataURL();
        doDownload(url, 'QRCode.png');
      }
    };
  
    const downloadSvgQRCode = () => {
      const svg = document.getElementById('myqrcode')?.querySelector('svg');
      const svgData = new XMLSerializer().serializeToString(svg);
      const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      doDownload(url, 'QRCode.svg');
    };
  
    const doDownload = (url, fileName) => {
      const a = document.createElement('a');
      a.download = fileName;
      a.href = url;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };

    const qrCodeData = appointmentDetails ? JSON.parse(appointmentDetails[0]?.qr_code || "{}") : {};



    useEffect(() => {
      const branch = branches 
        ? branches.find(b => b.Branch_ID === appointmentDetails ? appointmentDetails[0]?.selectedBranch : null) 
        : null;

      const service = categories 
        ? categories.find(c => c.Categories_ID ===  appointmentDetails ? appointmentDetails[0]?.selectServices : null) 
        : null;
      
      setCurrentQRCode({
        ...currentQRCode,
        qr_code: JSON.stringify({
          userId: user.id,
          branch_name: branch ? branch.BranchName : "",
          services: service ? service.Title : "",
          appointment_date: qrCodeData.appointment_date,
          appointment_time: qrCodeData.appointment_time,
        }),
      });
    }, [
      user.id,
      appointmentDetails,
    ]);

    const showDeleteModal = () => {
      setIsDeleteModalOpen(true);
      //setSelectedRecord(record);
    }

    const handleCancel = () => {
      setIsDeleteModalOpen(false);
    }     

  return (
    <>

    <div className='pt-10 px-2 lg:px-[1rem]'>
    <div className='flex flex-col gap-1 px-4 py-3'>
                <div className='flex items-center justify-between'>
                    <span className='text-xs lg:text-sm text-[#ff4200]'>Welcome Back!</span>
                </div>

            <span className='text-lg lg:text-2xl '>{user.name}</span>
            <span className='text-xs lg:text-sm text-gray-500'>How are you Feeling Today?</span>
            </div>

                  <div className='bg-[#2938DA] w-full flex gap-32 rounded-lg px-2'>
                <div className='flex flex-col justify-center gap-2 lg:gap-0 text-white p-4 lg:p-0 '>
                <span className='text-sm lg:text-xl'>Take care of your smile—schedule your dental appointment today!</span>
                <span className='text-sm lg:text-xl'><b>Download</b> your dental appointment <b>QRCode</b>  Now!</span>
                <img src="/images/QRCode.png" alt="" className='h-[100px] w-[100px] bg-white rounded-sm' />

                <div className='flex flex-col mt-[4rem]'>
                    <a href={route('guest.appointment')} className='hover:text-blue-300 transition ease-in-out 300 text-sm lg:text-lg '>Book an appointment Here!</a>
                    <a href={route('home')} className='hover:text-blue-300 transition ease-in-out 300 text-sm lg:text-lg '>Back to Home</a>
                </div>


                </div>
                <img src="/images/3.png" alt="" className='w-72 h-72 hidden md:block'/> 
                </div>
      {
        processing ? (
          <>
          <div className='mt-5 flex w-full' style={{ position: "absolute", top: "50%", left: "50%", x:"-50%", y: "-50%" }}>
            <BarLoader color="#FF4200" />
          </div>
          </>
        ) : (
          <>
            {appointmentDetails && appointmentDetails.length > 0 ? (
              appointmentDetails.map((appointmentDetail) => {
                
                const fullname = users
                .filter(u => u.id === appointmentDetail.user_id)
                .map(u => u.name)
                .join(', ') || 'No Name Found'; 

                const branchName = branches
                .filter(b => b.Branch_ID === appointmentDetail.selectedBranch)
                .map(b => b.BranchName)
                .join(', ') || 'No Branch Found'; 

                const services = categories
                .filter(c => c.Categories_ID === appointmentDetail.selectServices)
                .map(c => c.Title)
                .join(', ') || 'No Title Found'; 

                const formatTo12Hour = (time) => {
                  let [hours, minutes] = time.split(':');
                  hours = parseInt(hours, 10);
                  const suffix = hours >= 12 ? 'PM' : 'AM';
                  hours = hours % 12 || 12; 
                  return `${hours}:${minutes} ${suffix}`;
              };
                return (
                <div 
                key={appointmentDetail.id}
                className='flex flex-col lg:flex-row gap-5 py-[2rem] lg:px-[2rem] rounded-lg justify-between'>
                <div className='flex flex-col gap-5 py-2 px-2 shadow-md rounded-lg items-center'>

                  <div className='flex flex-row items-center justify-around'>

                  {/* status */}
                    
                        {appointmentDetail.status === 'pending' ? (
                            <Tag icon={<SyncOutlined spin />} color="processing" className="ml-1 text-sm">
                                {appointmentDetail.status}
                            </Tag>
                        ) : appointmentDetail.status === 'approved' ? (
                            <Tag icon={<CheckCircleOutlined />} color="success">
                                {appointmentDetail.status}
                            </Tag>
                        ) : null}

                    <Button
                    className='text-sm text-white bg-red-500 hover:bg-red-300 p-3 cursor-pointer'
                    type='primary'
                    size='small'
                    onClick={showDeleteModal} 
                    >
                      Cancel
                    </Button>

                    <Modal
                    title="Are you sure you want to cancel this appointment?"
                    open={isDeleteModalOpen}
                    closable={false}
                    style={{
                      top: 20,
                    }}z
                    width={400}
                    footer={[
                    ]}
                    >
                    <>
                    <div className="flex flex-col gap-3">
                    <Button className='bg-red-600 text-white transition ease-in-out duration-300' onClick={() => cancelAppointment(appointmentDetail.id)} disabled={processing}>
                        sure
                    </Button>
                      <Button onClick={handleCancel}>
                        cancel
                      </Button>
                    </div>

                    </>
                    </Modal>
                    </div>

                    <Space id="myqrcode" direction="vertical">

                    <div className="flex gap-10 ">
                      <div className='flex flex-col items-center gap-4'>
                      {/* <span className="font-medium text-sm">QRCode</span> */}
                      {currentQRCode.qr_code && (
                        <QRCode
                          id="qrCode"
                          name="qrCode"
                          type={renderType}
                          value={currentQRCode.qr_code}
                          size={200}
                          icon="/images/image.png"
                          iconSize={30}
                        />
                      )}
                      <Button
                        type="primary"
                        icon={<DownloadOutlined />}
                        onClick={renderType === 'canvas' ? downloadCanvasQRCode : downloadSvgQRCode}
                        className='w-full'
                      >
                        Download
                      </Button>
                      </div>
                    </div>
                    </Space>
                  </div>

                <div className='flex flex-col lg:flex-row gap-5 lg:p-3 lg:shadow-md lg:rounded-lg'>

                <div className='flex flex-col gap-6 items-end'>

                <div className='flex flex-row gap-3'>

                <InputLabel htmlFor="fullname"  value="Your Fullname :"/>
                <TextInput 
                id="fullname"
                name="fullname"
                value={fullname}
                disabled
                />
                </div>

                <div className='flex flex-row gap-3'>

                <InputLabel htmlFor="branch"  value="Selected Branch Location :"/>
                <TextInput 
                id="branch"
                name="branch"
                value={branchName}
                disabled
                />
                </div>

                <div className='flex flex-row gap-3'>

                <InputLabel htmlFor="services"  value="Selected Dental Services :"/>
                <TextInput 
                id="services"
                name="services"
                value={services}
                disabled
                />
                
                </div>

                </div>

                <div className='flex flex-col gap-6 items-end'>

                <div className='flex flex-row gap-3'>

                <InputLabel htmlFor="appointment_date"  value="Appointment Date :"/>
                <TextInput 
                id="appointment_date"
                name="appointment_date"
                value={appointmentDetail.appointment_date}
                disabled
                />                
                </div>

                <div className='flex flex-row gap-3'>

                <InputLabel htmlFor="appointment_time"  value="Appointment Time :"/>
                <TextInput 
                id="appointment_time"
                name="appointment_time"
                value={formatTo12Hour(appointmentDetail.appointment_time)}
                disabled
                />
                </div>

                <div className='flex flex-row gap-3'>

                <InputLabel htmlFor="reschedule_date"  value="Rescheduled Date :"/>
                <TextInput 
                id="reschedule_date"
                name="reschedule_date"
                value={appointmentDetail.reschedule_date}
                disabled
                />
                </div>

                <div className='flex flex-row gap-3'>

                <InputLabel htmlFor="reschedule_time" value="Rescheduled Time :"/>
                <TextInput 
                id="reschedule_time"
                name="reschedule_time"
                value={formatTo12Hour(appointmentDetail.reschedule_time)}
                disabled
                />
                </div>
                </div>
                </div>

            </div>
                )

              })
            ) : (
              <>
              <Empty 
              className='bg-white'
              style={{ 
                position: "absolute",
                top: "80%",
                left: "50%",
                x: "-50%",
                y: "-50%"
               }}/>
              </>
            )}
            
          </>
        )
      }
    
    </div>
    </>

  )
}

export default AppointmentDetails