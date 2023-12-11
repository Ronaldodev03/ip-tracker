export const fetchGeoIPInfo = async ({ ip }) => {
  const API_KEY = import.meta.env.VITE_URL_SRC_01_API_KEY;
  console.log(ip);
  try {
    const response = await fetch(
      `http://api.ipstack.com/${ip}?access_key=${API_KEY}`
    );
    const data = await response.json();
    // console.log("data_src_01", data);
    return data;
  } catch (error) {
    console.error("Error fetching IP info:", error);
    throw error;
  }
};

export const fetchGeoIPInfoSrc2 = async ({ ip }) => {
  const API_KEY_SRC_2 = import.meta.env.VITE_URL_SRC_02_API_KEY;

  let URL;

  // Verificar si la IP es igual a "check"
  if (ip === "check") {
    URL = `https://geo.ipify.org/api/v2/country?apiKey=${API_KEY_SRC_2}`;
  } else {
    URL = `https://geo.ipify.org/api/v2/country?apiKey=${API_KEY_SRC_2}&ipAddress=${ip}`;
  }

  try {
    const response = await fetch(URL);
    const data = await response.json();
    //console.log("data_src_02", data);

    return data;
  } catch (error) {
    console.error("Error fetching IP info:", error);
    throw error;
  }
};
