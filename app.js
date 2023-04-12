const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

// Storage Multer

const storage = multer.diskStorage({
    destination : (req, file, callback) => {
        callback(null, 'uploads')
    },
    filename : (req, file, callback) => {
        callback(null, file.fieldname + path.extname(file.originalname));
    }
   })
   
const upload = multer({ storage : storage });

// Template Engine
app.set('view engine', 'ejs');
app.set('views', './views');
// Static Files
app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', (req,res) => {
    res.render('index');
})

app.post('/upload', upload.single('uploadImage') , (req, res) => {
    console.log(req.file);
})

app.listen(8080, () => {
    console.log('Processing ongoing......');
})