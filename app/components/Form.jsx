"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import { AddressSearch } from "../components/addressSearch";
import { ResultModal } from "../components/ResultModal";
import { calculatorList, paramsGeneratorForCalculators } from "../components/utils";
import { calculateLuckyRudraksh, calculateResult } from "../store/tools/actions";
// import { NumeroForm } from "@/components/numero-form";
// import { NumeroProfile } from "@/components/numero-profile";



const Form = () => {
  const [selectedCalculator, setSelectedCalculator] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [selectedCoordinates, setSelectedCoordinates] = useState(null);
  const [result, setResult] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [resultFull, setResultFUll] = useState(null);

  const today = new Date().toISOString().split("T")[0];
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleListItemClick = (address, coordinates) => {
    setInputValue(address);
    setSelectedCoordinates(coordinates);
  };

  const initialValues = {
    name1: "",
    name2: "",
    vehicleNo: "",
    dob: "",
    hour: "",
    minute: "",
    gender: "",
    firstAlphabet: "",
    personalYear: "",
  };

  const validationSchema = Yup.object().shape({
    name1: Yup.string().required("Name is required"),
    dob: Yup.string().required("Birth Date is required"),
    hour: Yup.number().min(0).max(23).required("Birth Hour is required"),
    minute: Yup.number().min(0).max(59).required("Birth Minute is required"),
    ...(selectedCalculator === 3 && {
      vehicleNo: Yup.string().required("Vehicle Number is required"),
    }),
    ...(selectedCalculator === 7 && {
      name2: Yup.string().required("Person 2's name is required"),
    }),
    ...(selectedCalculator !== 7 && {
      gender: Yup.string().required("Gender is required"),
    }),
    ...(selectedCalculator === 0 && {
      firstAlphabet: Yup.string().required(
        "First Alphabet of name is required"
      ),
    }),
    ...(selectedCalculator === 4 && {
      personalYear: Yup.string().required("Year is required"),
    }),
  });

  const handleCalculatorClick = (calculator) => {
    setSelectedCalculator(calculator);
    formik.resetForm();
    setSelectedCoordinates(null);
    setInputValue("");
  };

  const handleSubmit = async (values) => {
    alert("Form Submitted");
    // setResult([]);
    // if (selectedCoordinates !== null) {
    // values.lat = selectedCoordinates[0]
    // values.long = selectedCoordinates[1]

    values.lat = 20.5937;
    values.long = 78.9629;

    setLoading(true);
    setSelectedCoordinates(null);
    setInputValue("");
    setOpenDialog(true);
    const params = paramsGeneratorForCalculators(values, selectedCalculator);
    if (selectedCalculator === 1) {
      const { data, error } = await calculateLuckyRudraksh(params);
      console.log("rudra data",data,error);
      if (data) {
        setResult(data);
        console.log("result data r",data);
      }
    } else {
      const { data, error } = await calculateResult(params);
      console.log("result data",data,error);
      if (data?.statusCode === 200) {
        
        setResult(data?.body);
        console.log("result data f",data?.body);
      }
    }
    formik.resetForm();
    setLoading(false);
    // }
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    if (openAlert) {
      const timer = setTimeout(() => {
        setOpenAlert(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [openAlert]);

  const submitFullReport = () => {
    setOpenAlert(true);
  };
  return (
    
    <div className="container ml-20 mt-11 0 mx-auto p-4  ">
      <ResultModal
        open={openDialog}
        setOpen={setOpenDialog}
        tool={selectedCalculator}
        result={result}
        loading={loading}
        setResult={setResult}
      />
      {console.log(result)}
      <h1 className="text-2xl font-bold mb-1 mt-12 text-center">
          {calculatorList[selectedCalculator]}
        </h1>
      <div className=" mx-auto p-6 mt-6 border-2 border-orange-300 rounded-lg w-2/5 ">

        <form onSubmit={formik.onSubmit} className="space-y-4">
          {/* Name Input */}
          <div>
            <label className="block text-base font-bold mb-1">
              {selectedCalculator === 0 ? "Meaning of Name:" : "Name:"}
            </label>
            <input
              type="text"
              name="name1"
              {...formik.getFieldProps("name1")}
              className="input input-bordered w-full rounded-sm"
            />
            {formik.touched.name1 && formik.errors.name1 && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.name1}</p>
            )}
          </div>

          {/* Conditional Input for Calculator 7 */}
          {selectedCalculator === 7 && (
            <div>
              <label className="block text-sm font-bold mb-1">
                Person 2 Name:
              </label>
              <input
                type="text"
                name="name2"
                {...formik.getFieldProps("name2")}
                className="input input-bordered w-full rounded-sm"
              />
              {formik.touched.name2 && formik.errors.name2 && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.name2}
                </p>
              )}
            </div>
          )}

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-bold mb-1">
              Date of Birth:
            </label>
            <input
              type="date"
              max={today}
              name="dob"
              {...formik.getFieldProps("dob")}
              className="input input-bordered w-full rounded-sm"
            />
            {formik.touched.dob && formik.errors.dob && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.dob}</p>
            )}
          </div>

          {/* Time of Birth */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-1">
                Birth Hour:
              </label>
              <select
                name="hour"
                {...formik.getFieldProps("hour")}
                className="input input-bordered w-full rounded-sm"
              >
                <option value="" disabled>
                  Select Hour
                </option>
                {[...Array(24).keys()].map((hour) => (
                  <option key={hour} value={hour}>
                    {hour}
                  </option>
                ))}
              </select>
              {formik.touched.hour && formik.errors.hour && (
                <p className="text-red-500 text-sm mt-1 ">
                  {formik.errors.hour}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold mb-1">
                Birth Minute:
              </label>
              <select
                name="minute"
                {...formik.getFieldProps("minute")}
                className="input input-bordered w-full"
              >
                <option value="" disabled>
                  Select Minute
                </option>
                {[...Array(60).keys()].map((minute) => (
                  <option key={minute} value={minute}>
                    {minute}
                  </option>
                ))}
              </select>
              {formik.touched.minute && formik.errors.minute && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.minute}
                </p>
              )}
            </div>
          </div>

          {/* Gender */}
          {selectedCalculator !== 7 && (
            <div>
              <label className="block text-sm font-bold mb-1">Gender:</label>
              <select
                name="gender"
                {...formik.getFieldProps("gender")}
                className="input input-bordered w-full"
              >
                <option value="" disabled>
                  Select Gender
                </option>
                {["Male", "Female", "Others"].map((text) => (
                  <option key={text} value={text.toLowerCase()}>
                    {text}
                  </option>
                ))}
              </select>
              {formik.touched.gender && formik.errors.gender && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.gender}
                </p>
              )}
            </div>
          )}

          {/* Submit & Reset Buttons */}
          <div className="flex space-x-4 mt-4">
            <button
              type="button"
              className="bg-gray-300 text-black py-2 px-4 rounded-md"
              onClick={() => {
                formik.resetForm()
              }}
            >
              Reset
            </button>
            <button
              type="submit"
              onClick={() => {handleSubmit()}}
              className="bg-blue-500 text-white px-4 rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      <div className="calculators w-4/5 mx-auto ">
        <h1 className="text-center mt-8 mb-6 ml-20 text-3xl font-bold ">Calculators</h1>
        <div className="cardContainer ml-40 flex flex-wrap justify-center">
          {calculatorList.map((calculator, index) =>
          {

            const imUrl= `png/calculator/${index}.png`
         return  (
            <div
              key={index}
              className="card w-1/3 mb-5 p-4 border border-gray-300 rounded-lg text-center cursor-pointer transition-transform duration-200 hover:scale-105 bg-gray-50"
              onClick={() => handleCalculatorClick(index)}
            >
              <img
                src={imUrl}
                alt={calculator}
                className="cardImage size-40 mx-auto"
              />
              <p className="cardText">{calculator}</p>
            </div>
          )}
          
          
          )}
        </div>
      </div>

    </div>

    
  );
};

export default Form;