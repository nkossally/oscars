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
    return json;
  } catch {
    console.log("error");
  }
};
