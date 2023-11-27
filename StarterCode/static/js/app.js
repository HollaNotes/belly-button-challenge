// Get the samples endpoint
const samples = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
// Fetch the JSON data and console log it
d3.json(samples).then(function(data) {
    console.log(data.samples);
data_samples = data.samples;

filter_data = data_samples.filter(sample_id => sample_id.id === '940')[0];
console.log(filter_data);


// SAMPLES
// Trace1
let trace1 = {
    x: filter_data.sample_values.slice(0,10).reverse(),
    y: filter_data.otu_ids.map(object => `OTU ${object}`).slice(0,10).reverse(),
    text: filter_data.otu_labels.slice(0,10).reverse(),
    type: "bar",
    orientation: "h"
  };
  
  // Data array
  let bar_data = [trace1];
  
  // Apply a title to the layout
  let layout = {
    title: "",
  };
  
  // Render the plot to the div tag with id "plot"
  Plotly.newPlot("bar", bar_data, layout);
});