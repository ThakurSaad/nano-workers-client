import { FaLock, FaMedal } from "react-icons/fa";
import SectionTitle from "../../components/SectionTitle";
import { IoDocumentText } from "react-icons/io5";
import { GiTeamIdea } from "react-icons/gi";
import { LuWorkflow } from "react-icons/lu";
import { SiGoogleanalytics } from "react-icons/si";
import MotionRight from "../../components/MotionRight";

const Featured = () => {
  const features = [
    {
      _id: 1,
      title: "Earn Coins by Completing Tasks",
      icon: <FaMedal />,
      description:
        "Stay motivated and boost your productivity by earning coins for every task you complete. Use your coins for rewards and recognition",
      bgColor: "bg-blue-100",
    },
    {
      _id: 2,
      title: "Create and Manage Tasks",
      icon: <IoDocumentText />,
      description:
        "Easily create, assign, and track tasks to keep your projects organized and on schedule. Manage tasks with intuitive tools that simplify your workflow",
      bgColor: "bg-orange-100",
    },
    {
      _id: 3,
      title: "Collaborate Seamlessly",
      icon: <GiTeamIdea />,
      description:
        "Enhance team collaboration with real-time communication and task sharing. Work together effortlessly, no matter where your team is located",
      bgColor: "bg-red-100",
    },
    {
      _id: 4,
      title: "Secure Payments",
      icon: <FaLock />,
      description:
        "Ensure safe and secure transactions with our robust payment system. Make and receive payments with confidence and peace of mind.",
      bgColor: "bg-cyan-100",
    },
    {
      _id: 5,
      title: "Customizable Workflows",
      icon: <LuWorkflow />,
      description:
        "Tailor workflows to fit your unique processes and needs. Customize task stages, priorities, and deadlines to match your team's workflow",
      bgColor: "bg-lime-100",
    },
    {
      _id: 6,
      title: "Insightful Analytics",
      icon: <SiGoogleanalytics />,
      description:
        "Gain valuable insights with detailed reports and analytics. Monitor performance, track progress, and make informed decisions to optimize your tasks and projects.",
      bgColor: "bg-stone-100",
    },
  ];

  return (
    <section>
      <div className="text-center mt-10 md:mt-20 mb-10">
        <SectionTitle
          heading={"Features"}
          subHeading={"Unlock Productivity with These Key Features"}
        />
      </div>

      <MotionRight>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 justify-items-center">
          {features.map((feature) => (
            <div
              key={feature._id}
              className={`${feature.bgColor} w-full p-4 rounded-3xl`}
            >
              <div className="text-8xl bg-500 flex justify-center">
                {feature.icon}
              </div>
              <h4 className="text-xl text-center font-semibold py-4">
                {feature.title}
              </h4>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </MotionRight>
    </section>
  );
};

export default Featured;
