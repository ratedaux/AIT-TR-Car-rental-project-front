import Button from "components/Button/Button"
import Input from "components/Input/Input"
import { v4 } from "uuid"
import { useAppDispatch, useAppSelector } from "store/hooks"
import {
  registrationFormActions,
  registrationFormSelectors,
} from "../../store/redux/registrationForm/registrationFromSlice"
import * as Yup from "yup"
import { useEffect } from "react"

const validationSchema = Yup.object({
  userFirstName: Yup.string()
    .required("First name is required")
    .min(2, "First Name must have at least 2 characters"),
  userLastName: Yup.string()
    .required("Last name is required")
    .min(2, "First Name must have at least 2 characters"),
  userEmail: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  userPhoneNumber: Yup.string()
    .required("Phone number is required")
    .min(10, "Phone number must have at least 10 characters"),
  userPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
})

function UserRegistrationForm() {


  useEffect(() => {
    // Когда компонент монтируется, прокручиваем страницу в верх
    window.scrollTo(0, 0);
  }, []);

  const formValues = useAppSelector(registrationFormSelectors.formValues)
  const isChecked = useAppSelector(registrationFormSelectors.isChecked)
  const errors = useAppSelector(registrationFormSelectors.errors)

  const dispatch = useAppDispatch()

  // значения поля
  const onHandleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    dispatch(registrationFormActions.setFieldValue({ name, value }))
  }

  // чекбокс
  const onHandleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(registrationFormActions.setChecked(e.target.checked))
  }

  // отправка формы
  const onHandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    //валидация Yup
    try {
      await validationSchema.validate(formValues, { abortEarly: false })

      // отправка данных, если все успешно
      const newValues = { ...formValues, id: v4() }

      // Отправка данных на сервер
      // sendDataToServer(newValues);

      dispatch(registrationFormActions.resetForm())
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          dispatch(
            registrationFormActions.setError({
              name: error.path as
                | "userFirstName"
                | "userLastName"
                | "userEmail"
                | "userPhoneNumber"
                | "userPassword",
              error: error.message,
            }),
          )
        })
      }
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-[700px] bg-white border border-gray-300 rounded-lg p-8">
        <h2 className="mt-6 text-3xl font-semibold text-gray-900 text-center">
          Create your account
        </h2>
        <form onSubmit={onHandleSubmit} className="mt-12">
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <Input
                name="userFirstName"
                placeholder="Enter your first name"
                value={formValues.userFirstName}
                label="First Name"
                onChange={onHandleInputChange}
              />
              {errors.userFirstName && (
                <div className="text-red-500 text-sm">
                  {errors.userFirstName}
                </div>
              )}
            </div>
            <div>
              <Input
                name="userLastName"
                placeholder="Enter your last name"
                value={formValues.userLastName}
                label="Last Name"
                onChange={onHandleInputChange}
              />
              {errors.userLastName && (
                <div className="text-red-500 text-sm">
                  {errors.userLastName}
                </div>
              )}
            </div>
          </div>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <Input
                name="userEmail"
                type="email"
                placeholder="Enter your email"
                value={formValues.userEmail}
                label="Email"
                onChange={onHandleInputChange}
              />
              {errors.userEmail && (
                <div className="text-red-500 text-sm">{errors.userEmail}</div>
              )}
            </div>
            <div>
              <Input
                name="userPhoneNumber"
                type="tel"
                placeholder="Enter your phone number"
                value={formValues.userPhoneNumber}
                label="Phone Number"
                onChange={onHandleInputChange}
              />
              {errors.userPhoneNumber && (
                <div className="text-red-500 text-sm">
                  {errors.userPhoneNumber}
                </div>
              )}
            </div>
          </div>
          <div>
            <Input
              name="userPassword"
              type="password"
              placeholder="Enter your password"
              value={formValues.userPassword}
              label="Password"
              onChange={onHandleInputChange}
            />
            {errors.userPassword && (
              <div className="text-red-500 text-sm">{errors.userPassword}</div>
            )}
          </div>
          <label className="flex items-center mb-4 cursor-pointer">
            <input
              type="checkbox"
              className="form-checkbox h5 w-5 text-red-500"
              id="termsCheckbox"
              onChange={onHandleCheckboxChange}
            />
            <span className="ml-2 text gray-700">
              I agree to all the
              <a href="#" className="text-red-500 underline">
                Terms{" "}
              </a>
              and
              <a href="#" className="text-red-500 underline">
                {" "}
                Privacy Policies
              </a>
            </span>
          </label>
          <Button
            name="Create"
            type="submit"
            disabled={!isChecked}
            onClick={() => {
              console.log(formValues) // временно
            }}
          />
        </form>
      </div>
    </div>
  )
}

export default UserRegistrationForm
