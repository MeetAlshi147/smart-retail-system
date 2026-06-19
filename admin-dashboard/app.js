const formatINR = (value) => {
return ${(value / 100000).toFixed(2)} Lakh;
};

// Forecast Data
async function loadForecast() {
try {
const response = await fetch(
"https://forecast-api-195476262139.asia-south1.run.app/forecast"
);

    const data = await response.json();

    document.getElementById("tomorrow").innerHTML =
        formatINR(data.tomorrowRevenue);

    document.getElementById("nextweek").innerHTML =
        formatINR(data.nextWeekRevenue);

} catch (err) {
    console.error(err);

    document.getElementById("tomorrow").innerHTML =
        "Unable to load forecast";

    document.getElementById("nextweek").innerHTML =
        "Unable to load forecast";
}

}

// Analytics Data
async function loadAnalytics() {
try {
const response = await fetch(
"https://forecast-api-195476262139.asia-south1.run.app/analytics"
);

    const data = await response.json();

    document.getElementById("orders").innerHTML =
        data.totalOrders.toLocaleString();

    document.getElementById("revenue").innerHTML =
        Number(data.totalRevenue).toLocaleString("en-IN");

    document.getElementById("product").innerHTML =
        data.topProduct;

} catch (err) {
    console.error(err);

    document.getElementById("orders").innerHTML =
        "Unable to load";

    document.getElementById("revenue").innerHTML =
        "Unable to load";

    document.getElementById("product").innerHTML =
        "Unable to load";
}

}

// Load everything
loadForecast();
loadAnalytics();
