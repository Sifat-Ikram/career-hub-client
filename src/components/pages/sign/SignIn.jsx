import { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
// import { useLocation, useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { AuthContext } from '../../provider/AuthProvider';

const SignIn = () => {
    const { logIn, googleRegister } = useContext(AuthContext);
    const { register, handleSubmit } = useForm();
    // const location = useLocation();
    // const navigate = useNavigate();
    // const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleGoogleRegister = () => {
        googleRegister()
            .then(res => {
                console.log(res);
                // const userInfo = {
                //     email: res.user?.email,
                //     name: res.user?.displayName
                // }
                // axios.post('https://swiftscan-diagnostics-server.vercel.app/user', userInfo)
                //     .then(res => {
                        
                //         navigate(location?.state ? location.state : '/')
                //     })
            })
            .catch(err => console.error(err.message))
    }

    const onSubmit = (data) => {

        logIn(data.email, data.password)
            .then(res => {
                console.log(res);
                Swal.fire({
                    position: "top-end",
                    title: "You signed up successfully",
                    showConfirmButton: false,
                    timer: 1500
                  });
                // navigate(location?.state ? location.state : '/')
                // setSuccess('');               
            })
            .catch(err => {
                console.error(err.message);
                setError(err.message);
            })
    }

    return (
        <div>
            <div className="my-10">
                <div className="md:w-3/4 mx-auto">
                    <div className="md:w-2/3 mx-auto gap-8">
                        <div className="flex-1 text-center py-10 w-full md:bg-[#C74208]">
                            <h1 className="md:text-6xl text-2xl font-bold max-md:text-[#C74208] text-white">Sign in here!</h1>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className='w-4/5 mx-auto space-y-7'>
                            <div>
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input name='email' type="email" {...register("email")} placeholder="email" className="input input-bordered w-full" required />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input name='password' {...register("password")} type="password" placeholder="password" className="w-full input input-bordered" required />
                            </div>
                            <div>
                                <button type='submit' className="buttons w-full">Sign in</button>
                            </div>
                            <div>
                                {
                                    error && <p>{error}</p>
                                }
                            </div>
                            <h1>Don't have an account yet, <a className='text-[#C74208]' href='/signUp'>Sign up</a> here</h1>
                        </form>
                        <div className='flex justify-center items-center mt-5 w-4/5 mx-auto'>
                            <button onClick={handleGoogleRegister} className="hover:text-white gap-3 w-full btn-outline btn border-[#C74208] rounded-md flex items-center justify-center px-3 py-2 text-[#C74208] hover:bg-[#C74208]"><FaGoogle></FaGoogle> Sign in</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;