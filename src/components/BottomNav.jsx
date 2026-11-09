import { NavLink } from "react-router";

function BottomNav() {
  const linkClass = ({ isActive }) =>
    `flex-1 px-2 py-3.5 text-center text-xs font-medium no-underline hover:bg-green-50 sm:text-sm ${
      isActive ? "bg-green-50 font-bold text-green-800" : "text-gray-600"
    }`;

  return (
    <nav
      aria-label="Navegación principal"
      className="fixed inset-x-0 bottom-0 flex border-t-2 border-green-800 bg-white shadow-[0_-2px_8px_rgba(0,0,0,0.1)]"
    >
      <NavLink to="/" end className={linkClass}>
        Inicio
      </NavLink>
      <NavLink to="/quienes-somos" className={linkClass}>
        Quiénes somos
      </NavLink>
      <NavLink to="/preguntas-frecuentes" className={linkClass}>
        Preguntas frecuentes
      </NavLink>
    </nav>
  );
}

export default BottomNav;