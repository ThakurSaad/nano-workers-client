import {
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import footerBg from "../assets/footerBg.svg";
import { SiLeetcode } from "react-icons/si";

const Footer = () => {
  return (
    <footer
      className="footer p-5 md:p-10 text-base-content mt-10 md:mt-20"
      style={{
        backgroundImage: `url(${footerBg})`,
        backgroundSize: "cover",
      }}
    >
      <nav>
        <h6 className="text-lg md:text-xl font-bold">Programs</h6>
        <a>Corporate</a>
        <a>One to One</a>
        <a>Consulting</a>
      </nav>
      <nav>
        <h6 className="text-lg md:text-xl font-bold">Service</h6>
        <a>Training</a>
        <a>Coaching</a>
        <a>Consulting</a>
      </nav>
      <nav>
        <h6 className="text-lg md:text-xl font-bold">Contact</h6>
        <a>Home</a>
        <a>About</a>
        <a>Contact</a>
      </nav>
      <nav>
        <div className="space-y-2">
          <h6 className="text-lg font-bold">Newsletter</h6>
          <input
            type="text"
            placeholder="Your Email"
            className="border-2 border-orange-100 rounded h-11 md:w-96 px-3"
          />
          <button className="bg-customOrange rounded text-white hover:text-black py-[10px] px-4 xs:ml-2">
            Subscribe
          </button>
        </div>
        <div className="grid grid-cols-4 gap-4 mt-4">
          <a
            className="hover:scale-105"
            href="https://www.linkedin.com/in/thakur-saad/"
            target="_blank"
          >
            <FaLinkedin
              className="shadow-xl bg-white rounded-full text-5xl p-2"
              style={{ color: "#0077B5" }}
            />
          </a>
          <a
            className="hover:scale-105"
            href="https://github.com/ThakurSaad"
            target="_blank"
          >
            <FaGithub
              className="shadow-xl bg-white rounded-full text-5xl p-2"
              style={{ color: "#181717" }}
            />
          </a>
          <a
            className="hover:scale-105"
            href="https://leetcode.com/u/thakursaad/"
            target="_blank"
          >
            <SiLeetcode
              className="shadow-xl bg-white rounded-full text-5xl p-2"
              style={{ color: "#FFA116" }}
            />
          </a>
          <a
            className="hover:scale-105"
            href="https://www.facebook.com/Shadow.Monarch.Saad"
            target="_blank"
          >
            <FaFacebook
              className="shadow-xl bg-white rounded-full text-5xl p-2"
              style={{ color: "#1877F2" }}
            />
          </a>
          <a className="hover:scale-105" href="">
            <FaTwitter
              className="shadow-xl bg-white rounded-full text-5xl p-2"
              style={{ color: "#1DA1F2" }}
            />
          </a>
          <a className="hover:scale-105" href="">
            <FaYoutube
              className="shadow-xl bg-white rounded-full text-5xl p-2"
              style={{ color: "#FF0000" }}
            />
          </a>
          <a
            className="hover:scale-105"
            href="http://wa.me/+8801302926831"
            target="_blank"
          >
            <FaWhatsapp
              className="shadow-xl bg-white rounded-full text-5xl p-2"
              style={{ color: "#25D366" }}
            />
          </a>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
