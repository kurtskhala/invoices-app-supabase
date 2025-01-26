import { Outlet } from "react-router-dom";
import Header from "./components/header";

const Layout: React.FC = () => {
  return (
    <div className="min-h-scree flex flex-col md:flex-row">
      <Header />
      <div className="flex flex-1 items-center justify-center w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
