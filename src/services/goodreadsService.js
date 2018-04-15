const axios = require('axios');
const xml2js = require('xml2js');

const parser = xml2js.Parser({ explicitArray: false });

module.exports = (function goodreadsService() {
  function getBookById(id) {
    return new Promise((resolve, reject) => {
      console.log('id:', id);
      axios.get(`https://www.goodreads.com/book/show/${id}.xml?key=0q6vAA6mkNRtxzpGF8O5aQ`)
        .then((response) => {
          parser.parseString(response.data, (err, result) => {
            if (err) {
              console.log('googdreads error:', err);
            } else {
              console.log('googdreads result:', result);
              resolve(result.GoodreadsResponse.book);
            }
          });
        })
        .catch((error) => {
          reject(error);
          console.log(error);
        });
    });
  }

  return { getBookById };
}())
