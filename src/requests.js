const env = process.env.NODE_ENV;
// const API_URL =
//   env === "development"
//     ? "http://127.0.0.1:5000"
//     : "https://oscarsbackend.vercel.app";
// const API_URL = "https://oscarsbackend.vercel.app";
const API_URL =  "http://127.0.0.1:5000"

const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0N2Y4ZTZlOGIyNjUyYjQ5ZWM5N2IwMjRiMzA5MWQxYiIsIm5iZiI6MTczMDYzNjE2Mi4zOTUyMzg5LCJzdWIiOiI2NzI3Njg4MzcyMGYwNDc2ZjYwZDg2MTgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.i0h3Z_Vnl0JqlxVlRJllOP9pZdB7ep0flUBxE_iPEos";

const imageUrlBase = "https://image.tmdb.org/t/p/original";

export const getMovieImage = async (title) => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=false&language=en-US&page=1`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const resp = await fetch(url, options);
    const json = await resp.json();
    const imgUrlSuffix = json?.results[0]?.backdrop_path;
    if (!imgUrlSuffix) return "";
    return imageUrlBase + imgUrlSuffix;
  } catch {}
};

export const getPersonImage = async (name) => {
  const url = `https://api.themoviedb.org/3/search/person?query=${name}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const resp = await fetch(url, options);
    const json = await resp.json();
    const imgUrlSuffix = json?.results[0]?.profile_path;
    if (!imgUrlSuffix) return "";
    return imageUrlBase + imgUrlSuffix;
  } catch {}
};

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

export const getBaftaNomineesByYear = async (year) => {
  try {
    const resp = await fetch(API_URL + `/get-bafta-nominees-by-year?year=${year}`, {
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

export const getBaftaCategories = async () => {
  try {
    const resp = await fetch(API_URL + "/get-bafta-categories", {
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
    const data = json.data;
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
    const data = json.data;
    return data;
  } catch {
    console.log("error");
  }
};

export const getNominationsByName = async (name) => {
  try {
    const resp = await fetch(
      API_URL + `/get-nominations-by-name?name=${name}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      },
    );
    const json = await resp.json();
    const data = json.data;
    return data;
  } catch {
    console.log("error");
  }
};