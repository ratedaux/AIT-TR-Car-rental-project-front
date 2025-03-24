import { EditCarFormProps } from "./types"
import Button from "components/Button/Button"
import Input from "components/Input/Input"
import * as Yup from "yup"
import { useFormik } from "formik"
import { useNavigate } from "react-router"

function EditCarForm() {
  const navigate = useNavigate()

  const validationSchema = Yup.object({
    brand: Yup.string().required("Car brand is required"),
    model: Yup.string().required("Car model is required"),
    status: Yup.string().required("Status is required"),
    year: Yup.number()
      .min(1900, "Year must be at least 1900 or later")
      .max(
        new Date().getFullYear(),
        `Year must be at most ${new Date().getFullYear()}`,
      )
      .required("Year when car was produced is required"),
    bodyType: Yup.string().required("Car body type is required"),
    fuelType: Yup.string().required("Car fuel type is required"),
    transmissionType: Yup.string().required(
      "Car transmission type is required",
    ),
    dayRentalPrice: Yup.number()
      .positive("Price must be more than 0")
      .min(0.01, "Price must be more than 0")
      .required("Price per day is required"),
    carImage: Yup.string().required("Car image is required"),
  })


  // Test data for pre-filling
  const testData: EditCarFormProps = {
    brand: "Toyota",
    model: "Corolla",
    status: "Available",
    year: 2022,
    bodyType: "Sedan",
    fuelType: "Gasoline",
    transmissionType: "Automatic",
    dayRentalPrice: 45,
    carImage: "", 
  }

  const formik = useFormik({
    initialValues: {
        testData

    //   brand: "",
    //   model: "",
    //   status:"",
    //   year: "",
    //   bodyType: "",
    //   fuelType: "",
    //   transmissionType: "",
    //   dayRentalPrice: "",
    //   carImage: "",

    } as unknown as EditCarFormProps,
    validationSchema: validationSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (values: EditCarFormProps, { resetForm }) => {
      console.log("Submitted values:", values)
      console.log("Errors:", formik.errors)

      alert("The car is edited")
      //navigate("/admin")
    },
  })

  // Handle file input change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0]
      formik.setFieldValue("carImage", file) // Set file value in Formik state
    }
  }

  return (
    <div className="flex flex-col w-[590px] mx-auto gap-8 rounded-md m-3">
      <h2 className="text-xl font-bold p-[60px] mb-6">
        To edit the car please edit and submit the following form:
      </h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-1 w-full ">
          <Input
            name="brand"
            type="text"
            label="Brand"
            placeholder="Enter car brand"
            value={formik.values.brand}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorMessage={formik.errors.brand}
          />
          <Input
            name="model"
            type="text"
            label="Model"
            placeholder="Enter car model"
            value={formik.values.model}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorMessage={formik.errors.model}
          />
          <Input
            name="status"
            type="select"
            options={["Available", "Not Available"]}
            label="Status"
            placeholder="Select car status"
            value={formik.values.status}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorMessage={formik.errors.status}
          />

          <Input
            name="year"
            type="number"
            label="Year"
            placeholder="Enter year when the car was produced"
            value={formik.values.year}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorMessage={formik.errors.year}
          />
          <Input
            name="bodyType"
            type="text"
            label="Body type"
            placeholder="Enter car body type"
            value={formik.values.bodyType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorMessage={formik.errors.bodyType}
          />
          <Input
            name="fuelType"
            type="select"
            options={["Gasoline", "Diesel", "Electric", "Hybrid"]}
            label="Fuel type"
            placeholder="Select fuel type"
            value={formik.values.fuelType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorMessage={formik.errors.fuelType}
          />
          <Input
            name="transmissionType"
            type="select"
            options={["Automatic", "Manual"]}
            label="Transmission type"
            placeholder="Select transmission type"
            value={formik.values.transmissionType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorMessage={formik.errors.transmissionType}
          />
          <Input
            name="dayRentalPrice"
            type="number"
            label="Price € (per day)"
            placeholder="Enter car rent price"
            value={formik.values.dayRentalPrice}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorMessage={formik.errors.dayRentalPrice}
          />
          <Input
            name="carImage"
            type="file"
            accept="image/png, image/jpeg"
            label="Car image"
            placeholder="Upload car image"
            //value={formik.values.carImage}
            onChange={handleFileChange}
            onBlur={formik.handleBlur}
            errorMessage={formik.errors.carImage}
          />
        </div>
        <div className="mt-2.5 w-100%">
          <Button
            name="Apply"
            type="submit"
            //disabled={!formik.isValid || !formik.values.totalRentCost || formik.isSubmitting}
          />
        </div>
      </form>
    </div>
  )
}
export default EditCarForm
