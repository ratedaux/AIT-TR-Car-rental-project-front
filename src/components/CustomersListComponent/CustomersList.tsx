import React, { useEffect, useState } from "react"
import CustomerComponent from "components/CustomerComponent/CustomerComponent"
import { CustomersListProps } from "./types"
import axios from "axios"
import { CustomerProps } from "components/CustomerComponent/types"

function CustomerListComponent() {
  const [customers, setCustomers] = useState<CustomerProps[]>([])

  async function fetchCustomers() {
    const response = await axios.get("/api/customers/all")
    setCustomers(response.data)
  }

  useEffect(() => {
    fetchCustomers()
  }, [])

  return (
    <div>
      {customers.map((customer, index) => (
        <CustomerComponent
          key={index}
          lastName={customer.lastName}
          firstName={customer.firstName}
          email={customer.email}
          id={customer.id}
          password={customer.password}
        />
      ))}
    </div>
  )
}

export default CustomerListComponent
