import { FaUserTie, FaBriefcase, FaEnvelope } from 'react-icons/fa';

const ChooseUs = () => {
    return (
        <div className='mb-10'>
            <h1 className='text-3xl font-bold mb-6'>Why Choose Us?</h1>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <div className='flex items-center justify-center flex-col rounded bg-base-200 p-6 mx-4'>
                    <div className='rounded-full p-4 border-dashed border-slate-800 border-2 mb-4'>
                        <FaUserTie className='text-5xl'></FaUserTie>
                    </div>
                    <div className='text-center'>
                        <h2 className='text-xl font-bold mb-2'>Professional Profiles</h2>
                        <p className='text-sm'>Access professional profiles of candidates</p>
                    </div>
                </div>
                <div className='flex items-center justify-center flex-col rounded bg-base-200 p-6 mx-4'>
                    <div className='rounded-full p-4 border-dashed border-slate-800 border-2 mb-4'>
                        <FaBriefcase className='text-5xl'></FaBriefcase>
                    </div>
                    <div className='text-center'>
                        <h2 className='text-xl font-bold mb-2'>Job Opportunities</h2>
                        <p className='text-sm'>Explore a wide range of job opportunities</p>
                    </div>
                </div>
                <div className='flex items-center justify-center flex-col rounded bg-base-200 p-6 mx-4'>
                    <div className='rounded-full p-4 border-dashed border-slate-800 border-2 mb-4'>
                        <FaEnvelope className='text-5xl'></FaEnvelope>
                    </div>
                    <div className='text-center'>
                        <h2 className='text-xl font-bold mb-2'>Email Notifications</h2>
                        <p className='text-sm'>Receive job alerts and notifications via Email</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChooseUs;
