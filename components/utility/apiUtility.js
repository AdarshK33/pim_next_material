import axios from "axios";
import Cookies from "universal-cookie";
import {
  createUser,
  loginUser,
  refreshToken,
  catUrl,
  prdUrl,
  brndUrl,
  uploadBaseUrl,
  publishBaseUrl,
} from "./apiEndPoints";

const cookies = new Cookies();

export function createUserApi(apiData) {
  const data = axios
    .post(createUser, apiData)
    .then((res) => ({ data: res.data }))
    .catch(() => "err");
  return data;
}

export async function loginApiCall(apiData) {
  const data = await axios
    .post(loginUser, apiData, {
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => res.data)
    .catch(() => "err");
  return data;
}

export async function refreshTokenApi() {
  const data = await axios
    .get(refreshToken, {
      params: {
        refresh_token: cookies.get("refreshToken"),
        grant_type: "refresh_token",
      },
    })
    .then((res) => res.data)
    .catch(() => "err");
  return data;
}

export function logoutApiCall() {
  const data = "";
  return data;
}

export async function getAllCatagories(params) {
  const data = await axios
    .get(`${catUrl}${cookies.get("tenantId")}`, {
      headers: { Authorization: `Bearer ${cookies.get("token")}` },
      params: params,
    })
    .then((res) => res.data)
    .catch(() => "err");
  return data;
}

export async function getCatalogById(apiData) {
  const data = await axios
    .get(
      `${catUrl}${apiData.catalogueId}/${apiData.brand.brandId}/${cookies.get(
        "tenantId"
      )}/`,
      {
        headers: { Authorization: `Bearer ${cookies.get("token")}` },
      }
    )
    .then((res) => res.data)
    .catch(() => "err");
  return data;
}

export async function getAllProducts(params) {
  const data = await axios
    .get(`${prdUrl}products/${cookies.get("tenantId")}`, {
      headers: { Authorization: `Bearer ${cookies.get("token")}` },
      params: params,
    })
    .then((res) => res.data)
    .catch(() => "err");
  return data;
}

export async function getProductById(productId) {
  const data = await axios
    .get(`${prdUrl}${cookies.get("tenantId")}/${productId}`, {
      headers: { Authorization: `Bearer ${cookies.get("token")}` },
    })
    .then((res) => res.data)
    .catch(() => "err");
  return data;
}

export async function getAllBrands(params) {
  const data = await axios
    .get(`${brndUrl}${cookies.get("tenantId")}`, {
      headers: { Authorization: `Bearer ${cookies.get("token")}` },
      params: params,
    })
    .then((res) => res.data)
    .catch(() => "err");
  return data;
}

export async function getBrandById(apiData) {
  const data = await axios
    .get(`${brndUrl}${apiData.brandId}/${cookies.get("tenantId")}/details/`, {
      headers: { Authorization: `Bearer ${cookies.get("token")}` },
    })
    .then((res) => res.data)
    .catch(() => "err");
  return data;
}

export async function createBrandApi(apiData) {
  const data = await axios
    .post(`${brndUrl}${cookies.get("tenantId")}`, apiData, {
      headers: { Authorization: `Bearer ${cookies.get("token")}` },
    })
    .then((res) => res.data)
    .catch(() => "err");
  return data;
}
export async function uploadBulkFile(payload) {
  const formData = new FormData();
  formData.append("file", payload);
  const data = await axios
    .post(`${prdUrl}uploadFile`, formData, {
      "Content-Type": "multipart/form-data",
      headers: { Authorization: `Bearer ${cookies.get("token")}` },
    })
    .then((res) => res.data)
    .catch((err) => err.response);
  return data;
}
export async function publishBulkData(payload) {
  const data = await axios
    .post(
      `${publishBaseUrl}publish/products/${cookies.get("tenantId")}`,
      payload,
      {
        headers: { Authorization: `Bearer ${cookies.get("token")}` },
        params: { channel: "shopify" },
      }
    )
    .then((res) => res.data)
    .catch((err) => err.response);
  return data;
};

export async function updateProductById(apiData) {
  const data = await axios.put(`${prdUrl}products/${cookies.get("tenantId")}`, apiData, {
    headers: { Authorization: `Bearer ${cookies.get("token")}` },
  }).then((res) => res.data).catch(() => "err");
  return data;
}
