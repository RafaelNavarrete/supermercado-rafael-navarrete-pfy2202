import { createContext, useContext, useReducer } from "react";
import { disponibleDe } from "../utils/inventario";

const InventarioContext = createContext(null);

export const ACTIONS = {
  ADD_ARTICULO: "ADD_ARTICULO",
  AUMENTAR_CANTIDAD: "AUMENTAR_CANTIDAD",
  DISMINUIR_CANTIDAD: "DISMINUIR_CANTIDAD",
  QUITAR_DEL_CARRITO: "QUITAR_DEL_CARRITO",
}

const datosIniciales = [
  { id: 1, codigo: "P-1001", nombre: "Arroz grado 1 (1 kg)", marca: "Tucapel", tipo: "Abarrotes", inicial: 100, recibido: 50, enviado: 30, minimo: 40 },
  { id: 2, codigo: "P-1002", nombre: "Fideos spaghetti (400 g)", marca: "Carozzi", tipo: "Abarrotes", inicial: 40, recibido: 0, enviado: 25, minimo: 30 },
  { id: 3, codigo: "P-1003", nombre: "Leche entera (1 L)", marca: "Colún", tipo: "Lácteos", inicial: 60, recibido: 50, enviado: 30, minimo: 50 },
  { id: 4, codigo: "P-1004", nombre: "Yogurt natural (150 g)", marca: "Soprole", tipo: "Lácteos", inicial: 30, recibido: 0, enviado: 30, minimo: 25 },
  { id: 5, codigo: "P-1005", nombre: "Pechuga de pollo (kg)", marca: "Ariztía", tipo: "Carnes", inicial: 25, recibido: 15, enviado: 18, minimo: 20 },
  { id: 6, codigo: "P-1006", nombre: "Manzana fuji (kg)", marca: "Granel", tipo: "Frutas y verduras", inicial: 50, recibido: 30, enviado: 20, minimo: 30 },
  { id: 7, codigo: "P-1007", nombre: "Detergente líquido (3 L)", marca: "Omo", tipo: "Limpieza", inicial: 20, recibido: 0, enviado: 11, minimo: 15 },
];
const articulosIniciales = datosIniciales.map((a) => ({ ...a, enCarrito: 0 }));

function articulosReducer(articulos, action) {
  switch (action.type) {
    case ACTIONS.ADD_ARTICULO: {
      const id = Math.max(0, ...articulos.map((a) => a.id)) + 1;
      const num = Math.max(1000, ...articulos.map((a) => Number(a.codigo.split("-")[1]))) + 1;
      return [
        ...articulos,
        { id, codigo: `P-${num}`, recibido: 0, enviado: 0, minimo: 10, enCarrito: 0, ...action.payload },
      ];
    }
    case ACTIONS.AUMENTAR_CANTIDAD:
      return articulos.map((a) =>
        a.id === action.id && disponibleDe(a) > 0 ? { ...a, enCarrito: a.enCarrito + 1 } : a
      );
    case ACTIONS.DISMINUIR_CANTIDAD:
      return articulos.map((a) =>
        a.id === action.id && a.enCarrito > 0 ? { ...a, enCarrito: a.enCarrito - 1 } : a
      );
    case ACTIONS.QUITAR_DEL_CARRITO:
      return articulos.map((a) => (a.id === action.id ? { ...a, enCarrito: 0 } : a));
    default:
      return articulos;
  }
}

export function InventarioProvider({ children }) {
  const [articulos, dispatch] = useReducer(articulosReducer, articulosIniciales);

  return (
    <InventarioContext.Provider value={{ articulos, dispatch }}>
      {children}
    </InventarioContext.Provider>
  );
}

export function useInventario() {
  const contexto = useContext(InventarioContext);
  if (!contexto) {
    throw new Error("useInventario debe usarse dentro de InventarioProvider");
  }
  return contexto;
}