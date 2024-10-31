import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { notification } from 'antd';
import { SyncOutlined } from '@ant-design/icons';

export default function ForgotPassword({ status }) {
    const { data, setData, post, errors } = useForm({
        email: '',
    });
    const [processing, setProcessing] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        
        try {
            const response = await fetch(route('password.email'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                },
                body: JSON.stringify(data),
            });
    
            const result = await response.json();
            if (response.ok) {
                notification.success({
                    message: 'Success',
                    description: result.message || 'Login successfully!',
                    placement: 'bottomRight', 
                });
            }
            else {
                notification.error({
                    message: 'Error',
                    description: result.message || 'Login successfully!',
                    placement: 'bottomRight', 
                });
            }
            

        }
        catch (error) {
            console.error("Error during appointment submission:", error.message);
            notification.error({
            message: 'Submission Error',
            description: error.message || 'An error occurred during the submission.',
            placement: 'bottomRight',
            duration: 3,
            });
        }
        finally {
            setProcessing(false);
        }
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <div className="mb-4 text-sm text-gray-600">
                Forgot your password? No problem. Just let us know your email address and we will email you a password
                reset link that will allow you to choose a new one.
            </div>

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <form onSubmit={submit}>
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData('email', e.target.value)}
                />

                <InputError message={errors.email} className="mt-2" />

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        {processing ? <SyncOutlined spin /> : 'Email Password Reset Link'}
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
