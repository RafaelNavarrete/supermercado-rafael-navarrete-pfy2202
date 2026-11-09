export const CATEGORIAS = ["Abarrotes", "Lácteos", "Carnes", "Frutas y verduras", "Limpieza", "Bebidas", "Otros"];

export const disponibleDe = (a) => a.inicial + a.recibido - a.enviado - a.enCarrito;

export function estadoDe(a) {
  const d = disponibleDe(a);
  if (d <= 0) return "agotado";
  if (d < a.minimo) return "bajo";
  return "ok";
}

export const estilosTexto = { ok: "text-green-700", bajo: "text-orange-600", agotado: "text-red-700" };
export const estilosBadge = { ok: "bg-green-100 text-green-800", bajo: "bg-orange-100 text-orange-700", agotado: "bg-red-100 text-red-700" };
export const textosEstado = { ok: "Disponible", bajo: "Stock bajo", agotado: "Agotado" };