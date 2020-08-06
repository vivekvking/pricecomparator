let amaz = require('./scrap/amazon');
let flip = require('./scrap/flipkart');

let start = new Date();
let Data=[],newdata;
var string = "iphone";

///////Data from Amazon/////////
// (async()=>{
    let amazdata = amaz(string);
    amazdata.then(data=>{
        console.log(data); 
        data.forEach(d=>Data.push(d));
    })
    .catch((err)=>console.log("error with amazon data"+ err))
// })();

///////Data from flipkart////////
// (async()=>{
    let flipdata = flip(string);
    flipdata.then(data=>{
        console.log(data);
        data.forEach(d=> Data.push(d));
    })
    .catch((err)=>console.log("error with flipkart data"+ err))
    // newdata= sort(Data);
    // console.log("Data is "+Data);
    let end = new Date();
    console.log(`Total time taken is ${end.getTime()-start.getTime()} ms`)
// })();

    Promise.all([amazdata,flipdata]).then(()=>Data.forEach((d)=>console.log(d.owner)))
    .catch((err)=>console.log("Error in promise.all "+err))

////////Sorting function/////////
let sort = (arr)=>{
    for(let i=0;i<arr.length;i++){
        let min=i;
        for(let j=i+1;j<arr.length;j++){
            if(arr[j].price<arr[min].price){
                min = j;
            }
        }
        let temp = arr[i];
        arr[i]=arr[min];
        arr[min]=temp;
    }
    return arr;
}



// let Try = async (string)=>{
//     let amazdata = amaz(string);
//     await amazdata.then(data=>{
//         data.forEach(d=>Data.push(d));
//     })   
//     let flipdata = flip(string);
//     await flipdata.then(data=>{
//         data.forEach(d=> Data.push(d));
//     })
//     return Data;
// } 

// let finaldata = Try(string);
// finaldata.then(data=>{
//     console.log(data);
//     let end = new Date();
//     console.log(`Total time taken is ${end.getTime()-start.getTime()} ms`)
// })