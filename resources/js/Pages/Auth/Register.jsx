
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import { Head, Link, useForm } from '@inertiajs/react';
import { DatePicker, Input, Select } from 'antd';
import moment from 'moment';
import { TbArrowBackUp } from "react-icons/tb";
import GuestLayout from '@/Layouts/GuestLayout';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        dob: null,
        age: '',
        gender: '',
        phone: '',
        address: '',
        emergency_contact: '',
    });

const { Option } = Select;

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation',),
        });
    };

    return (
        <>
        <Header/>
        <div className="flex flex-col gap-9 items-center mt-8">
            <div>
                <div className="flex flex-col items-center sm:flex-row lg:flex-row">
                    <span className="font-extrabold text-2xl tracking-widest">Welcome To</span>
                    <img src="/images/image.png" alt="Logo" className="h-16 w-16 mr-2" />
                    <span style={{ color: '#FF4200' }} className="mr-2 text-2xl tracking-widest">SMTC</span>
                    <span style={{ color: '#2938DA' }} className="text-2xl tracking-widest">Dental Care</span>
                </div>
                <span className="text-xs sm:text-sm lg:text-base tracking-widest">General Dentistry & Orthodontics w/ Dental X-Ray</span>
            </div>
            
            <div className="flex flex-col items-center tracking-widest">
                <span className="text-xs sm:text-sm lg:text-base text-gray-400 ">Sign up now to book your dental appointment easily with</span>
                <span className="text-gray-400 text-xs sm:text-sm lg:text-base">SMTC Dental Care</span>
            </div>
        </div>
        <GuestLayout>
            <Head title="Register" />
            

            <form onSubmit={submit}>
                <Link href='/' className='text-lg w-full'>
                    <TbArrowBackUp />
                </Link>
                <div>

                    <InputLabel htmlFor="name" value="Name" className='mt-4' />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full text-xs"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full text-xs"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <Input.Password
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="flex flex-1 mt-1 w-full "
                        size="middle"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

                    <Input.Password
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 flex flex-1 w-full"
                        size="middle"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="dob" value="Date of Birth" />

                    <DatePicker
                        id="dob"
                        name="dob" 
                        value={data.dob ? moment(data.dob): null}  
                        className="mt-1 block w-full"
                        autoComplete="bday" 
                        size='middle'
                        onChange={(date) => setData('dob', date ? date.format("YYYY-MM-DD"): null)}
                        required
                    />

                    <InputError message={errors.dob} className="mt-2" /> 
                </div>

                <div className="flex gap-2 mt-4">
                    <div className='relative flex-1'> 
                    <InputLabel htmlFor="age" value="Age"/>


                    <TextInput
                        id="age"
                        name="age"
                        value={data.age}
                        className="mt-1 block w-full text-xs"
                        autoComplete="age"
                        isFocused={true}
                        onChange={(e) => setData('age', e.target.value)}
                        required
                    />
                    </div>

                    <div className='relative flex-1'>

                    <InputLabel htmlFor="gender" value="Gender" />
                          <Select
                            id="gender"
                            name="gender"
                            value={data.gender}
                            className="block w-full text-xs"
                            autoComplete="gender"
                            size="middle"
                            onChange={(value) => setData('gender', value)}
                            required
                          >
                            <Option value="male">Male</Option>
                            <Option value="female">Female</Option>
                            <Option value="other">Other</Option>
                          </Select>
                    </div>

                    <div className='relative flex-1'>

                    <InputLabel htmlFor="phone" value="Phone"/>

                    <TextInput
                        id="phone"
                        name="phone"
                        type="tel"
                        value={data.phone}
                        className="mt-1 block w-full text-xs"
                        autoComplete="phone"
                        isFocused={true}
                        onChange={(e) => setData('phone', e.target.value)}
                        required
                    />
                    </div>

                    <InputError message={errors.phone} className="mt-2" /> 
                    <InputError message={errors.age} className="mt-2" /> 
                    <InputError message={errors.gender} className="mt-2" />

                    
                </div>
                <div className='mt-4'>
                    <InputLabel htmlFor="address" value="Address" />

                    <TextInput
                        id="address"
                        name="address"
                        value={data.address}
                        className="mt-1 block w-full text-xs"
                        autoComplete="address"
                        isFocused={true}
                        onChange={(e) => setData('address', e.target.value)}
                        required
                    />

                    <InputError message={errors.address} className="mt-2" />
                    </div>

                    <div className='mt-4'>
                    <InputLabel htmlFor="emergency_contact" value="Emergency Contact (fullname - contact number)" />

                    <TextInput
                        id="emergency_contact"
                        name="emergency_contact"
                        value={data.emergency_contact}
                        className="mt-1 block w-full text-xs"
                        autoComplete="emergency_contact"
                        onChange={(e) => setData('emergency_contact', e.target.value)}
                        required
                    />

                    <InputError message={errors.emergency_contact} className="mt-2" />

                    
                    </div>

                    <div className='mt-4'>
                        <PrimaryButton className="w-full flex justify-center"  disabled={processing}>
                            Sign up
                        </PrimaryButton>
                    </div>

                <div className="flex mt-4">

                    <span className="w-full underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Already have an account?
                    </span>
                    <Link
                        href={route('login')}
                        className='text-[#FF4200] hover:text-[#3498DB] ease-in-out duration-300'
                           >
                        Login
                    </Link>

                    
                </div>
            </form>

        </GuestLayout>
        <div className="mt-14"></div>
        <Header/>
        </>
    );
}
