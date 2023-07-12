import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import image from '../assets/images/joanna-kosinska-1_CMoFsPfso-unsplash.jpg';
import AnimatedPage from './AnimatedPage';
import ErrorModal from './UI/ErrorModal';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { createUser } = UserAuth();

  const navigate = useNavigate();

  const handleSubmit = async (error) => {
    error.preventDefault();
    setError('');
    try {
      await createUser(email, password);
      navigate('/home');
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <div>
      {error && (
        <ErrorModal
          title={error}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <img className=' w-full h-auto fixed top-0' src={image} alt='back' />

      <div
        className='absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed '
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
      >
        <div className=' absolute bottom-0 left-0 right-0 top-5 h-full w-full overflow-hidden bg-fixed flex flex-col items-center '>
          <AnimatedPage>
            <h1 className='text-5xl font-bold py-2 text-slate-50 my-4'>
              Crate Your Account
            </h1>
            <h5 className='font-bold text-slate-50 -my-4 text-center'>
              Ready to Make your Life more Easier ?
            </h5>
          </AnimatedPage>
        </div>
        <AnimatedPage>
          <div className=' min-w-[700px] max-h-[410px] p-4 rounded-lg  shadow-xl text-center  absolute left-[27vw] top-[27vh] backdrop-blur-sm bg-white/30 '>
            <form onSubmit={handleSubmit}>
              <div className='flex flex-col py-2'>
                <div className='text-center'>
                  <h1 className='text-3xl font-bold text-slate-50 text-center '>
                    SignUp
                  </h1>
                </div>
                <label className='py-2 font-medium text-left '>
                  Your Email
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  className='border p-3'
                  type='email'
                  placeholder='e.g. elon@tesla.com'
                />
              </div>
              <div className='flex flex-col py-2'>
                <label className='py-2 font-medium text-left'>
                  Your Password
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  className='border p-3'
                  type='password'
                  placeholder='e.g. iLovetoArrangeMyLife'
                />
              </div>
              <button className=' rounded-full my-4 inline-block w-full bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]'>
                Sign Up
              </button>
            </form>
          </div>
        </AnimatedPage>
      </div>
    </div>
  );
};

export default SignUp;
