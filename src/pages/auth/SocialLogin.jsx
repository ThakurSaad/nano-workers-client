import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const [googleAuthError, setGoogleAuthError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const isLoginPage = location.pathname.includes("login");

  const handleGoogleSignIn = async () => {
    try {
      setGoogleAuthError("");
      await googleSignIn();

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Welcome",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/");
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
