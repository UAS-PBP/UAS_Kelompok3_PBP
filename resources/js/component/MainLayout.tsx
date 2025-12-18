import { FC, ReactNode } from "react";
import Navbar from "@/component/Navbar";
import Footer from "./Footer";
interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="w-full md:w- min-h-screen flex flex-col">
      <Navbar />
       <div className="flex-1">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
