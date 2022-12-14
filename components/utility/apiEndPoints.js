import Cookies from "universal-cookie";

const cookies = new Cookies();

export const tokenUrl = "http://13.212.225.57:8081/api/v1/";
export const catBaseUrl = "http://13.214.145.117:9003/pim-catalogues/api/v1/";
export const prdBaseUrl = "http://54.169.123.170:9002/pim-products/api/v1/";
export const uploadBaseUrl = "http://marsoms.theretailinsights.co/oms_api/v2/";
export const publishBaseUrl = "http://18.141.190.83:9010/pim-publish/api/v1/";
export const catUrl = `${catBaseUrl}brands/catalogues/`;
export const prdUrl = `${prdBaseUrl}unaBrands/`;
export const brndUrl = `${catBaseUrl}brands/`;

export const createUser = `${tokenUrl}`;
export const loginUser = `${tokenUrl}.una-brands/authenticate`;
export const refreshToken = `${tokenUrl}refresh_token`;
export const logoutUser = `${tokenUrl}`;
// export const categoriesLists = `${catUrl}${cookies.get("tenantId")}`;
// export const productsLists = `${prdUrl}products/${cookies.get("tenantId")}`;
// export const brandList = `${brndUrl}${cookies.get("tenantId")}`;
export const ONBOARD_SERVICE_URL = 'http://onboard-apis.theretailinsightsdemos.com/api/v1';
