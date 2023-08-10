import React from "react";
import PaymentFormComponent from "../../Components/PaymentForm/PaymentFormComponent";

export default function PaymentPage() {
  const handlePaymentSuccess = () => {
    console.log("Payment successful!");
    // Implement the logic you want to perform on payment success
  };

  const handlePaymentError = (errorMessage: string) => {
    console.error("Payment error:", errorMessage);
    // Implement the logic you want to perform on payment error
  };

  return (
    <>
      <PaymentFormComponent
      />
    </>
  );
}
