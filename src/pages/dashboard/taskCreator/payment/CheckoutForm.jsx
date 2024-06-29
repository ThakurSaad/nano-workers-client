import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import useUser from "../../../../hooks/useUser";
import Swal from "sweetalert2";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import useDateTime from "../../../../hooks/useDateTime";

const CheckoutForm = ({ dollars, coins }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosPrivate = useAxiosPrivate();
  const currentDateTime = useDateTime();
  const { user, refetch } = useUser();
  const [error, setError] = useState();
  const [client_secret, setClient_secret] = useState("");
  const [loading, setLoading] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        setLoading(true);
        const res = await axiosPrivate.post("/create-payment-intent", {
          dollars,
        });
        setLoading(false);

        setClient_secret(res.data.client_secret);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    createPaymentIntent();
  }, [dollars, axiosPrivate]);

  const savePaymentToDB = async (payment) => {
    try {
      setLoading(true);
      const res = await axiosPrivate.post("/payment", payment);
      setLoading(false);

      if (res.data.insertedId) {
        refetch();
        Swal.fire(
          `Successful`,
          `Your payment has been saved. <br /> ${coins} coins have been transferred to your account.`,
          "success"
        );
      } else {
        Swal.fire(
          `Something went wrong`,
          `Please try again after hard reload (ctrl + shift + R)`,
          "error"
        );
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    setLoading(true);
    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setError("");
    }

    // confirm payment
    setLoading(true);
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
    setLoading(false);

    if (confirmError) {
      setTransactionId("");
      Swal.fire(
        `${confirmError.message}`,
        "If this persist please hard reload (ctrl + shift + R) the page",
        "error"
      );
    } else {
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);

        const payment = {
          email: user.user_email,
          name: user.display_name,
          transactionId: paymentIntent.id,
          current_date: currentDateTime,
          coin_purchase: coins,
          amount: dollars,
        };

        await savePaymentToDB(payment);
      }
    }
  };

  return (
    <section>
      {transactionId && (
        <div className="bg-orange-50 max-w-sm mx-auto rounded-lg p-2 xs:p-4 my-4 space-y-2">
          <p className="text-sm text-green-600 border border-green-600 flex items-center bg-green-100 rounded-lg w-24 p-1">
            <FaCheckCircle className="mr-1" /> Success
          </p>
          <h4 className="text-xl">Transaction ID</h4>
          <p className="text-customOrange">{transactionId}</p>
          <p className="text-sm">
            <Link
              className="flex items-center hover:underline"
              to="/dashboard/paymentHistory"
            >
              Go to payment history <FaArrowRight className="ml-1" />
            </Link>
          </p>
        </div>
      )}
      <div className="text-center max-w-md mx-auto p-4 bg-white rounded-lg">
        <h1 className="text-2xl font-semibold mb-4">Secure Checkout</h1>
        <form
          className="max-w-sm mx-auto border p-4 rounded-lg duration-75"
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
          <div className="text-center">
            {/* {loading && <p className="text-customOrange mt-6 mb-3">Processing...</p>} */}
            <p className="text-red-600 mt-6 mb-3">{error}</p>
            <button
              className="btn btn-neutral btn-sm w-40 mx-auto uppercase disabled:text-gray-500"
              type="submit"
              disabled={!stripe || !client_secret || loading || transactionId}
            >
              {loading ? (
                <>
                  Processing
                  <div className="flex items-center justify-center">
                    <div>
                      <div className="w-6 h-6 border-t-4 border-b-4 border-neutral rounded-full animate-spin"></div>
                    </div>
                  </div>
                </>
              ) : (
                "Pay"
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CheckoutForm;
