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
app.use('/static' , express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));

app.get('/', (req,res) => {
    res.render('index');
})

app.post('/upload', upload.single('uploadImage') , (req, res) => {
    const images = req.file.path; // Images
    const fieldname = req.file.fieldname;
    const originalname = req.file.originalname;
    const mimetype = req.file.mimetype;
    const destination = req.file.destination;
    const filename = req.file.filename;
    const path = req.file.path;
    const size = req.file.size;

    res.render('view', {images, fieldname, originalname, mimetype, destination, filename, path, size});
    console.log(req.file);
})

app.listen(8080, () => {
    console.log('Processing ongoing......');
})