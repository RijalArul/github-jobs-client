import { Navigate, useLocation } from 'react-router-dom'

export default function PrivateRouter ({ children }) {
  let location = useLocation()

  if (!localStorage.getItem('accessToken')) {
    return <Navigate to='/login' state={{ from: location }} />
  }

  return children
}
