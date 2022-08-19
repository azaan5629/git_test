const fs= require('fs');

const request=require('request');

const jsdom=require('jsdom');

const JSDOM=jsdom.JSDOM;

let url="https://www.espncricinfo.com/series/indian-premier-league-2022-1298423/kolkata-knight-riders-vs-lucknow-super-giants-66th-match-1304112/full-scorecard";

request(url,cb);



//Async Function



//1. Request to given URL.

//2. Response -> request function -> callback function -> data




// error- If there is any wrror while executing the request

//response - header+body

//body- html

 function cb (error, response, body) {

//   console.error('error:', error); // Print the error if one occurred

//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

//   console.log('body:', body); // Print the HTML for the Google homepage.

if(error)

{

    console.log("Error: ", error.message); //Prints error message

}

else if(response && response.statusCode==404)

{

    console.log("Page Not Found");

}

else

{

    console.log(response.statusCode);

    //console.log(body); //Prints Response body

    //fs.writeFileSync("index.html",body);

    extractData(body);

}

}




// We need to provide html content to string DOM to JSDOM





function extractData(body)

{

    const JSDOM=jsdom.JSDOM;



// We need to provide html content to string DOM to JSDOM

let dom=new JSDOM(body);



let document=dom.window.document; // Window object represents the browser.

// document is an interface to connect to HTML and perform operations. It is a sub part of Window.

console.log("Reached for Parsing");
//let output=document.querySelectorAll(".ds-text-tight-m.ds-font-regular.ds-truncate.ds-text-typo-title")
let allTables=document.querySelectorAll("table.ds-w-full.ds-table.ds-table-xs.ds-table-fixed");
let firstBowling=allTables[1];
let secondBowling=allTables[3];
let bowlingString="<table>"+firstBowling.innerHTML+"</table>"+"<table>"+secondBowling.innerHTML+"</table>";
//console.log(bowlingString);
fs.writeFileSync("bowlingTable.html",bowlingString);
getDataFromBowlingTable(bowlingString)


 //for Result of Match
// let result_ele=output[0];
// let result=result_ele.textContent;
// console.log("Result "+result);

}


function getDataFromBowlingTable(bowlingString)
{
    
    const JSDOM=jsdom.JSDOM;



// We need to provide html content to string DOM to JSDOM

let dom=new JSDOM(bowlingString);



let document=dom.window.document;
let allRows=document.querySelectorAll("tbody tr.ds-text-tight-s");
//console.log(allRows)
let allcol=0;
//Printing all bowlers and their wickets
for(let i=0;i<allRows.length;i++)
{
    //You can also apply jquery to HTML Elements
    let allcol=allRows[i].querySelectorAll("td");
    let name=allcol[0].textContent;
    let wickets=allcol[4].textContent;
    if(wickets>max)
    {
        max=wickets;
        maxname=name;
    }
    //console.log("Name : ", name, " Wickets: ",wickets);
}
console.log(maxname+" "+max);

//Printing highest wicket taker 
for(let i=0;i<allRows.length;i++)
{
    //You can also apply jquery to HTML Elements
    let allcol=allRows[i].querySelectorAll("td");
    let name=allcol[0].textContent;
    let wickets=allcol[4].textContent;
    if(wickets>max)
    {
        max=wickets;
        maxname=name;
    }
    //console.log("Name : ", name, " Wickets: ",wickets);
}
}
