import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function LoginPage () {
  const [user, setUser] = useState({})
  const navigation = useNavigate()

  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  async function handleLogin (e) {
    e.preventDefault()
    try {
      const resp = await axios({
        method: 'POST',
        url: 'http://localhost:3030/api/v1/users/login',
        data: user
      })

      const { result } = resp.data

      if (result) {
        localStorage.setItem('accessToken', result)
        navigation('/')
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${err.response.data.err}`
      })
    }
  }
  return (
    <div class='container-fluid ps-md-0'>
      <div class='row g-0'>
        <div class='d-none d-md-flex col-md-4 col-lg-6 bg-image'></div>
        <div class='col-md-8 col-lg-6'>
          <div class='login d-flex align-items-center py-5'>
            <div class='container'>
              <div class='row'>
                <div class='col-md-9 col-lg-8 mx-auto'>
                  <h3 class='login-heading mb-4'>Welcome back!</h3>

                  <form>
                    <div class='form-floating mb-3'>
                      <input
                        type='text'
                        class='form-control'
                        id='floatingInput'
                        placeholder='please input your username'
                        name='username'
                        onChange={e => handleChange(e)}
                      />
                      <label for='floatingInput'>Username</label>
                    </div>

                    <div class='form-floating mb-3'>
                      <input
                        type='password'
                        class='form-control'
                        id='floatingPassword'
                        placeholder='please input your password'
                        name='password'
                        onChange={e => handleChange(e)}
                      />
                      <label for='floatingPassword'>Password</label>
                    </div>

                    <div class='d-grid'>
                      <button
                        class='btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2'
                        type='submit'
                        onClick={handleLogin}
                      >
                        Sign in
                      </button>
                      <div class='text-center'>
                        <a class='small' href='/register'>
                          Sign Up?
                        </a>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
