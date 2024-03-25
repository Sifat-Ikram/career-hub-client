
const Footer = () => {
  return (
    <footer className="bg-[#C74208] text-white py-8">
      <div className="container mx-auto">
        <div className="mb-8 font-semibold">
          <ul className="flex max-md:justify-evenly justify-center md:gap-16 flex-wrap gap-3">
            <li>
              <a href="/" className="text-white hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/allJob" className="text-white hover:underline">
                Jobs
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:underline">
                Employers
              </a>
            </li>
            <li>
              <a href="/aboutUs" className="text-white hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="/contactUs" className="text-white hover:underline">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
        <div className="text-center font-semibold px-8">
          <h3 className="text-4xl font-bold mb-4">Career Hub</h3>
          <p className="mb-4">
            Empowering careers, connecting talent. Find your dream job with
            Career Hub.
          </p>
          <p className="mb-4">&copy; 2024 Career Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
