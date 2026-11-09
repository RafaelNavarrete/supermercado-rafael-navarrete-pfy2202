import { Outlet } from "react-router";
import TopNav from "./TopNav";
import BottomNav from "./BottomNav";

function Layout() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-green-800 px-6 py-4 text-center text-white">
        <h1 className="text-xl font-bold">Supermercado · Gestión de Inventario</h1>
        <TopNav />
      </header>
      <main className="mx-auto max-w-4xl px-4 pt-6 pb-24">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}

export default Layout;