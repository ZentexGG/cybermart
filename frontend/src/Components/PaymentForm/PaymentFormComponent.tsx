import { useState } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { MdPayment } from "react-icons/md";
import GooglePayButton from "@google-pay/button-react";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { useNavigate } from "react-router-dom";

const StripePayment: React.FC = () => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const handlePayment = async () => {
    try {
      setLoading(true);

      if (!stripe || !elements) {
        throw new Error("Stripe or Elements not initialized.");
      }

      const cardElement = elements.getElement(CardNumberElement);
      if (!cardElement) {
        throw new Error("Card element not found.");
      }

      const result = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: {
          name: "Jenny Rosen",
        },
      });
      if (result.error) {
        console.error("Error creating PaymentMethod:", result.error);
        // Handle error
      } else {
        const response = await axios.post(
          "https://localhost:7166/api/payments",
          {
            PaymentMethodId: result.paymentMethod.id,
            amount: 2,
          }
        );
        const data = await response.data;
        navigate("/")
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-md w-full mx-auto my-4 bg-white p-8 border border-gray-300 shadow-[10px_0px_100px_30px_#EBF8FF]">
      <div className="flex justify-center items-center text-3xl font-bold text-gray-900 text-center flex-col">
        <MdPayment size={30} />
        <p>Payment</p>
      </div>
      <div className="flex-row flex flex-wrap w-full justify-between mt-6">
        <div className="w-full lg:w-full lg:pr-2 my-2">
          <label htmlFor="firstName" className="text-sm font-bold block">
            Card Number
            <CardNumberElement className="w-full p-2 border rounded mt-1 focus:outline-none border-gray-300" />
          </label>
        </div>
        <div className="w-full lg:w-1/2 lg:pr-2">
          <label htmlFor="firstName" className="text-sm font-bold block">
            Expiry Date
          </label>
          <CardExpiryElement className="w-full p-2 border rounded mt-1 focus:outline-none border-gray-300" />
        </div>
        <div className="w-full lg:w-1/2 lg:pr-2">
          <label htmlFor="firstName" className="text-sm font-bold block">
            CVC
          </label>
          <CardCvcElement className="w-full p-2 border rounded mt-1 focus:outline-none border-gray-300" />
        </div>
      </div>{" "}
      <div className="flex justify-center flex-col items-center">
        <div className="w-full flex justify-center items-center">
          <button
            onClick={handlePayment}
            disabled={loading}
            className=" w-60 py-2 px-4 mt-6 bg-red-700 hover:bg-red-800 rounded-md text-white text-sm">
            {loading ? "Processing..." : "Pay"}
          </button>
        </div>
        <div className="mt-2">
          <GooglePayButton
            environment="TEST"
            paymentRequest={{
              apiVersion: 2,
              apiVersionMinor: 0,
              allowedPaymentMethods: [
                {
                  type: "CARD",
                  parameters: {
                    allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                    allowedCardNetworks: ["MASTERCARD", "VISA"],
                  },
                  tokenizationSpecification: {
                    type: "PAYMENT_GATEWAY",
                    parameters: {
                      gateway: "example",
                      gatewayMerchantId: "exampleGatewayMerchantId",
                    },
                  },
                },
              ],
              merchantInfo: {
                merchantId: "12345678901234567890",
                merchantName: "Demo Merchant",
              },
              transactionInfo: {
                totalPriceStatus: "FINAL",
                totalPriceLabel: "Total",
                totalPrice: "100.00",
                currencyCode: "USD",
                countryCode: "US",
              },
            }}
            onLoadPaymentData={(paymentRequest) => {
              console.log("load payment data", paymentRequest);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default StripePayment;
