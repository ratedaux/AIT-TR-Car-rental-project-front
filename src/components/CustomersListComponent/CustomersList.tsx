import React from "react"
import CustomerComponent from "components/CustomerComponent/CustomerComponent"
import { CustomersListProps } from "./types"

const BookingsListComponent: React.FC<CustomersListProps> = ({ customers }) => {
  return (
    <div>
      {customers.map((customer, index) => (
        <CustomerComponent
          key={index}
          lastName={customer.lastName}
          firstName={customer.firstName}
          email={customer.email}
          drivingLicense={customer.email}
          bornDate={customer.bornDate}
          
        />
      ))}
    </div>
  )
}

export default BookingsListComponent
