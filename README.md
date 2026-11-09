# Supermercado · Gestión de Inventario

Sitio web de gestión de inventario para un supermercado, desarrollado en React para el curso Desarrollo Frontend II (PFY2202), Experiencia 1 (semanas 1 a 3).

**Sitio publicado:** https://TU-USUARIO.github.io/NOMBRE-DEL-REPOSITORIO/

## Tecnologías

- React 19 + Vite
- React Router (HashRouter, layout con Outlet, rutas anidadas y parámetro dinámico :id)
- Context API + useReducer: estado global de los artículos y del carrito
- Tailwind CSS v3: estilos y diseño responsive
- gh-pages: publicación en GitHub Pages

## Funcionalidades

- **Inicio:** panel de inventario con buscador, resumen (productos, stock bajo, agotados) y tabla de inventario.
- **Agregar artículo:** formulario con validaciones (nombre, marca, tipo y stock inicial).
- **Artículos:** tabla con todos los artículos y filtro por categoría. El filtro se calcula desde el estado global, sin modificar los datos originales.
- **Detalle de artículo** (/articulos/:id): muestra la información y permite agregarlo al carrito; cada unidad agregada descuenta del inventario disponible.
- **Carrito:** lista los artículos agregados, permite aumentar, disminuir o quitar unidades, y el inventario se actualiza en tiempo real.
- **Quiénes somos** y **Preguntas frecuentes:** páginas informativas.
- Los datos viven solo en memoria: al recargar el navegador se vuelve al inventario original.

## Estructura

```
src/
├── main.jsx          Punto de entrada
├── App.jsx           Provider + router
├── routes/           AppRoutes (rutas centralizadas)
├── components/       Layout, TopNav, BottomNav, Tabla, EstadoBadge
├── context/          InventarioContext (useReducer + acciones)
├── pages/            Home, AgregarArticulo, ListaArticulos, DetalleArticulo, Carrito, QuienesSomos, PreguntasFrecuentes, NotFound
└── utils/            inventario.js, validaciones.js
```

## Cómo ejecutarlo

Requiere Node.js instalado.

```bash
npm install
npm run dev
```

Disponible en http://localhost:5173

## Publicar en GitHub Pages

```bash
npm run deploy
```

Luego en GitHub: Settings → Pages → Branch: gh-pages.