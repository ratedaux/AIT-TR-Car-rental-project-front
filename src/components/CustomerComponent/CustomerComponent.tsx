import Button from "components/Button/Button"
import { CustomerProps } from "./types"
import { useNavigate } from "react-router-dom"

// const customerId = 1
//get by slice data to my account

function CustomerComponent({
  firstName,
  lastName,
  email,
  role,
  id,
  password,
}: CustomerProps) {
  const navigate = useNavigate()

  const handleEditCustomer = (
    customerId: string,
    customerData: CustomerProps,
  ) => {
    console.log("Editing customer with ID:", customerId)
    navigate(`/edit-user/${customerId}`, { state: { customerData } })
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
              {firstName} {lastName}
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-1/4 font-bold">Email:</div>
            <div className="w-3/4">{email} </div>
          </div>
          {/* only admin can see role */}
          <div className="flex gap-4">
            <div className="w-1/4 font-bold">Role:</div>
            <div className="w-3/4">{role} </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-row gap-4 justify-end">
       <div>
        {/* this button must be available only for user */}
        <Button
          type="button"
          onClick={() => handleEditCustomer(customer.id, customer)}
          name="Edit"
        />
      </div>
      </div>
    </div>
  )
}
export default CustomerComponent
