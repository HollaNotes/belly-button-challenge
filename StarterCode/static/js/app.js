// BRING IN THE DATA
// Get the samples endpoint
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
    console.log("Data: ", data.samples);
    
});    

// Initialize data
function init() {
    // Select dropdown from html
    let dropdown = d3.select("#selDataset");
        d3.json(url).then(function(data){
        // Set variable for names/ids    
        let ids = data.names;
        console.log("Drop Down List: ", ids);
        // Go through each sample and 
        ids.forEach((sample) => {
            dropdown.append("option").text(sample).property("value", sample);
        });

        // Start with the first id when opening browser
        let first_id = ids[0];
        console.log("First ID: ", first_id);

        // Start other fuctions with the first id as well
        hbar(first_id);
        bub_char(first_id);  
        metadata(first_id)
      
    })

    

}

// HORIZONTAL BAR CHART //////////////////////////////////////////
function hbar(sample) {
    d3.json(url).then(function(data) {
        // Make sample variable
        let data_samples = data.samples;
            //console.log("Data Samples: ", data_samples);
        // Filter IDs to match sample number
        let chosenIds = data_samples.filter(sample_id => sample_id.id == sample);
            //console.log("Id Chosen: ", chosenIds);
        // Set ID as the first one in array
        let first_id = chosenIds[0];
            //console.log("First Id: ", first_id);
        // Slice and reverse to get the top 10 sample values, OTU IDs and OTU Labels
        let sample_values = first_id.sample_values;
            //console.log("Sample Values: ", sample_values);
        let otu_ids = first_id.otu_ids;
            //console.log("OTU Ids: ", otu_ids);
        let otu_labels = first_id.otu_labels;
            //console.log("OTU Labels: ", otu_labels);
   
        // Set trace for horizontal bar chart        
        let trace_hbar = {
            x: sample_values.slice(0,10).reverse(),
            y: otu_ids.map(object => `OTU ${object}`).slice(0,10).reverse(),
            text: otu_labels.slice(0,10).reverse(),
            type: "bar",
            orientation: "h"
        };  
        // Data array
        let bar_data = [trace_hbar];  
        // Apply a title to the layout
        let layout1 = {
            title: {
                text: "Horizontal Bar Chart"},
            xaxis: {
                title: {
                    text: "" 
                }
            }    
        };  
        // Render the plot to the div tag with id "plot"
        Plotly.newPlot("bar", bar_data, layout1);})};

// BUBBLE CHART///////////////////////////////////////////////////
function bub_char(sample) {
    d3.json(url).then(function(data){
        // Make sample variable
        let data_samples = data.samples;
            //console.log("Data Samples: ", data_samples);
        // Filter IDs to match sample number
        let chosenIds = data_samples.filter(sample_id => sample_id.id == sample);
            //console.log("Id Chosen: ", chosenIds);
        // Set ID as the first one in array    
        let first_id = chosenIds[0];
            //console.log("First Id: ", first_id);
        // Retrieve sample values, OTU IDs and OTU Labels   
        let sample_values = first_id.sample_values;
            //console.log("Sample Values: ", sample_values);
        let otu_ids = first_id.otu_ids;
            //console.log("OTU Ids: ", otu_ids);
        let otu_labels = first_id.otu_labels;
            //console.log("OTU Labels: ", otu_labels);
    
        // Set trace for bubble chart
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
        let data2 = [trace_bub_char];
        // Apply a title to the layout
        let layout2 = {
            title: 'Bubble Chart',
            showlegend: true,
            height: 600,
            width: 1200
            
        };  
        // Render the plot to the div tag with id "plot"
        Plotly.newPlot("bubble", data2, layout2);
})};


// METADATA CHART//////////////////////////////////////////////////
function metadata(sample) {
    d3.json(url).then(function(data){
        // Set variable for metadata of samples
        let metadata = data.metadata;
        // Filter to only sample ID
        let chosenIdsMD = metadata.filter(sample_id => sample_id.id == sample);
        console.log("Info: ", chosenIdsMD);
        // Select only the first sample
        let first_id = chosenIdsMD[0];

        let filled = d3.select("#sample-metadata");
        // Reset html for when there is a change with the dropdown
        filled.html("");        
        // Retrieve and store metadata info for selected sample
        Object.entries(first_id).forEach(([key,value]) => {
            filled.append("h6").text(`${key}: ${value}`);
        })
   

    

    })};


// Call updatePlotly() when a change takes place to the DOM
d3.selectAll("#selDataset").on("change", updatePlotly);

function updatePlotly(newData) {
    console.log("New Value: ", newData);
    hbar(newData);
    bub_char(newData);  
    metadata(newData)
  };




init();