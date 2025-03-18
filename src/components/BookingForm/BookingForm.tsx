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
    totalRentCost: Yup.string().required("Rent cost can't be empty"),
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

  return (
    <div className="flex flex-col w-[590px] h-[592px] p-[60px] gap-5 rounded-md bg-white">
      <h2 className="text-xl font-bold mb-4">
        To rent a car please fill and submit the following form.
      </h2>

      <div className="flex flex-col gap-1 w-full">
        <Input
          id="startDate"
          name="startDate"
          type="date"
          label="Start date"
          placeholder="Select start date"
          value={formik.values.startDate}
          onChange={formik.handleChange}
          error={formik.errors.startDate}
        />
        <Input
          id="endDate"
          name="endDate"
          type="date"
          label="End date"
          placeholder="Select end date"
          value={formik.values.endDate} //saves dates from home page filter
          onChange={formik.handleChange}
          error={formik.errors.endDate}
        />
        <Input
          id="pickUpLocation"
          name="pickUpLocation"
          type="text"
          label="Pick up lokation"
          placeholder="Car pick up at the office location is only possible."
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
        />
        <div className="mt-2.5 w-1/2">
          <Button
            name="Calculate Total Cost"
            type="button"
            onClick={calculateTotalCost}
            disabled={!(formik.values.startDate && formik.values.endDate)}
          />
        </div>
      </div>
      <div className="mt-2.5 w-1/2">
        <Button
          name="Confirm"
          type="submit"
          disabled={!formik.isValid || !formik.values.totalRentCost}
        />
      </div>
      <p className="text-sm text-gray-500 mb-4">
        Payment can be done only at the office when picking up the car.
      </p>
    </div>
  )
}

export default RentForm
