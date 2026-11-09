import { estadoDe, estilosBadge, textosEstado } from "../utils/inventario";

function EstadoBadge({ articulo }) {
  const estado = estadoDe(articulo);
  return (
    <span className={`whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold ${estilosBadge[estado]}`}>
      {textosEstado[estado]}
    </span>
  );
}

export default EstadoBadge;