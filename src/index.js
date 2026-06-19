import express from 'express';
import path from 'path';
const PORT = 3000;
import {authenticate}  from './middleware/authenticate.js';



const app = express();
// app.use(cookieParser());
app.use(express.json());

// Serve static files (like index.html) from the current directory
// app.use(express.static(__dirname));
app.use(express.static("public"));


// Route for the home page
app.get('/', (req, res) => {

  res.sendFile("home.html", {
    root: "./public"
  });

});

app.get("/protected", (req, res) => {

  res.sendFile("protected.html", {
    root: "./public"
  });
}

);
app.get("/api/protected", authenticate, (req, res) => {

  res.json({
    message: "Success"
  });
}

);

// Route for the callback page to catch the OIDC response
app.get('/callback', (req, res) => {

  res.sendFile("callback.html", {
    root: "./public"
  });

});

app.get('/home', (req, res) => {

  res.sendFile("home.html", {
    root: "./public"
  });

});



app.listen(PORT, () => {
  console.log(`🚀 Test server running at http://localhost:${PORT}`);
});


