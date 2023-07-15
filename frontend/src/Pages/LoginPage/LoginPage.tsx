import { useEffect } from 'react';
import LoginFormComponent from '../../Components/LoginForm/LoginFormComponent'
import { checkAuth } from '../../authChecker';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
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
    <LoginFormComponent/>
  )
}
