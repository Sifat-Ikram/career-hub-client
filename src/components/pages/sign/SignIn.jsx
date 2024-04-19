import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthProvider";
import Navbar from "../../common/Navbar/Navbar";
import Footer from "../../common/footer/Footer";
import { useLocation, useNavigate } from "react-router-dom";

const SignIn = () => {
  const { logIn } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const onSubmit = (data) => {
    
      logIn(data.email, data.password)
        .then((res) => {
          console.log(res);
          Swal.fire({
            position: "top-end",
            title: "You signed up successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate(location?.state ? location.state : "/");
        })
        .catch((err) => {
          setError(err.message);
        });
  };

  return (
    <div>
      <Navbar />
      <div className="my-10">
        <div className="md:w-3/4 mx-auto">
          <div className="md:w-2/3 mx-auto gap-8">
            <div className="flex-1 text-center py-10 w-full md:bg-[#C74208]">
              <h1 className="md:text-6xl text-2xl font-bold max-md:text-[#C74208] text-white">
                Sign in here!
              </h1>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-4/5 mx-auto space-y-7"
            >
              <div>
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  name="email"
                  type="email"
                  {...register("email")}
                  placeholder="email"
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  name="password"
                  {...register("password")}
                  type="password"
                  placeholder="password"
                  className="w-full input input-bordered"
                  required
                />
              </div>
              <div>
                <button type="submit" className="buttons w-full">
                  Sign in
                </button>
              </div>
              <div>{error && <p>{error}</p>}</div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignIn;
