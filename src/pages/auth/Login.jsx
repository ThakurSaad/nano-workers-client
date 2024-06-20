import SectionTitle from "../../components/SectionTitle";
import loginImage from "../../assets/login.jpg";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import SocialLogin from "./SocialLogin";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import Loader from "../../components/Loader";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login, loading, setLoading } = useAuth();
  const [authError, setAuthError] = useState("");

  const errorElement = (
    <p className="text-center mt-2">
      <small className="text-red-500">{authError}</small>
    </p>
  );

  const onSubmit = async (data) => {
    try {
      setAuthError("");
      await login(data.email, data.password);
    } catch (error) {
      setAuthError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-screen-xl mx-auto px-2 xl:px-0">
      <div className="md:flex md:items-center">
        <div className="md:w-1/2">
          {loading ? (
            <Loader height="h-screen" />
          ) : (
            <>
              <div className="text-center mt-10 md:mt-20 mb-10">
                <SectionTitle
                  heading={"Welcome Back"}
                  subHeading={
                    "Please log in to continue managing your tasks and projects"
                  }
                />
              </div>
              <div>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col items-center"
                >
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="input input-bordered bg-slate-100 focus:bg-white w-full max-w-sm"
                      {...register("email", {
                        required: { value: true, message: "Email is required" },
                        pattern: {
                          value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                          message: "Provide a valid email",
                        },
                      })}
                    />
                    <div className="label">
                      {errors.email?.type === "required" && (
                        <span className="label-text-alt text-red-500">
                          {errors.email.message}
                        </span>
                      )}
                      {errors.email?.type === "pattern" && (
                        <span className="label-text-alt text-red-500">
                          {errors.email.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <input
                      type="password"
                      placeholder="Your Password"
                      className="input input-bordered bg-slate-100 focus:bg-white w-full max-w-sm"
                      {...register("password", {
                        required: {
                          value: true,
                          message: "Password is required",
                        },
                        minLength: {
                          value: 6,
                          message: "Password must be more than 5 characters",
                        },
                      })}
                    />
                    <div className="label">
                      {errors.password?.type === "required" && (
                        <span className="label-text-alt text-red-500">
                          {errors.password.message}
                        </span>
                      )}
                      {errors.password?.type === "minLength" && (
                        <span className="label-text-alt text-red-500">
                          {errors.password.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <input
                    className="btn bg-gradient-to-r from-customOrange to-[#ffb347] uppercase text-white border-0 w-full max-w-xs mt-3"
                    type="submit"
                    value="login"
                  />
                </form>
                <div>{errorElement}</div>
                <div className="text-center mt-4">
                  <small>
                    New to Nano Workers ?{" "}
                    <Link
                      className="text-customOrange font-semibold"
                      to="/register"
                    >
                      Register
                    </Link>
                  </small>
                </div>
                <div className="divider text-sm w-full max-w-xs mx-auto">
                  OR
                </div>
                <div className="w-full max-w-xs mx-auto">
                  <SocialLogin />
                </div>
              </div>
            </>
          )}
        </div>
        <div className="hidden md:block md:w-1/2">
          <div>
            <img
              src={loginImage}
              alt="login-image"
              className="rounded-xl md:my-8"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
