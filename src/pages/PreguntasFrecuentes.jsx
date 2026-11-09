const preguntas = [
  {
    pregunta: "¿Cómo se actualiza el stock de los productos?",
    respuesta:
      "El stock se actualiza cada vez que se registra una venta o la recepción de mercadería desde un proveedor.",
  },
  {
    pregunta: "¿Qué significa 'Stock bajo'?",
    respuesta:
      "Un producto está en 'Stock bajo' cuando sus unidades disponibles son menores al mínimo definido para ese producto. Es una señal para reponerlo.",
  },
  {
    pregunta: "¿Qué hago si un producto aparece como 'Agotado'?",
    respuesta:
      "Debes generar una orden de compra al proveedor correspondiente lo antes posible para reponer las unidades.",
  },
  {
    pregunta: "¿Cómo agrego un artículo nuevo al inventario?",
    respuesta:
      "Entra a 'Agregar artículo' en el menú superior, completa nombre, marca y tipo, y guarda. El artículo aparecerá en la lista de 'Artículos'.",
  },
];

function PreguntasFrecuentes() {
  return (
    <section>
      <h2 className="mb-4 text-2xl font-bold">Preguntas frecuentes</h2>
      <div>
        {preguntas.map((item) => (
          <details key={item.pregunta} className="mb-3 rounded-md bg-white px-4 py-3 shadow">
            <summary className="cursor-pointer font-semibold">{item.pregunta}</summary>
            <p className="mt-2">{item.respuesta}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export default PreguntasFrecuentes;