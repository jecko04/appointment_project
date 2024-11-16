
import { usePage } from '@inertiajs/react';
import { Button, Card, Col, Divider, List, Row, Empty  } from 'antd';
import dayjs from 'dayjs';
import React from 'react'
import utc from 'dayjs/plugin/utc';


const DentalNotes = () => {

  const { notes, reschedule_reasons } = usePage().props;

  console.table(notes);
  dayjs.extend(utc);
  const formattedDate = dayjs.utc(notes.updated_at).format('MMM D, YYYY');
  const formattedDateResched = dayjs.utc(reschedule_reasons.updated_at).format('MMM D, YYYY');

  const approvedRescheduleReasons = reschedule_reasons.filter(
    (reason) => reason.appointment?.status === 'approved'
  );
  return (
    <>
    <div className='flex flex-col items-center h-[100vh] bg-white '>
      
    <div className="w-full p-[3rem]">
      <Row gutter={[16, 16]}>
        {notes && notes.length > 0 ? (
          notes.map((note) => (
            <Col span={8} key={note.id}>
              <Card 
                title='Added note!' 
                bordered={true} 
                className="w-[18rem] lg:w-[30rem] lg:max-w-[30rem] overflow-y-auto bg-yellow-300 "
                //style={{ backgroundColor: '#F6E05E', color: '#000' }}
              >
                <p className='w-[18rem] lg:w-[30rem] lg:max-w-[30rem]'>{note.notes}</p>
                <p className='pt-7 flex justify-end items-end'>Created At: {formattedDate}</p>
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
      <Row gutter={[16, 16]}>
        {approvedRescheduleReasons && approvedRescheduleReasons.length > 0 ? (
          approvedRescheduleReasons.map((item) => (
            <Col span={8} key={item.appointment_id}>
              <Card
                title="Reason for rescheduled"
                bordered={true}
                className="w-[18rem] lg:w-[30rem] overflow-y-auto bg-yellow-300 "
                //style={{ backgroundColor: '#FFFFFF', color: '#000' }}
              >
                <div className='w-[18rem] lg:w-[27rem] lg:max-w-[27rem]'>
                  <p>{item.reason}</p>
                  <div className='flex justify-between items-center pt-7'>
                    <p>Appointment ID: {item.appointment_id}</p>
                    <p className=''>Created At: {formattedDateResched}</p> 
                  </div>
                </div>
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