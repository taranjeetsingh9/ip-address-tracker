const API_Endpoint = "https://geo.ipify.org/api/v2/country,city";
const API_key = "at_MvZqZLcERCM0uC1KcpjVtBJbFDZLk";

let button = document.getElementById("sbtn");
let ipAddValue = document.querySelector(".ipAddValue");
let ipLocation = document.querySelector(".ipLocation");
let timeZone = document.querySelector(".timeZone");
let iProvider = document.querySelector(".isps");

// Function to handle the click event on the button and fetch IP information
button.addEventListener("click", async () => {
  // Get the IP address value entered by the user
  let ipValue = document.querySelector(".enterIP").value;

  try {
    let url = `${API_Endpoint}?apiKey=${API_key}&ipAddress=${ipValue}`;

    // Fetch IP information from the API
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error("Failed to Fetch IP information");
    }
    let data = await res.json();
    console.log(data);
    let region = data.location.region;
    let city = data.location.city;
    let postalCode = data.location.postalCode;
    let timeZones = data.location.timezone;
    let ispValues = data.isp;

    ipAddValue.innerText = data.ip;
    ipLocation.innerText = `${region},${city},${postalCode}`;
    timeZone.innerText = `UTC ${timeZones}`;
    iProvider.innerText = `${ispValues}`;
  } catch (error) {
    console.log("Error Fetching IP information: ", error.message);
  }
});

