import axios from 'axios'
import { useEffect, useState } from 'react'
import NavbarComponent from '../components/NavbarComponent'
import Pagination from '../components/PaginationComponent'

const pagePerRow = 5
export default function HomePage () {
  const [next, setNext] = useState(pagePerRow)
  const [jobs, setjobs] = useState([])
  const [filter, setFilter] = useState({})
  const [selectType, setSelectType] = useState(false)
  const [selectValue, setSelectValue] = useState('')
  useEffect(() => {
    const handleJobs = async () => {
      const resp = await axios({
        method: 'GET',
        url: `http://dev3.dansmultipro.co.id/api/recruitment/positions.json?description=${
          filter.description === undefined ? '' : filter.description
        }&location=${
          filter.location === undefined ? '' : filter.location
        }&type=${selectValue}`
      })

      setjobs(resp.data)
    }
    handleJobs()
  }, [filter, selectValue])
  const handleLoad = () => {
    setNext(next + pagePerRow)
  }

  const handleChange = e => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value
    })
  }

  const handleSelectType = e => {
    e.preventDefault()
    if (selectValue === '') {
      setSelectType(true)
      setSelectValue('Full Time')
    } else {
      setSelectType(false)
      setSelectValue('')
    }
  }

  return (
    <>
      <NavbarComponent />
      <div class='container'>
        <form style={{ marginTop: '25px' }}>
          <div>
            <span>
              <input
                class='form-control form-control-sm w-10'
                type='text'
                placeholder='search'
                aria-label='search'
                name='description'
                onChange={e => handleChange(e)}
                style={{
                  float: 'left',
                  marginRight: '3px',
                  width: '18%',
                  marginBottom: '15px'
                }}
              />
              <input
                class='form-control form-control-sm w-10'
                type='text'
                placeholder='search location'
                aria-label='search location'
                name='location'
                onChange={e => handleChange(e)}
                style={{
                  float: 'left',
                  marginRight: '3px',
                  width: '18%',
                  marginBottom: '15px'
                }}
              />
              <div class='form-check'>
                <input
                  class='form-check-input'
                  type='checkbox'
                  value=''
                  id='flexCheckChecked'
                  onChange={e => handleChange(e)}
                  onClick={handleSelectType}
                  checked={selectValue === 'Full Time'}
                  style={{
                    float: 'left',
                    marginRight: '3px',
                    marginLeft: '3px',
                    width: '2.7%',
                    marginBottom: '15px'
                  }}
                />
                <label class='form-check-label' for='flexCheckChecked'>
                  Full Time Only
                </label>
              </div>
            </span>
          </div>
        </form>
        <div class='container card' style={{ marginTop: '75px' }}>
          <div className='gap-y-4 flex flex-wrap justify-center container-card'>
            {jobs?.slice(0, next)?.map((job, index) => {
              return (
                <div
                  key={index}
                  className='px-2.5 md:px-0 card-container-width'
                >
                  <div class='card card-height'>
                    <h5 class='card-title'>{job?.title}</h5>
                    <p class='card-body'>
                      {job?.company} - <span>{job?.type}</span> -{' '}
                      <span>{job?.location}</span>
                    </p>
                  </div>
                </div>
              )
            })}
            {next < jobs?.length && (
              <button
                className='mt-4 bg-primary w-100 text-github-jobs'
                onClick={handleLoad}
              >
                Load more
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}