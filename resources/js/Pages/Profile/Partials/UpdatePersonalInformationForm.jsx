import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { DatePicker, notification, Select } from "antd";
import moment from 'moment';

const { Option } = Select;

const UpdatePersonalInformationForm = ({  className = ''  }) => {
const user= usePage().props.auth.user

  const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
    date_of_birth: user.date_of_birth,
    age: user.age,
    gender: user.gender,
    phone: user.phone,
    address: user.address,
    emergency_contact: user.emergency_contact
  });



  const submit = (e) => {
    e.preventDefault();
    const internationalContact = data.phone.startsWith('+63')
    ? data.phone
    : `+63${data.phone.replace(/^0/, '')}`;

  setData('phone', internationalContact);

    patch(route('profile.update.info'), {
      data,
      onSuccess: () => {
        notification.success({
          message: 'Success',
          description: 'Personal information updated successfully!',
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
          description: 'There was an error updating your information.',
          placement: 'bottomRight',
          onClick: () => {
            console.log('Notification Clicked!');
          },
          duration: 3, 
        });
      }
    });
  };


  return (
    <section className={className}>
      <header>
        <h2 className="text-lg font-medium text-gray-900">Personal Information</h2>

          <p className="mt-1 text-sm text-gray-600">
                    Update your account's personal information.
          </p>
     </header>

     <form onSubmit={submit} className="mt-6 space-y-6">
              <div>
                  <InputLabel htmlFor="date_of_birth" value="Date of Birth" />

                  <DatePicker
                            id="date_of_birth"
                            name="date_of_birth"
                            type="date"
                            className="block w-full"
                            size='large'
                            value={data.date_of_birth ? moment(data.date_of_birth) : null} 
                            onChange={(date) => setData('date_of_birth', date ? date.format("YYYY-MM-DD"): null)}
                            required
                            autoComplete="date_of_birth"
                        />

                    <InputError className="mt-2" message={errors.date_of_birth} />
                </div>

                <div>
                    <InputLabel htmlFor="age" value="Age" />

                    <TextInput
                        id="age"
                        className="mt-1 block w-full"
                        value={data.age}
                        onChange={(e) => setData('age', e.target.value)}
                        required
                        autoComplete="age"
                    />

                    <InputError className="mt-2" message={errors.age} />
                </div>

                <div>
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