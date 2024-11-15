import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../Navbar/Navbar';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import Logo from '@/Components/Logo';
import { Head, Link, useForm, usePage} from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import { Steps, Select, DatePicker, TimePicker, Checkbox, QRCode, Modal, Button, Space, notification, Divider} from "antd";
import PrimaryButton from '@/Components/PrimaryButton';
import TertiaryButton from '@/Components/TertiaryButton';
import moment from 'moment';
import { CalendarOutlined, IdcardOutlined, MedicineBoxOutlined, SmileOutlined, CheckCircleOutlined, SyncOutlined, DownloadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { SyncLoader } from 'react-spinners';
import AppointmentDetails from '../Users/DentalAppointment';

const { Step } = Steps;
const { Option } = Select;

const Appointment = ({ auth, branches, categories, office_hours }) => {
  const { allAppointmentDate, patients } = usePage().props;
  const user= usePage().props.auth.user;

  
  const [processing, setProcessing] = useState(false);
  //const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isTermOpen, setTermOpen] = useState(false);
  const [qrCodeData, setQrCodeData] = useState(null);
  const [renderType, setRenderType] = useState('canvas');
  const [openLocation, setOpenLocation] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [qrValue, setQrValue] = useState('');
  const [showQRCode, setShowQRCode] = useState(false);
  const controllerRef = useRef(null);
  const AppointmentLimit = 5;

  const { data, setData, errors } = useForm({
    selectedBranch: null, 
    selectedBranchName: '',
    branchLocation: '',
    selectServices: null,
    selectedServices: '',
    appointment_date: null,
    appointment_time: null,
    userId: user.id,

    fullname: user.name || '',
    email: user.email || '',
    age: user.age || '',
    gender: user.gender || '',
    date_of_birth: user.date_of_birth || '',
    phone: user.phone || '',
    address: user.address || '',
    emergency_contact: user.emergency_contact || '',

    medical_condition: '',
    current_medication: '',
    allergies: '',
    past_surgeries: '',
    family_medical_history: '',
    blood_pressure: '',
    heart_disease: false,
    diabetes: false,
    smoker: false,

    //last_dental_visit: null,
    past_dental_treatments: '',
    tooth_sensitivity: '',
    frequent_tooth_pain: false,
    gum_disease_history: false,
    teeth_grinding: false,
    orthodontic_treatment: false,
    dental_implants: false,
    bleeding_gums: false,
  });

  useEffect(() => {
    if (patients && patients.length > 0) {
      const patient = patients[0]; // Assuming one patient in the array
      setData((prevData) => ({
        ...prevData,
        // Medical history fields
        medical_condition: patient.medical_history?.medical_condition || '',
        current_medication: patient.medical_history?.current_medication || '',
        allergies: patient.medical_history?.allergies || '',
        past_surgeries: patient.medical_history?.past_surgeries || '',
        family_medical_history: patient.medical_history?.family_medical_history || '',
        blood_pressure: patient.medical_history?.blood_pressure || '',
        heart_disease: patient.medical_history?.heart_disease || false,
        diabetes: patient.medical_history?.diabetes || false,
        smoker: patient.medical_history?.smoker || false,
  
        // Dental history fields
        past_dental_treatments: patient.dental_history?.past_dental_treatments || '',
        tooth_sensitivity: patient.dental_history?.tooth_sensitivity || 'None',
        frequent_tooth_pain: patient.dental_history?.frequent_tooth_pain === 1,
        gum_disease_history: patient.dental_history?.gum_disease_history === 1,
        teeth_grinding: patient.dental_history?.teeth_grinding === 1,
        orthodontic_treatment: patient.dental_history?.orthodontic_treatment === 1,
        dental_implants: patient.dental_history?.dental_implants === 1,
        bleeding_gums: patient.dental_history?.bleeding_gums === 1,
      }));
    }
  }, [patients]);


  const submit = async (e) => {
    e.preventDefault();

      if (controllerRef.current) {
        controllerRef.current.abort();
      }

      setProcessing(true);

      //await new Promise((resolve) => setTimeout(resolve, 3000));
      
      controllerRef.current = new AbortController();
      
      try
      {

        if (!data.fullname || !data.selectServices || !data.appointment_time || !data.appointment_date) {
          notification.error({
              message: 'Validation Error',
              description: 'Please fill out all required fields.',
              placement: 'bottomRight',
              duration: 3,
          });
          return;
        }

        const formattedData = {
            ...data,
            date: data.date ? moment(data.date).format('YYYY-MM-DD') : null,
            appointment_time: data.appointment_time,
            name: user.name,
        };

        const response = await fetch(route('guest.appointment.store'), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
          },
          body: JSON.stringify(formattedData),
          signal: controllerRef.current.signal,
        }); 

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        notification.success({
          message: 'Success',
          description: 'Dental appointment set successfully!',
          placement: 'bottomRight', 
        });
        window.location.href = route('appointment');
    }
      catch (error) {
        console.error("Error during appointment submission:", error.message);
        notification.error({
          message: 'Submission Error',
          description: error.message || 'An error occurred during the submission.',
          placement: 'bottomRight',
          duration: 3,
        });
      } finally {
        setProcessing(false);
      }
  }


  
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
  data.selectedBranchName, 
  data.selectedServices, 
  data.appointment_date, 
  data.appointment_time
]);

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
    if (!Array.isArray(office_hours) || !current) return false;

    const closedDays = office_hours
        .filter(officeHour => officeHour.Branch_ID === data.selectedBranch && officeHour.IsClosed === 1)
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

    if (closedDayNumbers.includes(current.day()) || current < dayjs().endOf('day')) {
      return true
    }

    const appointmentsOnDate = getAppointmentForDate(current);
    if (appointmentsOnDate >= AppointmentLimit) {
        return true;
    }

    return false;
};



  const showLocation = (value) => {
    const branchLocation = branches.find(branch => branch.Branch_ID === parseInt(value));
    setData((prevData) => ({
      ...prevData,
      branchLocation: branchLocation 
      ? `${branchLocation.BuildingNumber}, ${branchLocation.Street}, ${branchLocation.Barangay}, ${branchLocation.City}, ${branchLocation.Province}, ${branchLocation.PostalCode}`
      : '',
    }));
    setOpenLocation(!!branchLocation);
  }
  const offLocation = () => {
    setOpenLocation(false);
  }
  
 
  const showTermCondition = () => {
    setTermOpen(true);
  }
  const closeterm = () => {
    setTermOpen(false);
  }
  const cancelTerm = () => {
    setTermOpen(false);
  };

  const showModal = () => {
    if (isStepComplete()) {
      setModalOpen(true);
    }
  }
  const handleOk = () => {
    setModalOpen(false);
  }
  const handleCancel = () => {
    setModalOpen(false);
  };

  const currentDate = new Date().toLocaleDateString();

  function doDownload(url, fileName) {
    const a = document.createElement('a');
    a.download = fileName;
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
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
    const blob = new Blob([svgData], {
      type: 'image/svg+xml;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    doDownload(url, 'QRCode.png');
  };
  const [isChecked, setIsChecked] = useState({
    heart_disease: false,
    diabetes: false,
    smoker: false,
  });

  const handleBranchChange = (value) => {
    const selectBranchName = branches.find(branch => branch.Branch_ID === parseInt(value));
    const branchLocation = branches.find(branch => branch.Branch_ID === parseInt(value));
    setData((prevData) => ({
      ...prevData,
      selectedBranch: value, 
      selectedBranchName: selectBranchName ? selectBranchName.BranchName : '',
      branchLocation: branchLocation 
      ? `${branchLocation.BuildingNumber}, ${branchLocation.Street}, ${branchLocation.Barangay}, ${branchLocation.City}, ${branchLocation.Province}, ${branchLocation.PostalCode}`
      : '',
    }));
  };

  const handleServiceChange = (value) => {
    const selectServices = categories.find(category => category.Categories_ID === parseInt(value));
    setData((prevData) => ({
      ...prevData,
      selectServices: value,
      selectedServices: selectServices ? selectServices.Title : '',
    }));
  };

  
const handleQRCode = (value) => {
  try {
      const parseValue = JSON.parse(value);
      
      setData((prevData) => ({
          ...prevData,
          userId: parseValue.userId,
          branch_name: parseValue.selectedBranchName, 
          services: parseValue.selectedServices,
          appointment_date: parseValue.appointment_date,
          appointment_time: parseValue.appointment_time,
      }));

      message.success('QR Code data parsed successfully!');
  } catch (error) {
      console.error('Error parsing QR code value:', error);
      message.error('Failed to parse QR code data.'); 
  }
};

  const handleCheckboxChange = (checkbox, checked) => {
    setData((prevChecked) => ({
      ...prevChecked,
      [checkbox]: checked,
    }));
  };


  const nextStep = () => {
    if (isStepComplete() && currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
        console.log('Step is incomplete or already at the last step');
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const isStepComplete = () => {
    if (currentStep === 0) return data.selectedBranch && data.selectServices && data.appointment_date && data.appointment_time;
    if (currentStep === 1) return data.fullname && data.age && data.gender && data.phone && data.email && data.address && data.date_of_birth && data.emergency_contact;
    //if (currentStep === 3) return data.last_dental_visit;
    if (currentStep === 4) return data.termCondition;
    return true;
  };
  

  return (
    <>
      <div className='bg-gradient-to-t from-white to-[#FADC12]/30'>    
        <Head title="SMTC - Dental Care" />
        <div className="text-xs">
          <div className="items-center justify-center selection:text-blue-500">
            <div className="flex flex-col lg:w-full pt-2">
              <header>
                <Navbar auth={auth} />
              </header>
              <main className="mt-6 lg:mx-28">
                <div className="lg:flex justify-around lg:gap-4 lg:py-9">
                  <div className="hidden lg:block">
                  <Steps current={currentStep} direction="vertical" className="py-11">
                    <Step icon={<CalendarOutlined />} title="Appointment" />
                    <Step icon={<IdcardOutlined  />} title="Personal Info" />
                    <Step icon={<MedicineBoxOutlined  />} title="Medical History"  />
                    <Step icon={<SmileOutlined  />} title="Dental History" />
                    <Step icon={<CheckCircleOutlined  />} title="Confirm" />
                  </Steps>
                  </div>
                    <form onSubmit={submit} className="py-5 lg:py-10 flex flex-col items-start px-2 md:gap-2">
                      {currentStep === 0 && (
                        <>
                        
                        <div className="flex flex-col md:flex md:flex-row p-3 lg:p-5 md:gap-10 lg:gap-20 2xl:gap-32 lg:shadow-md rounded-lg bg-white">
                        
                          <div className="flex flex-col gap-3 items-start">
                          <div className="flex gap-2 text-base md:text-lg">
                          <span>Welcome to</span>
                          <span className="text-[#ff4200]">SMTC</span>
                          <span className="text-[#2938DA]">Dental Care</span>
                          <span>!</span>
                        </div>
                          <span className="text-sm">Choose branch and dental service here.</span>
                          <div className="flex flex-col md:gap-3 md:py-6">

                          <InputLabel htmlFor="branches" value="Select Branch"/>
                          <Select
                            id="branches"
                            name="branches"
                            className="w-[17.5rem] md:w-80"
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

                          <div className={`${data.branchLocation ? '' : 'hidden'}`  }>
                          <InputLabel htmlFor="branch_location" value="Branch Location"/>
                          <TextInput
                          id="branch_location"
                          name="branch_location"
                          className="max-w-[17.5] w-full md:w-80"
                          value={data.branchLocation ? data.branchLocation : ''}
                          readOnly
                          />
                          </div>

                          <InputLabel htmlFor="services" value="Select a Dental Service"/>
                          <Select
                            id="services"
                            name="services"
                            className="w-[17.5rem] md:w-80"
                            size="large"
                            placeholder="Select a service"
                            onChange={handleServiceChange}
                            value={data.selectServices || null}
                            disabled={!data.selectedBranch}
                            required
                          >
                            {categories
                              .filter(category => category.Branch_ID === data.selectedBranch) 
                              .map((category) => (
                                <Option key={category.Categories_ID} value={category.Categories_ID}>
                                  {category.Title}
                                </Option>
                              ))}
                          </Select>
                          {data.selectedBranch && categories.filter(category => category.Branch_ID === data.selectedBranch).length === 0 && (
                            <div className="text-red-500">No services available for the selected branch.</div>
                          )}
                          {errors.category && <div className="text-red-500">{errors.category}</div>}
                          </div>

                          </div>

                          <div className="flex flex-col gap-3">
                            <span className="text-sm mt-10">When would you like to come in?</span>
                            <div className="rounded-md shadow-xl py-4 px-4 flex flex-col gap-3 bg-white ">
                              <div className="flex flex-col divide-y divide-black">
                              <span className="font-black text-sm py-2">Schedule</span>
                              <span className="font-light text-xs py-2 text-gray-500">Choose Date and Time of your appointment</span>
                              </div>
                              
                              <InputLabel htmlFor="appointment_date" value="Select Your Available Day (Closed on Sundays)" />

                              <DatePicker
                                  id="appointment_date"
                                  name="appointment_date" 
                                  disabledDate={disableDate}
                                  value={data.appointment_date ? moment(data.appointment_date): null}
                                  className="block w-60 md:w-80"
                                  size='large'
                                  onChange={(date) => setData('appointment_date', date ? date.format("YYYY-MM-DD"): null)}
                                  required
                              >

                              </DatePicker>
                              <InputError message={errors.appointment_date} className="mt-2" /> 

                              <InputLabel htmlFor="appointment_time" value="Your Available Time (Open in: 9:00 am - 5:00 pm)" />

                              <TimePicker
                              id="appointment_time"
                              name="appointment_time"
                              value={data.appointment_time ? moment(data.appointment_time, 'h:mm') : null}
                              className="block w-60 md:w-80"
                              size='large'
                              format='h:mm a' 
                              onChange={(time) => setData('appointment_time', time ? time.format("HH:mm") : null)} 
                              required
                            />

                              <InputError message={errors.appointment_time} className="mt-2" />
                          </div>
                          </div>
                        
                        </div>
                        </>
                      )}

                      {currentStep === 1 && (
                        <div className="flex flex-col md:p-5 gap-3 p-3 w-full md:shadow- max-w-[50rem] rounded-lg bg-white ">
                          <div className="flex gap-2 text-base md:text-lg">
                            <span>Welcome to</span>
                            <span className="text-[#ff4200]">SMTC</span>
                            <span className="text-[#2938DA]">Dental Care</span>
                            <span>!</span>
                          </div>
                          
                          <span className="font-black text-sm">Patient Info (Required)</span>

                          <div className="flex flex-col md:flex-row justify-around gap-x-20">
                            <div className="flex flex-col">
                              <InputLabel htmlFor="fullname" value="Fullname" />
                              <TextInput
                                id="fullname"
                                name="fullname"
                                value={data.fullname}
                                className="block w-70 md:w-80 text-sm"
                                autoComplete="fullname"
                                onChange={(e) => setData('fullname', e.target.value)}
                                required
                              />
                              <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div className="flex flex-col">
                              <InputLabel htmlFor="age" value="Age" />
                              <TextInput
                                id="age"
                                name="age"
                                value={data.age}
                                className="block  w-70 md:w-80 text-sm"
                                autoComplete="age"
                                onChange={(e) => setData('age', e.target.value)}
                                required
                              />
                              <InputError message={errors.age} className="mt-2" />
                            </div>
                          </div>

                          <div className="flex flex-col md:flex-row justify-around gap-x-20">
                            <div className="flex flex-col">
                              <InputLabel htmlFor="gender" value="Gender" />
                              <Select
                                id="gender"
                                name="gender"
                                value={data.gender}
                                className="block w-70 md:w-80 text-sm"
                                autoComplete="gender"
                                size="large"
                                onChange={(value) => setData('gender', value)}
                                required
                              >
                                <Option value="male">Male</Option>
                                <Option value="female">Female</Option>
                                <Option value="other">Other</Option>
                              </Select>
                              <InputError message={errors.gender} className="mt-2" />
                            </div>


                            <div className="flex flex-col">
                            <InputLabel htmlFor="date_of_birth" value="Date of Birth" />
                            <DatePicker
                                id="date_of_birth"
                                name="date_of_birth"
                                type="date"
                                className="block w-70 md:w-80"
                                size='large'
                                value={data.date_of_birth ? moment(data.date_of_birth) : null} 
                                onChange={(date) => setData('date_of_birth', date ? date.format("YYYY-MM-DD"): null)}
                                required
                                autoComplete="date_of_birth"
                            />

                            <InputError className="mt-2" message={errors.date_of_birth} />
                            </div>

                          </div>

                        

                        

                          <div className="flex flex-col md:flex-row justify-around gap-x-20">
                          <div className="flex flex-col gap-3">

                          <div className="flex flex-col">
                              <InputLabel htmlFor="phone" value="Phone" />
                              <TextInput
                                id="phone"
                                name="phone"
                                value={data.phone}
                                className="block w-70 md:w-80 text-sm"
                                autoComplete="phone"
                                onChange={(e) => setData('phone', e.target.value)}
                                required
                              />
                              <InputError message={errors.phone} className="mt-2" />
                            </div>

                            <div>

                                <InputLabel htmlFor="address" value="Address" />
                                <TextInput
                                  id="address"
                                  name="address"
                                  value={data.address}
                                  className="block w-[17.5rem] md:w-80 text-sm"
                                  autoComplete="address"
                                  onChange={(e) => setData('address', e.target.value)}
                                  required
                                />
                                <InputError message={errors.address} className="mt-2" />
                                </div>
                          </div>


                          <div className="flex flex-col gap-x-20">

                          <div className="flex flex-col">
                              <InputLabel htmlFor="email" value="Email" />
                              <TextInput
                                id="email"
                                name="email"
                                value={data.email}
                                className="block w-70 md:w-80 text-sm"
                                autoComplete="email"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                              />
                              <InputError message={errors.email} className="mt-2" />
                            </div>

                            <div className="flex flex-col">
                              <InputLabel htmlFor="emergency_contact" value="Emergency Contact" />
                              <TextInput
                                id="emergency_contact"
                                name="emergency_contact"
                                value={data.emergency_contact}
                                className="block w-70 md:w-80 text-sm"
                                autoComplete="emergency_contact"
                                onChange={(e) => setData('emergency_contact', e.target.value)}
                                required
                              />
                              <InputError message={errors.emergency_contact} className="mt-2" />
                            </div>
                          </div>

                          </div>
                        </div>
                      )}

                        {patients &&  currentStep === 2 && (
                          <>
                          <div>
                            <div className="flex flex-col md:p-5 gap-3 p-3 w-full max-w-[50rem] md:shadow-md rounded-lg bg-white ">
                          
                          <div className="flex gap-2 text-base md:text-lg">
                            <span>Welcome to</span>
                            <span className="text-[#ff4200]">SMTC</span>
                            <span className="text-[#2938DA]">Dental Care</span>
                            <span>!</span>
                          </div>
                          <span className="font-black text-sm">General Medical Information</span>
                          <div className="flex flex-col md:flex-row md:gap-x-[4.9rem] justify-evenly">
                            <div className="flex flex-col gap-3">
                            <InputLabel htmlFor="medical_condition" value="Medical Condition (if there's any)" />
                            <TextInput
                                id="medical_condition"
                                name="medical_condition"
                                value={data.medical_condition}
                                className="mt-1 block w-[17.5rem] md:w-80 text-sm"
                                onChange={(e) => setData('medical_condition', e.target.value)}
                                required
                            />
                            <InputError message={errors.medical_condition} className="mt-2" />
  
                            <InputLabel htmlFor="current_medication" value="Current Medication (if there's any)" />
                            <TextInput
                                id="current_medication"
                                name="current_medication"
                                value={data.current_medication}
                                className="mt-1 block  w-[17.5rem] md:w-80 text-sm"
                                onChange={(e) => setData('current_medication', e.target.value)}
                                required
                            />
                            <InputError message={errors.current_medication} className="mt-2" />
  
                            <InputLabel htmlFor="allergies" value="Allergies (if there's any)" />
                            <TextInput
                                id="allergies"
                                name="allergies"
                                value={data.allergies}
                                className="mt-1 block w-[17.5rem] md:w-80 text-sm"
                                onChange={(e) => setData('allergies', e.target.value)}
                                required
                            />
                            <InputError message={errors.allergies} className="mt-2" />
  
                            <InputLabel htmlFor="past_surgeries" value="Past Surgeries (if there's any)" />
                            <TextInput
                                id="past_surgeries"
                                name="past_surgeries"
                                value={data.past_surgeries}
                                className="mt-1 block w-[17.5rem] md:w-80 text-sm"
                                onChange={(e) => setData('past_surgeries', e.target.value)}
                                required
                            />
                            <InputError message={errors.past_surgeries} className="mt-2" />
                        </div>
  
                        <div className="flex flex-col gap-3">
                            <InputLabel htmlFor="family_medical_history" value="Family medical history (if there's any)" />
                            <TextInput
                                id="family_medical_history"
                                name="family_medical_history"
                                value={data.family_medical_history}
                                className="mt-1 block w-[17.5rem] md:w-80 text-sm"
                                onChange={(e) => setData('family_medical_history', e.target.value)}
                                required
                            />
                            <InputError message={errors.family_medical_history} className="mt-2" />
  
                            <InputLabel htmlFor="blood_pressure" value="Blood pressure" />
                            <TextInput
                                id="blood_pressure"
                                name="blood_pressure"
                                value={data.blood_pressure}
                                className="mt-1 block w-[17.5rem] md:w-80 text-sm"
                                onChange={(e) => setData('blood_pressure', e.target.value)}
                                required
                            />
                            <InputError message={errors.blood_pressure} className="mt-2" />
  
                            <Checkbox
                              id="heart_disease"
                              name="heart_disease"
                              checked={data.heart_disease}
                              onChange={(e) => handleCheckboxChange('heart_disease', e.target.checked)}
                            >
                              Heart Disease
                            </Checkbox>
                            <Checkbox
                              id="diabetes"
                              name="diabetes"
                              checked={data.diabetes}
                              onChange={(e) => handleCheckboxChange('diabetes', e.target.checked)}
                            >
                              Diabetes
                            </Checkbox>
                            <Checkbox
                              id="smoker"
                              name="smoker"
                              checked={data.smoker}
                              onChange={(e) => handleCheckboxChange('smoker', e.target.checked)}
                            >
                              Smoker
                            </Checkbox>
                            </div>
                          </div>
                          </div>
                            
                          </div>
                          </>
                        )}
  
                        
                        {patients &&  currentStep === 3 && (
                          <>
                          <div>
                            <div className="flex flex-col md:p-5 p-3 gap-5 md:shadow-md rounded-lg max-w-[50rem]  bg-white ">
                          
                          <div className="flex gap-2 text-base md:text-lg">
                            <span>Welcome to</span>
                            <span className="text-[#ff4200]">SMTC</span>
                            <span className="text-[#2938DA]">Dental Care</span>
                            <span>!</span>
                          </div>
                          <span className="font-black text-sm">Dental Information</span>
                          <div className="flex flex-col justify-between">
                            <div className="flex flex-col gap-3">
                              {/* <div>
                            <InputLabel htmlFor="last_dental_visit" value="Select your last dental visit date" />
                            <span className="text-sm text-[#FF4200]">If this is your first time, kindly choose your appointment date you previously selected at the first step.</span>
                              <DatePicker
                                  id="last_dental_visit"
                                  type="date"
                                  name="last_dental_visit"
                                  className="block w-full"
                                  needConfirm
                                  autoFocus={true}
                                  size='large'
                                  value={data.last_dental_visit ? moment(data.last_dental_visit) : null} 
                                  onChange={(date) => setData('last_dental_visit', date ? date.format("YYYY-MM-DD"): null)}
                                  required
                              />
  
                              <InputError className="mt-2" message={errors.last_dental_visit} />
                              </div> */}
  
                              <div>
  
                            <InputLabel htmlFor="past_dental_treatments" value="Last dental treatment (If there's any)" />
  
                            <TextInput
                                id="past_dental_treatments"
                                name="past_dental_treatments"
                                value={data.past_dental_treatments}
                                className="mt-1 block w-full text-sm"
                                onChange={(e) => setData('past_dental_treatments', e.target.value)}
                                required
                            />
  
                            <InputError message={errors.past_dental_treatments} className="mt-2" />
                            </div>
  
                            <div>
                            <InputLabel htmlFor="tooth_sensitivity" value="Tooth sensitivity" />
                            <Select
                                  id="tooth_sensitivity"
                                  name="tooth_sensitivity"
                                  value={data.tooth_sensitivity}
                                  className="block w-full text-sm"
                                  autoComplete="tooth_sensitivity"
                                  size="large"
                                  onChange={(value) => setData('tooth_sensitivity', value)}
                                  required
                                >
                                  <Option value="None">None</Option>
                                  <Option value="Hot">Hot</Option>
                                  <Option value="Cold">Cold</Option>
                                  <Option value="Sweet">Sweet</Option>
                                </Select>
                                </div>
                            </div>
  
                            <div className="flex flex-col gap-5">
                            <InputLabel htmlFor="frequent_tooth_pain" value="If there's any, Please check the checkbox below." className='mt-5'/>
                            <div className="flex flex-wrap gap-3">
                              {[
                                { id: "frequent_tooth_pain", label: "Frequent Tooth Pain" },
                                { id: "gum_disease_history", label: "Gum Disease History" },
                                { id: "teeth_grinding", label: "Teeth Grinding" },
                                { id: "orthodontic_treatment", label: "Orthodontic Treatment" },
                                { id: "dental_implants", label: "Dental Implants" },
                                { id: "bleeding_gums", label: "Bleeding Gums" }
                              ].map((item) => (
                                <Checkbox
                                  key={item.id}
                                  id={item.id}
                                  name={item.id}
                                  checked={data[item.id]}
                                  onChange={(e) => handleCheckboxChange(item.id, e.target.checked)}
                                >
                                  {item.label}
                                </Checkbox>
                              ))}
                            </div>
                            </div>
                          </div>
                          </div>
                            
                          </div>
                          </>
                        )}

                      
                      {currentStep === 4 && (
                        <>
                        <div>
                        <div className="flex flex-col md:p-5 p-3 gap-5 md:shadow-md rounded-lg bg-white">
                        
                        <div className="flex gap-2 text-base md:text-lg">
                          <span>Welcome to</span>
                          <span className="text-[#ff4200]">SMTC</span>
                          <span className="text-[#2938DA]">Dental Care</span>
                          <span>!</span>
                        </div>
                        <span className="font-black text-sm">Review Info</span>

                          <div className="flex flex-col gap-6 justify-between px-3 py-4">

                          <InputLabel value="Appointment Details"/>
                          <div className="flex flex-col md:flex-row gap-5 md:gap-x-16 rounded-lg md:shadow-md md:py-4 md:px-4 md:justify-around bg-white ">
                          
                            <div className="flex flex-col gap-2">
                            <span className="font-black text-sm">Selected Branches: 
                              <span className="font-normal"> {data.selectedBranchName ? data.selectedBranchName : ''} 
                                </span>  </span>
                            <span className="font-black text-sm">Selected Services: 
                              <span className="font-normal"> {data.selectedServices ? data.selectedServices : ''}
                                </span>  </span>
                            <span className="font-black text-sm text-wrap w-60 md:w-full">Branch Location: 
                              <span className="font-normal"> {data.branchLocation ? data.branchLocation : ''} 
                                </span>  </span>
                            </div>

                            <div className="flex flex-col gap-2">
                            <span className="font-black text-sm">Appointment Date: 
                              <span className="font-normal"> {data.appointment_date ? data.appointment_date : ''} 
                                </span>  </span>
                            <span className="font-black text-sm">Appointment Time: 
                              <span className="font-normal"> {data.appointment_time ? moment(data.appointment_time, 'HH:mm').format('hh:mm A') : ''}
                                </span>  </span>
                            </div>
                            </div>

                          <InputLabel value="Personal Info"/>

                            <div className="flex flex-col md:flex-row gap-5 md:gap-0 rounded-lg md:shadow-md md:py-4 md:px-4 bg-white ">
                            <div className="flex flex-col gap-2">

                            <span className="font-black text-sm">Fullname: 
                              <span className="font-normal"> {data.fullname ? data.fullname : ''}
                                </span></span>
                            <span className="font-black text-sm">Age: 
                              <span className="font-normal"> {data.age ? data.age : ''} 
                                </span> </span>
                            <span className="font-black text-sm">Gender: 
                              <span className="font-normal"> {data.gender ? data.gender : ''} 
                                </span> </span>
                            <span className="font-black text-sm">Date of Birth: 
                              <span className="font-normal"> {data.date_of_birth ? data.date_of_birth : ''} 
                                </span> </span>

                            <span className="font-black text-sm">Email: 
                              <span className="font-normal"> {data.email ? data.email : ''} 
                                </span></span>
                            <span className="font-black text-sm">Phone #:
                              <span className="font-normal"> {data.phone ? data.phone : ''} 
                                </span> </span>
                            <span className="font-black text-sm">Address: 
                              <span className="font-normal"> {data.address ? data.address : ''} 
                                </span>  </span>
                            <span className="font-black text-sm">Emergency Contact: 
                              <span className="font-normal"> {data.emergency_contact ? data.emergency_contact : ''} 
                                </span>  </span>
                                
                                </div>
                                
                            </div>
                            <div className='flex items-center justify-start'>
                                  <Checkbox
                                    id="termCondition"
                                    name="termCondition"
                                    autoFocus
                                    checked={data.termCondition}
                                    onChange={(e) => handleCheckboxChange('termCondition', e.target.checked)}
                                  >
                                    <span onClick={showTermCondition} className='underline underline-offset-2'>
                                      Terms & Conditions 
                                    </span>
                                  </Checkbox>
                                </div>


                          </div>
                          </div>
                        </div>
                        </>
                      )}
                      

                      <div className="flex gap-3 w-full mt-4">
                        {currentStep > 0 && (
                          <TertiaryButton onClick={previousStep}  disabled={currentStep === 0}>
                            Previous
                          </TertiaryButton>
                        )}

                        {currentStep < 4 ? (
                          <TertiaryButton onClick={nextStep} disabled={!isStepComplete()}>
                            Next
                          </TertiaryButton>
                        ) : (
                          <>
                            <PrimaryButton
                              className="flex justify-center"
                              disabled={!isStepComplete() || processing}
                              onClick={submit}
                            >
                              {processing ? <SyncOutlined spin /> : 'Submit'}
                            </PrimaryButton>
                          </>
                        )}

                              <Modal
                                title="SMTC-Dental Care : Appointment QRCode"
                                open={isModalOpen}                     
                                onOk={handleOk}
                                onCancel={handleCancel}
                                className="flex flex-col justify-around w-full"
                                footer={[
                                    <Button key="okay" onClick={handleOk} color="primary" variant="solid" href="/dashboard">
                                    Okay
                                    </Button>
                                ]}
                                >
                                  <Space id="myqrcode" direction="vertical">
                                  <div className="flex flex-col md:flex-row items-center gap-4">
                                    <div className="flex flex-col items-center px-7">

                                    <span className="font-medium text-sm">Fullname: 
                                      <span className="font-normal"> {data.fullname ? data.fullname : ''}
                                        </span></span>
                                              <QRCode
                                              id="qr_code"
                                              name="qr_code"
                                              type={renderType}
                                              icon='/images/image.png'
                                              iconSize={30}
                                              size={200}
                                              status="active"
                                              value={JSON.stringify({ 
                                                userId: data.userId || '', 
                                                selectedBranchName: data.selectedBranchName || '', 
                                                selectedServices: data.selectedServices || '', 
                                                appointment_date: data.appointment_date || '', 
                                                appointment_time: data.appointment_time || ''
                                              })}
                                              onChange={handleQRCode}
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

                                <Modal
                                title="SMTC-Dental Care : Term & Condition"
                                open={isTermOpen}                     
                                onOk={closeterm}
                                onCancel={cancelTerm}
                                width={800}
                                style={{ top: 20 }}
                                className="flex flex-col justify-around w-full"
                                footer={[
                                    <Button key="okay" onClick={closeterm} color="primary" variant="solid">
                                    Okay
                                    </Button>
                                ]}
                                >
                                  <Space id="termCondition" direction="vertical">
                                  <div className="flex flex-col md:flex-col items-center gap-2">
                                    <div className="flex flex-col items-center px-7">
                                      </div>
                                    <Logo/>

                                    <Divider/>

                                    <span>
                                      <span className='font-semibold'>

                                    Terms & Conditions

                                    Last Updated: {currentDate} 

                                    </span>

                                    
                                    <br />
                                    <br />

                                    Welcome to ORAL (Online Reservation Appointment for Local Dental Services). By using our services, you agree to comply with and be bound by the following terms and conditions. Please review the following carefully before using our website, desktop, or mobile application.
                                    </span>

                                    <span>
                                    1. Acceptance of Terms
    By accessing and using ORAL’s appointment system, you agree to these Terms & Conditions. If you do not agree, you may not use this service.

    <br />
    <br />

    2. User Responsibilities
    Users must:

    Provide accurate and up-to-date information when scheduling appointments.
    Confirm and follow their scheduled appointment times.
    Cancel or reschedule appointments at least 24 hours in advance if they are unable to attend.
    Respect the clinic’s policies regarding appointment availability, cancellations, and rescheduling.

    <br />
    <br />

    3. Patient Eligibility
    Patients using the system must:

    Be at least 18 years of age or have consent from a guardian.
    Use the system for legitimate medical or dental appointments only.
    Agree to provide valid and current contact information for appointment reminders and notifications.

    <br />
    <br />

    4. Dental Clinic Responsibilities
    Dental service providers agree to:

    Ensure that the services listed in the system are up-to-date and accurately described.
    Confirm appointments within a reasonable timeframe.
    Notify patients in a timely manner in case of any changes to appointment schedules.
    Maintain confidentiality and comply with applicable laws related to patient data and medical records.

    <br />
    <br />

    5. Appointment Cancellations and No-Shows
    Patients must adhere to the cancellation policy of the dental service provider, which may include:

    Cancellation at least 24 hours before the scheduled appointment.
    Repeated cancellations or no-shows may result in restrictions on future appointment bookings.

    <br />
    <br />

    6. Fees and Payment
    All payments for dental services will be handled directly between the patient and the clinic. ORAL is not responsible for handling payments.
    Patients are expected to pay for services based on the clinic’s billing policies, and any disputes related to fees should be resolved directly with the clinic.

    <br />
    <br />

    7. Modification of Services
    ORAL reserves the right to modify, suspend, or discontinue any part of the service at any time without notice.

    <br />
    <br />

    8. Limitation of Liability
    ORAL is a platform that facilitates the scheduling of dental appointments. We are not liable for:

    The quality of dental services provided by the clinics.
    Any disputes or issues arising between patients and dental service providers.
    Any missed appointments due to incorrect patient information or unforeseen circumstances.

    <br />
    <br />

    9. Data Privacy
    Your privacy is important to us. All patient data collected by ORAL is handled in accordance with our Privacy Policy. By using the system, you consent to the collection and use of your data as outlined.

    <br />
    <br />

    10. Changes to the Terms
    ORAL may update these Terms & Conditions from time to time. Changes will be communicated to users through the app or website. Continued use of the system after such changes are made constitutes acceptance of the new Terms & Conditions.

    <br />
    <br />

    11. Governing Law
    These Terms & Conditions are governed by and construed in accordance with the laws of Philippines. Any disputes arising out of or relating to the use of the service will be handled under the jurisdiction of Philippines courts.

    <br />
    <br />

    12. Contact Information
    For any questions or concerns about these Terms & Conditions, please contact us at

    <br />

    <span className='font-semibold'>

    Ynares, DMJ Bldg, A. Mabini St, Rodriguez, Rizal

    <br />

    0933 821 2439

    <br />

    P4JR+4J4, L.M.Santos St, Rosario, Rodriguez, 1860 Rizal

    <br />

    0933 821 2439.
    </span>

                                    </span>

                                    <Divider/>

                                    <span className='font-semibold'>
                                    By booking an appointment through ORAL, you acknowledge that you have read, understood, and agree to these Terms & Conditions.
                                    </span>

                                  </div>
                                </Space>
                                </Modal>
                      </div>
                    </form>
                </div>
              </main>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Appointment;
