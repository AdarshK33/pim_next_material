import axios from "axios";
// import { toast } from "../common-components/Toast";
// import {
// 	ONBOARD_SERVICE_URL
//   } from "../components/utility/apiEndPoints";
  
let token;
let blacklist = ["trackorder"];

const client = axios.create({
	// timeout: 1000 * 20,
	headers: {
		"Content-Type": "application/json",
	},
});

// console.log("hello process.env.ONBOARD_QUERY_SERVICE_URL",process.env.)
const onboardServer = axios.create({
	baseURL:  process.env.ONBOARD_SERVICE_URL,
	// timeout: 1000 * 10,
	headers: {
		"Content-Type": "application/json",
	},
});
const authServer = axios.create({
	baseURL:  process.env.AUTH_SERVICE_URL,
	// timeout: 1000 * 10,
	headers: {
		"Content-Type": "application/json",
	},
});
const onboardQueryServer = axios.create({
	baseURL:  process.env.ONBOARD_QUERY_SERVICE_URL,
	// timeout: 1000 * 10,
	headers: {
		"Content-Type": "application/json",
	},
});





// server.setJwtToken = newToken => {
// 	token = newToken;
// };

// server.setSessionId = SessionId => {
// 	session = SessionId;
// };

// server.interceptors.request.use(
// 	request => requestHandler(request, "server"),
// 	error => errorHandler(error, "server")
// );

// server.interceptors.response.use(
// 	response => responseHandler(response, "server"),
// 	error => errorHandler(error, "server")
// );

// client.interceptors.response.use(
// 	response => responseHandler(response, "client"),
// 	error => errorHandler(error, "client")
// );

// const requestHandler = (request, type) => {
// 	if (type === "server") {
// 		if (token && !blacklist.includes(request.url)) {
// 			request.headers.Authorization = `Bearer ${token}`;
// 		}
// 		return request;
// 	}
// };

// const responseHandler = response => {
// 	return response;
// };

// const errorHandler = (error, type) => {
	
// 	if (type === "client") {
// 		const invalidSessionMessage = "\"%fieldName\" is required. Enter and try again.";
// 		const isUnauthorized = error?.response?.status === 401;
// 		const invalidSession = error?.response?.status === 400 && error?.response?.data?.message === invalidSessionMessage;
// 		if (isUnauthorized || invalidSession) clearSession();
// 	}
// 	return Promise.reject(error);
// };

// const clearSession = () => {
// 	client
// 		.post("/api/signout/signout")
// 		.then(response => {
// 			if (response.status === 200) {
// 				toast.error("You're Session Has Expired");
// 				setTimeout(() => (window.location = "/"), 2000);
// 			}
// 		})
// 		.catch(err => {
// 			console.log("signout API FAILURE", err);
// 		});
// };

export { client, onboardServer,authServer,onboardQueryServer };
