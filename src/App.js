import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './features/LoginPage'
import RegisterPage from './features/RegisterPage'
import HomePage from './features/HomePage'
import DetailJobPage from './features/DetailJobPage'
import PublicRouter from './routers/PublicRouter'
import PrivateRouter from './routers/PrivateRouter'

function App () {
  return (
    <Router>
      <div>
        <Routes>
          <Route
            path='/login'
            element={
              <PublicRouter>
                <LoginPage />
              </PublicRouter>
            }
          />

          <Route
            path='/register'
            element={
              <PublicRouter>
                <RegisterPage />
              </PublicRouter>
            }
          />
          <Route
            path='/'
            element={
              <PrivateRouter>
                <HomePage />
              </PrivateRouter>
            }
          />
          <Route path='/:id' element={<DetailJobPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
