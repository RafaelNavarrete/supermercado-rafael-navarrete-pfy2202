import { Routes, Route } from "react-router";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import AgregarArticulo from "../pages/AgregarArticulo";
import ListaArticulos from "../pages/ListaArticulos";
import DetalleArticulo from "../pages/DetalleArticulo";
import Carrito from "../pages/Carrito";
import QuienesSomos from "../pages/QuienesSomos";
import PreguntasFrecuentes from "../pages/PreguntasFrecuentes";
import NotFound from "../pages/NotFound";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="agregar-articulo" element={<AgregarArticulo />} />
        <Route path="articulos" element={<ListaArticulos />} />
        <Route path="articulos/:id" element={<DetalleArticulo />} />
        <Route path="carrito" element={<Carrito />} />
        <Route path="quienes-somos" element={<QuienesSomos />} />
        <Route path="preguntas-frecuentes" element={<PreguntasFrecuentes />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;