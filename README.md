# Upload Single Multer

1. Install a multer npm package.
   ```console
   $ npm install multer
   ```
2. Load a multer module in to app.js file.
   ```js
   const multer = require('multer');
   ```
3. Go to _index.ejs_ file, create a `form` tag and `input` tag with type `file` .
   ```html
   <form action="" method="POST">
        <input type="file" name="uploadImage">
   </form>
4. This is basic usage for multer module. Add in to `form` tag like this code `enctype=multipart/form-data`.
   
   ```html
   <form action="/upload" method="POST" enctype="multipart/form-data">
        <input type="file" name="uploadImage">
   </form>
   ```
   :warning: `action` put the path `'/upload'` because the **route** `app.post()` method set same to post.

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
   :warning: `destination` used to determine within       which folder the uploaded images should be stored. `fieldname` used to determine what the file should be named inside the folder. `originalname` for extension like _png, jpg_.

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
   :warning: For `upload` call by storage. **uploadImage** same with `input` tag file `name`.
8. Back to *index.ejs*, add a input tag submit.
   ```html
    <form action="/upload" method="POST" enctype="multipart/form-data">
        <input type="file" name="uploadImage">
        <input type="submit">
    </form>
    ```
9. Run a app `npm start`. In browser, `localhost:8080`
     
10. Inside the **upload** folder, will be come like this **uploadImage.png** . And `console.log(req.file)` like a below.
    ```console
    {
        fieldname: 'uploadImage',
        originalname: 'arrow.png',
        encoding: '7bit',
        mimetype: 'image/png',
        destination: 'uploads',
        filename: 'uploadImage.png',
        path: 'uploads\\uploadImage.png',
        size: 17038
    }
    ```
#
## Preview Image 

:no_entry: It will use **css** folder and **js** folder (Serving Static File).

:left_speech_bubble: How to put in one folder?

1. Create a new folder called **public**.
2. Set a **public** folder inside to _app.js_.
   
   ```js
   app.use('/static', express.static(path.join(__dirname, 'public')));
   ```
3. Create a new folder for javascript folder and file inside public folder.
4. In a _**index.ejs**_, add `script` tag to called script file.
   
   ```html
   <script src="/static/js/script.js"></script>
    ```
    :warning: `/static` this path to express.

5. Add this code inside script file. This code for display the image after selected.
   ```js
   function showPreview(event) {
    if(event.target.files.length > 0) {
        var src = URL.createObjectURL(event.target.files[0])
        var preview = document.getElementById('preview-image');
        preview.src = src;
        preview.style.display = 'block';
    }
   }
   ```
   :warning: This code use `preventDefault()` Event method. 

6. Go back to _**index.ejs**_, inside `input` tag `file` add this code.
   
   ```html
   <input type="file" name="uploadImage" onchange="showPreview(event);" accept="image/*">
   ```
   :stop_entry: Add `onchange="showPreview(event);"` and `accept="image/*`

7. Add `img` tag for preview display image. Before `form` tag.
   
   ```html
   <img id="preview-image">
   ```
   :exclamation: Images becomes big!
8. Resize image with `css` .
9. Create a new file and folder inside **public** folder.
10. In a _**index.ejs**_, add `link` tag to called _css_ file.
    ```html
    <link rel="stylesheet" href="/static/css/styles.css">
    ```
11. Inside _**styles.css**_ , add this code.
    
    ```css
    #preview-image{
        max-width: 410px;
        max-height: 280px;
    }
    ```
#

## Display Images 
Display images and `req.file` data.

1. In _**app.js**_ , create a variable to all `req.file` like a below.
   ```console
       {
            fieldname: 'uploadImage',
            originalname: 'arrow.png',
            encoding: '7bit',
            mimetype: 'image/png',
            destination: 'uploads',
            filename: 'uploadImage.png',
            path: 'uploads\\uploadImage.png',
            size: 17038
        }
    ```
2. Create a variable under a `app.post()` method.
   ```js
   const fieldname = req.file.fieldname;
   const originalname = req.file.originalname;
   const mimetype = req.file.mimetype;
   const destination = req.file.destination;
   const filename = req.file.filename;
   const path = req.file.path;
   const size = req.file.size;
   ```
3. To display a data, create a new file inside **view** folder, called _view.ejs_.
4. To called view.ejs use `res.render()`.
   ```js
   res.render('view');
   ```
5. Add variable inside a `res.render()`.
   ```js 
   res.render('view', {fieldname, originalname, mimetype, destination, filename, path, size});
   ```
6. To display a data inside ejs template.
7. In a **view.ejs**, copy code in a below.
   
   ```html
       <table>
        <tr>
            <th>Fieldname :</th>
            <td><%= typeof fieldname != `undefined` ? fieldname : '' %></td>
        </tr>
        <tr>
            <th>Originalname :</th>
            <td><%= typeof originalname != `undefined` ? originalname : '' %></td>
        </tr>
        <tr>
            <th>Mimetype :</th>
            <td><%= typeof mimetype != `undefined` ? mimetype : '' %></td>
        </tr>
        <tr>
            <th>Destination :</th>
            <td><%= typeof destination != `undefined` ? destination : '' %></td>
        </tr>
        <tr>
            <th>Filename :</th>
            <td><%= typeof filename != `undefined` ? filename : '' %></td>
        </tr>
        <tr>
            <th>Path :</th>
            <td><%= typeof path != `undefined` ? path : '' %></td>
        </tr>
        <tr>
            <th>Size :</th>
            <td><%= typeof size != `undefined` ? size : '' %></td>
        </tr>
    </table>
    ```
    :warning: `table` tag, why use `typeof variable != 'undefined'` because if don't put it will error **var undefined**.

8. Done display a data.
9. Let's display the images.
10. Create a variable inside `app.post()` method.
    ```js
    const images = req.file.path;
    ```
11. Call inside `res.render()`.
    ```js
    res.render('view', {images,fieldname, originalname, mimetype, destination, filename, path, size});
    ```
12. In a _view.ejs_, add `img` tag.
    ```html
    <img id="preview-image" src="<%= typeof images != `undefined` ? images : '' %>">
    ```
13. This it is **important** to display a images. Put in a **app.js** in middleware.
    
    ```js
    app.use('/uploads', express.static('uploads'));
    ```

14. Add same css file.
    ```html
     <link rel="stylesheet" href="/static/css/styles.css">
     ```



