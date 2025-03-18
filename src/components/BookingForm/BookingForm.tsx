import Button from "../Button/Button"
import Input from "../Input/Input"
import * as Yup from "yup"
import { useFormik } from "formik"
import { RentFormValues } from "../BookingForm/types"

const costPerDay = 50 // Example cost per day

const calculateTotalCost = (startDate: string, endDate: string): number => {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const timeDifference = end.getTime() - start.getTime()
  const days = timeDifference / (1000 * 3600 * 24)
  const totalRentCost = days > 1 ? days * costPerDay : 0
  return totalRentCost
}

function RentForm() {
  const onDataChange = (values: RentFormValues) => {
    console.log("Form submitted with values:", values)
  }

  const validationSchema = Yup.object({
    startDate: Yup.date()
      .required("Start date is required")
      .min(new Date(), "Start date cannot be in the past"),
    endDate: Yup.date()
      .required("End date is required")
      .min(Yup.ref("startDate"), "End date must be later than start date"),
    pickUpLocation: Yup.string().required("Pick-up location is required"),
    totalRentCost: Yup.number()
      .required("Rent cost can't be empty")
      .min(0.01, "Rent cost can't be 0"),
  })

  const formik = useFormik({
    initialValues: {
      startDate: "",
      endDate: "",
      pickUpLocation: "Pick up station",
      totalRentCost: "",
    } as unknown as RentFormValues,
    validationSchema: validationSchema,
    validateOnChange: false,
    onSubmit: (values: RentFormValues) => {
      onDataChange(values)
    },
  })

  const handleCalculateTotalCost = () => {
    const { startDate, endDate } = formik.values

    // Ensure the dates are valid strings (startDate and endDate should be valid date strings)
    if (!startDate || !endDate) {
      console.error("Both startDate and endDate are required.")
      return // Exit if startDate or endDate is missing
    }

    const totalCost = calculateTotalCost(startDate, endDate) // Pass as strings
    formik.setFieldValue("totalRentCost", totalCost) // Update Formik state
  }

  return (
    <div className="flex flex-col w-[590px] h-[592px] p-[60px] m-[60px] gap-8 rounded-md bg-white">
      <h2 className="text-xl font-bold p-[60px] mb-6">
        To rent a car please fill and submit the following form:
      </h2>

      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-1 w-full ">
          <Input
            id="startDate"
            name="startDate"
            type="date"
            label="Start date"
            placeholder="Select start date"
            value={formik.values.startDate}
            onChange={formik.handleChange}
            error={formik.errors.startDate}
            className={`${formik.errors.startDate && formik.touched.startDate}`}
          />

          {formik.errors.startDate && formik.touched.startDate && (
            <div className="text-red-500 mb-6">{formik.errors.startDate}</div>
          )}

          <Input
            id="endDate"
            name="endDate"
            type="date"
            label="End date"
            placeholder="Select end date"
            value={formik.values.endDate} //saves dates from home page filter
            onChange={formik.handleChange}
            error={formik.errors.endDate}
            className={` ${formik.errors.endDate && formik.touched.endDate}`}
          />

          {formik.errors.endDate && formik.touched.endDate && (
            <div className="text-red-500 mb-6">{formik.errors.endDate}</div>
          )}

          <Input
            id="pickUpLocation"
            name="pickUpLocation"
            type="text"
            label="Pick up lokation"
            //placeholder="You can pick up a car only at the pick up station."
            value="Pick up station" // Predefined value
            onChange={formik.handleChange}
            disabled // Disable the input
          />
          <Input
            id="totalRentCost"
            name="totalRentCost"
            type="number"
            label="Total Rent Cost"
            placeholder="Click button to display total cost"
            value={formik.values.totalRentCost}
            onChange={() => {}}
            disabled
            className={`${formik.errors.totalRentCost && formik.touched.totalRentCost}`}
          />

          {formik.errors.totalRentCost && formik.touched.totalRentCost && (
            <div className="text-red-500 mb-4">
              {formik.errors.totalRentCost}
            </div>
          )}

          <p className="text-sm text-gray-500 mb-4">
            Payment is available only at pick up station.
          </p>
          <div className="mt-2.5 w-100%">
            <Button
              name="Calculate Total Cost"
              type="button"
              onClick={handleCalculateTotalCost}
              disabled={!(formik.values.startDate && formik.values.endDate)}
            />
          </div>
        </div>
        <div className="mt-2.5 w-100%">
          <Button
            name="Confirm"
            type="submit"
            //disabled={!formik.isValid || !formik.values.totalRentCost || formik.isSubmitting}
          />
        </div>
      </form>
    </div>
  )
}

export default RentForm
