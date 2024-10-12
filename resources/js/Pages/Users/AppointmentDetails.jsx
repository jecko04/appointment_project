import React, { useState, useEffect } from 'react'
import { Table, Button, Modal, Space, Segmented, QRCode, DatePicker, TimePicker } from "antd";
import { Head, useForm, usePage, Link} from '@inertiajs/react';
import { DownloadOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import Logo from '@/Components/Logo';
import moment from 'moment';
import dayjs from 'dayjs';


const AppointmentDetails = ({ auth }) => {
    const { appointmentDetails, branches, categories, users, office_hours} = usePage().props;

    const user= usePage().props.auth.user;

    const qrCodeData = JSON.parse( appointmentDetails.qr_code || "{}");

    
    const {data, setData, post, errors }= useForm({
      fullname: '',
      selectedBranchName: '',
      selectedServices: '',
      appointment_date: '',
      appointment_time: '',
      qr_code: '',
    })

    const submit = async (e) => {
      e.preventDefault();
      setProcessing(true);
      try {
        const formattedData = {
            ...data,
            date: data.date ? moment(data.date).format('YYYY-MM-DD') : null,
            appointment_time: data.appointment_time
        };
  
        await post(route('guest.appointment.store', data), formattedData,{
          onSuccess: () => {
            notification.success({
              message: 'Success',
              description: 'Appointment date and time updated successfully!',
              placement: 'bottomRight',
              onClick: () => {
                console.log('Notification Clicked!');
              },
              duration: 3,
            });
          },
          onError: () => {
            notification.error({
              message: 'Error',
              description: 'There was an error on your appointment.',
              placement: 'bottomRight',
              onClick: () => {
                console.log('Notification Clicked!');
              },
              duration: 3, 
            });
          }
        });
    } catch (error) {
        console.error("Error during appointment submission:", error);
    } finally {
      setProcessing(false);
    }};

    const [processing, setProcessing] = useState();
    const [isQRModalOpen, setQRModalOpen] = useState(false);
    const [isReschedModalOpen, setReschedModalOpen] = useState(false);
    const [currentQRCode, setCurrentQRCode] = useState('');
    const [renderType, setRenderType] = useState('canvas');
    const [selectedRecord, setSelectedRecord] = useState(null); 

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
          render: (time) => time ? time : '',
        },
        {
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
        },
        {
          title: 'QRCode',
          dataIndex: 'qr_code',
          key: 'qrcode',
          render: (qrCode, record) => {
            return <>
            <Button
            className='text-sm text-white bg-[#ff4200] rounded-md p-3 hover:bg-[#ff400]/80'
            size='small'
            onClick={() => showQRModal(qrCode)}
            >
              Open
            </Button>
            <Modal
              title="SMTC-Dental Care : Appointment QRCode"
              open={isQRModalOpen}
              onOk={handleQROk}
              onCancel={handleQRCancel}
              footer={[
                <Button key="okay" onClick={handleQROk} color="primary">
                  Okay
                </Button>
              ]}
            >
              <Space id="myqrcode" direction="vertical">
                {/* <Segmented options={['canvas', 'svg']} onChange={(val) => setRenderType(val)} /> */}
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
            //const branch = record.selectedBranch || '{}';

            const showReschedModal = (rowData) => {
              setReschedModalOpen(true);
              setSelectedRecord(rowData)
            };

            const disableDate = (current) => {
              if (!Array.isArray(office_hours) || !current) return false;
          
              const closedDays = office_hours
                  .filter(officeHour => officeHour.Branch_ID === selectedRecord.selectedBranch && officeHour.IsClosed === 1)
                  .map(officeHour => officeHour.DayOfWeek); 
          
              const closedDayNumbers = closedDays.map(day => {
                  switch(day) {
                      case 'Sunday': return 0;
                      case 'Monday': return 1;
                      case 'Tuesday': return 2;
                      case 'Wednesday': return 3;
                      case 'Thursday': return 4;
                      case 'Friday': return 5;
                      case 'Saturday': return 6;
                      default: return -1;
                  }
                  });
                  return closedDayNumbers.includes(current.day()) || current < dayjs().endOf('day');
              };

            return <>
            <div className='flex gap-3'>
              <EditOutlined
              className='text-blue-500 text-lg'
              onClick={() => showReschedModal(record)}
              />
              {selectedRecord && (

              <Modal
              title="SMTC-Dental Care : Reschedule Appointment"
              open={isReschedModalOpen}
              onOk={reschedHandleOk}
              onCancel={reschedHandleCancel}
              footer={[
                <Button key="okay" onClick={reschedHandleOk} color="primary">
                  Okay
                </Button>
              ]}
            >
              <>
              <form onSubmit={submit}>
              <div className="flex flex-col gap-3">
                        <span className="text-sm mt-10">When would you like to come in?</span>
                        <div className="rounded-md shadow-xl py-4 px-4 flex flex-col gap-3 ">
                          <div className="flex flex-col divide-y divide-black">
                          <span className="font-black text-sm py-2">Schedule</span>
                          <span className="font-light text-xs py-2 text-gray-500">Choose Date and Time of your appointment</span>
                          </div>
                          
                          <InputLabel htmlFor="appointment_date" value="Select Date" />

                          <DatePicker
                              id={'appointment_date'} 
                              name={'appointment_date'}
                              disabledDate={disableDate}
                              value={data.appointment_date ? moment(data.appointment_date): null}
                              className="block w-60 md:w-80"
                              needConfirm
                              size='large'
                              onChange={(date) => setData('appointment_date', date ? date.format("YYYY-MM-DD"): null)}
                              required
                          >

                          </DatePicker>
                          <InputError message={errors.appointment_date} className="mt-2" /> 

                          <InputLabel htmlFor="appointment_time" value="Select Time" />

                          <TimePicker
                          id="appointment_time"
                          name="appointment_time"
                          value={data.appointment_time ? moment(data.appointment_time, 'h:mm a') : null}
                          className="block w-60 md:w-80"
                          size='large'
                          format='h:mm a' 
                          onChange={(time) => setData('appointment_time', time ? time.format("HH:mm") : null)} 
                          required
                        />

                          <InputError message={errors.appointment_time} className="mt-2" />
                      </div>
                      </div>
              </form>
              </>
            </Modal>
              )}
              <DeleteOutlined
              className='text-red-500 text-lg'
              />
            </div>
           
            </>
          }
        },
      ];

     

  return (
    <>
    <div className='m-5'>
    <Table
      id="table"
      name="table"
      dataSource={appointmentDetails} 
      columns={columns}       
      rowKey="id"
    />
    </div>
    </>

  )
}

export default AppointmentDetails