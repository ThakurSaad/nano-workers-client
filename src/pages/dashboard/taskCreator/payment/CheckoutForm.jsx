import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import useUser from "../../../../hooks/useUser";

const CheckoutForm = ({ dollars }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosPrivate = useAxiosPrivate();
  const { user } = useUser();
  const [error, setError] = useState();
  const [client_secret, setClient_secret] = useState("");

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const res = await axiosPrivate.post("/create-payment-intent", {
          dollars,
        });

        setClient_secret(res.data.client_secret);
      } catch (err) {
        console.log(err);
      }
    };

    createPaymentIntent();
  }, [dollars, axiosPrivate]);
  if (client_secret) {
    console.log(client_secret);
  }

  const handleSubmit = async () => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setError(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setError("");
    }

    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.display_name || "anonymous",
            email: user?.user_email || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("confirmError", confirmError);
    } else {
      console.log("paymentIntent", paymentIntent);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Secure Checkout</h1>
      <form
        className="max-w-sm border p-4 rounded-lg hover:shadow-xl duration-75"
        onSubmit={handleSubmit}
      >
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-primary btn-sm mt-3"
          type="submit"
          disabled={!stripe || !client_secret}
        >
          Pay
        </button>
        <p className="text-red-600">{error}</p>
      </form>
    </div>
  );
};

export default CheckoutForm;
