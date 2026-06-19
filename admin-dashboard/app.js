fetch(
  "https://forecast-api-195476262139.asia-south1.run.app/forecast"
)
.then(res => res.json())
.then(data => {

    document.getElementById("tomorrow").innerHTML =
        "₹" + Math.round(data.tomorrowRevenue).toLocaleString();

    document.getElementById("nextweek").innerHTML =
        "₹" + Math.round(data.nextWeekRevenue).toLocaleString();

});
