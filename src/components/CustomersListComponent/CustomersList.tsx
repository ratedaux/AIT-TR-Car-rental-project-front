import React, { useEffect, useState } from "react"
import CustomerComponent from "components/CustomerComponent/CustomerComponent"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { userActions, userSelectors } from "store/redux/UserSlice/UserSlise"
import { CustomerProps } from "components/CustomerComponent/types"
import { authSelectors } from "store/redux/AuthSlice/authSlice"

const CustomerListComponent: React.FC<CustomerProps> = () => {
  const users = useAppSelector(userSelectors.selectAllUsers)
  const dispatch = useAppDispatch()
  
  useEffect(() => {
    dispatch(userActions.getAllUsers(accessToken))
  }, [dispatch])
  
  const accessToken = useAppSelector(authSelectors.accessToken)
  
  return (
    <div>
      {users && users.length > 0 ? (
        users.map((customer, index) => (
          <div key={customer.id || index}>
            <CustomerComponent
              id={customer.id}
              firstName={customer.firstName}
              lastName={customer.lastName}
              email={customer.email}
              password={customer.password}
              role={customer.role}
              isActive={customer.isActive}
            />
          </div>
        ))
      ) : (
        <p>No customers available</p>
      )}
    </div>
  )
}

export default CustomerListComponent
