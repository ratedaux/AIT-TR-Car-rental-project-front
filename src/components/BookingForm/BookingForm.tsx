import Button from "../Button/Button";
import Input from "../Input/Input";
import * as Yup from "yup";
import { useFormik } from "formik";
import { RentFormValues } from "../BookingForm/types";
import { useNavigate } from "react-router-dom";

const costPerDay = 50; // Example cost per day

const calculateTotalCost = (startDate: Date, endDate: Date): number => {
    // Сбросим время для обеих дат, чтобы учитывать только дни
    const start = new Date(startDate.setHours(0, 0, 0, 0));
    const end = new Date(endDate.setHours(0, 0, 0, 0));
 
    // Проверка, что дата конца не раньше даты начала
  if (end < start) {
    console.error("End date cannot be earlier than start date.");
    return 0; // Возвращаем 0 или выбрасываем ошибку в зависимости от требований
}
    // Вычисляем разницу во времени
    const timeDifference = end.getTime() - start.getTime();
    
    // Количество дней
    const days = timeDifference / (1000 * 3600 * 24);

    // Если разница в днях меньше 1, считаем хотя бы 1 день аренды
    const totalRentCost = days >= 1 ? days * costPerDay : costPerDay; // Пример: даже если 1 день, все равно начисляем стоимость аренды

    return totalRentCost;
};

function BookingForm() {
    // const onDataChange = (values: RentFormValues) => {
    //     console.log("Form submitted with values:", values);
    // };

    const navigate = useNavigate()

    const today = new Date().toLocaleDateString("en-CA"); 
    const validationSchema = Yup.object({
        startDate: Yup.date()
            .required("Start date is required")
            .min(today, "Start date cannot be in the past"),
        endDate: Yup.date()
            .required("End date is required")
            .min(Yup.ref("startDate"), "End date must be later than start date"),
        totalRentCost: Yup.number()
            .required("Rent cost can't be empty")
            .min(0.01, "Rent cost can't be 0"),
    });


    const formik = useFormik({
        initialValues: {
            startDate: new Date().toLocaleDateString("en-CA"),
            // endDate: new Date().toLocaleDateString("en-CA"),
            endDate: (() => {
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1); // Добавляем 1 день
                return tomorrow.toLocaleDateString("en-CA"); // Преобразуем в формат 'yyyy-MM-dd'
              })(),
            totalRentCost: "",
        } as unknown as RentFormValues,
        validationSchema: validationSchema,
        validateOnChange: true,
        validateOnBlur:true,
        onSubmit: (values: RentFormValues, {resetForm}) => {
            // onDataChange(values);
             // Логика сабмита
      console.log('Submitted values:', values);

      // Очищаем форму после отправки
      resetForm();
      alert("The car is rented")
    //  navigate("/account") 
        },
    });

// Сбрасываем стоимость аренды, если изменяется дата начала или конца
const handleDateChange = () => {
    formik.setFieldValue("totalRentCost", 0); // Сбросить стоимость аренды
};

    const handleCalculateTotalCost = () => {
        const { startDate, endDate } = formik.values;

        // Ensure the dates are valid strings (startDate and endDate should be valid date strings)
        if (!startDate || !endDate) {
            console.error("Both startDate and endDate are required.");
            return; // Exit if startDate or endDate is missing
        }
  // Преобразуем строки в объекты Date
  const start = new Date(startDate);
  const end = new Date(endDate);


        const totalCost = calculateTotalCost(start, end); // Pass as strings
        formik.setFieldValue("totalRentCost", totalCost); // Update Formik state
    };

    return (
        <div className="flex flex-col w-[590px] mx-auto gap-8 rounded-md">
            <h2 className="text-xl font-bold p-[60px] mb-6">
                To rent a car please fill and submit the following form:
            </h2>

            <form onSubmit={formik.handleSubmit}>
                <div className="flex flex-col gap-1 w-full ">
                    <Input
                        name="startDate"
                        type="date"
                        label="Start date"
                        placeholder="Select start date"
                        value={formik.values.startDate}
                        onChange={(e) => {
                            formik.handleChange(e); // Обрабатываем изменение
                            handleDateChange(); // Сбрасываем стоимость при изменении даты
                        }}
                        onBlur={formik.handleBlur}
                        errorMessage={formik.errors.startDate  ? String(formik.errors.startDate) : undefined}
                    />
                    <Input
                        name="endDate"
                        type="date"
                        label="End date"
                        placeholder="Select end date"
                        value={formik.values.endDate} //saves dates from home page filter
                        onChange={(e) => {
                            formik.handleChange(e); // Обрабатываем изменение
                            handleDateChange(); // Сбрасываем стоимость при изменении даты
                        }}
                        onBlur={formik.handleBlur}
                        errorMessage={formik.errors.endDate? String(formik.errors.endDate) : undefined} // Преобразуем ошибку в строку
                    />

                    <Input
                        name="totalRentCost"
                        type="number"
                        label="Total Rent Cost"
                        placeholder="Click button to display total cost"
                        value={formik.values.totalRentCost}
                        onChange={() => { }}
                        onBlur={formik.handleBlur}
                        errorMessage={formik.errors.totalRentCost}

                    />



                    <p className="text-sm text-gray-500 mb-4">
                        Payment is available only at pick up station.
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                        You can pick up a car only at the pick up station.
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
    );
}
export default BookingForm;