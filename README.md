# Upload Single Multer

1. Install a multer npm package.
   ```console
   npm install multer
   ```
2. Load a multer module in to app.js file.
   ```js
   const multer = require('multer');
   ```
3. Go to _index.ejs_ file, create a **form** tag and **input** tag with type **file**.
   ```html
   <form action="" method="POST">
        <input type="file" name="uploadImage">
   </form>
4. This is basic usage for multer module. Add in to form tag like this code `enctype=multipart/form-data`.
   
   ```html
   <form action="/upload" method="POST" enctype="multipart/form-data">
        <input type="file" name="uploadImage">
   </form>
   ```
   :warning: **action** put the path `'/upload'` because the **route** `app.post()` method set same to post.

5. Use **Disk storage** engine full control on storing file to disk, first add the **storage**.
   ```javascript
   const storage = multer.diskStorage({
    destination : (req, file, callback) => {
        callback(null, 'uploads')
    },
    filename : (req, file, callback) => {
        callback(null, file.fieldname + path.extname(file.originalname));
    }
   })
   
   const upload = multer({ storage : storage });
   ```
   :warning: **destination** used to determine within which folder the uploaded images should be stored. **fieldname** used to determine what the file should be named inside the folder.

6. Load a path module, it because used inside the storage.
    ```js
    const path = require('path');
    ```
7. Create a **route** post, `app.post()` and add the path of url `/upload`. Basic usage for multer add `upload.single('uploadImage')` . 
   ```js
   app.post('/upload', upload.single('uploadImage') , (req, res) => {
    console.log(req.file);
   })
   ```
   :warning: For **upload** call by storage. **uploadImage** same with input tag file **name**.
8. Back to *index.ejs*, add a input tag submit.
   ```html
    <form action="/upload" method="POST" enctype="multipart/form-data">
        <input type="file" name="uploadImage">
        <input type="submit">
    </form>
    ```
    #
