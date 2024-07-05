import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const [googleAuthError, setGoogleAuthError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const isLoginPage = location.pathname.includes("login");

  const saveUserToDB = async (user) => {
    try {
      const res = await axiosPublic.post("/users", user);
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Thank You For Joining Us",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      if (res.data.message) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Welcome Back",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      navigate("/dashboard");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setGoogleAuthError("");
      const res = await googleSignIn();
      if (res) {
        const user = {
          display_name: res.user?.displayName,
          user_email: res.user?.email,
          photo_url: "",
          role: "worker",
          coin: 10,
        };
        saveUserToDB(user);
      }
    } catch (err) {
      console.log(err.message);
      setGoogleAuthError(err.message);
    }
  };

  return (
    <section>
      {googleAuthError && (
        <p className="text-center mb-2">
          <small className="text-red-500">{googleAuthError}</small>
        </p>
      )}
      <button
        onClick={handleGoogleSignIn}
        className="btn bg-white border-black  w-full max-w-xs uppercase mb-4"
      >
        <span className="text-2xl">
          <FcGoogle />
        </span>
        {isLoginPage ? "Login With Google" : "Register With Google"}
      </button>
      <button className="btn bg-white border-black  w-full max-w-xs uppercase mb-4">
        <span className="text-2xl">
          <FaGithub />
        </span>
        {isLoginPage ? "Login With Github" : "Register With Github"}
      </button>
    </section>
  );
};

export default SocialLogin;
