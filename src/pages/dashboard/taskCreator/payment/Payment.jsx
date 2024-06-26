import { useParams } from "react-router-dom";
import SectionTitle from "../../../../components/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { FaCoins, FaDollarSign } from "react-icons/fa";

const stripePromise = loadStripe(
  "pk_test_51L0k3pBXb2oMSwoOsHqTSof6vAX4IAro7WMoVRpsdMsqRPZrehiaEZWObsFHZKvEkuvTGaeWLNaEYSpmGbPH1d8P00R4yJVRYn"
);

const Payment = () => {
  const { title } = useParams();
  let coins;
  let dollars;

  switch (title) {
    case "Basic":
      coins = 10;
      dollars = 1;
      break;
    case "Standard":
      coins = 100;
      dollars = 9;
      break;
    case "Premium":
      coins = 500;
      dollars = 19;
      break;
    case "Ultimate":
      coins = 1000;
      dollars = 39;
      break;
    default:
      console.log("Unknown title");
  }

  return (
    <section>
      <div>
        <SectionTitle
          heading={`Stripe Payment`}
          subHeading={"Complete your purchase quickly and securely"}
        />
      </div>
      <div>
        <h3 className="text-xl">Details</h3>
        <p className="text-gray-500 flex items-center mb-4">
          {title} Package | &nbsp;
          <FaCoins className="text-lg inline" /> &nbsp; {coins} &nbsp;|&nbsp;
          <FaDollarSign className="text-lg inline" /> {dollars}
        </p>
      </div>
      <div>
        <Elements stripe={stripePromise}>
          <CheckoutForm coins={coins} dollars={dollars} />
        </Elements>
      </div>
    </section>
  );
};

export default Payment;
