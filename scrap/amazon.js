const puppeteer = require('puppeteer');


let Try = async (search)=>{
    let start = new Date();
    var data= [];
    let url = `https://www.amazon.in/s?k=${search.replace(/ /g,'+')}&ref=nb_sb_noss_2`;
    let browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox"]
    });
    let page = await browser.newPage();
    // await page.setViewport({
        // width: 1920,
        // height: 1080
    // })
    await page.goto(url);
    data = await page.evaluate(()=> {
        let data=[];
        let items = document.querySelectorAll('.s-asin');
        items.forEach(item=>{
            if(item.classList.contains('AdHolder')){

            }else{
                let data_id,href,img,title='',deliverby='',price='',rating='',no_of_rating='',language='',owner='amazon';
                data_id = item.getAttribute('data-asin');
                href = `https://www.amazon.in${item.querySelector('a.a-link-normal.s-no-outline').getAttribute('href')}`;
                img = item.querySelector('img.s-image').getAttribute('src');
                if(item.querySelector('span.a-size-medium')){
                    title = item.querySelector('span.a-size-medium').textContent;
                }else if(item.querySelector('span.a-size-base-plus')){
                    title = item.querySelector('span.a-size-base-plus').textContent;   
                }

                if(item.querySelector('span.a-text-bold')){
                    deliverby = item.querySelector('span.a-text-bold').textContent;
                }     
                
                if(item.querySelector('span.a-price-whole')){
                    price = item.querySelector('span.a-price-whole').textContent.replace(/,/g,"");
                }
                if(item.querySelector('span.a-icon-alt')){
                    rating = item.querySelector('span.a-icon-alt').textContent;
                }
                if(item.querySelector('a span.a-size-base[dir]')){
                    no_of_rating = item.querySelector('a span.a-size-base[dir]').textContent;
                }
                // if(item.querySelector('div._1rcHFq')){
                //     language = item.querySelector('div._1rcHFq').textContent;
                // }
                if(price){
                    data.push({
                        data_id,title,href,img,deliverby,no_of_rating,rating,price,owner                
                    })
                }
            }
        })
        return data;
    });
    await browser.close();
    let end = new Date();
    console.log(`Total time taken is ${end.getTime()-start.getTime()} ms by amazon`)
    // console.log(data)
    return data;
};

module.exports = Try;