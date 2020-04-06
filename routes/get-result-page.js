const express = require('express');
const Jimp = require('jimp');
const request = require("request");
const router = express.Router();
const cheerio = require('cheerio');
const fs = require('fs');
router.get('/', function (req, res) {
    console.log('URL / : \n');
    url = 'http://result.gujaratuniversity.ac.in/';
   
    request(url, function(error, response, html){
      if(!error){
        var data = {}
          var $ = cheerio.load(html);
          var img = $('img.control-label');
          var img_url = $('img.control-label').attr('src')
          console.log(img);
          console.log(url+img_url);
          console.log(response.headers);
          var coursesHTML = $('option');  
          var courseArr = {};
          $('#exam').find('option').each((i,op) => {
                console.log($(op).text(),$(op).val())
                courseArr[$(op).val().toString()] = $(op).text();
            })  
            console.log("TEST : "+courseArr['85'] );
          Jimp.read({
                      url: url+img_url, // Required!
                      headers: {Cookie: response.headers},
                    })
                      .then(image => {
                        // Do stuff with the image.'
                        console.log("susccees : "+image);
                        image.write("path.png");
                        data['course'] = courseArr;
                        data['img'] = image
                        data['header'] =  response.headers;
                        res.send(data);
                     
                      })
                      .catch(err => {
                        console.log(err);
                      });
      }
    })
  });
  router.get('/new', function (req, res) {
    console.log('URL / : \n');
    url = 'http://result.gujaratuniversity.ac.in/';
    res. setHeader("Content-Type", "application/json");
    request(url, function(error, response, html){
      if(!error){
        var data = {}
          var $ = cheerio.load(html);
          var img = $('img.control-label');
          var img_url = $('img.control-label').attr('src')
          console.log(img);
          console.log(url+img_url);
          console.log(response.headers);
          var coursesHTML = $('option');  
          var courseArr = {};
          $('#exam').find('option').each((i,op) => {
                console.log($(op).text(),$(op).val())
                courseArr[$(op).val().toString()] = $(op).text();
            })  
            console.log("TEST : "+courseArr['85'] );
          Jimp.read({
                      url: url+img_url, // Required!
                      headers: {Cookie: response.headers},
                    })
                      .then(image => {
                        // Do stuff with the image.' 
                        image.write("path.jpeg");
                        data['course'] = courseArr;
                        data['header'] = response.header;
                        fs.readFile("./path.jpeg", (err, image1) => {
                          data['img'] = image1;
                          res.send(data);  ;
                          });
                        
                     
                      })
                      .catch(err => {
                        console.log(err);
                      });
      }
    })
  });
module.exports = router;