import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const LoginForm = () => {
     const [showPassword, setShowPassword] = useState(false);
     const navigate =useNavigate()
     const {
          register,
          handleSubmit,
          formState: { errors },
     } = useForm();

     const onSubmit = (data) => {
          console.log(data);
          // Handle login logic here
          Swal.fire({
               title: "Good job!",
               text: "login successfully",
               icon: "success"
          });
          navigate('/')
     };

     const togglePasswordVisibility = () => {
          setShowPassword(!showPassword);
     };

     return (
          <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
              

               <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                         <div className="sm:mx-auto sm:w-full sm:max-w-md">
                              <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
                                   Log In
                              </h2>
                         </div>
                         <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                              {/* Email Field */}
                              <div>
                                   <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email
                                   </label>
                                   <div className="mt-1">
                                        <input
                                             id="email"
                                             type="email"
                                             autoComplete="email"
                                             className={`
                    appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400
                    focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm
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

                              {/* Password Field */}
                              <div>
                                   <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Password
                                   </label>
                                   <div className="mt-1 relative">
                                        <input
                                             id="password"
                                             type={showPassword ? 'text' : 'password'}
                                             autoComplete="current-password"
                                             className={`
                    appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400
                    focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm pr-10
                    ${errors.password ? 'border-red-500' : 'border-gray-300'}
                  `}
                                             placeholder="Enter your password"
                                             {...register('password', {
                                                  required: 'Password is required',
                                                  minLength: {
                                                       value: 6,
                                                       message: 'Password must be at least 6 characters',
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
                                        {errors.password && (
                                             <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
                                        )}
                                   </div>
                              </div>

                              {/* Forgot Password Link */}
                              <div className="flex items-center justify-end">
                                   <div className="text-sm">
                                        <Link
                                             to={'/forgot'}
                                             className="font-medium text-blue-600 hover:text-blue-500"
                                        >
                                             Forgot your password?
                                        </Link>
                                   </div>
                              </div>

                              {/* Submit Button */}
                              <div>
                                   <button
                                        type="submit"
                                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-[#DACBA4] cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                   >
                                        Log In
                                   </button>
                              </div>

                              {/* Already have account link */}
                              {/* <div className="text-center">
                                   <span className="text-sm text-gray-600">
                                        Already have an account?{' '}
                                        <a
                                             href="#"
                                             className="font-medium text-blue-600 hover:text-blue-500"
                                        >
                                             Log In
                                        </a>
                                   </span>
                              </div> */}
                         </form>
                    </div>
               </div>
          </div>
     );
};

export default LoginForm;