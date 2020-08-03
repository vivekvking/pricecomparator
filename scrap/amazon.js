const rp = require('request-promise');
const cheerio = require('cheerio');

// let search="How to win friends";
let Try = async (search)=>{
    let start= new Date();
    let url = `https://www.amazon.in/s?k=${search.replace(/ /g,'+')}&ref=nb_sb_noss_2`;
    const response = await rp({
        // uri: "https://www.amazon.in/s?k=how+to+win+friends&ref=nb_sb_noss_2",
        uri: url,
        Headers: {
            Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-US,en;q=0.9"
        },
        gzip: true    
    })
    const $ = cheerio.load(response);    
    var data=[];
    const $object= $('.s-asin');
    $object.each(function(index, ele){
        if($(ele).hasClass("AdHolder")){
        }else{
            let data_id = $(ele).attr('data-asin'); 
            let img = $(ele).find('img.s-image').attr('src');
            let title = $(ele).find('span.a-size-medium').text();
            let deliverby = $(ele).find('span.a-text-bold').text();
            // $author = $(ele).find('.a-size-base').eq(1).text();
            let href = `https://www.amazon.in${$(ele).find('a.a-link-normal.s-no-outline').eq(0).attr('href')}`;
            let rating = $(ele).find('span.a-icon-alt').eq(0).text();
            let no_of_rating = $(ele).find('a span.a-size-base[dir]').eq(0).text();
            let price = $(ele).find('span.a-price-whole').eq(0).text().replace(/,/g,"");
            let owner = "amazon";
            if(price){
                data.push({
                    data_id,title,href,img,deliverby,no_of_rating,rating,price,owner
                })
            }
        }
    })
    // console.log(data);
    let end = new Date();
    console.log(`Total time taken is  ${end.getTime()-start.getTime()} ms by amazon`)
    return data;
};

module.exports = Try;
   