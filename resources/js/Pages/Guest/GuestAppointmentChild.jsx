import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import Logo from '@/Components/Logo';
import { Head, useForm, usePage} from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import { Steps, Select, DatePicker, TimePicker, Checkbox, QRCode, Modal, Button, Segmented, Space, notification} from "antd";
import { DownloadOutlined } from '@ant-design/icons';
import PrimaryButton from '@/Components/PrimaryButton';
import TertiaryButton from '@/Components/TertiaryButton';
import moment from 'moment';
import { CalendarOutlined, IdcardOutlined, MedicineBoxOutlined, SmileOutlined,CheckCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Step } = Steps;
const { Option } = Select;

const Appointment = ({ auth, branches, categories, office_hours }) => {
  const user= usePage().props.auth.user;

  const { data, setData, post, errors } = useForm({
    selectedBranch: null, 
    selectedBranchName: '',
    branchLocation: '',
    selectServices: null,
    selectedServices: '',
    appointment_date: null,
    appointment_time: null,
    userId: user.id,

    fullname: '',
    email: '',
    age: '',
    gender: '',
    date_of_birth: '',
    phone: '',
    address: '',
    emergency_contact: '',

    medical_condition: '',
    current_medication: '',
    allergies: '',
    past_surgeries: '',
    family_medical_history: '',
    blood_pressure: '',
    heart_disease: false,
    diabetes: false,
    smoker: false,

    last_dental_visit: null,
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
    data.appointment_time,
  ]);

  const [processing, setProcessing] = useState();
  const [isModalOpen, setModalOpen] = useState(false);
  const [qrCodeData, setQrCodeData] = useState(null);
  const [renderType, setRenderType] = useState('canvas');
  const [openLocation, setOpenLocation] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

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
    return closedDayNumbers.includes(current.day()) || current < dayjs().endOf('day');
};

  const submit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    try {
      const formattedData = {
          ...data,
          date: data.date ? moment(data.date).format('YYYY-MM-DD') : null,
          appointment_time: data.appointment_time,
          name: user.name,
      };

      await post(route('guest.appointment.store', data), formattedData,{
        onSuccess: () => {
          notification.success({
            message: 'Success',
            description: 'Appointment created successfully!',
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
  
 

  const showModal = () => {
    setModalOpen(true);
  }
  const handleOk = () => {
    setModalOpen(false);
  }
  const handleCancel = () => {
    setModalOpen(false);
  };

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
    console.log('Selected Branch:', value);
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
    console.log('Selected Services:', value);
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
      console.log(parseValue);
      setData((prevData) => ({
          ...prevData,
          userId: parseValue.userId,
          branch_name: parseValue.branch_name,    
          services: parseValue.services,      
          appointment_date: parseValue.appointment_date,    
          appointment_time: parseValue.appointment_time,    
      }));
  } catch (error) {
      console.error('Error parsing QR code value:', error);
  }
  }

  const handleCheckboxChange = (checkbox, checked) => {
    setData((prevChecked) => ({
      ...prevChecked,
      [checkbox]: checked,
    }));
    console.log(checkbox);
  };


  const nextStep = () => {
    if (isStepComplete()) {
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
      }
    } else {
      console.log('Step is incomplete');
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
    if (currentStep === 3) return data.last_dental_visit;
    return true;
  };
  

  return (
    <>
      <Header />
      <Head title="SMTC - Dental Care" />
      <div className="text-xs">
        <div className="items-center justify-center selection:text-white">
          <div className="flex flex-col lg:w-full lg:mt-2">
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
                <form onSubmit={submit} className="py-5 lg:py-10 flex flex-col items-start px-8 md:gap-2">
                  {currentStep === 0 && (
                    <>
                    
                    <div className="flex flex-col md:flex md:flex-row lg:p-5 md:gap-10 lg:gap-20 2xl:gap-32 lg:shadow-md rounded-lg">
                    
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
                        className="w-60 md:w-80"
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

                      <div className={`${data.branchLocation ? '' : 'hidden'}` }>
                      <InputLabel htmlFor="branch_location" value="Branch Location"/>
                      <TextInput
                      id="branch_location"
                      name="branch_location"
                      className="w-60 md:w-80"
                      value={data.branchLocation ? data.branchLocation : ''}
                      readOnly
                      />
                      </div>

                      <InputLabel htmlFor="services" value="Select a Dental Service"/>
                      <Select
                        id="services"
                        name="services"
                        className="w-60 md:w-80"
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
                        <div className="rounded-md shadow-xl py-4 px-4 flex flex-col gap-3 ">
                          <div className="flex flex-col divide-y divide-black">
                          <span className="font-black text-sm py-2">Schedule</span>
                          <span className="font-light text-xs py-2 text-gray-500">Choose Date and Time of your appointment</span>
                          </div>
                          <InputLabel htmlFor="appointment_date" value="Select Date" />

                          <DatePicker
                              id="appointment_date"
                              name="appointment_date" 
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
                     
                    </div>
                    </>
                  )}

                  {currentStep === 1 && (
                    <div className="flex flex-col md:p-5 gap-3 md:shadow-md rounded-lg">
                      <div className="flex gap-2 text-base md:text-lg">
                        <span>Welcome to</span>
                        <span className="text-[#ff4200]">SMTC</span>
                        <span className="text-[#2938DA]">Dental Care</span>
                        <span>!</span>
                      </div>
                      
                      <span className="font-black text-sm">Patient Info (Required)</span>

                      <div className="flex flex-col md:flex-row justify-around gap-2">
                        <div className="flex flex-col">
                          <InputLabel htmlFor="fullname" value="Fullname" />
                          <TextInput
                            id="fullname"
                            name="fullname"
                            value={data.fullname}
                            className="block w-60 md:w-80 text-sm"
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
                            className="block w-60 md:w-80 text-sm"
                            onChange={(e) => setData('age', e.target.value)}
                            required
                          />
                          <InputError message={errors.age} className="mt-2" />
                        </div>
                      </div>

                      <div className="flex flex-col md:flex-row justify-around gap-2">
                        <div className="flex flex-col">
                          <InputLabel htmlFor="gender" value="Gender" />
                          <Select
                            id="gender"
                            name="gender"
                            value={data.gender}
                            className="block w-60 md:w-80 text-sm"
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
                            className="block w-60 md:w-80"
                            needConfirm
                            size='large'
                            value={data.date_of_birth ? moment(data.date_of_birth) : null} 
                            onChange={(date) => setData('date_of_birth', date ? date.format("YYYY-MM-DD"): null)}
                            required
                        />

                        <InputError className="mt-2" message={errors.date_of_birth} />
                        </div>

                      </div>

                     

                     

                      <div className="flex flex-col md:flex-row justify-around gap-2">
                      <div className="flex flex-col gap-3">

                      <div className="flex flex-col">
                          <InputLabel htmlFor="phone" value="Phone" />
                          <TextInput
                            id="phone"
                            name="phone"
                            value={data.phone}
                            className="block w-60 md:w-80 text-sm"
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
                              className="block w-60 md:w-80 text-sm"
                              onChange={(e) => setData('address', e.target.value)}
                              required
                            />
                            <InputError message={errors.address} className="mt-2" />
                            </div>
                      </div>


                      <div className="flex flex-col gap-3">

                      <div className="flex flex-col">
                          <InputLabel htmlFor="email" value="Email" />
                          <TextInput
                            id="email"
                            name="email"
                            value={data.email}
                            className="block w-60 md:w-80 text-sm"
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
                            className="block w-60 md:w-80 text-sm"
                            onChange={(e) => setData('emergency_contact', e.target.value)}
                            required
                          />
                          <InputError message={errors.emergency_contact} className="mt-2" />
                        </div>
                      </div>

                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <>
                    <div>
                      <div className="flex flex-col md:p-5 gap-5 md:shadow-md rounded-lg">
                    
                    <div className="flex gap-2 text-base md:text-lg">
                      <span>Welcome to</span>
                      <span className="text-[#ff4200]">SMTC</span>
                      <span className="text-[#2938DA]">Dental Care</span>
                      <span>!</span>
                    </div>
                    <span className="font-black text-sm">Medical History</span>
                    <div className="flex flex-col md:flex-row md:gap-2 justify-evenly">
                      <div className="flex flex-col gap-3">
                      <InputLabel htmlFor="medical_condition" value="Medical Condition (if there's any)" />
                      <TextInput
                          id="medical_condition"
                          name="medical_condition"
                          value={data.medical_condition}
                          className="mt-1 block w-60 md:w-80 text-sm"
                          onChange={(e) => setData('medical_condition', e.target.value)}
                          required
                      />
                      <InputError message={errors.medical_condition} className="mt-2" />

                      <InputLabel htmlFor="current_medication" value="Current Medication (if there's any)" />
                      <TextInput
                          id="current_medication"
                          name="current_medication"
                          value={data.current_medication}
                          className="mt-1 block w-60 md:w-80 text-sm"
                          onChange={(e) => setData('current_medication', e.target.value)}
                          required
                      />
                      <InputError message={errors.current_medication} className="mt-2" />

                      <InputLabel htmlFor="allergies" value="Allergies (if there's any)" />
                      <TextInput
                          id="allergies"
                          name="allergies"
                          value={data.allergies}
                          className="mt-1 block w-60 md:w-80 text-sm"
                          onChange={(e) => setData('allergies', e.target.value)}
                          required
                      />
                      <InputError message={errors.allergies} className="mt-2" />

                      <InputLabel htmlFor="past_surgeries" value="Past Surgeries (if there's any)" />
                      <TextInput
                          id="past_surgeries"
                          name="past_surgeries"
                          value={data.past_surgeries}
                          className="mt-1 block w-60 md:w-80 text-sm"
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
                          className="mt-1 block w-60 md:w-80 text-sm"
                          onChange={(e) => setData('family_medical_history', e.target.value)}
                          required
                      />
                      <InputError message={errors.family_medical_history} className="mt-2" />

                      <InputLabel htmlFor="blood_pressure" value="Blood pressure" />
                      <TextInput
                          id="blood_pressure"
                          name="blood_pressure"
                          value={data.blood_pressure}
                          className="mt-1 block w-60 md:w-80 text-sm"
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

                  
                  {currentStep === 3 && (
                    <>
                    <div>
                      <div className="flex flex-col md:p-5 gap-5 md:shadow-md rounded-lg">
                    
                    <div className="flex gap-2 text-base md:text-lg">
                      <span>Welcome to</span>
                      <span className="text-[#ff4200]">SMTC</span>
                      <span className="text-[#2938DA]">Dental Care</span>
                      <span>!</span>
                    </div>
                    <span className="font-black text-sm">Dental History</span>
                    <div className="flex flex-col justify-between">
                      <div className="flex flex-col gap-3">
                        <div>

                      <InputLabel htmlFor="last_dental_visit" value="Select your last dental visit date" />
                      <span className="text-xs text-gray-500">If this is your first time, kindly choose your appointment date.</span>
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
                        </div>

                        <div>

                      <InputLabel htmlFor="past_dental_treatments" value="Last dental treatment" />

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
                      <InputLabel htmlFor="last_dental_visit" value="If there's any, Please check the checkbox below." className='mt-5'/>
                      <div className="flex flex-wrap gap-3">

                      <Checkbox
                        id="frequent_tooth_pain"
                        name="frequent_tooth_pain"
                        checked={data.frequent_tooth_pain}
                        onChange={(e) => handleCheckboxChange('frequent_tooth_pain', e.target.checked)}
                      >
                        Frequent Tooth Pain
                      </Checkbox>

                      <Checkbox
                        id="gum_disease_history"
                        name="gum_disease_history"
                        checked={data.gum_disease_history}
                        onChange={(e) => handleCheckboxChange('gum_disease_history', e.target.checked)}
                      >
                        Gum disease history
                      </Checkbox>

                      <Checkbox
                        id="teeth_grinding"
                        name="teeth_grinding"
                        checked={data.teeth_grinding}
                        onChange={(e) => handleCheckboxChange('teeth_grinding', e.target.checked)}
                      >
                        Teeth Grinding
                      </Checkbox>
                      
                      <Checkbox
                        id="orthodontic_treatment"
                        name="orthodontic_treatment"
                        checked={data.orthodontic_treatment}
                        onChange={(e) => handleCheckboxChange('orthodontic_treatment', e.target.checked)}
                      >
                        Orthodontic
                      </Checkbox>

                      <Checkbox
                        id="dental_implants"
                        name="dental_implants"
                        checked={data.dental_implants}
                        onChange={(e) => handleCheckboxChange('dental_implants', e.target.checked)}
                      >
                        Dental implants
                      </Checkbox>

                      
                      <Checkbox
                        id="bleeding_gums"
                        name="bleeding_gums"
                        checked={data.bleeding_gums}
                        onChange={(e) => handleCheckboxChange('bleeding_gums', e.target.checked)}
                      >
                        Bleeding gums
                      </Checkbox>
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
                    <div className="flex flex-col md:p-5 gap-5 md:shadow-md rounded-lg">
                    
                    <div className="flex gap-2 text-base md:text-lg">
                      <span>Welcome to</span>
                      <span className="text-[#ff4200]">SMTC</span>
                      <span className="text-[#2938DA]">Dental Care</span>
                      <span>!</span>
                    </div>
                    <span className="font-black text-sm">Review Info</span>

                      <div className="flex flex-col gap-6 justify-between px-3 py-4">

                      <InputLabel value="Appointment Details"/>
                      <div className="flex flex-col md:flex-row gap-5 md:gap-0 rounded-lg md:shadow-md md:py-4 md:px-4 md:justify-around">
                      
                        <div className="flex flex-col gap-2">
                        <span className="font-black text-sm">Selected Branches: 
                          <span className="font-normal"> {data.selectedBranchName ? data.selectedBranchName : ''} 
                            </span>  </span>
                        <span className="font-black text-sm">Selected Services: 
                          <span className="font-normal"> {data.selectedServices ? data.selectedServices : ''}
                            </span>  </span>
                        <span className="font-black text-sm text-wrap w-60 md:w-full md:max-w-80">Branch Location: 
                          <span className="font-normal"> {data.branchLocation ? data.branchLocation : ''} 
                            </span>  </span>
                        </div>

                        <div className="flex flex-col gap-2">
                        <span className="font-black text-sm">Appointment Date: 
                          <span className="font-normal"> {data.appointment_date ? data.appointment_date : ''} 
                            </span>  </span>
                        <span className="font-black text-sm">Appointment Time: 
                          <span className="font-normal"> {data.appointment_time ? data.appointment_time : ''}
                            </span>  </span>
                        </div>
                        </div>

                      <InputLabel value="Personal Info"/>

                        <div className="flex flex-col md:flex-row gap-5 md:gap-0 justify-around rounded-lg md:shadow-md md:py-4 md:px-14">
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
                        
                        <div className="flex flex-col items-center text-center px-4">
                          <QRCode
                          id="qr_code"
                          name="qr_code"
                          icon='/images/image.png'
                          iconSize={30}
                          size={200}
                          status="loading"
                          value={JSON.stringify({ 
                            value1: data.userId ? data.userId : '', 
                            value2: data.selectedBranchName ? data.selectedBranchName : '', 
                            value3: data.selectedServices ? data.selectedServices : '', 
                            value4: data.appointment_date ? data.appointment_date : '', 
                            value5: data.appointment_time ? data.appointment_time : ''
                          })}
                          onChange={handleQRCode}
                          />
                          <InputLabel value="Obtain your QR code upon submitting the appointment request."/>
                          
                        </div>
                        </div>
                      </div>
                      </div>
                    </div>
                    </>
                  )}
                  

                  <div className="flex justify-between w-full mt-4">
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
                      <PrimaryButton className="flex justify-center" disabled={processing} onClick={showModal}>
                        Submit
                      </PrimaryButton>
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
                              <Segmented options={['canvas', 'svg']} onChange={(val) => setRenderType(val)} />
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
                  </div>
                </form>
              </div>
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Appointment;
