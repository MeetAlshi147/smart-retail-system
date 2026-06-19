const formatINR = (value) => {
    return `INR ${(value / 100000).toFixed(2)} Lakh`;
};

fetch("https://forecast-api-195476262139.asia-south1.run.app/forecast")
    .then(res => res.json())
    .then(data => {

        document.getElementById("tomorrow").innerHTML =
            formatINR(data.tomorrowRevenue);

        document.getElementById("nextweek").innerHTML =
            formatINR(data.nextWeekRevenue);

    })
    .catch(err => {
        console.error(err);

        document.getElementById("tomorrow").innerHTML =
            "Unable to load forecast";

        document.getElementById("nextweek").innerHTML =
            "Unable to load forecast";
    });
