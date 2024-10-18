import { userEndpoints } from "../libs/";
import { normalApiFetch } from "./requests";
// import { calculatorKeyList } from "@/utils/Helpers";

const apiKey = 'FZJwEj1yOj91DyRNeHNl41lVsOkejGM9FDfaYbji';
const rudrakshApiKey = 'PWVN7FhSdp1mRbokpRbwl7sl9NBk9vkO40ki8UJK';

export const calculateResult = async (params) => {
    const { data, error } = await normalApiFetch(userEndpoints.getCalculatorResults, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey
        },
        body: JSON.stringify(params)
    });
    return { data, error };
}
export const calculateLuckyRudraksh = async (params) => {
    const urlParams = new URLSearchParams(params);
    const { data, error } = await normalApiFetch(userEndpoints.getLuckyRudraksh + '?' + urlParams, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': rudrakshApiKey
        }
    });
    return { data, error };
}


export const numerologyFullReport = async (params) => {
    console.log(params)
    const urlParams = new URLSearchParams(params);
    console.log(urlParams)
    const { data, error } = await normalApiFetch(userEndpoints.numerologyFull + '?' + urlParams, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // 'x-api-key': rudrakshApiKey
        }
    });
    return { data, error };
}

