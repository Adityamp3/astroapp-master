"use client";
import Cookies from 'js-cookie';
import { useFormik } from "formik";
import * as Yup from "yup";
import "./ReportForm.css";
import { useState, useEffect } from "react";
import { AddressSearch } from "../components/addressSearch";
import { getHoroDetails } from "../store/Horoscope/actions";
import { TableC } from "../components/table";
import { NakTable } from "../components/nak-table";
import  ProfileCard  from "../components/profile/ProfileCard";
import { LagnaChart } from "../components/lagnachart";

const HoroScope = ({Data,setData}) => {
  const [selectedCalculator, setSelectedCalculator] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [selectedCoordinates, setSelectedCoordinates] = useState(null);
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [showForm, setShowForm] = useState(true);

  const today = new Date().toISOString().split("T")[0];

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleListItemClick = (address, coordinates) => {
    setInputValue(address);
    setSelectedCoordinates(coordinates);
  };

  useEffect(() => {
    setData(results)
  }, [results]);

  const initialValues = {
    name1: "",
    dob: "",
    hour: "",
    minute: "",
    gender: "",
  };

  const validationSchema = Yup.object().shape({
    name1: Yup.string().required("Name is required"),
    dob: Yup.string().required("Birth Date is required"),
    hour: Yup.number().min(0).max(23).required("Birth Hour is required"),
    minute: Yup.number().min(0).max(59).required("Birth Minute is required"),
    gender: Yup.string().required("Gender is required"),
  });

  const handleSubmit = async (values) => {
    setResult([]);
    if (selectedCoordinates !== null) {
      values.lat = selectedCoordinates[0];
      values.long = selectedCoordinates[1];

      setLoading(true);
      setSelectedCoordinates(null);
      setInputValue("");
      const data = await getHoroDetails(values);
      // const data = undefined;
      setResults(data);

      if (data?.planets) {
        console.log("Status 200 received, Hiding form");
  
        // Set form values and info to cookies
        Cookies.set('values', JSON.stringify(values), { expires: 1 }); // 1-day expiry
        Cookies.set('info', JSON.stringify(data.info), { expires: 1 });
  
        setResult(data?.body);
        setShowForm(false);
      }

      // if (data?.planets) {
      //   console.log("Status 200 recieved, Hiding form");
      //   console.log(data?.body);
      //   setResult(data?.body);
      //   setShowForm(false);
      // }
      // if (data?.statusCode === 200) {
      //   console.log(data?.body);
      //   setResult(data?.body);
      // }
      console.log("Setting loading to false");
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-red-800">
        <div className="loader"></div> {/* You can replace this with a custom loader */}
      </div>
    );
  }

  if (!showForm) {
    return <></>; // Return null if form is hidden
  }

  return (
    <div className="p-8 ml-96 mt-20 w-2/5 border-2 rounded-md border-orange-300 bg-orange-100">
      <h1 className="text-3xl font-bold mb-6">Vedic Astrology Report</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-6">
          <label className="block mb-2">Name:</label>
          <input
            type="text"
            name="name1"
            className="border rounded p-1 w-full"
            {...formik.getFieldProps("name1")}
          />
          {formik.touched.name1 && formik.errors.name1 && (
            <h5 className="text-red-500">{formik.errors.name1}</h5>
          )}
        </div>

        <div className="mb-6">
          <label className="block mb-2">Date of Birth:</label>
          <input
            type="date"
            max={today}
            name="dob"
            className="border rounded p-1 w-full"
            {...formik.getFieldProps("dob")}
          />
          {formik.touched.dob && formik.errors.dob && (
            <h5 className="text-red-500">{formik.errors.dob}</h5>
          )}
        </div>

        <div className="mb-6">
          <label className="block mb-2">Birth Time:</label>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <select
                name="hour"
                className="border rounded p-1 w-full"
                value={formik.values.hour}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="" disabled>Select Hour</option>
                {[...Array(24).keys()].map((hour) => (
                  <option key={hour} value={hour}>{hour}</option>
                ))}
              </select>
              {formik.touched.hour && formik.errors.hour && (
                <h5 className="text-red-500">{formik.errors.hour}</h5>
              )}
            </div>
            <div className="w-1/2">
              <select
                name="minute"
                className="border rounded p-1 w-full"
                value={formik.values.minute}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="" disabled>Select Minute</option>
                {[...Array(60).keys()].map((minute) => (
                  <option key={minute} value={minute}>{minute}</option>
                ))}
              </select>
              {formik.touched.minute && formik.errors.minute && (
                <h5 className="text-red-500">{formik.errors.minute}</h5>
              )}
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="block mb-2">
            Birth Location {selectedCalculator === 7 ? " ( Person 1 )" : ""}
          </label>
          <AddressSearch
            inputValue={inputValue}
            onInputChange={handleInputChange}
            onListItemClick={handleListItemClick}
          />
          {selectedCoordinates === null && (
            <h5 className="text-red-500">Location is required</h5>
          )}
        </div>

        <div className="mb-6">
          <label className="block mb-2">Gender:</label>
          <select
            name="gender"
            className="border rounded p-1 w-full"
            value={formik.values.gender}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="" disabled>Select Gender</option>
            {["Male", "Female", "Others"].map((text) => (
              <option key={text} value={text[0].toLowerCase()}>{text}</option>
            ))}
          </select>
          {formik.touched.gender && formik.errors.gender && (
            <h5 className="text-red-500">{formik.errors.gender}</h5>
          )}
        </div>

        <div className="flex space-x-4">
          <button
            type="button"
            className="bg-gray-400 text-white py-2 px-4 rounded"
            onClick={() => {
              formik.resetForm();
              setSelectedCoordinates(null);
              setInputValue("");
            }}
          >
            Reset
          </button>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      </form>

      
    </div>
  );
};

export default HoroScope;
