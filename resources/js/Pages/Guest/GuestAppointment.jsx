import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import { Head, useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import { Steps, Select } from "antd";
import PrimaryButton from '@/Components/PrimaryButton';

const { Step } = Steps;
const { Option } = Select;

const Appointment = ({ auth, branches, categories }) => {
  const { data, setData, put, processing, errors } = useForm({
    fullname: '',
    email: '',
    selectedBranch: null, 
    category: '',
  });

  const [currentStep, setCurrentStep] = useState(0);

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

  const submit = (e) => {
    e.preventDefault();
    put(route('guest.appointment'), {
      fullname: data.fullname,
      email: data.email,
      branch: data.selectedBranch, 
      category: data.category,
    });
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
            <main className="mt-6 mx-28 shadow-xl rounded-xl">
              <div className="flex flex-col gap-4 p-10">
                <div className="flex gap-2 text-lg">
                  <span>Welcome to</span>
                  <span className="text-[#ff4200]">SMTC</span>
                  <span className="text-[#2938DA]">Dental Care</span>
                  <span>!</span>
                </div>
                <Steps current={0}>
                  <Step title="Appointment" description="Appointment Details" />
                  <Step title="Personal Info" description="Your details" />
                  <Step title="Medical History" description="General" />
                  <Step title="Dental History" description="Specifics" />
                  <Step title="Confirm" description="Review info" />
                </Steps>
                <form onSubmit={submit} className="px-20 py-10 flex flex-col gap-2">
                  {currentStep === 0 && (
                    <>
                      <div>
                      <InputLabel htmlFor="fullname" value="Fullname" />
                      <TextInput
                        id="fullname"
                        name="fullname"
                        value={data.fullname}
                        className="mt-1 block w-96 text-sm"
                        autoComplete="username"
                        onChange={(e) => setData('fullname', e.target.value)}
                        required
                      />
                      {errors.fullname && <div className="text-red-500">{errors.fullname}</div>}
                    </div>

                    <div className="flex flex-col p-10 gap-3 shadow-md rounded-lg">
                      <span>Select Branch</span>
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

                      <span className="">Select a Dental Service</span>
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
