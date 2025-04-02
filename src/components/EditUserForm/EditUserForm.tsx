import Button from "components/Button/Button"
import Input from "components/Input/Input"
import * as Yup from "yup"
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { EditUserFormProps } from "./types"
import { useLocation, useNavigate } from "react-router-dom"
import { CustomerProps } from "components/CustomerComponent/types"
import { useAppDispatch } from "store/hooks"
import { userActions } from "store/redux/UserSlice/UserSlise"

const EditUserForm: React.FC<EditUserFormProps> = ({ customer }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { customerData } = location.state || {}
  const dispatch = useAppDispatch()

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
  })

  const [formData, setFormData] = useState<CustomerProps>(customerData)

  useEffect(() => {
    if (customerData) {
      setFormData(customerData)
    }
  }, [customer])

  const formik = useFormik({
    initialValues: formData,
    validationSchema: validationSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (values: CustomerProps) => {
      console.log("Submitted values:", values)
      console.log("Errors:", formik.errors)
      alert("The user is edited")
      navigate("/account")
      dispatch(
        userActions.updateUser({
          id: customer.id,
          updatedData: values,
        }),
      )
    },
  })

  // Handle close button click
  const handleClose = () => {
    navigate("/admin")
  }

  return (
    <div className="flex flex-col w-[590px] mx-auto gap-8 rounded-md m-3">
      <h2 className="text-xl font-bold p-[60px] mb-6">
        To edit the customer edit and submit the following form:
      </h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-1 w-full ">
          <Input
            name="firstName"
            type="text"
            label="First Name"
            placeholder="Enter First Name"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorMessage={formik.errors.firstName}
          />
          <Input
            name="lastName"
            type="text"
            label="Last Name"
            placeholder="Enter Last Name"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorMessage={formik.errors.lastName}
          />
          <Input
            name="email"
            type="email"
            label="Email"
            placeholder="Enter Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorMessage={formik.errors.email}
          />

          <Input
            name="password"
            type="password"
            label="Password"
            placeholder="Enter Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorMessage={formik.errors.password}
            readOnly={true}
          />
        </div>
        <div className="w-auto">
          <Button name="Apply" type="submit" />
        </div>
        {/* close button */}
        <div className="w-auto mt-2.5">
          <Button
            name="Cancel"
            customClasses="!rounded-lg !bg-gray-400 hover:!bg-red-700 text-white"
            onClick={handleClose}
          />
        </div>
      </form>
    </div>
  )
}
export default EditUserForm
