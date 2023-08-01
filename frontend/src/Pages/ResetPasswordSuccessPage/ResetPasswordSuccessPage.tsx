import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmailSuccess from "../../Components/EmailSuccess/EmailSuccess";

export default function ResetPasswordSuccessPage() {
  const [redirectCount, setRedirectCount] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setRedirectCount((prevCount) => prevCount - 1);
    }, 1000);

    return () => {
      clearInterval(countdownInterval);
    };
  }, []);

  useEffect(() => {
      if (redirectCount === 0) {
        navigate("/login")
    }
  }, [redirectCount, navigate]);

  return (
    <div className="h-max my-24 flex flex-col items-center text-xl sm:text-xl md:text-2xl lg:text-3xl xl:text-3xl 2xl:text-4xl px-7">
      <div className="h-36">
        <EmailSuccess />
      </div>
      <p>Password successfully reset!</p>
      <p>Redirecting in {redirectCount}...</p>
    </div>
  );
}
