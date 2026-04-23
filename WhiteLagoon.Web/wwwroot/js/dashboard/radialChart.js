//function loadRadialBarChart(id, data) {
//    var chartColors = getChartColorsArray(id);
//    var options = {
//        //fill: {
//        //    colors: chartColors
//        //},
//        chart: {
//            height: 90,
//            width: 90,
//            type: "radialBar",
//            sparkline: {
//                enabled: true
//            },
//            offsetY: -10
//        },

//        series: data.series,

//        colors: chartColors,

//        plotOptions: {
//            radialBar: {

//                dataLabels: {
//                    value: {
//                        offsetY: -10
//                    }
//                }
//            }
//        },
//        labels: [""]
//    };

//    var chart = new ApexCharts(document.querySelector("#" + id), options);
//    chart.render();
//}

//function getChartColorsArray(id) {
//    if (document.getElementById(id) != null) {
//        var colors = document.getElementById(id).getAttribute("data-colors");
//        if (colors) {
//            colors = JSON.parse(colors);
//            return colors.map(function (value) {
//                var newValue = value.replace(" ", "");
//                if (newValue.indexOf(",") === -1) {
//                    var color = getComputedStyle(document.documentElement).getPropertyValue(newValue);
//                    if (color) return color;
//                    else return newValue;;
//                }
//            });
//        }
//    }
//}

function loadRadialBarChart(id, data) {

    var el = document.querySelector("#" + id);

    if (el._chart) {
        el._chart.destroy();
    }

    el.innerHTML = "";

    var chartColors = getChartColorsArray(id);

    var options = {
        chart: {
            height: 90,
            width: 90,
            type: "radialBar",
            sparkline: { enabled: true },
            offsetY: -10
        },

        series: data.series,

        colors: chartColors,   // ✅ FINAL FIX

        plotOptions: {
            radialBar: {
                dataLabels: {
                    value: {
                        offsetY: -10
                    }
                }
            }
        },

        labels: [""]
    };

    var chart = new ApexCharts(el, options);
    chart.render();

    el._chart = chart;
}

function getChartColorsArray(id) {
    var el = document.getElementById(id);
    if (!el) return ["#0d6efd"];

    var colors = el.getAttribute("data-colors");
    if (!colors) return ["#0d6efd"];

    colors = JSON.parse(colors);

    return colors.map(function (value) {
        value = value.trim();

        if (value.startsWith("--")) {

            // 🔥 Try multiple sources (robust resolution)
            let color =
                getComputedStyle(document.documentElement).getPropertyValue(value).trim() ||
                getComputedStyle(document.body).getPropertyValue(value).trim();

            // fallback if still empty
            return color || "#ffc107"; // default warning
        }

        return value;
    });
}