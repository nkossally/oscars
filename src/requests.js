const env = process.env.NODE_ENV;
const API_URL =
  env === "development"
    ? "http://127.0.0.1:5000"
    : "https://jessica-election-backend.vercel.app";

export const getNominees = async () => {
  try {
    const resp = await fetch(API_URL + "/get-nominees", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    const json = await resp.json();
    const data = json.data;
    return data;
  } catch {
    console.log("error");
  }
};

export const getNomineesByYear = async (year) => {
  try {
    const resp = await fetch(API_URL + `/get-nominees-by-year?year=${year}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    const json = await resp.json();
    const data = json.data;
    return data;
  } catch {
    console.log("error");
  }
};

export const getCategories = async () => {
  try {
    const resp = await fetch(API_URL + "/get-categories", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    const json = await resp.json();
    const data = json.data;
    return data;
  } catch {
    console.log("error");
  }
};

export const getCategory = async (id) => {
  try {
    const resp = await fetch(API_URL + `/get-category?id=${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    const json = await resp.json();
    const data =  json.data;
    return data;
  } catch {
    console.log("error");
  }
};

export const getPerson = async (id) => {
  try {
    const resp = await fetch(API_URL + `/get-person?id=${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    const json = await resp.json();
    const data =  json.data;
    return data;
  } catch {
    console.log("error");
  }
};