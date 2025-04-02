import Button from "../Button/Button"
import Input from "../Input/Input"
import * as Yup from "yup"
import { useFormik } from "formik"
import { RentFormValues } from "../BookingForm/types"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import {
  bookingActions,
  bookingSelectors,
} from "store/redux/BookingSlice/BookingSlice"
import { useAppDispatch, useAppSelector } from "store/hooks"

const costPerDay = 50 // Example cost per day
const carId = "9"
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

function BookingForm() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

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
    is18: Yup.boolean()
      .oneOf([true], "You must be 18 years old to rent a car")
      .required("You must be 18 years old to rent a car"),
  })

  const formik = useFormik({
    initialValues: {
      rentalStartDate: new Date().toLocaleDateString("en-CA"),
      rentalEndDate: (() => {
        const tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1)
        return tomorrow.toLocaleDateString("en-CA") // Преобразуем в формат 'yyyy-MM-dd'
      })(),
      totalPrice: "",
      is18: false,
    } as unknown as RentFormValues,
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values: RentFormValues) => {
      console.log("Submitted values:", values)

      const bookingDataForDispatch = {
        rentalStartDate: values.rentalStartDate,
        rentalEndDate: values.rentalEndDate,
        carId: carId,
      }
      alert("The car is rented")
      navigate("/account")
      dispatch(bookingActions.createBooking(bookingDataForDispatch))
    },
  })

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

  const handleClose = () => {
    navigate("/")
  }

  return (
    <div className="flex flex-col w-[590px] mx-auto gap-8 rounded-md">
      <h2 className="text-xl font-bold p-[60px] mb-6">
        To rent a car please fill and submit the following form:
      </h2>

      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-1 w-full ">
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
            label="Total Rent Cost"
            placeholder="Click button to display total cost"
            value={formik.values.totalPrice}
            onChange={() => {}}
            onBlur={formik.handleBlur}
            errorMessage={formik.errors.totalPrice}
            readOnly={true}
          />

          <label className="flex items-center cursor-pointer gap-3">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-red-500"
              id="is18"
              checked={formik.values.is18}
              onChange={formik.handleChange}
              name="is18"
              onBlur={formik.handleBlur}
            />
            <span className="ml-2 text-gray-700 font-semibold">
              Are you already 18 ?
            </span>
          </label>
          {formik.errors.is18 && formik.touched.is18 && (
            <p className="text-red-500 text-sm ">{formik.errors.is18}</p>
          )}

          <div className="mt-4">
            <p className="text-sm text-gray-500 mb-4">
              Payment is available only at pick up station.
            </p>
            <p className="text-sm text-gray-500 mb-4">
              You can pick up a car only at the pick up station.
            </p>
          </div>
          <div className="mt-2.5 w-100%">
            <Button
              name="Calculate Total Cost"
              type="button"
              onClick={handleCalculateTotalCost}
              disabled={
                !(formik.values.rentalStartDate && formik.values.rentalEndDate)
              }
              customClasses="!w-full !rounded-lg  hover:!bg-red-700 transition-colors duration-300 !bg-gray-900 !text-white"
            />
          </div>
        </div>
        <div className="mt-2.5 w-100%">
          <Button name="Confirm" type="submit" />
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
export default BookingForm
