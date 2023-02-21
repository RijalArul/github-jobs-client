import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import NavbarComponent from '../components/NavbarComponent'

export default function DetailJobPage () {
  const [job, setJob] = useState({})
  const accessToken = localStorage.getItem('accessToken')
  const { id } = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    const getJob = async () => {
      const resp = await axios({
        method: 'GET',
        url: `http://localhost:3030/api/v1/jobs/${id}`,
        headers: {
          Authorization: accessToken
        }
      })

      const { result } = resp.data
      setJob(result)
      console.log(job)
    }

    getJob()
  }, [])
  const clickBack = () => {
    navigate('/')
  }
  return (
    <div>
      <NavbarComponent />
      <div class='container mt-5'>
        <i
          class='fa fa-arrow-left'
          style={{ fontSize: '32px', color: 'blue' }}
          onClick={clickBack}
        ></i>

        <div class='card container mt-5'>
          <div class='row'>
            <div class='col-sm-6 mt-5'>
              <div class='card'>
                <div class='row card-body'>
                  <div class='card-body' style={{ width: '40%' }}>
                    <h6 class='card-subtitle mb-2 text-muted'>
                      {job?.location}
                    </h6>
                    <h5 class='card-title'>{job?.title}</h5>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: job?.description
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class='col-sm-6 mt-5'>
              <div class=''>
                <div class='row card-body'>
                  <div class=''>
                    <div class='card '>
                      <div class='card-header'>{job?.company}</div>
                      <div class='card-body'>
                        <img
                          src={`${job?.company_logo}`}
                          alt='load-image-1'
                          style={{ width: '100%' }}
                          class='text-center'
                        />
                        <a class='' href={job?.company_url}>
                          {job?.company_url}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class=''>
                <div class='row card-body'>
                  <div>
                    <div class='card text-center'>
                      <div class='card-header'>How To Apply</div>
                      <div class='card-body'>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: job?.how_to_apply
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
