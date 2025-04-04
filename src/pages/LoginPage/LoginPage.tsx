import Login from 'components/Login/Login'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from 'store/hooks'
import { authSelectors } from 'store/redux/AuthSlice/authSlice'



function LoginPage() {
  const navigate = useNavigate()
  const status = useAppSelector(authSelectors.authStatus)
  const isLoggedIn = useAppSelector(authSelectors.isLoggedIn)

  useEffect(() => {
    if (status === 'success' && isLoggedIn) {
      navigate('/') 
    }
  }, [status, isLoggedIn, navigate])

  const onLoginSuccess = () => {
    // Колбэк после успешного логина
    navigate('/') 
  }

  return (
    <div >
      <Login onLoginSuccess={onLoginSuccess} url="/" />
    </div>
  )
}

export default LoginPage