import { useState } from "react";
import { Link } from "react-router";
import { useInventario } from "../context/InventarioContext";
import { CATEGORIAS, disponibleDe } from "../utils/inventario";
import Tabla from "../components/Tabla";
import EstadoBadge from "../components/EstadoBadge";

const columnas = [
  { titulo: "#", className: "text-center", render: (_, i) => i + 1 },
  {
    titulo: "Nombre",
    render: (a) => (
      <Link to={`/articulos/${a.id}`} className="text-green-800 underline">{a.nombre}</Link>
    ),
  },
  { titulo: "Marca", render: (a) => a.marca },
  { titulo: "Tipo", render: (a) => a.tipo },
  { titulo: "Disponible", className: "text-right", render: (a) => disponibleDe(a) },
  { titulo: "Estado", className: "text-center", render: (a) => <EstadoBadge articulo={a} /> },
];

function ListaArticulos() {
  const { articulos } = useInventario();
  const [categoria, setCategoria] = useState("Todas");

  const visibles = categoria === "Todas" ? articulos : articulos.filter((a) => a.tipo === categoria);

  return (
    <section>
      <h2 className="mb-2 text-2xl font-bold">Artículos del inventario</h2>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <p>
          Mostrando <strong>{visibles.length}</strong> de {articulos.length} artículos.
        </p>
        <div className="flex items-center gap-2">
          <label htmlFor="categoria">Categoría:</label>
          <select
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-1.5 focus:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-200"
          >
            <option value="Todas">Todas</option>
            {CATEGORIAS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="rounded-lg bg-white p-4 shadow">
        <Tabla
          columnas={columnas}
          filas={visibles}
          vacio={
            <>
              No hay artículos en esta categoría.{" "}
              <Link to="/agregar-articulo" className="text-green-800 underline">Agrega uno</Link>.
            </>
          }
        />
      </div>
    </section>
  );
}

export default ListaArticulos;