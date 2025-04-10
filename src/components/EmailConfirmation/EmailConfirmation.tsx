import Notification1 from "components/Notification/Notification1"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { authActions, authSelectors } from "store/redux/AuthSlice/authSlice"

function EmailConfirmation() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { token } = useParams()

  const user = useAppSelector(authSelectors.userData)
  const email = user?.email || ""

  const isEmailConfirmed = useAppSelector(authSelectors.isEmailConfirmed)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    dispatch(authActions.confirmEmail(token || ""))
  }, [token])

  useEffect(() => {
    if (isEmailConfirmed) {
      setShowModal(true)
      const timer = setTimeout(() => {
        navigate("/login")
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [isEmailConfirmed, navigate])

  const handleClose = () => {
    setShowModal(false)
    navigate("/login")
  }

  return (
    <div className="flex items-center justify-center p4">
      {showModal ? (
        <Notification1
          topic="Email successfully confirmed!"
          message={`The email ${email} was successfully confirmed. Now you can log in to your account.`}
          onClose={handleClose}
        />
      ) : (
        <div className="max-w-md text-center px-6 py-10 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">
            You’re almost done setting up your account
          </h2>

          <div className="relative w-32 h-32 mx-auto mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full blur-2xl opacity-30"></div>
            <img
              src="https://cdn-icons-png.flaticon.com/512/561/561127.png"
              alt="Envelope"
              className="relative w-full h-full object-contain"
            />
          </div>

          <p className="text-gray-700">
            We’ve sent an email to{" "}
            <span className="font-semibold">{email || "your email"}</span> with
            a link to confirm your email address. Please check your inbox and
            follow the instructions to activate your account.
          </p>
        </div>
      )}
    </div>
  )
}

export default EmailConfirmation
