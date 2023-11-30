// Get the samples endpoint
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  console.log("Data :", data);
});


function init() {
  // Create dropdown menu
  let dropdownMenu = d3.select("#selDataset");
  // Access sample data with d3
  d3.json(url).then((data) => {
    let sample_ids = data.names;
    console.log("Drop_down: ", sample_ids);
    sample_ids.forEach((id) => {
      dropdownMenu.append("option").text(id).property("value", id);

    })
  let first_entry = sample_ids[0];
  console.log("first entry" ,first_entry);


   })};

init();  
// // let samples = [];
// // let meta_data = [];
// // d3.json(url).then(function(data){
// //   let selector = d3.select("#selDataset");
// // })

// // // // Initialize
// // // function init() {

// // // };



// // //When DOM changes, call getData()
// // d3.selectAll("#selDataset").on("change", getData);

// // // Function called by changes on DOM
// // function getData(subject) {
// //   let dropdownMenu = d3.select("#selDataset");
// //   // Assign the value of the dropdown menu option to a letiable
// //   let dataset = dropdownMenu.property("value");
// //   // Initialize an empty array for the country's data
// //   let data = [];
// //   for (let i = 940; i < data; i++) {
// //     console.log(subject[i]);

// //   };
// // };

// // getData(filter_data);