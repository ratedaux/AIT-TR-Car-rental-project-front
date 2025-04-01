import React, { useEffect, useState } from "react"
import CustomerComponent from "components/CustomerComponent/CustomerComponent"
import { CustomersListProps } from "./types"
import { CustomerProps } from "components/CustomerComponent/types"
import Button from "components/Button/Button"
import { useNavigate } from "react-router-dom"

const CustomerListComponent: React.FC<CustomersListProps> = ({ users }) => {
  const navigate = useNavigate()

  const [customers, setCustomers] = useState<CustomerProps[]>(users)
  // const [customers, setCustomers] = useState<CustomerProps[]>([]);

  // async function fetchCustomers() {
  //   const response = await axios.get("/api/customers");
  //   setCustomers(response.data);
  // }

  // useEffect(() => {
  //   fetchCustomers();
  // }, []);

  const handleEditCustomer = (
    customerId: string,
    customerData: CustomerProps,
  ) => {
    console.log("Editing customer with ID:", customerId)
    navigate(`/edit-user/${customerId}`, { state: { customerData } })
  }

  const handleDeleteCustomer = (customerId: string) => {
    console.log("Deleting customer with ID:", customerId)

    setCustomers(prevCustomers =>
      prevCustomers.filter(customer => customer.id !== customerId),
    )
    //dispatch api slice
  }

  return (
    <div>
      {customers.map((customer, index) => (
        <div key={customer.id || index}>
          <CustomerComponent
            lastName={customer.lastName}
            firstName={customer.firstName}
            email={customer.email}
            id={customer.id}
            password={customer.password}
            role={customer.role}
          />
          <div className="m-4 flex flex-row gap-4 justify-end">
            <div>
              <Button
                type="button"
                onClick={() => handleEditCustomer(customer.id, customer)}
                name="Edit"
              />
            </div>
            <div>
              <Button
                type="button"
                customClasses="!rounded-lg  !bg-gray-400 hover:!bg-red-700 text-white"
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
