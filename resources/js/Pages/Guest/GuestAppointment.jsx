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

    last_dental_visit: null,
    last_dental_treatments: '',
    tooth_sensitivity: '',
    frequent_tooth_pain: false,
    gum_disease_history: false,
    teeth_grinding: false,
    orthodontic_treatment: false,
    dental_implants: false,
    bleeding_gums: false,
  });

  const submit = (e) => {
    e.preventDefault();

    const formattedData = {
      ...data,
      date: data.date ? moment(data.date).format('YYYY-MM-DD') : null,
      time: data.time ? moment(data.time, 'h:mm a').format('HH:mm') : null,

    };

    put(route('guest.appointment'), formattedData, {
      onSuccess: () => {
        // handle success if needed
      },
      onError: (errors) => {
        console.log(errors); // Check what errors are returned
      },
    }); 
    
  };

  const branch_name = data.selectedBranch; //need to get branch name
  
  const [currentStep, setCurrentStep] = useState(0);

  const [isChecked, setIsChecked] = useState({
    heart_disease: false,
    diabetes: false,
    smoker: false,
  });

  
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
    if (currentStep === 0) return data.selectedBranch && data.category && data.date && data.time;
    if (currentStep === 1) return data.name && data.age && data.gender && data.phone && data.email && data.address && data.date_of_birth && data.emergency_contact;
    if (currentStep === 3) return data.last_dental_visit;
    // Add more conditions for other steps as needed
    return true;
  };
  

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
                        id="branches"
                        name="branches"
                        className="w-96 h-10"
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

                      <InputLabel htmlFor="services" value="Select a Dental Service"/>
                      <Select
                        id="services"
                        name="services"
                        className="w-96 h-10"
                        placeholder="Select a service"
                        onChange={handleServiceChange}
                        value={data.category}
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
                      {categories.filter(category => category.Branch_ID === data.selectedBranch).length === 0 && (
                        <div className="text-red-500">No services available for the selected branch.</div>
                      )}
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
                    <div className="flex flex-col p-5 gap-3 shadow-md rounded-lg">
                      <div className="flex gap-2 text-lg">
                        <span>Welcome to</span>
                        <span className="text-[#ff4200]">SMTC</span>
                        <span className="text-[#2938DA]">Dental Care</span>
                        <span>!</span>
                      </div>
                      
                      <span className="font-black text-sm">Patient Info (Required)</span>

                      <div className="flex justify-around">
                        <div className="flex flex-col">
                          <InputLabel htmlFor="name" value="Full Name" />
                          <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="block w-80 text-sm"
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

                      <div className="flex justify-around">
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
                        <InputLabel htmlFor="date_of_birth" value="Date of Birth" />
                        <DatePicker
                            id="date_of_birth"
                            name="date_of_birth"
                            type="date"
                            className="block w-80"
                            size='large'
                            value={data.date_of_birth ? moment(data.date_of_birth) : null} 
                            onChange={(date) => setData('date_of_birth', date ? date.format("YYYY-MM-DD"): null)}
                            required
                            autoComplete="date_of_birth"
                        />

                        <InputError className="mt-2" message={errors.date_of_birth} />
                        </div>

                      </div>

                     

                     

                      <div className="flex justify-around">
                      <div className="flex flex-col gap-3">

                      <div className="flex flex-col">
                          <InputLabel htmlFor="phone" value="Phone" />
                          <TextInput
                            id="phone"
                            name="phone"
                            value={data.phone}
                            className="block w-80 text-sm"
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
                              className="block w-80 text-sm"
                              autoComplete="address"
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
                            className="block w-80 text-sm"
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
                    <span className="font-black text-sm">Medical History</span>
                    <div className="flex justify-evenly">
                      <div className="flex flex-col gap-3">
                      <InputLabel htmlFor="medical_condition" value="Medical Condition (if there's any)" />
                      <TextInput
                          id="medical_condition"
                          name="medical_condition"
                          value={data.medical_condition}
                          className="mt-1 block w-80 text-sm"
                          onChange={(e) => setData('medical_condition', e.target.value)}
                          required
                      />
                      <InputError message={errors.medical_condition} className="mt-2" />

                      <InputLabel htmlFor="current_medication" value="Current Medication (if there's any)" />
                      <TextInput
                          id="current_medication"
                          name="current_medication"
                          value={data.current_medication}
                          className="mt-1 block w-80 text-sm"
                          onChange={(e) => setData('current_medication', e.target.value)}
                          required
                      />
                      <InputError message={errors.current_medication} className="mt-2" />

                      <InputLabel htmlFor="allergies" value="Allergies (if there's any)" />
                      <TextInput
                          id="allergies"
                          name="allergies"
                          value={data.allergies}
                          className="mt-1 block w-80 text-sm"
                          onChange={(e) => setData('allergies', e.target.value)}
                          required
                      />
                      <InputError message={errors.allergies} className="mt-2" />

                      <InputLabel htmlFor="past_surgeries" value="Past Surgeries (if there's any)" />
                      <TextInput
                          id="past_surgeries"
                          name="past_surgeries"
                          value={data.past_surgeries}
                          className="mt-1 block w-80 text-sm"
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
                          className="mt-1 block w-80 text-sm"
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
                      <div className="flex flex-col p-5 gap-5 shadow-md rounded-lg">
                    
                    <div className="flex gap-2 text-lg">
                      <span>Welcome to</span>
                      <span className="text-[#ff4200]">SMTC</span>
                      <span className="text-[#2938DA]">Dental Care</span>
                      <span>!</span>
                    </div>
                    <span className="font-black text-sm">Dental History</span>
                    <div className="flex justify-evenly">
                      <div className="flex flex-col gap-3">
                      <InputLabel htmlFor="last_dental_visit" value="Your last dental visit (if first time choose your dental appointment date)" />
                        <DatePicker
                            id="last_dental_visit"
                            type="date"
                            name="last_dental_visit"
                            className="block w-80"
                            size='large'
                            value={data.last_dental_visit ? moment(data.last_dental_visit) : null} 
                            onChange={(date) => setData('last_dental_visit', date ? date.format("YYYY-MM-DD"): null)}
                            required
                        />

                        <InputError className="mt-2" message={errors.last_dental_visit} />

                      <InputLabel htmlFor="last_dental_treatments" value="Last dental treatment" />

                      <TextInput
                          id="last_dental_treatments"
                          name="last_dental_treatments"
                          value={data.last_dental_treatments}
                          className="mt-1 block w-80 text-sm"
                          onChange={(e) => setData('last_dental_treatments', e.target.value)}
                          required
                      />

                      <InputError message={errors.last_dental_treatments} className="mt-2" />

                      
                      <InputLabel htmlFor="tooth_sensitivity" value="Tooth sensitivity" />
                      <Select
                            id="tooth_sensitivity"
                            name="tooth_sensitivity"
                            value={data.tooth_sensitivity}
                            className="block w-80 text-sm"
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

                      <div className="flex gap-3">
                      
                      <div className="flex flex-col justify-center gap-5">

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
                      </div>

                      <div className="flex flex-col justify-center gap-5">

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
                    <div className="flex flex-col p-5 gap-5 shadow-md rounded-lg">
                    
                    <div className="flex gap-2 text-lg">
                      <span>Welcome to</span>
                      <span className="text-[#ff4200]">SMTC</span>
                      <span className="text-[#2938DA]">Dental Care</span>
                      <span>!</span>
                    </div>
                    <span className="font-black text-sm">Review Info</span>
                      <div>
                      <InputLabel htmlFor="branch_name" value="Last dental treatment" />

                      <TextInput
                          id="branch_name"
                          name="branch_name"
                          value={branch_name || null} 
                          className="mt-1 block w-80 text-sm"
                          onChange={(e) => setData('branch_name', e.target.value)}
                          required
                      />
                      </div>

                    </div>
                    </div>
                    </>
                  )}
                  

                  <div className="flex justify-between mt-4">
                    {currentStep > 0 && (
                      <PrimaryButton onClick={previousStep}  disabled={currentStep === 0}>
                        Previous
                      </PrimaryButton>
                    )}

                    {currentStep < 4 ? (
                      <PrimaryButton onClick={nextStep} disabled={!isStepComplete()}> {/* add this  */}
                        Next
                      </PrimaryButton>
                    ) : (
                      <PrimaryButton className="flex justify-center" disabled={processing}>
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
