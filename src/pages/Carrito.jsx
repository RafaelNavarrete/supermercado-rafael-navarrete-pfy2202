import { Link } from "react-router";
import { useInventario, ACTIONS } from "../context/InventarioContext";
import { disponibleDe } from "../utils/inventario";
import Tabla from "../components/Tabla";

function Carrito() {
  const { articulos, dispatch } = useInventario();
  const enCarrito = articulos.filter((a) => a.enCarrito > 0);
  const totalUnidades = enCarrito.reduce((suma, a) => suma + a.enCarrito, 0);

  const btn = "rounded-md border border-gray-300 px-3 py-1 font-bold hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40";
  const accion = (type, id) => dispatch({ type, id });

  const columnas = [
    {
      titulo: "Producto",
      render: (a) => (
        <Link to={`/articulos/${a.id}`} className="text-green-800 underline">{a.nombre}</Link>
      ),
    },
    {
      titulo: "Cantidad",
      className: "text-center",
      render: (a) => (
        <div className="flex items-center justify-center gap-2">
          <button className={btn} aria-label={`Disminuir ${a.nombre}`} onClick={() => accion(ACTIONS.DISMINUIR_CANTIDAD, a.id)}>−</button>
          <span className="w-8 text-center font-semibold">{a.enCarrito}</span>
          <button className={btn} aria-label={`Aumentar ${a.nombre}`} disabled={disponibleDe(a) === 0} onClick={() => accion(ACTIONS.AUMENTAR_CANTIDAD, a.id)}>+</button>
        </div>
      ),
    },
    { titulo: "Disponible", className: "text-right", render: (a) => disponibleDe(a) },
    {
      titulo: "",
      className: "text-center",
      render: (a) => (
        <button className="text-sm text-red-700 underline" onClick={() => accion(ACTIONS.QUITAR_DEL_CARRITO, a.id)}>Quitar</button>
      ),
    },
  ];

  return (
    <section>
      <h2 className="mb-2 text-2xl font-bold">Carrito de compras</h2>
      <p className="mb-4">
        Tienes <strong>{totalUnidades}</strong> unidades de <strong>{enCarrito.length}</strong> productos.
      </p>
      <div className="rounded-lg bg-white p-4 shadow">
        <Tabla
          columnas={columnas}
          filas={enCarrito}
          vacio={
            <>
              Tu carrito está vacío.{" "}
              <Link to="/articulos" className="text-green-800 underline">Ver artículos</Link>
            </>
          }
        />
      </div>
    </section>
  );
}

export default Carrito;