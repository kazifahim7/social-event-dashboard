import { useState } from 'react';
import { useForm } from 'react-hook-form';

const SetNewPassword = () => {
     const [showPassword, setShowPassword] = useState(false);
     const [showConfirmPassword, setShowConfirmPassword] = useState(false);

     const {
          register,
          handleSubmit,
          watch,
          formState: { errors, isSubmitting }
     } = useForm();

     const password = watch("password");

     const onSubmit = async (data) => {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          console.log('Password reset:', data);
          // Handle password reset logic here
     };

     const togglePasswordVisibility = () => {
          setShowPassword(!showPassword);
     };

     const toggleConfirmPasswordVisibility = () => {
          setShowConfirmPassword(!showConfirmPassword);
     };


    

     return (
          <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
               <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                         <div className='flex justify-center items-center'>
                              <img src="https://i.postimg.cc/wBcLkVsq/Featured-icon.png" alt="" />
                         </div>

                         {/* Header */}
                         <div className="text-center">
                              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                   Set new password
                              </h1>
                              <p className="text-sm text-gray-600 mb-6">
                                   Your new password must be different to previously used passwords.
                              </p>
                         </div>

                         <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

                              {/* Password Field */}
                              <div>
                                   <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                        Password
                                   </label>
                                   <div className="mt-1 relative">
                                        <input
                                             id="password"
                                             type={showPassword ? "text" : "password"}
                                             autoComplete="new-password"
                                             className={`
                    appearance-none block w-full px-3 py-3 border rounded-lg shadow-sm placeholder-gray-400
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm pr-10
                    ${errors.password ? 'border-red-500' : 'border-gray-300'}
                  `}
                                             placeholder="Enter your new password"
                                             {...register('password', {
                                                  required: 'Password is required',
                                                  minLength: {
                                                       value: 6,
                                                       message: 'Password must be at least 8 characters'
                                                  },
                              
                                             })}
                                        />
                                        <button
                                             type="button"
                                             className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                             onClick={togglePasswordVisibility}
                                        >
                                             {showPassword ? (
                                                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                  </svg>
                                             ) : (
                                                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                                  </svg>
                                             )}
                                        </button>
                                   </div>

           

                                   {errors.password && (
                                        <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
                                   )}
                              </div>

                              {/* Confirm Password Field */}
                              <div>
                                   <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                        Confirm Password
                                   </label>
                                   <div className="mt-1 relative">
                                        <input
                                             id="confirmPassword"
                                             type={showConfirmPassword ? "text" : "password"}
                                             autoComplete="new-password"
                                             className={`
                    appearance-none block w-full px-3 py-3 border rounded-lg shadow-sm placeholder-gray-400
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm pr-10
                    ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}
                  `}
                                             placeholder="Confirm your new password"
                                             {...register('confirmPassword', {
                                                  required: 'Please confirm your password',
                                                  validate: value => value === password || 'Passwords do not match'
                                             })}
                                        />
                                        <button
                                             type="button"
                                             className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                             onClick={toggleConfirmPasswordVisibility}
                                        >
                                             {showConfirmPassword ? (
                                                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                  </svg>
                                             ) : (
                                                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                                  </svg>
                                             )}
                                        </button>
                                   </div>
                                   {errors.confirmPassword && (
                                        <p className="mt-2 text-sm text-red-600">{errors.confirmPassword.message}</p>
                                   )}
                              </div>

                              {/* Divider */}
                              <div className="border-t border-gray-200"></div>

                              {/* Reset Password Button */}
                              <div>
                                   <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full flex cursor-pointer justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-black bg-[#DACBA4] hover:bg-[#c9b993] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#DACBA4] disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
                                   >
                                        {isSubmitting ? (
                                             <div className="flex items-center ">
                                                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                  </svg>
                                                  Resetting...
                                             </div>
                                        ) : (
                                             'Reset password'
                                        )}
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
};

export default SetNewPassword;