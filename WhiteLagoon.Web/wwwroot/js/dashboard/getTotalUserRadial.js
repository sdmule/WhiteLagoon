
$(document).ready(function () {
    loadUserRadialChart();
});
function loadUserRadialChart() {
    $(".chart-spinner").show();

    $.ajax({
        url: "/Dashboard/GetRegisteredUserChartData",
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            document.querySelector("#spanTotalUserCount").innerHTML = data.totalCount;

            var sectionCurrentCount = document.createElement("span");
            if (data.hasRatioIncreased) {
                sectionCurrentCount.className = "text-success me-1";
                sectionCurrentCount.innerHTML = '<i class="bi bi-arrow-up-right-circle me-1"></i> <span> ' + data.countInCurrentMonth + '</span>';
            }
            else {
                sectionCurrentCount.className = "text-danger me-1";
                sectionCurrentCount.innerHTML = '<i class="bi bi-arrow-down-right-circle me-1"></i> <span> ' + data.countInCurrentMonth + '</span>';
            }

            document.querySelector('#sectionUserCount').append(sectionCurrentCount);
            document.querySelector('#sectionUserCount').append("since last month");

            loadRadialBarChart("totalUserRadialChart", data);

            $(".chart-spinner").hide();
        }
    });
}

//function loadRadialBarChart(id, data) {
//    var options = {
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

//    var chart = new ApexCharts(document.querySelector("#"+id), options);
//    chart.render(); 
//}