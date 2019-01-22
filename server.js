const path = require('path');
const fs = require('fs');
const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express();
var mime = require('mime');
var dir = process.cwd()
const _ = require('lodash')
const router = express.Router();

const DIR = './uploads';
const FILE_DES_DIR ="/Users/saiyavong/Developments/uploads"
const ROOT_URL = 'localhost:3000'
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIR);
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now()  + path.extname(file.originalname));
    }
});
let upload = multer({storage: storage});

//browe file
app.use(express.static(dir)); //current working directory
app.use(express.static(__dirname)); //module directory


//log all request
app.use(morgan('dev'))

//make body as file format
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
 
//set permission on calling api
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
 
// all routing 
app.get('/', (req,res)=>{
    res.send('Hello world, this is test file upload')
})

app.get('/dir',(req,res)=>{
  res.send(FILE_DES_DIR)
})

app.get('/api', function (req, res) {
  res.end('file catcher example');
});
 
app.post('/api/upload',upload.single('docs'), function (req, res) {
    if (!req.file) {
        console.log("No file received");
        return res.send({
          success: false
        });
    
      } else {
        console.log('file received');
        
        return res.json({
          success: true,
          path: req.file.path,
          filename: ROOT_URL + '/uploads/' + req.file.filename
        })
      }
});

app.get('/uploads', function(req, res){
  /* if(!req.params.filename){
    res.json({
      success: false,
      message: 'not file selected'
    })
  }else{
    var file = __dirname + '/uploads/' + req.params.filename;
    res.sendFile(file)
  } */


  res.sendFile('/Users/saiyavong/Developments/uploads/docs-1547012568062.pdf')
});
 


app.get('/files', function(req, res) {
  var currentDir =  dir;
  var query = req.query.path || '';
  if (query) currentDir = path.join(dir, query);
  console.log("browsing ", currentDir);
  fs.readdir(currentDir, function (err, files) {
      if (err) {
         throw err;
       }
       var data = [];
       files
       .forEach(function (file) {
         try {
                 //console.log("processingile);
                 var isDirectory = fs.statSync(path.join(currentDir,file)).isDirectory();
                 if (isDirectory) {
                   data.push({ Name : file, IsDirectory: true, Path : path.join(query, file)  });
                 } else {
                   var ext = path.extname(file);
                   
                 /*   if(program.exclude && _.contains(program.exclude, ext)) {
                    console.log("excluding file ", file);
                    return;
                  }  */  
                   data.push({ Name : file, Ext : ext, IsDirectory: false, Path : path.join(query, file) });
                 }
 
         } catch(e) {
           console.log(e); 
         }        
         
       });
       data = _.sortBy(data, function(f) { return f.Name });
       res.json(data);
   });
 });
const PORT = process.env.PORT || 3000;
 
app.listen(PORT, function () {
  console.log('Node.js server is running on port ' + PORT);
});