"use client";
import * as Yup from "yup";
import Sidebar from "../components/dashboard/Sidebar";
import TopMenuBar from "../components/dashboard/TopMenuBar";
import HoroScope from "./ReportForm";
import { useState } from "react";
import { useFormik } from "formik";
import { TableC } from "../components/table";
import { NakTable } from "../components/nak-table";
// import  ProfileCard  from "../components/profile/ProfileCard";
import VedicProfile from "../components/profile/VedicProfile"
import { LagnaChart } from "../components/lagnachart";


export default function Page() {
  const [Data, setData] = useState([]);

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
      console.log(values);
      const data = await getHoroDetails(values);
      console.log(data);
      setResults(data);
      if (data?.statusCode === 200) {
        setResult(data?.body);
      }

      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="flex">
      <TopMenuBar />
      <Sidebar />
      <HoroScope Data={Data} setData={setData} />
      {Data !== null && Data?.planets?.length > 0 && (
        <>
          <div className="mt-20 mx-auto">
            <div className="details grid-cols-1 md:grid-cols-3 gap-4 mt-8 ml-52">
              <div className="p-4">
                <VedicProfile values={formik.values} info={Data?.info} />
              </div>
              <div className="col-span-2 p-4">
                <TableC
                  planets={Data?.planets}
                  planetsPoints={Data?.planetsPoints}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-60 mt-8">
              <div className="p-4">
                <LagnaChart arr={Data?.planets} title="Lagna Chart" />
              </div>
              <div className="p-4">
                <LagnaChart
                  arr={Data?.planets}
                  title="Chandra Chart"
                  chandra={true}
                />
              </div>
            </div>

            <div className="my-6 border-b" />

            <div className="p-4 ml-60">
              <NakTable
                planets={Data?.planets}
                planetsPoints={Data?.planetsPoints}
              />
            </div>
          </div>
        </>
      )}
      {/* <Dashboard /> */}
    </div>
  );
}
