const express = require('express')
const path = require('path')
const app = express()
const port = 3000

const csvToJson = require('convert-csv-to-json');
let bookjson = csvToJson.getJsonFromCsv("books.csv");
let magjson = csvToJson.getJsonFromCsv("magazines.csv");
let sample_datajson = csvToJson.getJsonFromCsv("sample_data.csv");
const merged = bookjson.concat(...magjson);
const all_data = sample_datajson.concat(merged);

let isbookno = '5454-5587-3210';

let names = merged.filter(item => item.isbn === isbookno); //search by isbn

 let auth_email = 'null-walter@echocat.org';
 let authorjson = csvToJson.getJsonFromCsv("sample_data.csv");
let auth = []
 //To search by the author's email
for(let i=0; i<merged.length;i++){
  if (merged[i].authors.includes(auth_email))
    auth.push(merged[i]);
  }
//Sorting
function compare( a, b ) {
  if ( a.title < b.title ){
    return -1;
  }
  if ( a.title > b.title ){
    return 1;
  }
  return 0;
}

merged.sort(compare);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
})
app.get('/print_all', (req, res) => {
  res.send(all_data)
})
app.get('/print_sorted', (req, res) => {
    res.send(merged);
})
app.get('/search_by_email', (req, res) => {
  res.send(auth)
})
app.get('/search_by_isbn', (req, res) => {
  res.send(names)
})
app.get('/add_data', (req, res) => {
  res.sendFile(path.join(__dirname, 'add.js'));
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})