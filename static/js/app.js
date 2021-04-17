
// loading in and checking data
d3.json('/../../samples.json').then((data) => {
    //read the data
    console.log(data);
    });





//------ SETTING VARIABLES -------//
var idSelect = d3.select("#selDataset");
var demoTable = d3.select("#sample-metadata");
//barChart
var barChart = d3.select("#bar");
//bubbleChart
var bubbleChart = d3.select("bubble");
// select the gauge chart div
//var gaugeChart = d3.select("gauge");


// populating the drop down menu

function init() {

    // reset any previous data
    resetData();
    
    d3.json('/../../samples.json').then((data => {
           
        data.names.forEach((name => {
            var option = idSelect.append("option");
            option.text(name);
        }));
        // default first chart
        var initId = idSelect.property("value")
        plotCharts(initId);
    }));
}
// Resetting the data
function resetData() {
    demoTable.html("");
    barChart.html("");
    bubbleChart.html("");
    //gaugeChart.html("");
}; // close resetData()



init();






















// function buildPlot() {
//     d3.json(url).then(function(odata) {
        
//       var sampleValues = odata.samples.sample_values;
//       var otuIDS = odata.samples.otu_ids;
//       var otuLabels = odata.samples.otu_labels;

//       d3.selectAll("#selDataset").on("change", updatePlotly);

// // This function is called when a dropdown menu item is selected
// function updatePlotly() {
//   // Use D3 to select the dropdown menu
//   var dropdownMenu = d3.select("#selDataset");
//   // Assign the value of the dropdown menu option to a variable
//   var dataset = dropdownMenu.property("value");

//   // Initialize x and y arrays
//   var x = [];
//   var y = [];

//   if (dataset === 'dataset1') {
//     x = sampleValues;
//     y = otuIDS;
//   }

//   else if (dataset === 'dataset2') {
//     x = sampleValues;
//     y = otuIDS;
//   }

//   // Note the extra brackets around 'x' and 'y'
//   Plotly.restyle("plot", "x", [x]);
//   Plotly.restyle("plot", "y", [y]);
// }

// init();