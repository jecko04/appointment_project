import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { DatePicker, Alert } from "antd";
import moment from 'moment';
import { useState } from 'react';

const UpdatePersonalInformationForm = ({  className = ''  }) => {
const user= usePage().props.auth.user

const [alertMessage, setAlertMessage] = useState(null);
const [alertType, setAlertType] = useState(null)

  const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
    bod: user.date_of_birth,
    age: user.age,
    gender: user.gender,
    phone: user.phone,
    address: user.address,
    emergency_contact: user.emergency_contact
  });

    const submit = (e) => {
        e.preventDefault();
        
        patch(route('profile.update.personalinfo')), {
            data,
            onSuccess: () => {
                setAlertMessage('Personal information updated successfully!');
                setAlertType('success');
            },
            onError: () => {
                setAlertMessage('There was an error updating your information.');
                setAlertType('error');
            }
        }};

  return (
    <section className={className}>
      <header>
        <h2 className="text-lg font-medium text-gray-900">Personal Information</h2>

          <p className="mt-1 text-sm text-gray-600">
                    Update your account's personal information.
          </p>
     </header>

     {alertMessage && (
        <Alert
        message={alertMessage}
        type={alertType}
        showIcon
        className="mb-4"
        />
     )}

     <form onSubmit={submit} className="mt-6 space-y-6">
              <div>
                  <InputLabel htmlFor="date_of_birth" value="Date of Birth" />

                    <DatePicker
                        id="date_of_birth"
                        name="date_of_birth"
                        className="mt-1 block w-full"
                        size='large'
                        value={data.bod ? moment(data.bod) : null} 
                        onChange={(dateString) => setData('bod', dateString)} 
                        required
                        autoComplete="date_of_birth"
                    />

                    <InputError className="mt-2" message={errors.bod} />
                </div>

                <div>
                    <InputLabel htmlFor="age" value="Age" />

                    <TextInput
                        id="age"
                        className="mt-1 block w-full"
                        value={data.age}
                        onChange={(e) => setData('age', e.target.value)}
                        required
                        isFocused
                        autoComplete="age"
                    />

                    <InputError className="mt-2" message={errors.age} />
                </div>

                <div>
                    <InputLabel htmlFor="gender" value="Gender" />

                    <TextInput
                        id="gender"
                        className="mt-1 block w-full"
                        value={data.gender}
                        onChange={(e) => setData('gender', e.target.value)}
                        required
                        isFocused
                        autoComplete="gender"
                    />

                    <InputError className="mt-2" message={errors.gender} />
                </div>

                <div>
                    <InputLabel htmlFor="phone" value="Phone" />

                    <TextInput
                        id="phone"
                        name="phone"
                        type="tel"
                        value={data.phone}
                        className="mt-1 block w-full"
                        autoComplete="phone"
                        isFocused={true}
                        onChange={(e) => setData('phone', e.target.value)}
                        required
                    />

                    <InputError className="mt-2" message={errors.phone} />
                </div>

                <div>
                    <InputLabel htmlFor="address" value="Address" />

                    <TextInput
                        id="address"
                        name="address"
                        value={data.address}
                        className="mt-1 block w-full"
                        autoComplete="address"
                        isFocused={true}
                        onChange={(e) => setData('address', e.target.value)}
                        required
                    />

                    <InputError className="mt-2" message={errors.address} />
                </div>

                <div>
                    <InputLabel htmlFor="emergency_contact" value="Emergencyy Contact (name - contact)" />

                    <TextInput
                        id="emergency_contact"
                        className="mt-1 block w-full"
                        value={data.emergency_contact}
                        onChange={(e) => setData('emergency_contact', e.target.value)}
                        required
                        isFocused
                        autoComplete="emergency_contact"
                    />

                    <InputError className="mt-2" message={errors.emergency_contact} />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
     </form>
    </section>
  )
}

export default UpdatePersonalInformationForm