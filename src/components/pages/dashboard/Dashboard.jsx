import { Outlet } from 'react-router-dom';
import SecondNavbar from '../../common/second_navbar/SecondNavbar';

const Dashboard = () => {
    return (
        <div>
            <div>
                <SecondNavbar />
            </div>
            <div>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;