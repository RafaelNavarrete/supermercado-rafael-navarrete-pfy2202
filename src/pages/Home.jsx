import { useState } from "react";
import { useInventario } from "../context/InventarioContext";
import { disponibleDe, estadoDe, estilosTexto } from "../utils/inventario";
import Tabla from "../components/Tabla";
import EstadoBadge from "../components/EstadoBadge";

const columnas = [
  { titulo: "#", className: "text-center", render: (_, i) => i + 1 },
  {
    titulo: "Producto/Código",
    render: (p) => (
      <>
        {p.nombre}
        <small className="block font-bold text-gray-500">{p.codigo}</small>
      </>
    ),
  },
  { titulo: "Inventario inicial", className: "text-right", render: (p) => p.inicial },
  { titulo: "Inventario recibido", className: "text-right", render: (p) => p.recibido },
  { titulo: "Inventario enviado", className: "text-right", render: (p) => p.enviado },
  {
    titulo: "Inventario disponible",
    className: "text-right",
    render: (p) => <strong className={estilosTexto[estadoDe(p)]}>{disponibleDe(p)}</strong>,
  },
  { titulo: "Estado", className: "text-center", render: (p) => <EstadoBadge articulo={p} /> },
];

function Home() {
  const { articulos } = useInventario();
  const [busqueda, setBusqueda] = useState("");

  const total = articulos.length;
  const bajos = articulos.filter((p) => estadoDe(p) === "bajo").length;
  const agotados = articulos.filter((p) => estadoDe(p) === "agotado").length;

  const texto = busqueda.toLowerCase();
  const filtrados = articulos.filter(
    (p) => p.nombre.toLowerCase().includes(texto) || p.codigo.toLowerCase().includes(texto)
  );

  return (
    <section>
      <h2 className="mb-2 text-2xl font-bold">Panel de inventario</h2>
      <p>Revisa el stock de los productos y detecta rápidamente cuáles necesitan reposición.</p>

      <div className="my-4 grid grid-cols-3 gap-3">
        <div className="rounded-lg bg-white p-4 text-center shadow">
          <strong className="block text-3xl">{total}</strong>
          <span>Productos</span>
        </div>
        <div className="rounded-lg bg-white p-4 text-center shadow">
          <strong className="block text-3xl text-orange-600">{bajos}</strong>
          <span>Stock bajo</span>
        </div>
        <div className="rounded-lg bg-white p-4 text-center shadow">
          <strong className="block text-3xl text-red-700">{agotados}</strong>
          <span>Agotados</span>
        </div>
      </div>

      <div className="rounded-lg bg-white p-4 shadow">
        <div className="mb-3 flex items-center justify-end gap-2">
          <label htmlFor="buscador">Buscar:</label>
          <input
            id="buscador"
            type="search"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-1.5 focus:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-200"
          />
        </div>

        <Tabla columnas={columnas} filas={filtrados} vacio="No se encontraron productos." />

        <p className="mt-3">
          Mostrando {filtrados.length} de un total de {total} registros
        </p>
      </div>
    </section>
  );
}

export default Home;