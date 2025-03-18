import Button from "components/Button/Button";
import Input from "components/Input/Input";
import { Form, useFormik } from "formik";
import * as Yup from 'yup';
import { FilterByDatesFormValues } from "./types";
export default function FilterByDatesForm() {

    const schema = Yup.object().shape({
        startDate: Yup.date()
            .min(new Date(), 'Start date cannot be in the past')
            .required('Start date is required'),
        endDate: Yup.date()
            .min(Yup.ref('startDate'), 'End date must be later than start date')
            .required('End date is required'),
    });

    const formik = useFormik({
        initialValues: {
            startDate: "",
            endDate: ""
        } as FilterByDatesFormValues,
        validationSchema: schema,
        validateOnChange: false,
        onSubmit: (values) => {

        }
    });
    const today = new Date().toISOString().split("T")[0];

    return (
        <div className='max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-lg relative -mt-30 p-6 border border-gray-100'>
            <h2 className='text-2xl font-bold text-gray-800 mb-12 text-center'>Find Available Cars</h2>
            <form className="flex flex-col md:flex-row items-end gap-4 mt-5 items-stretch p-7" onSubmit={formik.handleSubmit}>
                <div className="flex-1">
                    <Input
                        name="startDate"
                        type="date"
                        label="Pick-up Date"
                        input_id="startDate"
                        value={formik.values.startDate}
                        onChange={formik.handleChange}
                        errorMessage={formik.errors.startDate}
                        min={today}
                    ></Input>
                </div>
                <div className="flex-1">
                    <Input
                        name="endDate"
                        type="date"
                        label="Return Date"
                        input_id="endDate"
                        value={formik.values.endDate}
                        onChange={formik.handleChange}
                        errorMessage={formik.errors.endDate}
                        min={formik.values.startDate || today}
                    />
                </div>
                <div className="md: w-48">
                    <Button
                        type="submit"
                        name="Search"
                        width="w-full"
                        height="h-[58px]"
                    />
                </div>
            </form >
        </div >
    );
}
