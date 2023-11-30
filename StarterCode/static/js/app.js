// BRING IN THE DATA
// Get the samples endpoint
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
    console.log("Data: ", data.samples);
let data_samples = data.samples;

// CLEAN UP DATA TO WORK WITH
let filter_data = data_samples.filter(sample_id => sample_id.id === '940')[0];
console.log(filter_data);


// HORIZONTAL BAR CHART //////////////////////////////////////////
let hbar = {
  x: filter_data.sample_values.slice(0,10).reverse(),
  y: filter_data.otu_ids.map(object => `OTU ${object}`).slice(0,10).reverse(),
  text: filter_data.otu_labels.slice(0,10).reverse(),
  type: "bar",
  orientation: "h"
  };
  
// Data array
let bar_data = [hbar];
  
// Apply a title to the layout
let layout1 = {
  title: "Horizontal Bar Chart",
  };
  
// Render the plot to the div tag with id "plot"
Plotly.newPlot("bar", bar_data, layout1);

// BUBBLE CHART///////////////////////////////////////////////////
let bub_char = {
  x: filter_data.otu_ids,
  y: filter_data.sample_values,
  text: filter_data.otu_labels,
  mode: 'markers',
  marker: {
    color: filter_data.otu_ids,
    opacity: [1, 0.8, 0.6, 0.4],
    size: filter_data.sample_values
  }
};

var data = [bub_char];

var layout2 = {
  title: 'Bubble Chart',
  showlegend: false,
  height: 600,
  width: 1200
};

Plotly.newPlot("bubble", data, layout2); 

// METADATA CHART//////////////////////////////////////////////////




// DROPDOWN



});
