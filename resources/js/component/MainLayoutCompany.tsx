import { FC, ReactNode } from "react";
import NavbarCompany from "@/component/NavbarCompany";
import Footer from "./Footercompany";

interface MainLayoutProps {
  children: ReactNode;
  onAccountClick?: () => void;
  accountRef?: React.RefObject<HTMLDivElement | null>;
  justSignedUp?: boolean;
}

const MainLayout: FC<MainLayoutProps> = ({ children, onAccountClick, accountRef, justSignedUp } : MainLayoutProps) => {
  return (
    <div className="w-full min-h-screen">
      <NavbarCompany accountRef={accountRef} onAccountClick={onAccountClick}  justSignedUp={justSignedUp}/>
      <div className="flex-1">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
