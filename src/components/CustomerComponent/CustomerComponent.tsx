import Button from "components/Button/Button"
import { CustomerProps } from "./types"
import { useNavigate } from "react-router-dom"

// const customerId = 1 and user{}
//get by slice data to my account

export interface CustomerDataProps {
  customer?: CustomerProps
}

// function CustomerComponent({firstName, lastName, email, role, id, password }:CustomerProps) {
function CustomerComponent({ customer }: CustomerDataProps) {
  // function CustomerComponent({ customerData }: { customerData: CustomerProps }) {
  // const { firstName, lastName, email, role, id, password } = customerData;
  const navigate = useNavigate()

  // const {
  //   firstName = '',
  //   lastName = '',
  //   email = '',
  //   role = '',
  //   id = '',
  //   password = ''
  // } = customerData || {};

  const handleEditCustomer = (
    customerId: string,
    customerData: CustomerProps,
  ) => {
    console.log("Editing customer with ID:", customerId)
    navigate(`/edit-user/${customerId}`, { state: { customerData } })
  }

  const handleDeleteCustomer = (customerId: string) => {
    console.log("Deleting customer with ID:", customerId)
alert("The user is deleted")
//set status not active by use state
    // setCustomers(prevCustomers =>
    //   prevCustomers.filter(customer => customer.id !== customerId),
    // )
    //dispatch api slice
  }

  const handleRestoreCustomer = (customerId: string) => {
    console.log("Deleting customer with ID:", customerId)
alert("The user is restored")
    // setCustomers(prevCustomers =>
    //   prevCustomers.filter(customer => customer.id !== customerId),
    // )
    //dispatch api slice
  }

  return (
    <div className="m-4 rounded-lg transition-transform duration-300 hover:-translate-y-1 ">
      <div className="flex flex-col w-auto ">
        <div className="bg-black text-white font-bold  rounded-tl-lg rounded-tr-lg p-3 ">
          Customer Data:
        </div>
        <div className="flex flex-col gap-3 w-auto p-3 bg-white  rounded-lg rounded-br-lg">
          <div className="flex gap-4">
            <div className="w-1/4 font-bold">Customer Name:</div>
            <div className="w-3/4">
              {customer?.firstName} {customer?.lastName}
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-1/4 font-bold">Email:</div>
            <div className="w-3/4">{customer?.email} </div>
          </div>
          
          <div className="flex gap-4">
            <div className="w-1/4 font-bold">Status:</div>
            <div className="w-3/4"> {customer?.isActive ? 'Active' : 'Not Active'} </div>
          </div>
        </div>
      </div>

      <div className="mt-4 gap-3 flex flex-row  justify-end">
        <div>
          {/* this button must be available only for user */}
          <Button
            type="button"
            // onClick={() => handleEditCustomer(testCustomer.id, testCustomer)}
            onClick={() => handleEditCustomer(customer?.id, customer)}
            name="Edit"
          />
        </div>
        {customer.isActive && (
        <div>
          <Button
            type="button"
            customClasses="!rounded-lg  !bg-gray-400 hover:!bg-red-700 text-white"
            onClick={() => handleDeleteCustomer(customer.id)}
            name="Delete"
          />
        </div> )}

              {!customer.isActive && (
          <div>
            <Button
              type="button"
              customClasses="!rounded-lg  !bg-gray-400 hover:!bg-red-700 text-white"
              onClick={() => handleRestoreCustomer(customer.id)}
              name="Restore"
            />
          </div>
        )}
      </div>
    </div>
  )
}
export default CustomerComponent
