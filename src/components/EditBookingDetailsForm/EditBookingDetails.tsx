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
import { authActions, authSelectors } from "store/redux/AuthSlice/authSlice"
import {
  rentCarActions,
  rentCarSelectors,
} from "store/redux/rentCarSlice/rentCarSlice"

const EditBookingDetailsForm: React.FC<EditBookingFormProps> = ({
  booking,
}) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const location = useLocation()
  const {bookingDetails}  = location.state  || {};
  const user = useSelector(authSelectors.userData)

  const car = bookingDetails.carDto
  
  const token = useAppSelector(authSelectors.accessToken)
  
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
    bookingStatus: Yup.string().required("Status is required"),
  })

  const [formData, setFormData] = useState<BookingProps>(bookingDetails)
  useEffect(() => {
    if (bookingDetails) {
      setFormData(bookingDetails)
    }
  }, [bookingDetails])

  const formik = useFormik({
    initialValues: formData,
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values: BookingProps) => {
      alert("The booking details are updated")

      const newEndDate = values.rentalEndDate
      handleExtendBooking(values.id, token , newEndDate)

      if (user?.role === "ROLE_ADMIN") {
        navigate("/admin/allBookings")
      } else if (user?.role === "ROLE_CUSTOMER") {
        navigate("/account/myBookings")
      } else {
        console.error("Unknown role")
      }
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

  const handleCancelBooking = (bookingId: string , token: string | null) => {
    alert("The booking is cancelled")
    dispatch(bookingActions.cancelBooking({ bookingId: bookingDetails.id, token: token }))

    if (user?.role === "ROLE_ADMIN") {
      navigate("/admin/allBookings")
    } else if (user?.role === "ROLE_CUSTOMER") {
      navigate("/account/myBookings")
    } else {
      console.error("Unknown role")
    }
  }

  const handleCloseBooking = (bookingId: string, token: string | null) => {
    alert("The booking is closed")
    dispatch(bookingActions.closeBooking({  bookingId: bookingDetails.id, token: token}))

    if (user?.role === "ROLE_ADMIN") {
      navigate("/admin/allBookings")
    } else if (user?.role === "ROLE_CUSTOMER") {
      navigate("/account/myBookings")
    } else {
      console.error("Unknown role")
    }
  }

  const handleExtendBooking = (id: string, token: string |null, newEndDate: string) => {
    dispatch(bookingActions.extendBooking({ id: bookingDetails.id, newEndDate: newEndDate, token: token }))
  }

  const handleClose = () => {
    if (user?.role === "ROLE_ADMIN") {
      navigate("/admin/allBookings")
    } else if (user?.role === "ROLE_CUSTOMER") {
      navigate("/account/myBookings")
    } else {
      console.error("Unknown role")
    }
  }

  const formatDateTimeForInput = (dateTime: string) => {
    if (!dateTime) return '';
    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  const milliseconds = String(date.getMilliseconds()).padStart(3, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
};

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
              <div className="w-2/3">
                {car.brand} {car.model}
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-1/3 font-bold">Renter:</div>
              <div className="w-2/3">
                {bookingDetails.customerDto.firstName} {bookingDetails.customerDto.lastName}
              </div>
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
            type="datetime-local"
            label="Start date"
            placeholder="Select start date"
            value={formatDateTimeForInput(formik.values.rentalStartDate)}
            onChange={formik.handleChange}
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
            type="datetime-local"
            label="End date"
            placeholder="Select end date"
            value={formatDateTimeForInput(formik.values.rentalEndDate)}
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
            type="number"
            label="Total Rent Cost €"
            placeholder="Click button to display total cost"
            value={formik.values.totalPrice}
            onChange={() => {}}
            onBlur={formik.handleBlur}
            errorMessage={formik.errors.totalPrice}
            readOnly={true}
          />
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
        <div className="w-auto">
          <Button name="Apply" type="submit" />
        </div>

        {/* cancel booking button */}
        {formik.values.bookingStatus === "PENDING" && (
          <div className="w-auto mt-2.5">
            <Button
              name="Cancel Booking"
              customClasses="!rounded-lg  !bg-gray-400 hover:!bg-red-700 text-white"
              onClick={() => handleCancelBooking(formik.values.id, token)}
            />
          </div>
        )}

        {/* close booking button */}
        {formik.values.bookingStatus === "ACTIVE" && user?.role === "ROLE_ADMIN" && (
          <div className="w-auto mt-2.5">
            <Button
              name="Close Booking"
              customClasses="!rounded-lg  !bg-gray-400 hover:!bg-red-700 text-white"
              onClick={() => handleCloseBooking(formik.values.id, token)}
            />
          </div>
        )}

        {/* close button */}
        <div className="w-auto mt-2.5">
          <Button
            name="Exit"
            customClasses="!w-full !rounded-lg  hover:!bg-red-700 transition-colors duration-300 !bg-gray-900 !text-white"
            onClick={handleClose}
          />
        </div>
      </form>
    </div>
  )
}
export default EditBookingDetailsForm
