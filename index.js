/*=================================================================
----------------------IP Address & Googe Maps API ------------------------------
==================================================================*/

const API_Endpoint = "https://geo.ipify.org/api/v2/country,city";
const API_key = "at_hNfloLjASk9KLyB88UuJ7RH8wuY3Q";

let button = document.getElementById("sbtn");
let ipAddValue = document.querySelector(".ipAddValue");
let ipLocation = document.querySelector(".ipLocation");
let timeZone = document.querySelector(".timeZone");
let iProvider = document.querySelector(".isps");

// display IP info function
async function displayIPinfo(ipValue = "") {
  try {
    let url = `${API_Endpoint}?apiKey=${API_key}&ipAddress=${ipValue}`;
    const res = await fetch(url);

    if (!res.ok) {
      console.log("Failed to Fetch IP information");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching IP information:", error);
  }
}

// function to update information in frontend
function updateInfo(data) {
  if (!data) {
    alert("unable to fetch data ");
  }
  const { ip, location, isp } = data;

  if (!location) {
    alert("Location data is missing");
  }
  const { region, city, postalCode, timezone } = location;
  ipAddValue.innerText = ip;

  ipLocation.innerText = `${region},${city},${postalCode}`;
  timeZone.innerText = `UTC ${timezone}`;
  iProvider.innerText = isp;
}
// function to add map with marker
async function initMap(latids, longs) {
  try {
    const clientLocation = { lat: latids, lng: longs };

    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    let map = new google.maps.Map(document.getElementById("map"), {
      zoom: 12,
      center: clientLocation,
    });

    let marker = new google.maps.Marker({
      position: clientLocation,
      map: map,
    });
  } catch (error) {
    console.error("Error initializing map:", error);
  }
}
// Function to handle the click event on the button and fetch IP information
button.addEventListener("click", async () => {
  let ipValue = document.querySelector(".enterIP").value;

  try {
    const data = await displayIPinfo(ipValue);
    // call update info function
    updateInfo(data);
    console.log(data);
    let latids = data.location.lat;
    let longs = data.location.lng;
    // call map function
    initMap(latids, longs);
  } catch (error) {
    console.log("Error Fetching IP information: ", error.message);
  }
});

// Automatically fetch IP information when the page loads
window.addEventListener("DOMContentLoaded", async () => {
  try {
    const data = await displayIPinfo("");
    console.log(data);
    // call update info function
    updateInfo(data);
    let latids = data.location.lat;
    let longs = data.location.lng;
    // call map function
    initMap(latids, longs);
  } catch (error) {
    console.error("Error Fetching IP information: ", error.message);
  }
});

/*======================================================
Improvements after compeletion
1) Make sure proper naming
2) Coding Modularity
3) Always look for proper error handling
====================================================== */
