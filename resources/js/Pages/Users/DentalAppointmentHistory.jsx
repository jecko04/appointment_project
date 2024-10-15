import { Table } from 'antd'
import React from 'react'

const DentalAppointmentHistory = () => {

    const columns = [
        {
          title: 'Fullname',
          dataIndex: 'user_id',
          key: 'userId',
        },
        {
          title: 'Branch',
          dataIndex: 'selectedBranch',
          key: 'branch',
        },
        {
          title: 'Service',
          dataIndex: 'selectServices',
          key: 'categories',
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
        },
        {
          title: 'Resched Time',
          dataIndex: 'reschedule_time',
          key: 'reschedule_time',
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
        },
        {
          title: 'Action',
          dataIndex: 'action',
          key: 'action',
        }
    ];

  return (
    <>
    <div className='m-5'>
    <Table
      id="table"
      name="table"
      columns={columns}       
      rowKey="id"
      size='small'
    />
    </div>
    </>
  )
}

export default DentalAppointmentHistory