const express = require('express');
const app = express();
const ejs = require('ejs')
const amaz = require('./scrap/amazon')
const flip = require('./scrap/flipkart'); 
const bodyParser = require('body-parser');
const chalk = require('chalk');
const requestIp= require('request-ip');

// app.use(requestIp.mw());
// app.use((req,res)=>{
//     const ip = req.clientIp;
//     res.end(ip);
// })
let clientIp
const ipMiddleware = function(req, res, next) {
    clientIp = requestIp.getClientIp(req); 
    next();
};

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

app.get('/',ipMiddleware,(req,res)=>{
    res.render('home');
})

app.post('/',(req,res)=>{
    let string = req.body.book_name;
    res.redirect(`/search/${string}`)
})

app.get('/search/:book_name',ipMiddleware,(req,res)=>{
    let string = req.params.book_name;
    let start = new Date();
    var Data = [];
    let amazdata = amaz(string);
    amazdata.then(data=>{
        data.forEach(d=>Data.push(d));
    }).catch(err=>{
        console.log(chalk.bgRedBright("Error occured in amazon data "+ err))
    })
    let flipdata = flip(string);
    flipdata.then(data=>{
        data.forEach(d=> Data.push(d));
    }).catch(err=>{
        console.log(chalk.bgRedBright("Error occured in flipkart data " + err))
    })
    Promise.all([amazdata,flipdata]).then(()=>{
        let newdata= sort(Data);
        let end = new Date();
        console.log(`Total time taken is ${end.getTime()-start.getTime()} ms`);
        console.log(clientIp);//IP address of the client
        res.render('index',{data: newdata});
    }).catch(err=>{
        let end = new Date();
        console.log(chalk.yellow(`Total time taken is ${end.getTime()-start.getTime()} ms`));
        console.log(chalk.bgRedBright("Error in Promise.all "+err))
        res.render('index',{data: Data});
    })
    
})

app.post('/search',(req,res)=>{
    let string = req.body.book_name;
    res.redirect(`/search/${string}`)
})

app.listen(port,()=>console.log("Server has started on the port "+ port))