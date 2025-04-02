import ReactDOM from "react-dom";
import Button from "components/Button/Button";

interface NotificationProps {
    topic: string;
    message: string;
    onClose: () => void;
}

function Notification({ topic, message, onClose }: NotificationProps) {
    return ReactDOM.createPortal(
        <div className="fixed inset-0 flex items-center justify-center bg-gray bg-opacity-50 backdrop-blur-sm z-50">
            <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full mx-4">
                <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{topic}</h3>
                    <p className="text-gray-600 mb-6">{message}</p>
                    <Button
                        name="OK"
                        type="button"
                        onClick={onClose}
                        customClasses="!w-full !rounded-lg !bg-gray-900 !text-white hover:!bg-red-700 transition-colors duration-300"
                    />
                </div>
            </div>
        </div>,
        document.body
    );
}

export default Notification;
