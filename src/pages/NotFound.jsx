import { Link } from "react-router";

function NotFound() {
  return (
    <section>
      <h2 className="mb-2 text-2xl font-bold">404 · Página no encontrada</h2>
      <p className="mb-3">La ruta que buscas no existe.</p>
      <Link to="/" className="text-green-800 underline">
        Volver al inicio
      </Link>
    </section>
  );
}

export default NotFound;