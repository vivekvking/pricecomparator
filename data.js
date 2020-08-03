let amaz = require('./scrap/amazon');
let flip = require('./scrap/flipkart');

let start = new Date();
let Data=[],newdata;
var string = "Harry Potter";

///////Data from Amazon/////////
(async()=>{
    let amazdata = amaz(string);
    await amazdata.then(data=>{
        data.forEach(d=>Data.push(d));
    })
})();

///////Data from flipkart////////
(async()=>{
    let flipdata = flip(string);
    await flipdata.then(data=>{
        data.forEach(d=> Data.push(d));
    })
    newdata= sort(Data);
    console.log(newdata)
    let end = new Date();
    console.log(`Total time taken is ${end.getTime()-start.getTime()} ms`)
})();


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