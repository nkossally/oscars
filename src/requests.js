const env = process.env.NODE_ENV;
const API_URL =
  env === "development"
    ? "http://127.0.0.1:5000"
    : "https://jessica-election-backend.vercel.app";

export const get_nominees = async () => {
  try {
    const resp = await fetch(API_URL + "/get-nominees", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    const json = await resp.json();
    console.log("json", json);
    data = json.data;
    console.log("data", data);
    return json;
  } catch {
    console.log("error");
  }
};

export const get_category = async (id) => {
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
