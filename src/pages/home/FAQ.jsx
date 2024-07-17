import SectionTitle from "../../components/SectionTitle";
import faq from "../../assets/home/faq.png";
import "./FAQ.css";

import Collapse from "rc-collapse";
import "rc-collapse/assets/index.css";
import MotionYAxisDown from "../../components/MotionYAxisDown";

const FAQ = () => {
  const items = [
    {
      label: "What is the purpose of this platform?",
      children:
        "Our platform is designed to connect workers with clients, enabling efficient and secure completion of various tasks. Whether you need assistance with a small project or a complex task, our platform facilitates the process by providing a streamlined interface and reliable communication tools.",
    },
    {
      label: "How do I create an account?",
      children:
        "To create an account, click on the 'Sign Up' button on the homepage and fill out the registration form with your details. You will need to provide a valid email address, create a password, and verify your email to complete the registration process. Once your account is set up, you can start using our services immediately.",
    },
    {
      label: "How can I reset my password?",
      children:
        "If you've forgotten your password, click on 'Forgot Password' on the login page. Enter your registered email address, and we will send you a link to reset your password. Follow the instructions in the email to create a new password and regain access to your account.",
    },
    {
      label: "What payment methods do you accept?",
      children:
        "We accept various payment methods to ensure convenience for our users. You can make payments using credit cards, debit cards, and PayPal. All transactions are securely processed to protect your financial information.",
    },
    {
      label: "How do I submit a task?",
      children:
        "To submit a task, log in to your account and navigate to the 'Submit Task' section. Fill out the task details, including the title, description, deadline, and any specific requirements. Once you have provided all the necessary information, click 'Submit' to post your task. You will receive notifications about the status of your task and any updates from workers.",
    },
    {
      label: "What should I do if I encounter a technical issue?",
      children:
        "If you experience any technical issues while using our platform, please contact our support team through the 'Contact Us' page. Provide a detailed description of the problem, and our team will assist you in resolving the issue as quickly as possible. We are committed to ensuring a smooth and hassle-free experience for all our users.",
    },
    {
      label: "Can I update my profile information?",
      children:
        "Yes, you can update your profile information at any time. Go to the 'My Profile' section after logging in to your account. You can edit your personal details, update your contact information, and change your profile picture. Keeping your profile up-to-date helps you stay connected with potential clients and workers.",
    },
    {
      label: "What is your refund policy?",
      children:
        "Our refund policy is detailed on the 'Terms and Conditions' page. Generally, refunds are issued under specific circumstances, such as task cancellations or disputes. If you believe you are eligible for a refund, please review the policy and contact our support team for assistance. We aim to address refund requests promptly and fairly.",
    },
    {
      label: "How can I contact customer support?",
      children:
        "You can contact customer support by clicking on the 'Contact Us' link at the bottom of the page. Fill out the contact form with your query or issue, and our support team will get back to you as soon as possible. We strive to provide timely and effective assistance to all our users.",
    },
    {
      label: "Are there any fees for using the platform?",
      children:
        "There are no registration fees for creating an account on our platform. However, a service fee is applied to each transaction to cover operational costs and maintain the quality of our services. The exact fee amount and details can be found in the 'Pricing' section or during the transaction process.",
    },
  ];

  return (
    <section>
      <div className="text-center mt-10 md:mt-20 mb-10">
        <SectionTitle
          heading={"FAQ"}
          subHeading={
            "Answers to common questions about our services and platform."
          }
        />
      </div>
      <MotionYAxisDown>
        <div className="md:flex md:justify-between items-center w-full">
          <img
            className="w-64 sm:w-80 lg:w-[500px] mx-auto"
            src={faq}
            alt="image"
          />
          <Collapse
            items={items}
            style={{
              border: "0",
              maxWidth: "600px",
              margin: "0 auto",
              background: "none",
            }}
          />
        </div>
      </MotionYAxisDown>
    </section>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default FAQ;
