import { useState } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useNavigate, useLocation, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { authSelectors } from "store/redux/AuthSlice/authSlice"
import { rentCarActions } from "store/redux/rentCarSlice/rentCarSlice"

import Input from "components/Input/Input"
import Button from "components/Button/Button"
import Loader from "components/Loader/Loader"
import Notification1 from "components/Notification/Notification1"
import { CarCardProps } from "components/CarCard/types"

function UploadImage() {
  const navigate = useNavigate()
  const location = useLocation()
  const car = location.state as CarCardProps
  const { id } = useParams()
  const dispatch = useAppDispatch()

  const token = useAppSelector(authSelectors.accessToken)

  const [isLoading, setIsLoading] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState("")
  const [notificationTopic, setNotificationTopic] = useState("")

  const validationSchema = Yup.object({
    image: Yup.mixed()
      .required("Image is required")
      .test("fileSize", "File too large", value => {
        return value && value instanceof File && value.size <= 5 * 1024 * 1024
      })
      .test("fileType", "Unsupported file format", value => {
        return (
          value &&
          value instanceof File &&
          ["image/jpeg", "image/png"].includes(value.type)
        )
      }),
  })

  const formik = useFormik({
    initialValues: {
      image: undefined as File | undefined,
      carImage: "",
    },
    validationSchema,
    onSubmit: async values => {
      if (!values.image) return

      try {
        setIsLoading(true)

        const formData = new FormData()
        formData.append("file", values.image)

        await dispatch(
          rentCarActions.uploadCarImage({
            carId: car.id,
            formData: formData,
            token: token,
          }),
        ).unwrap()

        setNotificationTopic("Success")
        setNotificationMessage("Image uploaded successfully")
        setShowNotification(true)

        setTimeout(() => {
          navigate("/admin/allCars")
        }, 2000)
      } catch (error: any) {
        setNotificationTopic("Error")
        setNotificationMessage(error?.message || "Upload failed")
        setShowNotification(true)
      } finally {
        setIsLoading(false)
      }
    },
  })

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()

      reader.onloadend = () => {
        const base64File = reader.result as string
        formik.setFieldValue("carImage", base64File)
        formik.setFieldValue("image", file)
      }

      reader.readAsDataURL(file)
    }
  }

  const handleClear = () => {
    formik.setFieldValue("carImage", "")
    formik.setFieldValue("image", undefined)
  }

  const handleExit = () => {
    navigate("/admin/allCars")
  }

  return (
    <div className="flex flex-row">
      <div className="flex flex-col w-[590px] mx-auto gap-8 rounded-md m-3">
        <h2 className="text-xl font-bold p-[60px] mb-6">Upload a car image:</h2>

        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col gap-1 w-full">
            <Input
              name="carImage"
              type="file"
              accept="image/png, image/jpeg"
              label="Car image"
              placeholder="Upload car image"
              onChange={handleFileChange}
              onBlur={formik.handleBlur}
              errorMessage={
                typeof formik.errors.image === "string"
                  ? formik.errors.image
                  : undefined
              }
            />
          </div>

          {/* Optional: Image preview */}
          {formik.values.carImage && (
            <div className="mt-4">
              <img
                src={formik.values.carImage}
                alt="Preview"
                className="w-full max-h-[300px] object-cover rounded-lg"
              />
            </div>
          )}

          <div className="mt-4 flex gap-4 justify-end">
            {/* Save Button */}
            <Button name="Save" type="submit" />
            {/* Clear Button */}
            <Button
              name="Clear"
              type="button"
              customClasses="!w-full !rounded-lg  hover:!bg-red-700 transition-colors duration-300 !bg-gray-900 !text-white"
              onClick={handleClear}
            />
            <Button
              name="Exit"
              type="button"
              customClasses="!bg-gray-400 hover:!bg-gray-600 text-white"
              onClick={handleExit}
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
    </div>
  )
}

export default UploadImage
