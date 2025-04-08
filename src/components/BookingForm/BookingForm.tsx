import Button from "../Button/Button"
import Input from "../Input/Input"
import * as Yup from "yup"
import { useFormik } from "formik"
import { BookingFormProps, RentFormValues } from "../BookingForm/types"
import { useLocation, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { rentCarSelectors } from "store/redux/rentCarSlice/rentCarSlice"
import Notification1 from "components/Notification/Notification1"
import {
  bookingActions,
  bookingSelectors,
} from "store/redux/BookingSlice/BookingSlice"
import { authActions, authSelectors } from "store/redux/AuthSlice/authSlice"

function BookingForm() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const location = useLocation()
  const car = location.state?.car

  const token = useAppSelector(authSelectors.accessToken)
  useEffect(() => {
    dispatch(authActions.getCurrentUser())
  }, [token])

  const [showNotification, setShowNotification] = useState(false)
  const { startDate, endDate } = useAppSelector(rentCarSelectors.selectDates)

  const today = new Date().toLocaleDateString("en-CA")

  const calculateTotalCost = (
    startDate: Date,
    endDate: Date,
    dayRentalPrice: number,
  ): number => {
    const start = new Date(startDate.setHours(0, 0, 0, 0))
    const end = new Date(endDate.setHours(0, 0, 0, 0))
    if (end < start) {
      console.error("End date cannot be earlier than start date.")
      return 0
    }
    const timeDifference = end.getTime() - start.getTime()
    const days = Math.ceil(timeDifference / (1000 * 3600 * 24)) + 1
    const totalRentCost = days >= 1 ? days * dayRentalPrice : dayRentalPrice
    return totalRentCost
  }

  const validationSchema = Yup.object({
    rentalStartDate: Yup.date()
      .required("Start date is required")
      .min(today, "Start date cannot be in the past"),
    rentalEndDate: Yup.date()
      .required("End date is required")
      .min(
        Yup.ref("rentalStartDate"),
        "End date must be later than start date",
      ),
    totalPrice: Yup.number()
      .required("Rent cost can't be empty")
      .min(0.01, "Rent cost can't be 0"),
    is18: Yup.boolean()
      .oneOf([true], "You must be 18 years old to rent a car")
      .required("You must be 18 years old to rent a car"),
  })

  const formik = useFormik({
    initialValues: {
      rentalStartDate: startDate
        ? new Date(startDate).toLocaleDateString("en-CA")
        : new Date().toLocaleDateString("en-CA"),
      rentalEndDate: endDate
        ? new Date(endDate).toLocaleDateString("en-CA")
        : (() => {
            const tomorrow = new Date()
            tomorrow.setDate(tomorrow.getDate() + 1)
            return tomorrow.toLocaleDateString("en-CA")
          })(),
      totalPrice: "",
      is18: false,
    } as unknown as RentFormValues,
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values: RentFormValues, { resetForm }) => {
      console.log("Submitted values:", values)
      const bookingDataForDispatch = {
        rentalStartDate: values.rentalStartDate,
        rentalEndDate: values.rentalEndDate,
        // totalPrice: values.totalPrice,
        carId: car.id,
      }
      setShowNotification(true)
      dispatch(bookingActions.createBooking({ token: token, bookingDataForDispatch: bookingDataForDispatch }))
      resetForm()
      navigate("/account/myBookings")
    },
  })

  //Automatic calculation of renting price
  useEffect(() => {
    const { rentalStartDate, rentalEndDate } = formik.values
    if (rentalStartDate && rentalEndDate) {
      const start = new Date(rentalStartDate)
      const end = new Date(rentalEndDate)
      const totalCost = calculateTotalCost(start, end, car.dayRentalPrice)
      formik.setFieldValue("totalPrice", totalCost)
    }
  }, [
    formik.values.rentalStartDate,
    formik.values.rentalEndDate,
    car.dayRentalPrice,
  ])

  const handleClose = () => {
    navigate("/")
  }

  const handleNotificationClose = () => {
    setShowNotification(false)
    navigate("/account")
  }

//   const formatDateTimeForInput = (dateTime: string) => {
//     if (!dateTime) return '';
//     const date = new Date(dateTime);
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const day = String(date.getDate()).padStart(2, '0');
//     const hours = String(date.getHours()).padStart(2, '0');
//     const minutes = String(date.getMinutes()).padStart(2, '0');
//     const seconds = String(date.getSeconds()).padStart(2, '0');
//   
//     return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
// };

  return (
    <div className="flex flex-col w-[590px] mx-auto gap-4 rounded-md">
      <h2 className="text-xl font-bold py-4 mb-2">
        To rent a car please fill and submit the following form:
      </h2>

      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3">
        <div className="flex flex-col gap-2 w-full">
          <Input
            name="rentalStartDate"
            type="datetime-local"
            label="Start date"
            placeholder="Select start date"
            value={formik.values.rentalStartDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorMessage={
              formik.errors.rentalStartDate
                ? String(formik.errors.rentalStartDate)
                : undefined
            }
          />
          <Input
            name="rentalEndDate"
            type="datetime-local"
            label="End date"
            placeholder="Select end date"
            value={formik.values.rentalEndDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorMessage={
              formik.errors.rentalEndDate
                ? String(formik.errors.rentalEndDate)
                : undefined
            }
          />

          <Input
            name="totalPrice"
            type="text"
            label="Total Rent Cost"
            placeholder="Total cost will be calculated automatically"
            value={new Intl.NumberFormat('en-US').format(formik.values.totalPrice || 0)}
            onChange={() => {}}
            onBlur={formik.handleBlur}
            errorMessage={formik.errors.totalPrice}
            readOnly={true}
          />

          <label className="flex items-center cursor-pointer gap-2">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-red-500"
              id="is18"
              checked={formik.values.is18}
              onChange={formik.handleChange}
              name="is18"
              onBlur={formik.handleBlur}
            />
            <span className="text-gray-700 font-semibold">
              Are you already 18 ?
            </span>
          </label>
          {formik.errors.is18 && formik.touched.is18 && (
            <p className="text-red-500 text-sm">{formik.errors.is18}</p>
          )}

          <div className="mt-2">
            <p className="text-sm text-gray-500 mb-2">
              Payment is available only at pick up station.
            </p>
            <p className="text-sm text-gray-500 mb-2">
              You can pick up a car only at the pick up station.
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button name="Confirm" type="submit" />
        </div>

        {/* close button */}
        <div className="flex-1">
          <Button
            name="Cancel"
            customClasses="!rounded-lg !bg-gray-400 hover:!bg-red-700 text-white flex-1"
            onClick={handleClose}
          />
        </div>
      </form>

      {showNotification && (
        <Notification1
          topic="Success!"
          message="The car has been successfully rented!"
          onClose={handleNotificationClose}
        />
      )}
    </div>
  )
}
export default BookingForm
