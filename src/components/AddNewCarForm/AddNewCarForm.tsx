import { AddNewCarFormProps } from "./types"
import Button from "components/Button/Button"
import Input from "components/Input/Input"
import * as Yup from "yup"
import { useFormik } from "formik"
import { useNavigate } from "react-router"
import { rentCarActions } from "store/redux/rentCarSlice/rentCarSlice"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { authActions, authSelectors } from "store/redux/AuthSlice/authSlice"
import { useEffect, useState } from "react"
import Notification1 from "components/Notification/Notification1"
import Loader from "components/Loader/Loader"

function AddNewCarForm() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState("")
  const [notificationTopic, setNotificationTopic] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const token = useAppSelector(authSelectors.accessToken)
 
  const validationSchema = Yup.object({
    brand: Yup.string()
      .required("Car brand is required")
      .max(15, "Brand must be less than 15 characters")
      .matches(
        /^[A-Z0-9][a-zA-Z0-9 ]*$/,
        "Brand must start with a capital letter or digit and contain only letters, digits, and spaces",
      ),
    model: Yup.string()
      .required("Car model is required")
      .max(15, "Model must be less than 15 characters")
      .matches(
        /^[A-Z0-9][a-zA-Z0-9 ]*$/,
        "Brand must start with a capital letter or digit and contain only letters, digits, and spaces",
      ),
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
      .max(1000, "Price per day cannot exceed 1000")
      .required("Price per day is required"),
    // carImage: Yup.string()
    //   .trim()
    //   .min(1, "Car image is required")
    //   .required("Car image is required"),
  })

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      try {
        setIsLoading(true)
        // temporary URL for preview
        const previewUrl = URL.createObjectURL(file)
        formik.setFieldValue("carImage", previewUrl)
        formik.setFieldValue("image", file)
      } catch (error) {
        setNotificationTopic("Error")
        setNotificationMessage("Failed to process image")
        setShowNotification(true)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const formik = useFormik({
    initialValues: {
      brand: "",
      model: "",
      year: "",
      type: "",
      fuelType: "",
      transmissionType: "",
      dayRentalPrice: "",
      // carImage: "",
    } as unknown as AddNewCarFormProps,
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values: AddNewCarFormProps) => {
      try {
        setIsLoading(true)

        const response = await dispatch(
          rentCarActions.addCar({
            carData: {
              brand: values.brand,
              model: values.model,
              year: values.year,
              carStatus: "AVAILABLE",
              type: values.type,
              fuelType: values.fuelType,
              transmissionType: values.transmissionType,
              dayRentalPrice: values.dayRentalPrice,
              // carImage: " ",
            },
            token: token,
          }),
        ).unwrap()

        // Если есть изображение, загружаем его
        // if (values.image instanceof File) {
        //   const imageResponse = await dispatch(
        //     rentCarActions.uploadCarImage({
        //       file: values.image,
        //       carId: response.id, // use ID created car
        //       token,
        //     }),
        //   ).unwrap()

        // Обновляем машину с URL изображения
        // await dispatch(
        //   rentCarActions.editCar({
        //     updatedCar: {
        //       ...response,
        //       // carImage: imageResponse,
        //       // isActive: true
        //     },
        //     token: token,
        //     carId: response.id,
        //   }),
        // ).unwrap()
        // }

        setNotificationTopic("Success")
        setNotificationMessage("The car is saved")
        setShowNotification(true)
        setTimeout(() => {
          navigate("/admin/allCars")
        }, 2000)
      } catch (error: any) {
        setNotificationTopic("Error")
        setNotificationMessage(error ||"Failed to save car")
        setShowNotification(true)
      } finally {
        setIsLoading(false)
      }
    },
  })

  // const formik = useFormik({
  //   initialValues: {
  //     brand: "",
  //     model: "",
  //     year: "",
  //     type: "",
  //     fuelType: "",
  //     transmissionType: "",
  //     dayRentalPrice: "",
  //     image: "",
  //   } as unknown as AddNewCarFormProps,
  //   validationSchema: validationSchema,
  //   validateOnChange: false,
  //   validateOnBlur: true,
  //   onSubmit: (values: AddNewCarFormProps, { resetForm }) => {
  //     console.log("Submitted values:", values);
  //     console.log("Errors:", formik.errors);

  //     // const carData = {
  //     //   brand: values.brand,
  //     //   model: values.model,
  //     //   year: values.year,
  //     //   carStatus: "",
  //     //   type: values.type,
  //     //   fuelType: values.fuelType,
  //     //   transmissionType: values.transmissionType,
  //     //   dayRentalPrice: values.dayRentalPrice,
  //     //   carImage: values.image,
  //     // }
  //     try {

  //       dispatch(rentCarActions.addCar({
  //         carData: {
  //           brand: values.brand,
  //           model: values.model,
  //           year: values.year,
  //           carStatus: "AVAILABLE",
  //           type: values.type,
  //           fuelType: values.fuelType,
  //           transmissionType: values.transmissionType,
  //           dayRentalPrice: values.dayRentalPrice,
  //           carImage: values.image,
  //         },
  //         token
  //       }));
  //       //dispatch(rentCarActions.uploadCarImage())
  //       resetForm();
  //       setShowNotification(true);
  //       setNotificationTopic("Success!");
  //       setNotificationMessage("The car is saved");
  //       // alert("The car is saved");
  //       navigate("/admin");
  //     }
  //     finally {
  //       setShowNotification(false);
  //     }
  //   },
  // });

  // Handle file input change
  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files) {
  //     const file = event.target.files[0];
  //     formik.setFieldValue("carImage", file); // Set file value in Formik state
  //   }
  // };

  return (
    <div className="flex flex-col w-[590px] mx-auto gap-8 rounded-md m-3">
      <h2 className="text-xl font-bold p-[60px] mb-6">
        To add a new car please fill and submit the following form:
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
            name="type"
            type="select"
            options={[
              "SEDAN",
              "HATCHBACK",
              "COUPE",
              "CONVERTIBLE",
              "SUV",
              "CROSSOVER",
              "PICKUP",
              "MINIVAN",
              "WAGON",
              "ROADSTER",
              "CABRIOLET",
              "LIMOUSINE",
              "VAN",
              "TRUCK",
              "JEEP",
            ]}
            label="Body type"
            placeholder="Select car body type"
            value={formik.values.type}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorMessage={formik.errors.type}
          />
          <Input
            name="fuelType"
            type="select"
            options={[
              "PETROL",
              "DIESEL",
              "ELECTRIC",
              "HYBRID",
              //(LIQUEFIED PETROLEUM GAS)
              "LPG",
              //(COMPRESSED NATURAL GAS)
              "CNG",
              "BIOFUEL",
              "HYDROGEN",
              "ETHANOL",
            ]}
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
            options={[
              "MANUAL",
              "AUTOMATIC",
              // "SEMI_AUTOMATIC",
              // "DUAL_CLUTCH",
              // "TIPTRONIC",
              // "DIRECT_SHIFT_GEARBOX",
              // "TORQUE_CONVERTER",
              // "AUTOMATED_MANUAL_TRANSMISSION",
              // "CONTINUOUSLY_VARIABLE_TRANSMISSION",
            ]}
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
          {/* <Input
            name="carImage"
            type="file"
            accept="image/png, image/jpeg"
            label="Car image"
            placeholder="Upload car image"
            onChange={handleFileChange}
            onBlur={formik.handleBlur}
            errorMessage={formik.errors.carImage}
          /> */}
        </div>
        <div className="mt-1 w-100%">
          <Button
            name="Save"
            type="submit"
            //disabled={!formik.isValid || !formik.values.totalRentCost || formik.isSubmitting}
          />
        </div>
      </form>
      {isLoading && <Loader />}
      {showNotification && (
        <Notification1
          topic={notificationTopic}
          message={notificationMessage}
          onClose={() => setShowNotification(false)}
        />
      )}
    </div>
  )
}
export default AddNewCarForm
