import axios from "axios";
// import { toast } from "../common-components/Toast";
// import {
// 	ONBOARD_QUERY_SERVICE_URL
// } from "../components/utility/apiEndPoints";

let token;
// let blacklist = ["trackorder"];

const client = axios.create({
  // timeout: 1000 * 20,
  headers: {
    "Content-Type": "application/json",
  },
});

const onboardServer = axios.create({
  baseURL: process.env.ONBOARD_SERVICE_URL,
  // timeout: 1000 * 10,
  headers: {
    "Content-Type": "application/json",
  },
});
const authServer = axios.create({
  baseURL: process.env.AUTH_SERVICE_URL,
  // timeout: 1000 * 10,
  headers: {
    "Content-Type": "application/json",
  },
});
const onboardQueryServer = axios.create({
  baseURL: process.env.ONBOARD_QUERY_SERVICE_URL,
  // timeout: 1000 * 10,
  headers: {
    "Content-Type": "application/json",
  },
});

const catalogServer = axios.create({
  baseURL: process.env.CATALOG_SERVICE_URL,
  // timeout: 1000 * 10,
  headers: {
    "Content-Type": "application/json",
  },
});
const catalogQueryServer = axios.create({
  baseURL: process.env.CATALOG_QUERY_SERVICE_URL,
  // timeout: 1000 * 10,
  headers: {
    "Content-Type": "application/json",
  },
});

const syncCommandServer = axios.create({
  baseURL: process.env.SYNC_COMMAND_SERVICE_URL,
  // timeout: 1000 * 10,
  headers: {
    "Content-Type": "application/json",
  },
});

const syncQueryServer = axios.create({
  baseURL: process.env.SYNC_QUERY_SERVICE_URL,
  // baseURL:"http://apollo-sync-query-handler.theretailinsightsdemos.com/api/v1",

  // timeout: 1000 * 10,
  headers: {
    "Content-Type": "application/json",
  },
});

const catalogServiceNew = axios.create({
  baseURL: process.env.CATALOG_NEW_SERVICE_URL,

  headers: {
    "Content-Type": "application/json",
  },
});
// console.log("CATALOG_NEW_SERVICE_URL", process.env.CATALOG_NEW_SERVICE_URL);

onboardServer.setJwtToken = (newToken) => {
  token = newToken;
};
authServer.setJwtToken = (newToken) => {
  token = newToken;
};

onboardQueryServer.setJwtToken = (newToken) => {
  token = newToken;
};

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
// 		.post("/api/login/logOut")
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

const syncServer = axios.create({
  baseURL: process.env.SYNC_SERVICE_URL,
  // timeout: 1000 * 10,
  headers: {
    "Content-Type": "application/json",
  },
});

export {
  client,
  onboardServer,
  authServer,
  onboardQueryServer,
  catalogServer,
  catalogQueryServer,
  syncServer,
  syncCommandServer,
  syncQueryServer,
  catalogServiceNew,
};
