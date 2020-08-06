const puppeteer = require('puppeteer');


let Try = async (string)=>{
    let start = new Date();
    var data= [];
    let url = `https://www.flipkart.com/search?q=${string.replace(/ /g,'%20')}&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off`;
    let browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox"]
    });
    let page = await browser.newPage();
    await page.setViewport({
        width: 1920,
        height: 1080
    })
    await page.goto(url,{waitUntil: "networkidle0"});
    data = await page.evaluate(()=> {
        let columns = document.querySelectorAll('._3O0U0u');
        let data=[];
        let loop = 0;
        columns.forEach(column=>{
            let items = column.querySelectorAll('._3O0U0u > div');
            items.forEach(item=>{
                if(loop<12){
                    let data_id='',href='',img='',title='',full_title='',price='',rating='',no_of_rating='',language='',owner='flipkart';
                    data_id = item.getAttribute('data-id');
                    if(item.querySelector('a.Zhf2z-')){
                        href = `https://www.flipkart.com${item.querySelector('a.Zhf2z-').getAttribute('href')}`;
                    }else if(item.querySelector('a._3dqZjq')){
                        href = `https://www.flipkart.com${item.querySelector('a._3dqZjq').getAttribute('href')}`;
                    }
                    if(item.querySelector('img._1Nyybr')){
                        img = item.querySelector('img._1Nyybr').getAttribute('src');
                    }else if(item.querySelector('img._3togXc')){
                        img = item.querySelector('img._3togXc').getAttribute('src');
                    }
                    if(item.querySelector('a._2cLu-l')){
                        title = item.querySelector('a._2cLu-l').textContent;
                    }else if(item.querySelector('div._2B_pmu')){
                        title = `${item.querySelector('div._2B_pmu').textContent}`;
                    }else if(item.querySelector('div._3wU53n')){
                        title = `${item.querySelector('div._3wU53n').textContent}`;
                    }                    
                    if(item.querySelector('a._2cLu-l')){
                        full_title = item.querySelector('a._2cLu-l').getAttribute('title');
                    }
                    if(item.querySelector('div._1vC4OE')){
                        price = item.querySelector('div._1vC4OE').textContent.replace(/₹/g,"").replace(/,/g,"");
                    }
                    if(item.querySelector('div.hGSR34')){
                        rating = item.querySelector('div.hGSR34').textContent;
                    }
                    if(item.querySelector('span._38sUEc')){
                        no_of_rating = item.querySelector('span._38sUEc').textContent;
                    }
                    if(item.querySelector('div._1rcHFq')){
                        language = item.querySelector('div._1rcHFq').textContent;
                    }
                    if(price){
                        data.push({
                            data_id,full_title,title,href,img,language,no_of_rating,rating,price,owner                
                        })
                    }
                }
                loop= loop+1;
            })
        })
        return data;
    });
    await browser.close();
    let end = new Date();
    console.log(`Total time taken is ${end.getTime()-start.getTime()} ms by flipkart`)
    return data;
};

module.exports = Try;