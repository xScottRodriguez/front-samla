import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Multistep } from './components'
import { Login } from './components/login/Login'
import { PrivateRoute } from './components/routes/PrivateRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública */}
        <Route path="/login" element={<Login />} />
        
        {/* Ruta privada */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Multistep />
            </PrivateRoute>
          }
        />
        
        {/* Ruta pública */}
        <Route path="/" element={<Multistep />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
