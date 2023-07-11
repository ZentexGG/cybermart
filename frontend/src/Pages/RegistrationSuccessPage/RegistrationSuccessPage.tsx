import React from 'react'
import { useParams } from 'react-router-dom'
import EmailSuccess from '../../Components/EmailSuccess/EmailSuccess';

export default function RegistrationSuccessPage() {
    const { email } = useParams();
  return (
      <div className='h-max my-24 flex flex-col items-center text-xl sm:text-xl md:text-2xl lg:text-3xl xl:text-3xl 2xl:text-4xl px-7'>
          <div className='h-36'>  
            <EmailSuccess  />
          </div>
          <p>We've sent a verification email to your address</p>
          <p>{email}</p>
            <p>Please check your inbox and your spam folder!</p>
            <p className='text-red-700'>Note: Your account will not be functional unless you verify your email!</p>
      </div>
  )
}
