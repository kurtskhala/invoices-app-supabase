import { Outlet } from "react-router-dom";
import Header from "./components/header";

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <Header />
      <div className="flex items-center justify-center w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
