const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const { v4: uuidv4 } = require('uuid');
//a method for getting ids 
const Notes = require('./db/db.json');
const PORT = process.env.PORT || 3001;
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//Get routes to home page 
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

//read note file 
app.get('/api/notes', (req, res) => {
  let notes = JSON.parse(fs.readFileSync('./db/db.json'))
  res.json(notes);
});

//should create new notes 
app.post("/api/notes", (req,res) => {
  const newNotes = createnewNotes(req.body, Notes);
  res.json(newNotes);
});
// notes should return to the note.html file
app.get('/feedback', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// POST request to add a review
app.post('/api/reviews', (req,res) => {
  const {title, text} = req.body;
  //if all the required properties are present
  if (title && text) {
    const Notes = {
      title,
      text,
      id: uuidv4(),
    };
    readAndAppend(Notes, "./db/db.json");

    const respones = {
      status: 'success',
      body: Notes,
    };
    res.json(respones);
  }else{
    res.json("Error in posting review");
  }
});

//LISTEN to port
app.listen(PORT, () =>
    console.log(`APP Listening at http://localhost:${PORT}`)
);