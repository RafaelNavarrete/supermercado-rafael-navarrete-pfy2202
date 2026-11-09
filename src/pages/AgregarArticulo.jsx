import { useState } from "react";
import { useNavigate } from "react-router";
import { useInventario, ACTIONS } from "../context/InventarioContext";
import { CATEGORIAS } from "../utils/inventario";
import { validarArticulo } from "../utils/validaciones";

const formularioVacio = { nombre: "", marca: "", tipo: "", stock: "" };

const inputClass =
  "w-full rounded-md border border-gray-300 px-3 py-2 focus:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-200";

function MensajeError({ texto }) {
  if (!texto) return null;
  return (
    <p role="alert" className="mt-1 text-sm text-red-700">
      {texto}
    </p>
  );
}

function AgregarArticulo() {
  const { articulos, dispatch } = useInventario();
  const navigate = useNavigate();
  const [form, setForm] = useState(formularioVacio);
  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevosErrores = validarArticulo(form, articulos);
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    dispatch({
      type: ACTIONS.ADD_ARTICULO,
      payload: {
        nombre: form.nombre.trim(),
        marca: form.marca.trim(),
        tipo: form.tipo,
        inicial: Number(form.stock),
      },
    });

    setForm(formularioVacio);
    setErrores({});
    navigate("/articulos");
  };

  return (
    <section>
      <h2 className="mb-2 text-2xl font-bold">Agregar artículo</h2>
      <p className="mb-4">Ingresa un nuevo artículo al inventario del supermercado.</p>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-lg bg-white p-6 shadow">
        <div>
          <label htmlFor="nombre" className="mb-1 block font-semibold">
            Nombre del producto
          </label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Ej: Aceite de maravilla (1 L)"
            className={inputClass}
          />
          <MensajeError texto={errores.nombre} />
        </div>

        <div>
          <label htmlFor="marca" className="mb-1 block font-semibold">
            Marca
          </label>
          <input
            id="marca"
            name="marca"
            type="text"
            value={form.marca}
            onChange={handleChange}
            placeholder="Ej: Chef"
            className={inputClass}
          />
          <MensajeError texto={errores.marca} />
        </div>

        <div>
          <label htmlFor="tipo" className="mb-1 block font-semibold">
            Tipo de producto
          </label>
          <select id="tipo" name="tipo" value={form.tipo} onChange={handleChange} className={inputClass}>
            <option value="">Selecciona un tipo...</option>
            {CATEGORIAS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <MensajeError texto={errores.tipo} />
        </div>

        <div>
          <label htmlFor="stock" className="mb-1 block font-semibold">
            Stock inicial
          </label>
          <input
            id="stock"
            name="stock"
            type="number"
            min="0"
            value={form.stock}
            onChange={handleChange}
            placeholder="Ej: 50"
            className={inputClass}
          />
          <MensajeError texto={errores.stock} />
        </div>

        <button
          type="submit"
          className="rounded-md bg-green-800 px-5 py-2 font-semibold text-white transition-colors hover:bg-green-700"
        >
          Guardar artículo
        </button>
      </form>
    </section>
  );
}

export default AgregarArticulo;