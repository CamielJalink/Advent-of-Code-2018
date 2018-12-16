//https://www.npmjs.com/package/read-input
var read = require('read-input');
var fnames = process.argv.slice(2);

read(fnames).then(function (res) {

    var computationsArray = res.data.split("\n"); 
    var result = 0; 
    var tempResultsArray = [0];

    while(true) {
        for( var i = 0; i < computationsArray.length; i++){

            result += parseInt(computationsArray[i]);
            if(tempResultsArray.includes(result)){
                console.log(result);
                return;
            }
            tempResultsArray.push(result); 
        }
    }
})