
import { usePage } from '@inertiajs/react';
import { Button, Card, Col, Divider, List, Row, Empty  } from 'antd';
import dayjs from 'dayjs';
import React from 'react'

const DentalNotes = () => {

  const { notes, reschedule_reasons } = usePage().props;

  const formattedDate = dayjs(notes.created_at).format('MMM D, YYYY h:mm A');
  const formattedDateResched = dayjs(reschedule_reasons.created_at).format('MMM D, YYYY h:mm A');

  const approvedRescheduleReasons = reschedule_reasons.filter(
    (reason) => reason.appointment?.status === 'approved'
  );
  return (
    <>
    <div className='flex flex-col items-center h-[100vh] bg-white '>
    <div className="flex flex-col lg:flex-wrap gap-3 w-full p-[3rem]">
      <span className=''>Patient Notes:</span>
      <Row gutter={[16, 16]}>
        {notes && notes.length > 0 ? (
          notes.map((note) => (
            <Col span={8} key={note.id}>
              <Card 
                title={formattedDate} 
                bordered={true} 
                className="w-[18rem] lg:w-[30rem]"
                style={{ backgroundColor: '#FFFFFF', color: '#000' }}
              >
                <p>{note.notes}</p>
              </Card>
            </Col>
          ))
        ) : (
          <Col span={24} className="flex justify-center">
            <Empty description="No patient notes available" />
          </Col>
        )}
      </Row>
    </div>

    <Divider />

    <div className="w-full p-[3rem]">
      <span className="">Reason for rescheduled:</span>
      <Row gutter={[16, 16]}>
        {approvedRescheduleReasons && approvedRescheduleReasons.length > 0 ? (
          approvedRescheduleReasons.map((item) => (
            <Col span={8} key={item.appointment_id}>
              <Card
                title={`Appointment ID: ${item.appointment_id}`}
                bordered={true}
                className="w-[18rem] lg:w-[30rem]"
                style={{ backgroundColor: '#FFFFFF', color: '#000' }}
              >
                <p>{item.reason}</p>
                <p>Date: {formattedDateResched}</p> 
              </Card>
            </Col>
          ))
        ) : (
          <Col span={24}>
            <Empty description="No rescheduled appointments" />
          </Col>
        )}
      </Row>
    </div>

    </div>

    </>
  )
}

export default DentalNotes