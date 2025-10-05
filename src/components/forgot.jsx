import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';

const ForgotPassword = () => {
     const [step, setStep] = useState('email'); // 'email' or 'otp'
     const [email, setEmail] = useState('');
     const [otp, setOtp] = useState(['', '', '', '']);
     const inputRefs = useRef([]);

     const {
          register,
          handleSubmit,
          formState: { errors, isSubmitting },
     } = useForm();

     const onSubmit = async (data) => {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          console.log('OTP sent to:', data.email);
          setEmail(data.email);
          setStep('otp');
     };

     const handleOtpChange = (index, value) => {
          if (!/^\d?$/.test(value)) return; // Only allow numbers

          const newOtp = [...otp];
          newOtp[index] = value;
          setOtp(newOtp);

          // Auto-focus next input
          if (value && index < 3) {
               inputRefs.current[index + 1].focus();
          }
     };

     const handleKeyDown = (index, e) => {
          if (e.key === 'Backspace' && !otp[index] && index > 0) {
               // Move to previous input on backspace
               inputRefs.current[index - 1].focus();
          }
     };

     const handlePaste = (e) => {
          e.preventDefault();
          const pasteData = e.clipboardData.getData('text').slice(0, 4);
          const pasteArray = pasteData.split('');

          const newOtp = [...otp];
          pasteArray.forEach((char, index) => {
               if (index < 4 && /^\d$/.test(char)) {
                    newOtp[index] = char;
               }
          });

          setOtp(newOtp);

          // Focus the last filled input or the last one
          const lastFilledIndex = Math.min(pasteArray.length - 1, 3);
          inputRefs.current[lastFilledIndex].focus();
     };

     const handleOtpSubmit = (e) => {
          e.preventDefault();
          const otpValue = otp.join('');
          if (otpValue.length === 4) {
               console.log('OTP verified:', otpValue);
               // Handle OTP verification logic here
          }
     };

     const handleResendOtp = () => {
          if (email) {
               onSubmit({ email });
          }
     };

     if (step === 'otp') {
          return (
               <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                              <div className='flex items-center justify-center'>
                                   <img src="https://i.postimg.cc/9QvHBPH7/Featured-icon-1.png" alt="" />
                              </div>
                              {/* Header */}
                              <div className="text-center">
                                   <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                        Check your email
                                   </h1>
                                   <p className="text-sm text-gray-600 mb-2">
                                        We sent a verification code to
                                   </p>
                                   <p className="text-sm font-medium text-gray-900 mb-6">
                                        {email}
                                   </p>
                              </div>

                              <form onSubmit={handleOtpSubmit} className="space-y-6">
                                   {/* OTP Input - 4 Boxes */}
                                   <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                             Enter verification code
                                        </label>
                                        <div className="flex justify-between space-x-3">
                                             {[0, 1, 2, 3].map((index) => (
                                                  <input
                                                       key={index}
                                                       ref={(el) => (inputRefs.current[index] = el)}
                                                       type="text"
                                                       maxLength={1}
                                                       value={otp[index]}
                                                       onChange={(e) => handleOtpChange(index, e.target.value)}
                                                       onKeyDown={(e) => handleKeyDown(index, e)}
                                                       onPaste={handlePaste}
                                                       className="w-full h-12 text-center text-lg font-semibold border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                       inputMode="numeric"
                                                       pattern="[0-9]*"
                                                  />
                                             ))}
                                        </div>
                                   </div>

                                   {/* Verify Button */}
                                   <button
                                        type="submit"
                                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-black bg-[#DACBA4] hover:bg-[#c9b993] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#DACBA4] transition duration-200"
                                   >
                                        Verify OTP
                                   </button>

                                   {/* Resend OTP */}
                                   <div className="text-center">
                                        <button
                                             onClick={handleResendOtp}
                                             type="button"
                                             className="text-sm text-blue-600 hover:text-blue-500 transition duration-200"
                                        >
                                             Didn't receive the code? Click to resend
                                        </button>
                                   </div>

                                   {/* Back to Log In */}
                                   <div className="text-center">
                                        <a
                                             href="/login"
                                             className="inline-flex items-center text-sm font-medium text-black hover:text-blue-500 transition duration-200"
                                        >
                                             <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                             </svg>
                                             Back to log in
                                        </a>
                                   </div>
                              </form>
                         </div>
                    </div>
               </div>
          );
     }

     return (
          <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
               <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">

                         <div className='flex items-center justify-center'>
                              <img src="https://i.postimg.cc/wBcLkVsq/Featured-icon.png" alt="" />
                         </div>
                         {/* Header */}
                         <div className="text-center">
                              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                   Forgot password?
                              </h1>
                              <p className="text-sm text-gray-600 mb-6">
                                   No worries, we'll send you reset instructions.
                              </p>
                         </div>

                         <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                              {/* Email Field */}
                              <div>
                                   <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email
                                   </label>
                                   <div className="mt-1">
                                        <input
                                             id="email"
                                             type="email"
                                             autoComplete="email"
                                             className={`
                    appearance-none block w-full px-3 py-3 border rounded-lg shadow-sm placeholder-gray-400
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm
                    ${errors.email ? 'border-red-500' : 'border-gray-300'}
                  `}
                                             placeholder="Enter your email"
                                             {...register('email', {
                                                  required: 'Email is required',
                                                  pattern: {
                                                       value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                       message: 'Invalid email address',
                                                  },
                                             })}
                                        />
                                        {errors.email && (
                                             <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
                                        )}
                                   </div>
                              </div>

                              {/* Divider */}
                              <div className="border-t border-gray-200"></div>

                              {/* Get OTP Button */}
                              <div>
                                   <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-black bg-[#DACBA4] hover:bg-[#c9b993] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#DACBA4] disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
                                   >
                                        {isSubmitting ? (
                                             <div className="flex items-center">
                                                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                  </svg>
                                                  Sending...
                                             </div>
                                        ) : (
                                             'Get OTP'
                                        )}
                                   </button>
                              </div>

                              {/* Back to Log In Link */}
                              <div className="text-center">
                                   <a
                                        href="/login"
                                        className="inline-flex items-center text-sm font-medium text-black hover:text-blue-500 transition duration-200"
                                   >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                        </svg>
                                        Back to log in
                                   </a>
                              </div>
                         </form>
                    </div>
               </div>
          </div>
     );
};

export default ForgotPassword;