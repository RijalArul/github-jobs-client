import { useParams } from 'react-router-dom'

export default function DetailJobPage () {
  const { id } = useParams()
  return (
    <div>
      <h3>Detail Job Page {id}</h3>
    </div>
  )
}
