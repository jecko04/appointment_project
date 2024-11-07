import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import { useForm, usePage } from '@inertiajs/react'
import { DatePicker, notification, TimePicker } from 'antd'
import dayjs from 'dayjs'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import BarLoader from 'react-spinners/BarLoader';

const DentalAppointmentReschedule = () => {
  const { appointmentDetails, allAppointmentDate, branches, categories, user, office_hours} = usePage().props;

  const {data, setData, errors }= useForm({

    selectedBranch: null,
    selectServices: null,
    reschedule_date: null,
    reschedule_time: null,
    status: '',
  })

  const [processing, setProcessing] = useState();
  const [currentAppointment, setCurrentAppointment] = useState({
    fullname: '',
    branch: '',
    services: '',
  });

  const handleValue = (e) => {
    setCurrentAppointment({
      ...currentAppointment,
      [e.target.name]: e.target.value,
    });
  }

  useEffect(() => {
    if (appointmentDetails) {
      setData({
      ...data,
        selectedBranch: appointmentDetails[0]?.selectedBranch,
        selectServices: appointmentDetails[0]?.selectServices,
      })
    }
  }, []);

  useEffect(() => {
    if (appointmentDetails && appointmentDetails.length > 0) {
      setCurrentAppointment({
        fullname: user
        ?.filter(u => u.id ===  appointmentDetails[0]?.user_id)
        .map(u => u.name)[0] || '',
        branch: branches
        ?.filter(b => b.Branch_ID === appointmentDetails[0]?.selectedBranch)
        .map(b => b.BranchName)[0] || '',
        services: categories
        ?.filter(c => c.Categories_ID === appointmentDetails[0]?.selectServices)
        .map(c => c.Title)[0] || '',
      })
    }
  }, [appointmentDetails]);

  const submit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    
    try {
        const formattedData = {
            ...data,
            reschedule_date: moment(data.reschedule_date).format('YYYY-MM-DD'),
            reschedule_time: data.reschedule_time,
            status: 'pending',
        };

        const response = await fetch(route('appointment.reschedule', formattedData), {
          method: 'POST',
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
            description: 'Updated successfully, waiting for approval.',
            placement: 'bottomRight',
          });
          window.location.href = route('appointment');
        } else {
          notification.error({
            message: 'Error',
            description: 'There was an error updating your appointment.',
            placement: 'bottomRight',
          });
        }
                
                
    } catch (error) {
        console.error("Error during appointment submission:", error);
    } finally {
        setProcessing(false);
    }
};   

  // const [sameAppointmentCount, setSameAppointmentCount] = useState(0); 
  // useEffect(() => {
  //   const count = [];
  //   if (allAppointmentDate && allAppointmentDate.length > 0) {
  //     allAppointmentDate.forEach(appointment => {
  //         count.push(appointment.appointment_date); 
  //     });

  //     setSameAppointmentCount(count.length); 
  // }
  // console.log(count);
  // }, [allAppointmentDate]);

  const getAppointmentForDate = (date) => {
      const appointments = allAppointmentDate.filter(appointment => {
        if (appointment.reschedule_date && dayjs(appointment.reschedule_date).isSame(date, 'day')) {
          return true;
        }

        return !appointment.reschedule_date && dayjs(appointment.appointment_date).isSame(date, 'day');
      });
      
        return appointments.length;
  }

const disableDate = (current) => {
  const AppointmentLimit = 5;

  if (!Array.isArray(office_hours) || !current) return false;

  let closedDays = [];

  if (appointmentDetails && appointmentDetails.length > 0) {
    closedDays = office_hours
      .filter(officeHour => officeHour.Branch_ID === data.selectedBranch && officeHour.IsClosed === 1)
      .map(officeHour => officeHour.DayOfWeek);
  }

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
  }).filter(day => day !== -1); 

  if (closedDayNumbers.includes(current.day()) || current < dayjs().endOf('day')) {
    return true
  }

  const appointmentsOnDate = getAppointmentForDate(current);
  
  if (appointmentsOnDate >= AppointmentLimit) {
      return true;
  }

  return false;
};

  return (
    <>
    {processing ? (
      <div className='mt-5 flex w-full' style={{ position: "absolute", top: "50%", left: "50%", x:"-50%", y: "-50%" }}>
            <BarLoader color="#FF4200" />
      </div>
    ) : (
      <>
      <div className='flex flex-col md:flex-row items-end md:py-[2rem] md:px-[2rem]'>
        <div className='md:px-4 py-4 md:py-0 flex flex-col gap-3 justify-center '>
        <span className='italic'><b>Note:</b> If you reschedule, approval will be required again before the new appointment is confirmed. Only one appointment per service is allowed. If you wish to change the service or appointment details, a new appointment must be made.</span>
          <div className='flex flex-col'>
          <InputLabel htmlFor="fullname" value="Fullname" />
            <TextInput 
            id="fullname"
            name="fullname"
            value={currentAppointment.fullname}
            className="block w-[17.5rem] md:w-80 text-sm"
            onChange={handleValue}
            required
            disabled
            />
          </div>

          <div className='flex flex-col'>
            <InputLabel htmlFor="branch" value="Branch" />
            <TextInput 
              id="branch"
              name="branch"
              value={currentAppointment.branch} 
              className="block w-[17.5rem] md:w-80 text-sm"
              onChange={handleValue}
              required
              disabled

            />
          </div>

          <div className='flex flex-col'>
            <InputLabel htmlFor="services" value="Services" />
            <TextInput 
              id="services"
              name="services"
              value={currentAppointment.services} 
              className="block w-[17.5rem] md:w-80 text-sm"
              onChange={handleValue}
              required
              disabled
            />
          </div>
        </div>

      <form onSubmit={submit} className=''>
              <div className="flex flex-col gap-3  px-[1rem] py-[1rem] md:py-0 md:px-0 mb-5 md:mb-0 bg-white rounded-md">
                      <div className="rounded-md shadow-xl py-4 px-4 flex flex-col gap-3 ">
                          <div className="flex flex-col divide-y divide-black">
                          <span className="font-black text-sm py-2">Reschedule :
                          <span className="text-sm font-normal px-2">When would you like to come in?</span></span>
                          <span className="font-light text-xs py-2 text-gray-500">Choose Date and Time of your appointment</span>
                          </div>

                        <div className='flex flex-col md:px-0 md:flex-row justify-around'>
                          <div className='flex flex-col'>
                          <InputLabel htmlFor="reschedule_date" value="Select new Date" />

                          <DatePicker
                              id={'reschedule_date'} 
                              name={'reschedule_date'}
                              disabledDate={disableDate}
                              value={data.reschedule_date ? moment(data.reschedule_date): null}
                              className="block w-60 md:w-80"
                              size='large'
                              onChange={(date) => setData('reschedule_date', date ? date.format("YYYY-MM-DD"): null)}
                              required
                          >

                          </DatePicker>
                          <InputError message={errors.reschedule_date} className="mt-2" /> 
                          </div>
                          <div className='flex flex-col'>
                          <InputLabel htmlFor="reschedule_time" value="Select new Time" />

                          <TimePicker 
                            id="reschedule_time"
                            name="reschedule_time"
                            use12Hours={true}
                            value={data.reschedule_time ? moment(data.reschedule_time, 'HH:mm') : null}
                            className="block w-60 md:w-80"
                            size="large"
                            format="h:mm a"
                            onChange={(time) => setData('reschedule_time', time ? time.format("HH:mm") : null)}
                            required
                          />
                          <InputError message={errors.reschedule_time} className="mt-2" />
                          </div>
                        </div>
                      <PrimaryButton className="max-w-24 flex justify-center " key="submit" disabled={processing}>
                        Reschedule
                      </PrimaryButton>
                    </div>
                </div>

      </form>
      </div>

      </>
    )}
      
    </>
  )
}

export default DentalAppointmentReschedule