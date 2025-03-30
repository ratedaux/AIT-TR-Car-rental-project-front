import { EditBookingFormProps } from "./types"
import Button from "components/Button/Button"
import Input from "components/Input/Input"
import * as Yup from "yup"
import { useFormik } from "formik"
import { useNavigate } from "react-router"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  bookingActions,
  bookingSelectors,
} from "store/redux/BookingSlice/BookingSlice"
import { useAppDispatch, useAppSelector } from "store/hooks"

// example booking data delete later
// const bookingData = {
//   startDate: "2025-03-24",
//   endDate: "2025-03-25",
//   carBrand: "Toyota",
//   carModel: "Corolla",
//   status: "Active",
//   totalRentCost: 100,
//   renterFirstName: "Masha",
//   renterLastName: "Neshyna",
//   updateBookingDate: "2025-03-25",
//   createBookingDate: "2025-03-25",
//   id: 1,
// }

const costPerDay = 50 // Example cost per day

const calculateTotalCost = (startDate: Date, endDate: Date): number => {
  // Сбросим время для обеих дат, чтобы учитывать только дни
  const start = new Date(startDate.setHours(0, 0, 0, 0))
  const end = new Date(endDate.setHours(0, 0, 0, 0))

  // Проверка, что дата конца не раньше даты начала
  if (end < start) {
    console.error("End date cannot be earlier than start date.")
    return 0
  }
  // Вычисляем разницу во времени
  const timeDifference = end.getTime() - start.getTime()

  // Количество дней
  const days = timeDifference / (1000 * 3600 * 24)

  // Если разница в днях меньше 1, считаем хотя бы 1 день аренды
  const totalRentCost = days >= 1 ? days * costPerDay : costPerDay
  // Пример: даже если 1 день, все равно начисляем стоимость аренды

  return totalRentCost
}

function EditBookingDetailsForm() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const today = new Date().toLocaleDateString("en-CA")
  const validationSchema = Yup.object({
    startDate: Yup.date()
      .required("Start date is required")
      .min(today, "Start date cannot be in the past"),
    endDate: Yup.date()
      .required("End date is required")
      .min(Yup.ref("startDate"), "End date must be later than start date"),
    totalRentCost: Yup.number()
      .required("Rent cost can't be empty")
      .min(0.01, "Rent cost can't be 0"),
    status: Yup.string().required("Status is required"),
  })

  const bookingData = useAppSelector(bookingSelectors.selectBookingData)

  const handleExtendBooking = (
    id: string,
    updatedData: EditBookingFormProps,
  ) => {
    dispatch(bookingActions.extendBooking({ id, updatedData }))
  }

  useEffect(() => {}, [bookingData])

  const formik = useFormik({
    initialValues: {
      startDate: bookingData.rentalStartDate || "",
      endDate: bookingData.rentalEndDate || "",
      totalRentCost: bookingData.totalPrice || 0,
      status: bookingData.bookingStatus || "",
      carId: bookingData.carId,
      customerId: bookingData.customerId,
      updateBookingDate: bookingData.createBookingDate || "",
      createBookingDate: bookingData.updateBookingDate || "",
      id: bookingData.id || "",
    },
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values: EditBookingFormProps) => {
      console.log("Submitted values:", values)

      alert("The booking details are updated")
      //  navigate("/account")

      handleExtendBooking(values.id, values)
    },
  })

  // Сбрасываем стоимость аренды, если изменяется дата начала или конца
  const handleDateChange = () => {
    formik.setFieldValue("totalRentCost", 0)
  }

  const handleCalculateTotalCost = () => {
    const { startDate, endDate } = formik.values

    // Ensure the dates are valid strings (startDate and endDate should be valid date strings)
    if (!startDate || !endDate) {
      console.error("Both startDate and endDate are required.")
      return // Exit if startDate or endDate is missing
    }
    // Преобразуем строки в объекты Date
    const start = new Date(startDate)
    const end = new Date(endDate)

    const totalCost = calculateTotalCost(start, end) // Pass as strings
    formik.setFieldValue("totalRentCost", totalCost) // Update Formik state
  }

  // State to manage the visibility of the window
  const [isVisible, setIsVisible] = useState(true)

  // Handle close button click
  const handleClose = () => {
    setIsVisible(false) // Set visibility to false, effectively "closing" the window
  }

  if (!isVisible) {
    return null // If not visible, return nothing (effectively hiding the component)
  }

  function handleBookingCancel(
    id: string,
    updatedData: EditBookingFormProps,
  ): void {
    dispatch(bookingActions.cancelBooking({ id, updatedData }))
    alert("The booking is cancelled")
    navigate("/account")
  }

  //visible only when the boooking is cancelled
  function handlRestoreBooking(
    id: string,
    updatedData: EditBookingFormProps,
  ): void {
    dispatch(bookingActions.restoreBooking({ id, updatedData }))
    alert("The cancelled booking is restored")
    navigate("/account")
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
              <div className="w-2/3">{bookingData.carId}</div>
            </div>
            <div className="flex gap-4">
              <div className="w-1/3 font-bold">Renter:</div>
              <div className="w-2/3">{bookingData.customerId}</div>
            </div>
            <div className="flex gap-4">
              <div className="w-1/3 font-bold">Rent details updated on:</div>
              <div className="w-2/3">{bookingData.updateBookingDate}</div>
            </div>
            <div className="flex gap-4">
              <div className="w-1/3 font-bold">Rent created on:</div>
              <div className="w-2/3">{bookingData.createBookingDate}</div>
            </div>
          </div>

          <Input
            name="startDate"
            type="date"
            label="Start date"
            placeholder="Select start date"
            value={formik.values.startDate}
            onChange={e => {
              formik.handleChange(e)
              handleDateChange()
            }}
            onBlur={formik.handleBlur}
            errorMessage={
              formik.errors.startDate
                ? String(formik.errors.startDate)
                : undefined
            }
          />
          <Input
            name="endDate"
            type="date"
            label="End date"
            placeholder="Select end date"
            value={formik.values.endDate}
            onChange={e => {
              formik.handleChange(e)
              handleDateChange()
            }}
            onBlur={formik.handleBlur}
            errorMessage={
              formik.errors.endDate ? String(formik.errors.endDate) : undefined
            }
          />
          <Input
            name="totalRentCost"
            type="number"
            label="Total Rent Cost €"
            placeholder="Click button to display total cost"
            value={formik.values.totalRentCost}
            onChange={() => {}}
            onBlur={formik.handleBlur}
            errorMessage={formik.errors.totalRentCost}
            readOnly={true}
          />
          {/* must be available only for admin  */}
          <Input
            name="status"
            type="select"
            options={["Active", "Completed"]}
            label="Status"
            placeholder="Select status"
            value={formik.values.status}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorMessage={formik.errors.status}
          />
        </div>

        <div className="mb-2.5">
          <Button
            name="Recalculate Total Cost"
            type="button"
            onClick={handleCalculateTotalCost}
            disabled={!(formik.values.startDate && formik.values.endDate)}
            customClasses="!w-full !rounded-lg  hover:!bg-red-700 transition-colors duration-300 !bg-gray-900 !text-white"
          />
        </div>

        <div className="w-auto">
          <Button name="Apply" type="submit" />
        </div>

        {/* cancel booking button */}
        {formik.values.status === "Active" && (
          <div className="w-auto mt-2.5">
            <Button
              name="Cancel Booking"
              customClasses="!rounded-lg  !bg-gray-400 hover:!bg-red-700 text-white"
              onClick={() =>
                handleBookingCancel(formik.values.id, formik.values)
              }
            />
          </div>
        )}

        {/* restore booking button */}
        {formik.values.status === "Completed" && (
          <div className="w-auto mt-2.5">
            <Button
              name="Restore Booking"
              customClasses="!rounded-lg  !bg-gray-400 hover:!bg-red-700 text-white"
              onClick={() =>
                handlRestoreBooking(formik.values.id, formik.values)
              }
            />
          </div>
        )}
      </form>

      {/* close button */}
      <div className="mt-6">
        <Button
          name="X"
          customClasses="!px-6 !py-6 !rounded-full font-semibold !bg-gray-400 hover:!bg-red-700 text-white"
          onClick={handleClose}
        />
      </div>
    </div>
  )
}
export default EditBookingDetailsForm
