import { useEffect, useRef, useState } from "react";
import SectionTitle from "../../components/SectionTitle";
import Swal from "sweetalert2";
import { FaAngleDoubleRight } from "react-icons/fa";
import { useInView } from "framer-motion";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("blogs.json")
      .then((res) => res.json())
      .then((data) => setBlogs(data));
  }, []);

  return (
    <section>
      <div className="text-center mt-10 md:mt-20 mb-10">
        <SectionTitle
          heading={"Explore Our Articles"}
          subHeading={
            "Discover Insights into Microtask and Its Impact on Modern Work"
          }
        />
      </div>
      <div className="grid justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {blogs.map((blog) => (
          <Blog key={blog._id} blog={blog} />
        ))}
      </div>
    </section>
  );
};

const Blog = ({ blog }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { title, description, writer_name, writer_photo_url, address } =
    blog || {};

  const modifiedDesc =
    description.length > 250
      ? `${description.substring(0, 250)}...`
      : description;

  const handleViewFullArticle = () => {
    Swal.fire({
      title: `${title}`,
      html: `
        <div style="text-align: start;">
           <p>By ${writer_name} </p>
           </br>
           <p>${description} </p>
        </div>
      `,
      imageUrl: `${writer_photo_url}`,
      imageWidth: 150,
      imageHeight: 150,
      imageAlt: "Custom image",
    });
  };

  return (
    <div
      className="rounded-lg bg-gray-50 p-8"
      ref={ref}
      style={{
        transform: isInView ? "none" : "translateY(200px)",
        opacity: isInView ? 1 : 0,
        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 1s",
      }}
    >
      <div className="flex items-center text-gray-600 my-4">
        <img
          src={writer_photo_url}
          alt="photo"
          className="rounded-full border-4 border-white w-24"
        />
        <div className="bg-gray-500 rounded-full ml-4 mr-2 w-[2px] h-10"></div>
        <div>
          <span className="block text-xl font-extrabold">{writer_name}</span>
          <span className="block text-sm text-customOrange">{address}</span>
        </div>
      </div>
      <div>
        <h3 className="text-gray-600 font-bold my-4">{title}</h3>
        <p className="text-gray-600">{modifiedDesc}</p>
        <button
          className="btn btn-neutral btn-sm mt-4"
          onClick={handleViewFullArticle}
        >
          View Full Article
          <FaAngleDoubleRight className="text-lg" />
        </button>
      </div>
    </div>
  );
};

export default Blogs;
