import {BrowserRouter, Routes, Route} from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout";
import RutaProtegida from "./layouts/RutaProtegida";


import Login from "./paginas/Login";
import Registrar from "./paginas/Registrar";
import OlvidePassword from "./paginas/OlvidePassword";
import NuevoPassword from "./paginas/NuevoPassword";
import ConfirmarCuenta from "./paginas/ConfirmarCuenta"
import Proyectos from "./paginas/Proyectos"

import {AuthProvidor} from './context/AuthProvidor'

function App() {

  return (
    <BrowserRouter>
      <AuthProvidor>
        <Routes>
          <Route path="/" element={<AuthLayout />}>

            <Route index element={<Login />} />
            <Route path="registrar" index element={<Registrar />} />
            <Route path="olvide-password" index element={<OlvidePassword />} />
            <Route path="olvide-password/:token" index element={<NuevoPassword />} />
            <Route path="confirmar/:id" index element={<ConfirmarCuenta />} />

          </Route>

          <Route path="/proyectos" element={<RutaProtegida />} >
            <Route index element={<Proyectos />} />
          </Route>
        </Routes>
      </AuthProvidor>
    </BrowserRouter>
  )
}

export default App
