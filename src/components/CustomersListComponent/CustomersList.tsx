import React, { useEffect, useState } from "react"
import CustomerComponent from "components/CustomerComponent/CustomerComponent"
import { CustomersListProps } from "./types"
import axios from "axios"
import { CustomerProps } from "components/CustomerComponent/types"
import Button from "components/Button/Button"

function CustomerListComponent() {
  const [customers, setCustomers] = useState<CustomerProps[]>([])

  async function fetchCustomers() {
    const response = await axios.get("/api/customers")
    setCustomers(response.data)
  }

  useEffect(() => {
    fetchCustomers()
  }, [])

  const handleEditCustomer = (customerId: number) => {
    console.log("Editing customer with ID:", customerId)
  }

  const handleDeleteCustomer = (customerId: number) => {
    console.log("Deleting customer with ID:", customerId)

    setCustomers(prevCustomers =>
      prevCustomers.filter(customer => customer.id !== customerId),
    )
  }

  return (
    <div>
      {customers.map((customer, index) => (
        <div key={customer.id}>
          <CustomerComponent
            key={index}
            lastName={customer.lastName}
            firstName={customer.firstName}
            email={customer.email}
            id={customer.id}
            password={customer.password}
          />
          <div className="m-4 flex flex-row gap-4 justify-end">
            <div>
              <Button
                type="button"
                onClick={() => handleEditCustomer(customer.id)}
                name="Edit"
              />
            </div>
            <div>
              <Button
                type="button"
                onClick={() => handleDeleteCustomer(customer.id)}
                name="Delete"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CustomerListComponent
