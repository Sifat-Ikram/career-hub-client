import Navbar from "../../../common/Navbar/Navbar";
import Footer from "../../../common/footer/Footer";
import Banner from "../banner/Banner";
import FeaturedJobs from "../featured_jobs/FeaturedJobs";
import JobCategories from "../job_category/JobCategories";
import JobType from "../job_type/JobType";
import PromotionPage from "../promotion/PromotionPage";
import TestimonialsPage from "../testimonials/TestimonialsPage";
import ChooseUs from "../why_choose/ChooseUs";



const HomePage = () => {
    return (
        <div>
            <Navbar />
            <div className="min-h-screen space-y-4">
              <Banner />
              <JobCategories />
              <FeaturedJobs />
              <PromotionPage />
              <JobType />
              <ChooseUs />
              <TestimonialsPage />
            </div>
            <Footer />
        </div>
    );
};

export default HomePage;