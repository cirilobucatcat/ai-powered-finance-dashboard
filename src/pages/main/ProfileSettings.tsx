import { FormInput } from '@/components/FormInput';
import SEO from '@/components/SEO';
import { useAuth } from '@/context/AuthContext';
import { ProfileSettingFormType, profileSettingSchema } from '@/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FaRegUser } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { IoKeyOutline } from "react-icons/io5";
import CustomButton from '@/components/CustomButton';
import { useLoading } from '@/hooks/loading';
import { useEffect } from 'react';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword, updateProfile } from 'firebase/auth';
import { auth } from '@/firebase';
import { useError } from '@/hooks/error';
import toast from 'react-hot-toast';

const ProfileSettings = () => {
  const { user } = useAuth();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const { displayMessage } = useError();
  let currentUser = auth.currentUser;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileSettingFormType>({
    resolver: zodResolver(profileSettingSchema),
  });

  const onSubmit: SubmitHandler<ProfileSettingFormType> = async (data) => {
    startLoading()

    if (currentUser) {

      if (data.displayName) {
        await updateProfile(currentUser, { displayName: data.displayName })
      }

      if (data.currentPassword && (data.password || data.email)) {

        const credential = EmailAuthProvider.credential(currentUser.email as string, data.currentPassword)
        await reauthenticateWithCredential(currentUser, credential)
          .then(async () => {

            if (data.currentPassword && data.password) {

              await updatePassword(currentUser, data.password)
                .then(() => {
                  setValue('currentPassword', '')
                  setValue('password', '')
                  setValue('confirmPassword', '')
                  toast.success('Password updated.')
                })
                .catch(displayMessage)

            }

          })
          .catch(displayMessage)
      }

      stopLoading();
    }

  };


  useEffect(() => {

    if (user) {
      setValue('displayName', user.displayName as string)
      setValue('email', user.email as string)
    }

  }, []);

  return (
    <>
      <SEO title='Profile Settings' />
      <div className='text-slate-50 p-10 text-justify flex items-center justify-center'>
        <div className='w-1/2 bg-slate-900 rounded-md p-6'>
          <h3 className='text-electric-lime font-bold text-2xl uppercase'>Profile Settings</h3>
          <form className='mt-8 space-y-2' onSubmit={handleSubmit(onSubmit)}>

            <FormInput
              name="displayName"
              label="Full Name"
              type="text"
              register={register}
              error={errors.displayName}
              className="w-full"
              placeholder="Enter your full name"
              containerClass="w-full"
              prependIcon={<FaRegUser color="#cfff04" size={20} />}
            />

            <FormInput
              name="email"
              label="Email"
              type="email"
              register={register}
              error={errors.email}
              className="w-full"
              placeholder="Enter your email"
              containerClass="w-full"
              prependIcon={<MdOutlineAlternateEmail color="#cfff04" size={20} />}
            />

            <FormInput
              name="currentPassword"
              label="Current Password"
              type="password"
              register={register}
              error={errors.currentPassword}
              className="w-full"
              placeholder="Enter your current password"
              containerClass="w-full mt-12"
              prependIcon={<IoKeyOutline color="#cfff04" size={20} />}
            />

            <FormInput
              name="password"
              label="New Password"
              type="password"
              register={register}
              error={errors.password}
              className="w-full"
              placeholder="Enter your new password"
              containerClass="w-full"
              prependIcon={<IoKeyOutline color="#cfff04" size={20} />}
            />

            <FormInput
              name="confirmPassword"
              label="Confirm New Password"
              type="password"
              register={register}
              error={errors.confirmPassword}
              className="w-full"
              placeholder="Confirm your new password"
              containerClass="w-full"
              prependIcon={<IoKeyOutline color="#cfff04" size={20} />}
            />

            <CustomButton
              isLoading={isLoading}
              type="submit"
              disabled={isLoading}
              className="mt-8 bg-electric-lime flex justify-center items-center text-slate-900 w-full text-sm p-3 rounded disabled:opacity-75 cursor-pointer disabled:cursor-not-allowed"
            >
              {isLoading ? 'Processing...' : 'Save Changes'}
            </CustomButton>

          </form>
        </div>
      </div>
    </>
  )
}

export default ProfileSettings