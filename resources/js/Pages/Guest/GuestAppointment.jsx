import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia-react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import { Steps, Select, DatePicker, TimePicker, Checkbox } from "antd";
import PrimaryButton from '@/Components/PrimaryButton';
import moment from 'moment';

const { Step } = Steps;
const { Option } = Select;

const Appointment = ({ auth, branches, categories }) => {
  const user= usePage().props.auth.user

  const { data, setData, put, processing, errors } = useForm({
    selectedBranch: null, 
    category: '',
    date: null,
    time: null,
    
    name: user.name,
    email: user.email,
    age: user.age,
    gender: user.gender,
    date_of_birth: user.date_of_birth,
    phone: user.phone,
    address: user.address,
    emergency_contact: user.emergency_contact,

    medical_condition: '',
    current_medication: '',
    allergies: '',
    past_surgeries: '',
    family_medical_history: '',
    blood_pressure: '',
    heart_disease: false,
    diabetes: false,
    smoker: false,
  });

  const submit = (e) => {
    e.preventDefault();

    put(route('guest.appointment'), data)
    
    // {
    //   branch: data.selectedBranch, 
    //   category: data.category,
    //   date: data.date,
    //   time: data.time,

    //   name: data.name,
    //   age: data.age,
    //   gender: data.gender,
    //   date_of_birth: data.date_of_birth,
    //   email: data.email,
    //   phone: data.phone,
    //   address: data.address,
    //   emergency_contact: data.emergency_contact,

    //   medical_condition: data.medical_condition,
    //   current_medication: data.current_medication,
    //   allergies: data.allergies,
    //   past_surgeries: data.past_surgeries,
    //   family_medical_history: data.family_medical_history,
    //   blood_pressure: data.blood_pressure,
    //   heart_disease: data.heart_disease,
    //   diabetes: data.diabetes,
    //   smoker: data.smoker,
    // });
  };
  
  const [currentStep, setCurrentStep] = useState(0);
  const [isChecked, setIsChecked] = useState({
    heart_disease: false,
    diabetes: false,
    smoker: false,
  }
  );
  
  const handleBranchChange = (value) => {
    console.log('Selected Branch:', value);
    setData((prevData) => ({
      ...prevData,
      selectedBranch: value, 
      category: '', 
    }));
  };

  const handleServiceChange = (value) => {
    setData('category', value);
  };

  const handleCheckboxChange = (checkbox, checked) => {
    setIsChecked((prevState) => ({
      ...prevState,
      [checkbox]: checked,
    }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <>
      <Header />
      <Head title="SMTC - Dental Care" />
      <div className="text-xs">
        <div className="items-center justify-center selection:text-white">
          <div className="relative w-full px-6 mt-2">
            <header>
              <Navbar auth={auth} />
            </header>
            <main className="mt-6 mx-28 ">
              <div className="flex flex-col gap-4 py-9 px-14">
                
                <Steps current={currentStep} className="px-14">
                  <Step title="Appointment" description="Appointment Details" />
                  <Step title="Personal Info" description="Your details" />
                  <Step title="Medical History" description="General" />
                  <Step title="Dental History" description="Dental" />
                  <Step title="Confirm" description="Review info" />
                </Steps>
                <form onSubmit={submit} className="px-20 py-10 flex flex-col gap-2">
                  {currentStep === 0 && (
                    <>
                    
                    <div className="flex p-5 gap-14 shadow-md rounded-lg">
                    
                      <div className="flex flex-col gap-3">
                      <div className="flex gap-2 text-lg">
                      <span>Welcome to</span>
                      <span className="text-[#ff4200]">SMTC</span>
                      <span className="text-[#2938DA]">Dental Care</span>
                      <span>!</span>
                    </div>
                      <span className="text-sm">Choose branch and dental service here.</span>
                      <div className="flex flex-col gap-3 py-6">

                      <InputLabel htmlFor="branches" value="Select Branch"/>
                      <Select
                        className="w-96 h-10"
                        placeholder="Select a branch"
                        onChange={handleBranchChange}
                        value={data.selectedBranch || null} 
                      >
                        {branches.map((branch) => (
                          <Option key={branch.Branch_ID} value={branch.Branch_ID}>
                            {branch.BranchName}
                          </Option>
                        ))}
                      </Select>

                      <InputLabel htmlFor="services" value="Select a Dental Service"/>
                      <Select
                        className="w-96 h-10"
                        placeholder="Select a service"
                        onChange={handleServiceChange}
                        value={data.category}
                        disabled={!data.selectedBranch}
                      >
                        {categories
                          .filter(category => category.Branch_ID === data.selectedBranch) 
                          .map((category) => (
                            <Option key={category.Categories_ID} value={category.Categories_ID}>
                              {category.Title}
                            </Option>
                          ))}
                      </Select>
                      {errors.category && <div className="text-red-500">{errors.category}</div>}
                      </div>

                      </div>

                      <div className="flex flex-col gap-3 w-full max-w-80">
                        <span className="text-sm">When would you like to come in?</span>
                        <div className="rounded-md shadow-xl py-4 px-4 flex flex-col gap-3">
                          <div className="flex flex-col divide-y divide-black">
                          <span className="font-black text-sm py-2">Schedule</span>
                          <span className="font-light text-xs py-2 text-gray-500">Choose Date and Time of your appointment</span>
                          </div>
                          
                          <InputLabel htmlFor="date" value="Select Date" />

                          <DatePicker
                              id="date"
                              name="date" 
                              value={data.date ? moment(data.date): null}  
                              className="block w-full"
                              autoComplete="date" 
                              size='large'
                              onChange={(date) => setData('date', date ? date.format("YYYY-MM-DD"): null)}
                              required
                          />

                          <InputError message={errors.date} className="mt-2" /> 

                          <InputLabel htmlFor="time" value="Select Time" />

                          <TimePicker
                            id="time"
                            name="time"
                            value={data.time ? moment(data.time, 'h:mm a') : null} 
                            className="block w-full"
                            autoComplete="time"
                            size='large'
                            format='h:mm a' 
                            onChange={(time) => setData('time', time ? time.format("h:mm a") : null)}
                            required
                          />

                          <InputError message={errors.time} className="mt-2" />
                      </div>
                      </div>
                     
                    </div>
                    </>
                  )}

                  {currentStep === 1 && (
                    <div className="flex flex-col p-5 gap-5 shadow-md rounded-lg">
                      <div className="flex gap-2 text-lg">
                        <span>Welcome to</span>
                        <span className="text-[#ff4200]">SMTC</span>
                        <span className="text-[#2938DA]">Dental Care</span>
                        <span>!</span>
                      </div>
                      
                      <span className="font-black text-sm">Patient Info (Required)</span>

                      <div className="flex justify-between">
                        <div className="flex flex-col">
                          <InputLabel htmlFor="name" value="Full Name" />
                          <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="block w-96 text-sm"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData('name', e.target.value)}
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
                            className="block w-80 text-sm"
                            autoComplete="age"
                            onChange={(e) => setData('age', e.target.value)}
                            required
                          />
                          <InputError message={errors.age} className="mt-2" />
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <div className="flex flex-col">
                          <InputLabel htmlFor="gender" value="Gender" />
                          <Select
                            id="gender"
                            name="gender"
                            value={data.gender}
                            className="block w-80 text-sm"
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
                          <InputLabel htmlFor="phone" value="Phone" />
                          <TextInput
                            id="phone"
                            name="phone"
                            value={data.phone}
                            className="block w-96 text-sm"
                            autoComplete="phone"
                            onChange={(e) => setData('phone', e.target.value)}
                            required
                          />
                          <InputError message={errors.phone} className="mt-2" />
                        </div>

                        
                      </div>

                      <InputLabel htmlFor="address" value="Address" />
                      <TextInput
                        id="address"
                        name="address"
                        value={data.address}
                        className="block w-full text-sm"
                        autoComplete="address"
                        onChange={(e) => setData('address', e.target.value)}
                        required
                      />
                      <InputError message={errors.address} className="mt-2" />

                      <div className="flex justify-between">

                      <div className="flex flex-col">
                          <InputLabel htmlFor="email" value="Email" />
                          <TextInput
                            id="email"
                            name="email"
                            value={data.email}
                            className="block w-96 text-sm"
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
                            className="block w-80 text-sm"
                            autoComplete="emergency_contact"
                            onChange={(e) => setData('emergency_contact', e.target.value)}
                            required
                          />
                          <InputError message={errors.emergency_contact} className="mt-2" />
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <>
                    <div>
                      <div className="flex flex-col p-5 gap-5 shadow-md rounded-lg">
                    
                    <div className="flex gap-2 text-lg">
                      <span>Welcome to</span>
                      <span className="text-[#ff4200]">SMTC</span>
                      <span className="text-[#2938DA]">Dental Care</span>
                      <span>!</span>
                    </div>
                    <span>Medical History</span>
                    <div className="flex justify-evenly">
                      <div className="flex flex-col gap-3">
                      <InputLabel htmlFor="medical_condition" value="Medical Condition (if there’s any)" />

                      <TextInput
                          id="medical_condition"
                          name="medical_condition"
                          value={data.medical_condition}
                          className="mt-1 block w-80 text-sm"
                          autoComplete="medical_condition"
                          onChange={(e) => setData('medical_condition', e.target.value)}
                          required
                      />

                      <InputError message={errors.medical_condition} className="mt-2" />

                      <InputLabel htmlFor="current_medication" value="Current Medication (if there’s any)" />

                      <TextInput
                          id="current_medication"
                          name="current_medication"
                          value={data.current_medication}
                          className="mt-1 block w-80 text-sm"
                          autoComplete="current_medication"
                          onChange={(e) => setData('current_medication', e.target.value)}
                          required
                      />

                      <InputError message={errors.current_medication} className="mt-2" />

                      <InputLabel htmlFor="allergies" value="Allergies (if there’s any)" />

                      <TextInput
                          id="allergies"
                          name="allergies"
                          value={data.allergies}
                          className="mt-1 block w-80 text-sm"
                          autoComplete="allergies"
                          onChange={(e) => setData('allergies', e.target.value)}
                          required
                      />

                      <InputError message={errors.allergies} className="mt-2" />

                      <InputLabel htmlFor="past_surgeries" value="Past Surgeries (if there’s any)" />

                      <TextInput
                          id="past_surgeries"
                          name="past_surgeries"
                          value={data.past_surgeries}
                          className="mt-1 block w-80 text-sm"
                          autoComplete="past_surgeries"
                          onChange={(e) => setData('past_surgeries', e.target.value)}
                          required
                      />

                      <InputError message={errors.past_surgeries} className="mt-2" />
                      </div>

                      <div className="flex flex-col gap-3">
                      <InputLabel htmlFor="family_medical_history" value="Family medical history" />

                      <TextInput
                          id="family_medical_history"
                          name="family_medical_history"
                          value={data.family_medical_history}
                          className="mt-1 block w-80 text-sm"
                          autoComplete="family_medical_history"
                          onChange={(e) => setData('family_medical_history', e.target.value)}
                          required
                      />

                      <InputError message={errors.family_medical_history} className="mt-2" />

                      <InputLabel htmlFor="blood_pressure" value="Blood pressure" />

                      <TextInput
                          id="blood_pressure"
                          name="blood_pressure"
                          value={data.blood_pressure}
                          className="mt-1 block w-80 text-sm"
                          autoComplete="blood_pressure"
                          onChange={(e) => setData('blood_pressure', e.target.value)}
                          required
                      />

                      <InputError message={errors.blood_pressure} className="mt-2" />

                      <Checkbox 
                      checked={isChecked.heart_disease} 
                      value={data.checkbox ? moment(data.checkbox): false}
                      onChange={(e) => handleCheckboxChange('heart_disease', e.target.checked)}>
                        Heart Disease?
                      </Checkbox>

                      <Checkbox 
                      checked={isChecked.diabetes} 
                      value={data.checkbox ? moment(data.checkbox): false}
                      onChange={(e) => handleCheckboxChange('diabetes', e.target.checked)}>
                        Diabetes?
                      </Checkbox>

                      <Checkbox 
                      checked={isChecked.smoker} 
                      value={data.checkbox ? moment(data.checkbox): false}
                      onChange={(e) => handleCheckboxChange('smoker', e.target.checked)}>
                        Smoker?
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
                      <span>dental history</span>
                    </div>
                    </>
                  )}

                  
                  {currentStep === 4 && (
                    <>
                    <div>
                      <span>review info</span>
                    </div>
                    </>
                  )}
                  

                  <div className="flex justify-between mt-4">
                    {currentStep > 0 && (
                      <PrimaryButton onClick={previousStep}>
                        Previous
                      </PrimaryButton>
                    )}

                    {currentStep < 4 ? (
                      <PrimaryButton onClick={nextStep} disabled={processing}>
                        Next
                      </PrimaryButton>
                    ) : (
                      <PrimaryButton className="w-full flex justify-center" disabled={processing}>
                        Submit
                      </PrimaryButton>
                    )}
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
