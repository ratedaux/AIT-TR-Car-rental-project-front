import CustomerComponent from "components/CustomerComponent/CustomerComponent"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useAppDispatch } from "store/hooks"
import { authActions, authSelectors } from "store/redux/AuthSlice/authSlice"

function CustomerContainer() {
  const dispatch = useAppDispatch()
  const user = useSelector(authSelectors.userData)
  const accessToken = useSelector(authSelectors.accessToken)
  useEffect(() => {
    dispatch(authActions.getCurrentUser())
  }, [dispatch])

  if (!user) {
    return <p>Loading user data...</p>
  }
  
  return <CustomerComponent customer={user} />
}
export default CustomerContainer
