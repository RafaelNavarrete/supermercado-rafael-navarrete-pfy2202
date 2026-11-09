function Tabla({ columnas, filas, vacio }) {
  const celda = "border border-gray-300 px-3 py-2";
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {columnas.map((c) => (
              <th key={c.titulo} className={`${celda} text-left`}>{c.titulo}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filas.length > 0 ? (
            filas.map((fila, i) => (
              <tr key={fila.id} className="odd:bg-gray-100">
                {columnas.map((c) => (
                  <td key={c.titulo} className={`${celda} ${c.className ?? ""}`}>{c.render(fila, i)}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columnas.length} className={`${celda} py-4 text-center`}>{vacio}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Tabla;