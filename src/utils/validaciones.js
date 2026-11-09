import { CATEGORIAS } from "./inventario";

export const REGEX = {
  nombre: /^[\p{L}\p{N}][\p{L}\p{N}\s().,'\/-]{1,59}$/u,
  marca: /^[\p{L}\p{N}][\p{L}\p{N}\s.&'-]{0,39}$/u,
  stock: /^\d{1,6}$/,
};

export function validarArticulo(form, articulos) {
  const errores = {};
  const nombre = form.nombre.trim();
  const marca = form.marca.trim();

  if (!REGEX.nombre.test(nombre)) errores.nombre = "Nombre de 2 a 60 caracteres (letras, números y ( ) . , ' / -).";
  if (!REGEX.marca.test(marca)) errores.marca = "Marca de 1 a 40 caracteres (letras, números, . & ' -).";
  if (!CATEGORIAS.includes(form.tipo)) errores.tipo = "Selecciona un tipo.";
  if (!REGEX.stock.test(form.stock)) errores.stock = "Ingresa un entero entre 0 y 999999.";

  const repetido = articulos.some(
    (a) => a.nombre.toLowerCase() === nombre.toLowerCase() && a.marca.toLowerCase() === marca.toLowerCase()
  );
  if (!errores.nombre && !errores.marca && repetido) errores.nombre = "Ya existe un artículo con ese nombre y marca.";

  return errores;
}