import Button from "components/Button/Button";
import Input from "components/Input/Input";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { EditUserFormProps } from "./types";
import { useLocation, useNavigate } from "react-router-dom";
import { CustomerProps } from "components/CustomerComponent/types";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { userActions } from "store/redux/UserSlice/UserSlise";
import { authActions, authSelectors } from "store/redux/AuthSlice/authSlice";
import { useSelector } from "react-redux";
import { AsyncThunkAction } from "@reduxjs/toolkit";
import Notification1 from "components/Notification/Notification1";
import Loader from "components/Loader/Loader";

const EditUserForm: React.FC<EditUserFormProps> = ({ customer }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { customerData } = location.state || {};
  const dispatch = useAppDispatch();
  const user = useSelector(authSelectors.userData);
  const accessToken = useAppSelector(authSelectors.accessToken);

  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationTopic, setNotificationTopic] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<CustomerProps>(customerData);

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name")
    .min(2, "Must have at least 2 characters")
    .max(15, "Name must be less than 15 characters")
    .matches(/^[a-zA-Z0-9 ]+$/, "Name must not contain special characters"),
    lastName: Yup.string().required("Last name is required")
    .min(2, "Must have at least 2 characters")
    .max(15, "Name must be less than 15 characters")
    .matches(/^[a-zA-Z0-9 ]+$/, "Name must not contain special characters"),
    email: Yup.string().required("Email is required")
    .email("Invalid email format"),
        // password: Yup.string().required("Password is required"),
  });

  useEffect(() => {
    if (customerData) {
      setFormData(customerData);
    }
  }, [customerData]);

  const formik = useFormik({
    initialValues: formData,
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values: CustomerProps) => {
      try {
        setIsLoading(true);
        await dispatch(
          userActions.updateUser({
            customerId: customerData.id,
            updatedData: values,
            token: accessToken,
          }),
        ).unwrap();
        setNotificationTopic("Success");
        setNotificationMessage("The user is edited");
        setShowNotification(true);
        setTimeout(() => {
          if (user?.role === "ROLE_ADMIN") {
            navigate("/admin/allUsers");
          } else if (user?.role === "ROLE_CUSTOMER") {
            navigate("/account/myData");
          } else {
            console.error("Unknown role");
          }
        }, 2000);
      } catch (error) {
        setNotificationTopic("Error");
        setNotificationMessage("Failed to edit user");
        setShowNotification(true);
      } finally {
        setIsLoading(false);
      }
    },
  });

  //Handle close button click
  const handleClose = () => {
    if (user?.role === "ROLE_ADMIN") {
      navigate("/admin/allUsers");
    } else if (user?.role === "ROLE_CUSTOMER") {
      navigate("/account/myData");
    } else {
      console.error("Unknown role");
    }
  };

  return (
    <div className="flex flex-col w-[590px] mx-auto gap-8 rounded-md m-3">
      <h2 className="text-xl font-bold p-[60px] mb-6">
        To edit the customer edit and submit the following form:
      </h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-1 w-full ">
          <Input
            name="firstName"
            type="text"
            label="First Name"
            placeholder="Enter First Name"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorMessage={formik.errors.firstName}
          />
          <Input
            name="lastName"
            type="text"
            label="Last Name"
            placeholder="Enter Last Name"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorMessage={formik.errors.lastName}
          />
          <Input
            name="email"
            type="email"
            label="Email"
            placeholder="Enter Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorMessage={formik.errors.email}
          />

          {/* <Input
            name="password"
            type="password"
            label="Password"
            placeholder="Enter Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorMessage={formik.errors.password}
            readOnly={true}
          /> */}
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
      {isLoading && <Loader />}
      {showNotification && (
        <Notification1
          topic={notificationTopic}
          message={notificationMessage}
          onClose={() => setShowNotification(false)}
        />
      )}
    </div>
  );
};

export default EditUserForm;
function dispatch(
  arg0: AsyncThunkAction<
    any,
    void,
    {
      state?: undefined;
      dispatch?: undefined;
      extra?: unknown;
      rejectValue?: unknown;
      serializedErrorType?: unknown;
      pendingMeta?: unknown;
      fulfilledMeta?: unknown;
      rejectedMeta?: unknown;
    }
  >,
) {
  throw new Error("Function not implemented.");
}
