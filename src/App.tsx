import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Multistep } from './components'
import { Login, DashboardPage } from './pages'
import { PrivateRoute } from './components/routes/PrivateRoute'
import { PublicRoute } from './components/routes/PublicRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* Ruta privada */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />

        {/* Ruta pública */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <Multistep />
            </PublicRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
