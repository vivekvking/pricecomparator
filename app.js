const express = require('express');
const app = express();
const ejs = require('ejs')
const amaz = require('./scrap/amazon')
const flip = require('./scrap/flipkart'); 
const bodyParser = require('body-parser');
// const newdata= require('./data')

var Data = [];


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
const port = process.env.PORT || 3000; 

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

app.get('/',(req,res)=>{
    res.render('home');
})

app.post('/',(req,res)=>{
    let string = req.body.book_name;
    res.redirect(`/search/${string}`)
})

app.get('/search/:book_name',(req,res)=>{
    let string = req.params.book_name;
    let start = new Date();
    (async()=>{
        let amazdata = amaz(string);
        await amazdata.then(data=>{
            data.forEach(d=>Data.push(d));
        })
    })();

    (async()=>{
        let flipdata = flip(string);
        await flipdata.then(data=>{
            data.forEach(d=> Data.push(d));
        })
        let newdata= sort(Data);
        // console.log(newdata)
        let end = new Date();
        // console.log(newdata);
        console.log(`Total time taken is ${end.getTime()-start.getTime()} ms`);
        res.render('index',{data: newdata});
    })();
})

app.post('/search',(req,res)=>{
    let string = req.body.book_name;
    res.redirect(`/search/${string}`)
})

app.listen(port,()=>console.log("Server has started on the port "+ port))