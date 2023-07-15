import { useEffect } from 'react';
import ForgotPasswordComponent from '../../Components/ForgotPassword/ForgotPasswordComponent'
import { checkAuth } from '../../authChecker';
import { useNavigate } from 'react-router-dom';

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserInfo = async () => {
      let userInfo = await checkAuth();
      if (userInfo) {
        navigate("/");
      }
    };
    fetchUserInfo();
  }, []);
  return (
    <ForgotPasswordComponent/>
  )
}
