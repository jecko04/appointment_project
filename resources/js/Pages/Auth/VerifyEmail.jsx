import GuestLayout from '@/Layouts/GuestLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@headlessui/react';
import { notification } from 'antd';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = async (e) => {
        e.preventDefault();

        post(route('verification.send'));
        
    };

    return (
        <GuestLayout>
            <Head title="Email Verification" />

            <div className="mb-4 text-sm text-gray-600">
                Thanks for signing up! Before getting started, could you verify your email address by clicking on the
                link we just emailed to you? If you didn't receive the email, we will gladly send you another.
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    A new verification link has been sent to the email address you provided during registration.
                </div>
            )}

            <form onSubmit={submit}>
                <div className="mt-4 flex items-center justify-between">
                    <PrimaryButton disabled={processing}>Resend Verification Email</PrimaryButton>

                    <Link
                        onClick={async () => {
                            try {
                                const response = await fetch(route('logout'), {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Accept': 'application/json',
                                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                                    },
                                });

                                const result = await response.json();

                                if (response.ok) {
                                    notification.success({
                                        message: 'Success',
                                        description: result.message || 'Logout successfully!',
                                        placement: 'bottomRight',
                                        duration: 3,
                                    });
                                    window.location.href = route('home');
                                } else {
                                    notification.error({
                                        message: 'Error',
                                        description: result.message || 'Logout Failed!',
                                        placement: 'bottomRight',
                                        duration: 3,
                                    });
                                }
                            } catch (error) {
                                notification.error({
                                    message: 'Error',
                                    description: 'Logout Failed!',
                                    placement: 'bottomRight',
                                    duration: 3,
                                });
                            }
                        }}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Log Out
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
