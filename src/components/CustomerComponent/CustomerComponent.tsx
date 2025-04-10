import Button from "components/Button/Button";
import { CustomerProps } from "./types";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { userActions, userSelectors } from "store/redux/UserSlice/UserSlise"
import { authActions, authSelectors } from "store/redux/AuthSlice/authSlice";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Notification1 from "components/Notification/Notification1";
import Loader from "components/Loader/Loader";

interface CustomerComponentProps {
  customer: CustomerProps;
}

const CustomerComponent: React.FC<CustomerComponentProps> = ({ customer }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useSelector(authSelectors.userData);

  const accessToken = useAppSelector(authSelectors.accessToken);

  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationTopic, setNotificationTopic] = useState("");
  const [isLoading, setIsLoading] = useState(false);

      useEffect(() => {
        dispatch(authActions.getCurrentUser());
  }, [dispatch]);

  const handleEditCustomer = (

    customerId: string,
    customerData: CustomerProps,
  ) => {
    console.log("Editing customer with ID:", customerId);
    navigate(`/edit-user/${customerId}`, { state: { customerData } });
  };

  const handleDeleteCustomer = (
    customerId: string,
    accessToken: string | null,
  ) => {
    // alert("The user is deactivated");
    dispatch(userActions.deleteUser({ customerId, token: accessToken }));
  };

  const handleRestoreCustomer = (
    customerId: string,
    accessToken: string | null,
  ) => {
    // alert("The user is restored");
    dispatch(userActions.restoreUser({ customerId, token: accessToken }));
  };

  const handleDeactivateUser = async (userId: string) => {
    try {
      setIsLoading(true);
      await dispatch(userActions.deleteUser({ customerId: userId, token: accessToken }));
      setNotificationTopic("Success");
      setNotificationMessage("The user is deactivated");
      setShowNotification(true);
    } catch (error) {
      setNotificationTopic("Error");
      setNotificationMessage("Failed to deactivate user");
      setShowNotification(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestoreUser = async (userId: string) => {
    try {
      setIsLoading(true);
      await dispatch(userActions.restoreUser({ customerId: userId, token: accessToken }));
      setNotificationTopic("Success");
      setNotificationMessage("The user is restored");
      setShowNotification(true);
    } catch (error) {
      setNotificationTopic("Error");
      setNotificationMessage("Failed to restore user");
      setShowNotification(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="m-4 rounded-lg transition-transform duration-300 hover:-translate-y-1 ">
      <div className="flex flex-col w-auto ">
        <div className="bg-black text-white font-bold  rounded-tl-lg rounded-tr-lg p-3 ">
          Customer Data:
        </div>
        <div className="flex flex-col gap-3 w-auto p-3 bg-white  rounded-lg rounded-br-lg">
          <div className="flex gap-4">
            <div className="w-1/4 font-bold">Customer Name:</div>
            <div className="w-3/4">
              {customer?.firstName} {customer?.lastName}
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-1/4 font-bold">Email:</div>
            <div className="w-3/4">{customer?.email} </div>
          </div>

          <div className="flex gap-4">
            <div className="w-1/4 font-bold">Status:</div>
            <div className="w-3/4">
              {customer?.isActive ? "Active" : "Not Active"}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 gap-3 flex flex-row  justify-end">
        <div>
          <Button
            type="button"
            onClick={() => handleEditCustomer(customer?.id, customer)}
            name="Edit"
          />
          {/* this button must be available only for admin */}
        </div>

        <div>
          {user?.role === "ROLE_ADMIN" && (
            <Button
              type="button"
              customClasses="!rounded-lg !bg-gray-400 hover:!bg-red-700 text-white"
              onClick={() =>
                customer.isActive
                  ? handleDeleteCustomer(customer.id, accessToken)
                  : handleRestoreCustomer(customer.id, accessToken)
              }
              name={customer.isActive ? "Deactivate" : "Restore"}
            />
          )}
        </div>
      </div>
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
}
export default CustomerComponent;
