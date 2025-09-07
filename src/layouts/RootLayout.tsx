import { Outlet } from "react-router-dom";
import Header from "../components/Header"; // adjust path if yours differs

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />             {/* persists on all pages */}
      <main className="flex-1 min-h-0">  {/* page content */}
        <Outlet />
      </main>
    </div>
  );
}
