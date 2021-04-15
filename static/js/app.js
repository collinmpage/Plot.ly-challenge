// const data = './samples.json'

// loading in the data
d3.json('/../../samples.json').then((data) => {
    //read the data
    console.log(data);
    });

const dataPromise = d3.json('/../../samples.json');
console.log("Data Promise: ", dataPromise);