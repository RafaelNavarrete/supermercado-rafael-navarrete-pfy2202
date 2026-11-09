import { Link, useParams } from "react-router";
import { useInventario, ACTIONS } from "../context/InventarioContext";
import { disponibleDe } from "../utils/inventario";
import EstadoBadge from "../components/EstadoBadge";
import NotFound from "./NotFound";

function DetalleArticulo() {
  const { id } = useParams();
  const { articulos, dispatch } = useInventario();
  const articulo = articulos.find((a) => a.id === Number(id));

  if (!articulo) return <NotFound />;

  const disponible = disponibleDe(articulo);
  const datos = [
    ["Código", articulo.codigo],
    ["Marca", articulo.marca],
    ["Tipo", articulo.tipo],
    ["Disponible", disponible],
    ["En tu carrito", articulo.enCarrito],
  ];

  return (
    <section className="rounded-lg bg-white p-6 shadow">
      <Link to="/articulos" className="text-sm text-green-800 underline">← Volver a artículos</Link>
      <h2 className="mt-2 mb-3 text-2xl font-bold">{articulo.nombre}</h2>

      <dl className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {datos.map(([etiqueta, valor]) => (
          <div key={etiqueta}>
            <dt className="text-sm text-gray-500">{etiqueta}</dt>
            <dd className="font-semibold">{valor}</dd>
          </div>
        ))}
        <div>
          <dt className="text-sm text-gray-500">Estado</dt>
          <dd><EstadoBadge articulo={articulo} /></dd>
        </div>
      </dl>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => dispatch({ type: ACTIONS.AUMENTAR_CANTIDAD, id: articulo.id })}
          disabled={disponible === 0}
          className="rounded-md bg-green-800 px-5 py-2 font-semibold text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {disponible === 0 ? "Sin stock" : "Agregar al carrito"}
        </button>
        <Link to="/carrito" className="rounded-md border border-green-800 px-5 py-2 font-semibold text-green-800 hover:bg-green-50">
          Ir al carrito
        </Link>
      </div>
    </section>
  );
}

export default DetalleArticulo;