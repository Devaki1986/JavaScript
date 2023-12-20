
const process = require('process');
let data = process.cwd()+"/heartrate.json"
let result_set=process.cwd()+"/Result.json"
let fs = require(data);
var length = fs.length -1 ;
var max =0;
var min =0
var median =0
var i=0
var j=0
console.log("cuurent wd" +process.cwd());
console.log(fs[i+1].timestamps.startTime.substring(0,10));
var result ={}
var result_array=[]
var count=[]

while(  i < length)
{
    if(fs[i].timestamps.startTime.substring(0,10) == fs[i+1].timestamps.startTime.substring(0,10))
    {
            if(fs[i].beatsPerMinute >max)
            {
                max=fs[i].beatsPerMinute
            }
            else if(fs[i].beatsPerMinute <min)
                {
                min = fs[i].beatsPerMinute
                }
                i++;
                count[j]=fs[i].beatsPerMinute;
                count = count.sort(function(a, b){return a - b})
                j++;
    }else
            {
                    if(j %2 ==0)
                        median= (count[j/2]+count[(j/2)+1])/2
                    else
                    median = count[(j+1)/2]
                  
                    result_array.push(
                        {
                            "Date": fs[i].timestamps.startTime.substring(0,10),
                            "min" : min,
                            "max": max,
                            "median":median,
                            "TimeStamp": fs[i].timestamps.startTime
                        }
                    )
                    i++;
                    j=0;


             }

             
}
    
result.result_array = result_array;
console.log(result_array);
fs = require('fs')
let json = JSON.stringify(result_array);
fs.writeFile('Result.json',json,'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }
    console.log("JSON file has been saved.");
});


