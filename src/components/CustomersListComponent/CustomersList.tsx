import React, { useEffect, useState } from "react"
import CustomerComponent from "components/CustomerComponent/CustomerComponent"
import { CustomersListProps } from "./types"
import { CustomerProps } from "components/CustomerComponent/types"
import Button from "components/Button/Button"
import { useNavigate } from "react-router-dom"

const CustomerListComponent: React.FC<CustomersListProps> = ({ users }) => {
  const navigate = useNavigate()

  return (
    <div>
       {users && users.length > 0 ? (
      users.map((customer, index) => (
        <div key={customer.id || index}>
          <CustomerComponent customer={customer} />
        </div>
      ))
    ) : (
      <p>No customers available</p>
    )
    }
    </div>
  )
}

export default CustomerListComponent
