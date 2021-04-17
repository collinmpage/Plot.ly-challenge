
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

      //getting data for plots
      var singleSample = data.samples.filter(sample => sample.id == id)[0];
      //empty arrays for sampleData
      var otuIds = [];
      var otuLabels = [];
      var sampleValues = [];

    // iterate through all the key/values for plotting
    Object.entries(singleSample).forEach(([key, value]) => {
        switch (key) {
            case "otu_ids":
                otuIds.push(value);
                break;
            case "sample_values":
                sampleValues.push(value);
                break;
            case "otu_labels":
                otuLabels.push(value);
                break;
            default:
                break;
        } 
    });
    // get top ten otu values and reverse arrays
    var topOtuIds = otuIds[0].slice(0, 10).reverse();
    var topOtuLabels = otuLabels[0].slice(0, 10).reverse();
    var topSampleValues = sampleValues[0].slice(0, 10).reverse();
    // use the map function to store the IDs with "OTU" for labelling y-axis
    var topOtuIdsFormatted = topOtuIds.map(otuID => "OTU " + otuID);

        // Bar Chart
        // create a trace
        var traceBar = {
            x: topSampleValues,
            y: topOtuIdsFormatted,
            text: topOtuLabels,
            type: 'bar',
            orientation: 'h',
            marker: {
                color: 'rgb(30,140,190)'
            }
        };

        // create the data array for plotting
        var dataBar = [traceBar];

        // define the plot layout
        var layoutBar = {
            height: 500,
            width: 600,
            font: {
                family: 'Quicksand'
            },
            hoverlabel: {
                font: {
                    family: 'Quicksand'
                }
            },
            title: {
                text: `<b>Top OTUs for Test Subject ${id}</b>`,
                font: {
                    size: 18,
                    color: 'rgb(32,95,170)'
                }
            },
            xaxis: {
                title: "<b>Sample values<b>",
                color: 'rgb(32,95,170)'
            },
            yaxis: {
                tickfont: { size: 14 }
            }
        }

        //plot the barchart
        Plotly.newPlot('bar', dataBar, layoutBar);

        // ------ bubble Chart -------
    
        // create trace
        var traceBubble = {
            x: otuIds[0],
            y: sampleValues[0],
            text: otuLabels[0],
            mode: 'markers',
            marker: {
                size: sampleValues[0],
                color: otuIds[0],
                colorscale: 'YlGnBu'
            }
        };
        // create the data array for the plot
        var dataBubble = [traceBubble];
        // define the plot layout
        var layoutBubble = {
            font: {
                family: 'Quicksand'
            },
            hoverlabel: {
                font: {
                    family: 'Quicksand'
                }
            },
            xaxis: {
                title: "<b>OTU Id</b>",
                color: 'rgb(34,94,168)'
            },
            yaxis: {
                title: "<b>Sample Values</b>",
                color: 'rgb(34,94,168)'
            },
            showlegend: false,
        };
        // plot the bubble chat
        Plotly.newPlot('bubble', dataBubble, layoutBubble);
    }));
}

// resetData();
// plotCharts(id)

init();