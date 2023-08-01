import { useParams } from "react-router";
import EmailSuccess from "../../Components/EmailSuccess/EmailSuccess";

export default function ForgotPasswordSuccessPage() {
    const { email } = useParams();
  return (
    <div className="h-max my-24 flex flex-col items-center text-xl sm:text-xl md:text-2xl lg:text-3xl xl:text-3xl 2xl:text-4xl px-7">
      <div className="h-36">
        <EmailSuccess />
      </div>
      <p>We've sent a reset password link to your email</p>
      <p>{email}</p>
      <p>Please check your inbox and your spam folder!</p>
    </div>
  );
}
