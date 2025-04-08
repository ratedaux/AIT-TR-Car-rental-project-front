import { EditCarFormProps } from "./types"
import Button from "components/Button/Button"
import Input from "components/Input/Input"
import * as Yup from "yup"
import { useFormik } from "formik"
import { useLocation, useNavigate } from "react-router"
import { useEffect, useState } from "react"
import { CarCardProps } from "components/CarCard/types"
import { rentCarActions } from "store/redux/rentCarSlice/rentCarSlice"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { authActions, authSelectors } from "store/redux/AuthSlice/authSlice"

const EditCarForm: React.FC<EditCarFormProps> = ({ car }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { carDetails } = location.state || {}
  const dispatch = useAppDispatch()

  const token = useAppSelector(authSelectors.accessToken)

  const [formData, setFormData] = useState<CarCardProps>(carDetails)
  useEffect(() => {
    if (carDetails) {
      setFormData(carDetails)
    }
  }, [carDetails])

  const validationSchema = Yup.object({
    brand: Yup.string().required("Car brand is required"),
    model: Yup.string().required("Car model is required"),
    carStatus: Yup.string().required("Status is required"),
    year: Yup.number()
      .min(1900, "Year must be at least 1900 or later")
      .max(
        new Date().getFullYear(),
        `Year must be at most ${new Date().getFullYear()}`,
      )
      .required("Year when car was produced is required"),
    type: Yup.string().required("Car body type is required"),
    fuelType: Yup.string().required("Car fuel type is required"),
    transmissionType: Yup.string().required(
      "Car transmission type is required",
    ),
    dayRentalPrice: Yup.number()
      .positive("Price must be more than 0")
      .min(0.01, "Price must be more than 0")
      .required("Price per day is required"),
    // image: Yup.string().required("Car image is required"),
  })

  const formik = useFormik({
    initialValues: formData,
    validationSchema: validationSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (values: CarCardProps) => {
      console.log("Submitted values:", values)
      console.log("Errors:", formik.errors)

      const updatedCar = {
        // id: values.id,
        // brand: values.brand,
        // model: values.model,
        // year: values.year,
        carStatus: values.carStatus,
        // type: values.type,
        // fuelType: values.fuelType,
        // transmissionType: values.transmissionType,
        dayRentalPrice: values.dayRentalPrice,
        // isActive:true,
        // carImage: values.image,
      }

      dispatch(
        rentCarActions.editCar({
          updatedCar: updatedCar,
          token: token,
          carId: carDetails.id
        }),
      )
      alert("The car is edited")
      navigate("/admin/allCars")
    },
  })

  // Handle file input change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0]
      formik.setFieldValue("image", file)
      // Set file value in Formik state
    }
  }

  // Handle close button click
  const handleClose = () => {
    navigate("/admin/allCars")
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
            readOnly={true}
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
            readOnly={true}
          />
          <Input
            name="carStatus"
            type="select"
            options={[
              "AVAILABLE",
              "RENTED",
              "UNDER_REPAIR",
              "REMOVED_FROM_RENT",
              "UNDER_INSPECTION",
            ]}
            label="Status"
            placeholder="Select car status"
            value={formik.values.carStatus}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorMessage={formik.errors.carStatus}
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
            readOnly={true}
          />
          <Input
            name="type"
            type="text"
            label="Body type"
            placeholder="Enter car body type"
            value={formik.values.type}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorMessage={formik.errors.type}
            readOnly={true}
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
            disabled={true}
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
            disabled={true}
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
          <div>
            {formik.values.image && typeof formik.values.image === "string" && (
              <img
                src={formik.values.image}
                alt="Car"
                className="w-32 h-32 object-cover mb-3 rounded-lg"
              />
            )}
            {/* Файл изображения */}
            <Input
              name="image"
              type="file"
              accept="image/png, image/jpeg"
              label="Car image"
              placeholder="Upload car image"
              onChange={handleFileChange}
              onBlur={formik.handleBlur}
              errorMessage={formik.errors.image}
              readOnly={true}
              disabled={true}
            />
          </div>
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
export default EditCarForm
