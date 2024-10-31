import React, { useState, useEffect } from 'react'
import { Table, Button, Modal, Space, Segmented, QRCode, DatePicker, TimePicker, notification, Tag, Popover, Pagination } from "antd";
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

const AppointmentDetails = ({ auth }) => {
    const { appointmentDetails, branches, categories, users, office_hours} = usePage().props;

    const user= usePage().props.auth.user;
    const qrCodeData = JSON.parse( appointmentDetails?.qr_code || "{}");
    
    const {data, setData, errors }= useForm({
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
              id: selectedRecord.id,
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
    const [currentQRCode, setCurrentQRCode] = useState('');
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


    useEffect(() => {
      setData((prevData) => ({
        ...prevData,
        qr_code: JSON.stringify({
          userId: user.id,
          branch_name: prevData.selectedBranchName,
          services: prevData.selectedServices,
          appointment_date: prevData.appointment_date,
          appointment_time: prevData.appointment_time,
        }),
      }));
    }, [
      user.id,
      qrCodeData.selectedBranchName,
      qrCodeData.selectedServices,
      qrCodeData.appointment_date,
      qrCodeData.appointment_time,
    ]);

    const columns = [
        {
          title: 'Fullname',
          dataIndex: 'user_id',
          key: 'userId',
          render: (text, record) => {
            const name = users && users.find(u => u.id === record.user_id);
            return name ? name.name : '';
          }
        },
        {
          title: 'Branch',
          dataIndex: 'selectedBranch',
          key: 'branch',
          render: (text, record) => {
            const branch = branches && branches.find(b => b.Branch_ID === record.selectedBranch);
            return branch ? branch.BranchName : '';
          }
        },
        {
          title: 'Service',
          dataIndex: 'selectServices',
          key: 'categories',
          render: (text, record) => {
            const services = categories && categories.find(c => c.Categories_ID === record.selectServices);
            return services ? services.Title : '';
          }
        },
        {
          title: 'Appointment Date',
          dataIndex: 'appointment_date',
          key: 'appointment_date',
        },
        {
          title: 'Appointment Time',
          dataIndex: 'appointment_time',
          key: 'appointment_time',
          render: (time) => time ? moment(time, 'HH:mm').format('h:mm A') : ''
        },
        {
          title: 'Resched Date',
          dataIndex: 'reschedule_date',
          key: 'reschedule_date',
          render: (date) => date ? date : '',
        },
        {
          title: 'Resched Time',
          dataIndex: 'reschedule_time',
          key: 'reschedule_time',
          render: (time) => time ? moment(time, 'HH:mm').format('h:mm A') : ''
        },
        {
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
          render: (record) => {
            if (record === 'pending'){
              return (
              <Tag icon={<SyncOutlined spin />} color="processing">
                {record}
              </Tag>
              );
            }

            if (record === 'approved'){
              return (
              <Tag icon={<CheckCircleOutlined />} color="success">
                {record}
              </Tag>
              );
            }

            if (record === 'cancelled'){
              return (
              <Tag icon={<CloseCircleOutlined />} color="error">
                {record}
              </Tag>
              );
            }

            if (record === 'completed'){
              return (
              <Tag icon={<CheckCircleOutlined />} color="success">
                {record}
              </Tag>
              );
            }
          } 
        },
        {
          title: 'QRCode',
          dataIndex: 'qr_code',
          key: 'qrcode',
          render: (qrCode, record) => {
            return <>
            <p
            className='text-sm text-[#2938DA] hover:text-blue-300 p-3 cursor-pointer'
            size='small'
            onClick={() => showQRModal(qrCode)}
            >
              Show
            </p>
            <Modal
              title="SMTC-Dental Care : Appointment QRCode"
              open={isQRModalOpen}
              onOk={handleQROk}
              onCancel={handleQRCancel}
              style={{
                top: 20,
              }}
              footer={[
                <Button key="okay" onClick={handleQROk} color="primary">
                  Okay
                </Button>
              ]}
            >
              <Space id="myqrcode" direction="vertical">
                <div className="flex gap-10 ">
                  <div className='flex flex-col items-center gap-4'>
                  <span className="font-medium text-sm">QRCode</span>
                  <QRCode
                    id="qrCode"
                    name="qrCode"
                    type={renderType}
                    value={currentQRCode}
                    size={200}
                    icon="/images/image.png"
                    iconSize={30}
                  />
                  <Button
                    type="primary"
                    icon={<DownloadOutlined />}
                    onClick={renderType === 'canvas' ? downloadCanvasQRCode : downloadSvgQRCode}
                  >
                    Download
                  </Button>
                  </div>
                <Logo/>
                </div>
              </Space>
            </Modal>
            </>
          }
        },
        {
          title: 'Action',
          dataIndex: 'selectedBranch',
          key: 'action',
          render: (text, record) => { 

            const showReschedModal = (rowData) => {
              setReschedModalOpen(true);
              setSelectedRecord(rowData)
              setData({
                ...data,
                selectedBranch: rowData.selectedBranch,
                selectServices: rowData.selectServices,
              });
            };

            const showDeleteModal = (record) => {
              setIsDeleteModalOpen(true);
              setSelectedRecord(record);
            }

            const handleCancel = () => {
              setIsDeleteModalOpen(false);
            }
            
            return <>
            <div className='flex gap-3'>


              <p
              className='text-sm text-red-500 hover:text-red-300 p-3 cursor-pointer'
              size='small'
              onClick={() => showDeleteModal(record)} 
              >
                Cancel
              </p>

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
              <Button className='bg-red-600 text-white transition ease-in-out duration-300' onClick={() => cancelAppointment(selectedRecord.id)} disabled={processing}>
                  sure
              </Button>
                <Button onClick={handleCancel}>
                  cancel
                </Button>
              </div>
              
              </>
            </Modal>
            </div>
           
            </>
          }
        },
      ];

     

  return (
    <>

    <div className='m-5'>
      {
        processing ? (
          <>
          <div className='mt-5 flex w-full' style={{ position: "absolute", top: "50%", left: "50%", x:"-50%", y: "-50%" }}>
            <BarLoader color="#FF4200" />
          </div>
          </>
        ) : (
          <>
          <Table
            id="table"
            name="table"
            dataSource={appointmentDetails} 
            columns={columns}       
            rowKey="id"
            size='small'
            pagination={{ 
              pageSize: 5,
              showSizeChanger: false,
             }}
            />
          </>
        )
      }
    
    </div>
    </>

  )
}

export default AppointmentDetails