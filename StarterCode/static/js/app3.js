// BRING IN THE DATA
// Get the samples endpoint
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
    console.log("Data: ", data.samples);
    
});    

// Initialize data
function init() {
    let dropdown = d3.select("#selDataset");
        d3.json(url).then(function(data){
        let ids = data.names;
        console.log("Drop Down List: ", ids);
        ids.forEach((id) => {
            dropdown.append("option").text(id).property("value", id);
        });
        let first_id = ids[0];
        console.log("First ID: ", first_id);

        hbar(first_id);
        bub_char(first_id);  
    })

    

}

// HORIZONTAL BAR CHART //////////////////////////////////////////
function hbar(sample) {
    d3.json(url).then(function(data){
        let data_samples = data.samples;
        console.log("Data Samples: ", data_samples);
        let chosenIds = data_samples.filter(sample_id => sample_id.id == sample);
        console.log("Id Chosen: ", chosenIds);
        let first_id = chosenIds[0];
        console.log("First Id: ", first_id);
        let sample_values = first_id.sample_values.slice(0,10).reverse();
        console.log("Sample Values: ", sample_values);
        let otu_ids = first_id.otu_ids.slice(0,10).reverse();
        console.log("OTU Ids: ", otu_ids);
        let otu_labels = first_id.otu_labels.slice(0,10).reverse();
        console.log("OTU Labels: ", otu_labels);
   
    let trace_hbar = {
        x: sample_values,
        y: otu_ids.map(object => `OTU ${object}`).slice(0,10),
        text: otu_labels,
        type: "bar",
        orientation: "h"
    };  
    // Data array
    let bar_data = [trace_hbar];  
    // Apply a title to the layout
    let layout1 = {
        title: "Horizontal Bar Chart",
    };  
    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("bar", bar_data, layout1);})};

// BUBBLE CHART///////////////////////////////////////////////////
function bub_char(sample) {
    d3.json(url).then(function(data){
        let data_samples = data.samples;
        console.log("Data Samples: ", data_samples);
        let chosenIds = data_samples.filter(sample_id => sample_id.id == sample);
        console.log("Id Chosen: ", chosenIds);
        let first_id = chosenIds[0];
        console.log("First Id: ", first_id);
        let sample_values = first_id.sample_values;
        console.log("Sample Values: ", sample_values);
        let otu_ids = first_id.otu_ids;
        console.log("OTU Ids: ", otu_ids);
        let otu_labels = first_id.otu_labels;
        console.log("OTU Labels: ", otu_labels);
    
    let trace_bub_char = {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: 'markers',
        marker: {
            color: otu_ids,
            opacity: [1, 0.8, 0.6, 0.4],
            size: sample_values
        }    
    };  
    // Data array
    let data2 = [bub_char];
    // Apply a title to the layout
    let layout2 = {
        title: 'Bubble Chart',
        showlegend: false,
        height: 600,
        width: 1200
    };  
    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("bubble", data2, layout2);
})};


// METADATA CHART//////////////////////////////////////////////////








init();