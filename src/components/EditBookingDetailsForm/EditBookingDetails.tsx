import { EditBookingFormProps } from "./types"
import Button from "components/Button/Button"
import Input from "components/Input/Input"
import * as Yup from "yup"
import { useFormik } from "formik"
import { useLocation, useNavigate } from "react-router"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  bookingActions,
  bookingSelectors,
} from "store/redux/BookingSlice/BookingSlice"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { BookingProps } from "components/BookingComponent/types"

const costPerDay = 50 // Example cost per day
// TODO add dispatch

const calculateTotalCost = (startDate: Date, endDate: Date): number => {
  const start = new Date(startDate.setHours(0, 0, 0, 0))
  const end = new Date(endDate.setHours(0, 0, 0, 0))
  if (end < start) {
    console.error("End date cannot be earlier than start date.")
    return 0
  }
  const timeDifference = end.getTime() - start.getTime()
  const days = timeDifference / (1000 * 3600 * 24)
  const totalRentCost = days >= 1 ? days * costPerDay : costPerDay
  return totalRentCost
}

const EditBookingDetailsForm: React.FC<EditBookingFormProps> = ({
  booking,
}) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const location = useLocation()
  const { bookingDetails } = location.state || {}

  const today = new Date().toLocaleDateString("en-CA")
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
    bookingStatus: Yup.string().required("Status is required"),
  })

  const [formData, setFormData] = useState<BookingProps>(bookingDetails)
  useEffect(() => {
    if (bookingDetails) {
      setFormData(bookingDetails)
    }
  }, [booking])

  const formik = useFormik({
    initialValues: formData,
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values: BookingProps) => {
      console.log("Submitted values:", values)
      alert("The booking details are updated")
      navigate("/account")
      handleExtendBooking(values.id, values)
    },
  })

  // Сбрасываем стоимость аренды, если изменяется дата начала или конца
  const handleDateChange = () => {
    formik.setFieldValue("totalPrice", 0)
  }

  const handleCalculateTotalCost = () => {
    const { rentalStartDate, rentalEndDate } = formik.values
    if (!rentalStartDate || !rentalEndDate) {
      console.error("Both startDate and endDate are required.")
      return
    }
    const start = new Date(rentalStartDate)
    const end = new Date(rentalEndDate)
    const totalCost = calculateTotalCost(start, end)
    formik.setFieldValue("totalPrice", totalCost)
  }

  const handleCancelBooking = (id: string) => {
    alert("The booking is cancelled")
    navigate("/account")
    dispatch(bookingActions.cancelBooking(id))
  }

  const handleCloseBooking = (id: string) => {
    alert("The booking is cancelled")
    navigate("/account")
    dispatch(bookingActions.cancelBooking(id))
  }

  const handleExtendBooking = (id: string, updatedData: BookingProps) => {
    const bookingDataToDispatch = {
      id,  
      rentalEndDate: updatedData.rentalEndDate
    }
      dispatch(bookingActions.extendBooking({ id, bookingDataToDispatch }))
     }

  return (
    <div className="flex flex-col w-[590px] mx-auto gap-8 rounded-md m-3">
      <h2 className="text-xl font-bold p-[60px] mb-6">
        To edit the rental details please edit and submit the following form:
      </h2>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <div className="flex flex-col gap-4 w-full mb-7 ">
            <div className="flex gap-4">
              <div className="w-1/3 font-bold">Car:</div>
              <div className="w-2/3">{bookingDetails.brand} {bookingDetails.model}</div>
            </div>
            <div className="flex gap-4">
              <div className="w-1/3 font-bold">Renter:</div>
              <div className="w-2/3">{bookingDetails.firstName} {bookingDetails.lastName}</div>
            </div>
            <div className="flex gap-4">
              <div className="w-1/3 font-bold">Rent details updated on:</div>
              <div className="w-2/3">{bookingDetails.updateBookingDate}</div>
            </div>
            <div className="flex gap-4">
              <div className="w-1/3 font-bold">Rent created on:</div>
              <div className="w-2/3">{bookingDetails.createBookingDate}</div>
            </div>
          </div>

          <Input
            name="rentalStartDate"
            type="date"
            label="Start date"
            placeholder="Select start date"
            value={formik.values.rentalStartDate}
            onChange={e => {
              formik.handleChange(e)
              handleDateChange()
            }}
            onBlur={formik.handleBlur}
            readOnly={true}
            disabled={true}
            errorMessage={
              formik.errors.rentalStartDate
                ? String(formik.errors.rentalStartDate)
                : undefined
            }
          />
          <Input
            name="rentalEndDate"
            type="date"
            label="End date"
            placeholder="Select end date"
            value={formik.values.rentalEndDate}
            onChange={e => {
              formik.handleChange(e)
              handleDateChange()
            }}
            onBlur={formik.handleBlur}
            errorMessage={
              formik.errors.rentalEndDate
                ? String(formik.errors.rentalEndDate)
                : undefined
            }
          />
          <Input
            name="totalPrice"
            type="number"
            label="Total Rent Cost €"
            placeholder="Click button to display total cost"
            value={formik.values.totalPrice}
            onChange={() => {}}
            onBlur={formik.handleBlur}
            errorMessage={formik.errors.totalPrice}
            readOnly={true}
          />
          {/* must be available only for admin  */}
          <Input
            name="bookingStatus"
            type="select"
            options={[
              "PENDING",
              "ACTIVE",
              "RENTED",
              "CANCELLED_BY_ADMIN",
              "CANCELLED_BY_USER",
              "CLOSED_BY_ADMIN",
            ]}
            label="Status"
            placeholder="Select status"
            value={formik.values.bookingStatus}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            readOnly={true}
            disabled={true}
            errorMessage={formik.errors.bookingStatus}
          />
        </div>

        <div className="mb-2.5">
          <Button
            name="Recalculate Total Cost"
            type="button"
            onClick={handleCalculateTotalCost}
            disabled={
              !(formik.values.rentalStartDate && formik.values.rentalEndDate)
            }
            customClasses="!w-full !rounded-lg  hover:!bg-red-700 transition-colors duration-300 !bg-gray-900 !text-white"
          />
        </div>

        <div className="w-auto">
          <Button name="Apply" type="submit" />
        </div>

        {/* cancel booking button */}
        {formik.values.bookingStatus === "PENDING" && (
          <div className="w-auto mt-2.5">
            <Button
              name="Cancel Booking"
              customClasses="!rounded-lg  !bg-gray-400 hover:!bg-red-700 text-white"
              onClick={() => handleCancelBooking(formik.values.id)}
            />
          </div>
        )}

        {/* close booking button */}
        {formik.values.bookingStatus === "ACTIVE" && (
          <div className="w-auto mt-2.5">
            <Button
              name="Close Booking"
              customClasses="!rounded-lg  !bg-gray-400 hover:!bg-red-700 text-white"
              onClick={() => handleCloseBooking(formik.values.id)}
            />
          </div>
        )}
      </form>
    </div>
  )
}
export default EditBookingDetailsForm
