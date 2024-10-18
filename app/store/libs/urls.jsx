const apiEndpoint = 'https://5aacma2621.execute-api.us-east-1.amazonaws.com';
const rudrakshEndpoint = 'https://3hmrjn3hli.execute-api.us-east-1.amazonaws.com';
const horoResult = 'https://3hmrjn3hli.execute-api.us-east-1.amazonaws.com/prd/lagna-core';
const loginEndpoint = 'https://97ms209884.execute-api.ap-south-1.amazonaws.com';
const horocosmoURL = 'https://horocosmo.com';


export const userEndpoints = {
	login: loginEndpoint + '/prod/dashboard/login',
	getUserProfile: loginEndpoint + '/prod/dashboard/profile',
	getCalculatorResults: apiEndpoint + '/default/astro-backend/baby-names',
	getLuckyRudraksh: rudrakshEndpoint + '/prd/lagna-core',
	horoResult: horoResult,
	numerologyFull :horocosmoURL + "/numerology",
	getPaymentPlans :loginEndpoint + "/prod/dashboard/payment/plans",
	createOrder :loginEndpoint + "/prod/dashboard/payment/orders",
	confirmPayment :loginEndpoint + "/prod/dashboard/payment/success",
};
