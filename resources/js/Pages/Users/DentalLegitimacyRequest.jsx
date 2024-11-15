import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import { Head } from '@inertiajs/react'
import { Button, notification } from 'antd'
import React, { useState } from 'react'

const DentalLegitimacyRequest = () => {

    const [email, setEmail] = useState('');
    const [processing, setProcessing] = useState(false);

    const submit = async (e) => {
        e.preventDefault();

        if (!email) {
            notification.error({
                message: 'Validation Error',
                description: 'Please enter a valid email address.',
                placement: 'bottomRight',
                duration: 3,
            });
            return;
        }

        setProcessing(true);
        try {
            const response = await fetch(route('request.legitimacy.send'), {  
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                },
                body: JSON.stringify({ email }), 
              });

            const result = await response.json();

            if (response.ok) {
                notification.success({
                    message: 'Success',
                    description: 'Request set successfully!',
                    placement: 'bottomRight',
                });
                window.location.href = result.redirect; 
            } else {
                notification.error({
                    message: 'Error',
                    description: 'Request Failed!',
                    placement: 'bottomRight',
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
        }
    }

  return (
    <>
            <div className='bg-white'>
                <Head title="SMTC - Dental Care"/>
                <div 
                    className='lg:max-w-[30rem] shadow-xl rounded-xl' 
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)" 
                    }}
                >
                    <form onSubmit={submit} className='flex flex-col gap-2 lg:max-w-[30rem] p-[2rem]'>
                        <span className='text-gray-500 text-sm mb-4'>
                            Please provide your email to request verification of the dentist's legitimacy.
                        </span>

                        <InputLabel htmlFor="request" value="Enter your email" />
                        <TextInput
                            id="request"
                            name="request"
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}  
                            className="mt-1 block w-full text-sm"
                            required
                        />
                        <Button type='primary' onClick={submit} loading={processing}>
                            {processing ? 'Submitting...' : 'Request'}
                        </Button>
                    </form>
                </div>
            </div>
        </>
  )
}

export default DentalLegitimacyRequest