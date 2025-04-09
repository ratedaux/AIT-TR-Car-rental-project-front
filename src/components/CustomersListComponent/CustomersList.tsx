import React, { useEffect, useState } from "react"
import CustomerComponent from "components/CustomerComponent/CustomerComponent"
import { useAppSelector } from "store/hooks"
import { userSelectors } from "store/redux/UserSlice/UserSlise"
import { CustomerProps } from "components/CustomerComponent/types"

const CustomerListComponent: React.FC<CustomerProps> = () => {
  
  const users = useAppSelector(userSelectors.selectAllUsers)
  
  return (
    <div>
      {users && users.length > 0 ? (
        users.map((customer, index) => (
          <div key={customer.id || index}>
            <CustomerComponent />
          </div>
        ))
      ) : (
        <p>No customers available</p>
      )}
    </div>
  )
}

export default CustomerListComponent
