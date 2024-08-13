import TabBar from "@/components/tab-bar";
import { ReactNode } from "react";

export default function TabLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      {children}
      <TabBar />
    </div>
  );
}
