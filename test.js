var fs = require('fs');

function getMd () {
  let md = '';
  fs.readFile('client.md', 'utf-8', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      return data;
    }
  });
  
}
