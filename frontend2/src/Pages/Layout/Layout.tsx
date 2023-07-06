import { Outlet } from "react-router-dom";
import FooterComponent from "../../Components/Footer/FooterComponent";
import NavbarComponent from "../../Components/Navbar/NavbarComponent";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow">
        <NavbarComponent/>
        <Outlet/>
      </div>
      <div className="bg-white shadow mt-auto">
        <FooterComponent/>
      </div>
    </div>
  );
};

export default Layout;
