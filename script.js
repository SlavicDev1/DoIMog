// script.js
function updateSliderValue(sliderValueId, sliderId) {
    // Update the value displayed next to the slider
    var sliderValue = document.getElementById(sliderId).value;
    document.getElementById(sliderValueId).textContent = sliderValue;
}

function erf(x) {
    // Error function approximation
    var a1 = 0.254829592;
    var a2 = -0.284496736;
    var a3 = 1.421413741;
    var a4 = -1.453152027;
    var a5 = 1.061405429;
    var p = 0.3275911;

    var sign = (x < 0) ? -1 : 1;
    x = Math.abs(x);

    var t = 1.0 / (1.0 + p * x);
    var y = (((((a5 * t + a4) * t) + a3) * t + a2) * t) + a1;

    return sign * (1 - y * Math.exp(-x * x));
}

function calculatePercentile() {
    // Get slider values
    var heightValue = parseInt(document.getElementById("slider1").value);
    var benchValue = parseInt(document.getElementById("slider2").value);
    var slider3Value = parseInt(document.getElementById("slider3").value);
    var slider4Value = parseInt(document.getElementById("slider4").value);
    var slider5Value = parseInt(document.getElementById("slider5").value);

    // Calculate average and standard deviation for height
    var heightAverage = 171; // Example average for height
    var heightStdDeviation = 13; // Example standard deviation for height

    // Calculate z-score for height
    var heightZScore = (heightValue - heightAverage) / heightStdDeviation;

    // Calculate average and standard deviation for bench
    var benchAverage = 45; // Example average for bench
    var benchStdDeviation = 35; // Example standard deviation for bench

    // Calculate z-score for bench
    var benchZScore = (benchValue - benchAverage) / benchStdDeviation;

    // Calculate average and standard deviation for slider3 (Body fat %)
    var slider3Average = 22; // Example average for body fat %
    var slider3StdDeviation = 5; // Example standard deviation for body fat %

    // Calculate z-score for slider3 (reversed)
    var slider3ZScore = -(slider3Value - slider3Average) / slider3StdDeviation;

    // Calculate average and standard deviation for slider4
    var slider4Average = 0.5; // Example average for slider4
    var slider4StdDeviation = 0.2; // Example standard deviation for slider4

    // Calculate z-score for slider4
    var slider4ZScore = (slider4Value - slider4Average) / slider4StdDeviation;

    // Calculate average and standard deviation for slider5
    var slider5Average = 5; // Example average for slider5
    var slider5StdDeviation = 2.5; // Example standard deviation for slider5

    // Calculate z-score for slider5
    var slider5ZScore = (slider5Value - slider5Average) / slider5StdDeviation;

    // Convert z-scores to percentiles using the cumulative distribution function (CDF)
    var heightPercentile = Math.max(Math.min(Math.round((1 + erf(heightZScore / Math.sqrt(2))) * 50), 99), 1);
    var benchPercentile = Math.max(Math.min(Math.round((1 + erf(benchZScore / Math.sqrt(2))) * 50), 99), 1);
    var slider3Percentile = Math.max(Math.min(Math.round((1 + erf(slider3ZScore / Math.sqrt(2))) * 50), 99), 1);
    var slider4Percentile = Math.max(Math.min(Math.round((1 + erf(slider4ZScore / Math.sqrt(2))) * 50), 99), 1);
    var slider5Percentile = Math.max(Math.min(Math.round((1 + erf(slider5ZScore / Math.sqrt(2))) * 50), 99), 1);

    // Display result with emojis
    var resultContainer = document.getElementById("result");
    resultContainer.innerHTML = "<h2>Your Percentiles:</h2>" +
        "<p>Height Percentile: " + heightPercentile + "th percentile " + getEmoji(heightPercentile) + "</p>" +
        "<p>Bench Percentile: " + benchPercentile + "th percentile " + getEmoji(benchPercentile) + "</p>" +
        "<p>Body Fat % Percentile: " + slider3Percentile + "th percentile " + getEmoji(slider3Percentile) + "</p>" +
        "<p>Hunter Eyes Percentile: " + slider4Percentile + "th percentile " + getEmoji(slider4Percentile) + "</p>" +
        "<p>Face Rating Percentile: " + slider5Percentile + "th percentile " + getEmoji(slider5Percentile) + "</p>";
}

function getEmoji(percentile) {
    // Returns a checkmark or cross emoji based on the percentile
    return (percentile >= 70) ? "<span class='emoji checkmark'>✔️ You MOG</span>" : "<span class='emoji cross'>❌ it's over</span>";
}
