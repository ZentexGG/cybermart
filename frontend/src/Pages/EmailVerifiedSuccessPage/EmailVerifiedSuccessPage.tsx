import { useEffect, useState } from "react";
import EmailSuccess from "../../Components/EmailSuccess/EmailSuccess";
import { useNavigate } from "react-router";

export default function EmailVerifiedSuccessPage() {
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
        navigate("/login");
      }
    }, [redirectCount, navigate]);
  return (
    <div className="h-max my-24 flex flex-col items-center text-xl sm:text-xl md:text-2xl lg:text-3xl xl:text-3xl 2xl:text-4xl px-7">
      <div className="h-36">
        <EmailSuccess />
      </div>
      <p>You have successfully verified your email!</p>
          <p>You can now log in using your account</p>
          <p>Redirecting to login in {redirectCount}...</p>
    </div>
  );
}
