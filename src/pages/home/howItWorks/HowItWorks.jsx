import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import SectionTitle from "../../../components/SectionTitle";
import {
  FaSignInAlt,
  FaWrench,
  FaClipboardList,
  FaChartLine,
  FaGift,
  FaCreditCard,
} from "react-icons/fa";

const HowItWorks = () => {
  const howItWorks = [
    {
      _id: 1,
      title: "Sign Up Quickly",
      icon: <FaSignInAlt />,
      description:
        "Create your account in just a few clicks. It’s fast, easy, and free to join.",
      bgColor: "#CFFAFE",
      step: "One",
    },
    {
      _id: 2,
      title: "Set Up Your Workspace",
      icon: <FaWrench />,
      description:
        "Customize your workspace to fit your needs. Add tasks, projects, and team members effortlessly.",
      bgColor: "#FECACA",
      step: "Two",
    },
    {
      _id: 3,
      title: "Create or Start Tasks Instantly",
      icon: <FaClipboardList />,
      description:
        "Start adding tasks immediately. Set priorities, deadlines, and assign them to team members with ease.",
      bgColor: "#FFEDD5",
      step: "Three",
    },
    {
      _id: 4,
      title: "Track Progress in Real-Time",
      icon: <FaChartLine />,
      description:
        "Monitor your tasks and projects with real-time updates. Stay on top of deadlines and ensure everything is on track.",
      bgColor: "#CFFAFE",
      step: "Four",
    },
    {
      _id: 5,
      title: "Earn Rewards",
      icon: <FaGift />,
      description:
        "Earn coins and badges as you complete tasks. Redeem rewards and keep your motivation high.",
      bgColor: "#FFEDD5",
      step: "Five",
    },
    {
      _id: 6,
      title: "Get Paid",
      icon: <FaCreditCard />,
      description:
        "Make and receive payments securely within the platform. Enjoy peace of mind with our robust security measures.",
      bgColor: "#E7E5E4",
      step: "Six",
    },
  ];

  return (
    <section>
      <div className="text-center mt-10 md:mt-20 mb-10">
        <SectionTitle
          heading={"How It Works"}
          subHeading={"Jump Onboard With These Easy Steps"}
        />
      </div>
      <div>
        <VerticalTimeline>
          {howItWorks.map((step) => (
            <VerticalTimelineElement
              key={step._id}
              className="vertical-timeline-element--work"
              contentStyle={{ background: step.bgColor }}
              contentArrowStyle={{ borderRight: `7px solid ${step.bgColor}` }}
              date={step.step}
              iconStyle={{
                background: step.bgColor,
              }}
              icon={step.icon}
            >
              <h3 className="vertical-timeline-element-title font-semibold text-xl sm:text-2xl">
                {step.title}
              </h3>
              <h3 className="pt-3">{step.description}</h3>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>
    </section>
  );
};

export default HowItWorks;
