import SocialLogin from "./SocialLogin";
import loginImage from "../../assets/login.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import SectionTitle from "../../components/SectionTitle";
import useAuth from "../../hooks/useAuth";
import Loader from "../../components/Loader";
import { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser, updateUserProfile, loading, setLoading } = useAuth();
  const [authError, setAuthError] = useState("");
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const errorElement = (
    <p className="text-center mt-2">
      <small className="text-red-500">{authError}</small>
    </p>
  );

  const registerUser = async (email, password) => {
    try {
      await createUser(email, password);
    } catch (err) {
      setAuthError(err.message);
    }
  };

  const profileUpdate = async (name) => {
    try {
      await updateUserProfile(name);
    } catch (err) {
      setAuthError(err.message);
    }
  };

  const saveUserToDB = async (user) => {
    try {
      const res = await axiosPublic.post("/users", user);
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Thank you for joining us",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = async (data) => {
    try {
      setAuthError("");
      await registerUser(data.email, data.password);
      await profileUpdate(data.name);

      const user = {
        display_name: data.name,
        user_email: data.email,
        photo_url: "",
        role: data.role,
        coin: data.role === "task-creator" ? 50 : 10,
      };

      await saveUserToDB(user);
    } catch (err) {
      console.log(err);
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
                  heading={"Join Us Today!"}
                  subHeading={
                    "Create an account to start organizing your tasks and collaborating with your team."
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
                      <span className="label-text">Name*</span>
                    </label>
                    <input
                      type="name"
                      placeholder="Your Name"
                      className="input input-bordered bg-slate-100 focus:bg-white w-full max-w-sm"
                      {...register("name", {
                        required: { value: true, message: "Name is required" },
                        minLength: {
                          value: 4,
                          message: "Name must be more than 3 characters",
                        },
                      })}
                    />
                    <div className="label">
                      {errors.name?.type === "required" && (
                        <span className="label-text-alt text-red-500">
                          {errors.name.message}
                        </span>
                      )}
                      {errors.name?.type === "minLength" && (
                        <span className="label-text-alt text-red-500">
                          {errors.name.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Email*</span>
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
                      <span className="label-text">Password*</span>
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

                  <div className="form-control w-full max-w-xs">
                    <p>Select your role*</p>
                    <div className="flex mt-3 mb-1">
                      <input
                        {...register("role", {
                          required: {
                            value: true,
                            message: "Role is required",
                          },
                        })}
                        type="radio"
                        value="worker"
                        className="radio mr-2"
                        id="worker"
                      />
                      <label htmlFor="worker">Worker</label>
                      <input
                        {...register("role", {
                          required: {
                            value: true,
                            message: "Role is required",
                          },
                        })}
                        type="radio"
                        value="task-creator"
                        className="radio ml-8 mr-2"
                        id="task-creator"
                      />
                      <label htmlFor="task-creator">Task Creator</label>
                    </div>
                    {errors.role?.type === "required" && (
                      <span className="label-text-alt text-red-500">
                        {errors.role.message}
                      </span>
                    )}
                  </div>

                  <input
                    className="btn bg-gradient-to-r from-customOrange to-[#ffb347] uppercase text-white border-0 w-full max-w-xs mt-3"
                    type="submit"
                    value="register"
                  />
                </form>
                <div>{errorElement}</div>
                <div className="text-center mt-4">
                  <small>
                    Already joined Us?{" "}
                    <Link
                      className="text-customOrange font-semibold"
                      to="/login"
                    >
                      Login
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

export default Register;
