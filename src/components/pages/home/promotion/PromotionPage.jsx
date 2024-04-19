import { Link } from "react-router-dom";
import find from "../../../../assets/home/banner.jpeg";

const PromotionPage = () => {
    return (
        <div>
            <div className="bg-base-200 w-full py-5">
                <div className="flex flex-col items-center lg:flex-row gap-5">
                    <img src={find} className="w-11/12 mx-auto md:w-1/2 rounded-lg shadow-2xl mb-4 md:mb-0" alt="Banner" />
                    <div className="text-center md:text-left">
                        <h1 className="text-xl md:text-5xl font-bold mb-4">Create a free account and start applying for jobs</h1>
                        <p className="py-2 md:py-6">Provident cupiditate voluptatem et in. Quaerat fugiat assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                        <Link to={'/signUp/employee'} className="inline-block"><button className='buttons'>Sign up</button></Link>
                    </div>
                </div>
            </div> 
        </div>
    );
};

export default PromotionPage;
