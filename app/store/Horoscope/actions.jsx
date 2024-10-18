import _ from "lodash";
import { fetchWithTimeout } from "../libs";
import { userEndpoints } from "../libs";
import "react-toastify/ReactToastify.min.css";
import { toast } from "react-toastify";

const apiKey = 'PWVN7FhSdp1mRbokpRbwl7sl9NBk9vkO40ki8UJK'

export const getHoroDetails =async (props)  => {
  const { name1 , dob , hour , minute , lat , long } = props;
  
  const time = `${hour}:${minute}`
  const url = `${userEndpoints.horoResult}?key=get-horoscope&dob=${dob}&time=${time}&latitude=${lat}&longitude=${long}`
  try {
    const data  = await fetchWithTimeout( url ,  {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'x-api-key': apiKey
        },
    });
     
    return data;
  } catch (error) {
    console.error(error);
    toast.error(error, {
      containerId: `toast-dashboard-container`,
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
    });
    return { error };
  }
};
