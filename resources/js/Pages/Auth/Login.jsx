import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { Input } from 'antd';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import { TbArrowBackUp } from "react-icons/tb";
import { notification } from 'antd';
import { useState } from 'react';
import { SyncOutlined } from '@ant-design/icons';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [processing, setProcessing] = useState(false);

    const submit = async (e) => {
        e.preventDefault();

        setProcessing(true);

        try {
            const response = await fetch(route('login'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                  },
                body: JSON.stringify(data),
                //onFinish: () => reset('password'),
            });
            const result = await response.json();
            
            if (response.ok) {
                notification.success({
                    message: 'Success',
                    description: result.message || 'Login successfully!',
                    placement: 'bottomRight',
                    duration: 3,
                });
                window.location.href = route('dashboard');
            }
            else {
                notification.error({
                    message: 'Error',
                    description: result.message || 'Login Failed!',
                    placement: 'bottomRight', 
                    duration: 3,
                });
            }
            
        }
        catch (error) {
            notification.error({
                message: 'Submission Error',
                description: error.message || 'An error occurred during the submission.',
                placement: 'bottomRight',
                duration: 3,
            });
        }
        finally {
            setProcessing(false);
            reset('password');
        }
        
    };

    return (
        <>
        <Header/>
        <GuestLayout>
        <Link href='/' className='text-lg'>
           <TbArrowBackUp />
        </Link>
        <div className="flex flex-col items-center mt-4">
            <div className="flex items-center sm:flex-row lg:flex-row">
                <span className="font-extrabold text-sm tracking-widest">Welcome To</span>
                <img src="/images/image.png" alt="Logo" className="h-10 w-10 mr-2" />
                <span style={{ color: '#FF4200' }} className="mr-2 text-sm tracking-widest">SMTC</span>
                <span style={{ color: '#2938DA' }} className="text-sm tracking-widest">Dental Care</span>
            </div>
            <span className="text-xs sm:text-xs lg:text-xs tracking-widest pb-5">General Dentistry & Orthodontics w/ Dental X-Ray</span>
        </div>
            <Head title="Log in" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full text-sm"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
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
                        className="flex flex-1 mt-1 w-full text-sm"
                        size='large'
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex justify-between mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="ms-2 text-xs text-gray-600">Remember me</span>
                    </label>
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="underline text-xs text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Forgot your password?
                        </Link>
                    )}
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link
                    href={route('register')}
                    className="underline text-xs text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Haven't created an account yet?
                    </Link>
                    <div className='ml-2'>
                    <PrimaryButton disabled={processing}>
                    {processing ? <SyncOutlined spin /> : 'Login'}
                    </PrimaryButton>
                    </div>
                </div>
            </form>
        </GuestLayout>
        <Header/>
        </>

    );
}
