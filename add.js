var dataToWrite;
var fs = require('fs');
dataToWrite = "title:Avengers";

fs.writeFile('myOutputFile.csv', dataToWrite, 'utf8', function (err) {
  if (err) {
    console.log('Some error occured - file either not saved or corrupted file saved.');
  } else{
    console.log('It\'s saved!');
  }
});