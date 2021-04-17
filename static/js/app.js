
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
}; 

// plotting the Charts
function plotCharts(id) {
  
  d3.json("../../samples.json").then((data => {
      // demographics table
      // filter the metadata for the ID chosen
      var singleMeta = data.metadata.filter(testSubject => testSubject.id == id)[0];
      // Iterate through each key and value in the metadata

      Object.entries(singleMeta).forEach(([key, value]) => {
          var newList = demoTable.append("ul");
          newList.attr("class", "list-group list-group-flush");
          // append a li item to the unordered list tag
          var listItem = newList.append("li");
          // styling
          listItem.attr("class", "list-group-item p-1 demo-text bg-transparent");
          // putting info into the demographic box
          listItem.text(`${key}: ${value}`);
      })
      }));
}
init();