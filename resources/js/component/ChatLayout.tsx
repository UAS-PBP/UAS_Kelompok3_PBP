import { FC, ReactNode } from "react";
import Navbar from "@/component/Navbar";
interface ChatLayoutProps {
  children: ReactNode;
}

const ChatLayout: FC<ChatLayoutProps> = ({ children }) => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Navbar />
       <div className="flex-1">
        {children}
      </div>
    </div>
  );
};

export default ChatLayout;
