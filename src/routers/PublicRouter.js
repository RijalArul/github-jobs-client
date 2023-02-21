import { Navigate, useLocation } from 'react-router-dom'

export default function PublicRouter ({ children }) {
  let location = useLocation()

  if (localStorage.getItem('accessToken')) {
    return <Navigate to='/' state={{ from: location }} />
  }

  return children
}
