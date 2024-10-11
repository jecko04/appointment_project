import React, { useState } from 'react'
import { Table, Button } from "antd";
import { Head, useForm, usePage, Link} from '@inertiajs/react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const AppointmentDetails = () => {
    const { appointmentDetails, branches, categories, users} = usePage().props;
    const {data, setData, post, errors }= useForm({

    })

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
          dataIndex: 'qrcode',
          key: 'qrcode',
          render: (record) => {
            return <>
            <Button
            className='text-sm text-white bg-[#ff4200] rounded-md p-3 hover:bg:[#ff400]/80'
            size='small'
            >
              Open
            </Button>
            </>
          }
        },
        {
          title: 'Action',
          dataIndex: 'action',
          key: 'action',
          render: (record) => {
            return <>
            <div className='flex gap-3'>
              <EditOutlined
              className='text-blue-500 text-lg'
              />
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
            dataSource={appointmentDetails} 
            columns={columns}       
            rowKey="id"
        />
    </div>
    </>

  )
}

export default AppointmentDetails