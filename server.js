const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');

// port with heroku 
const PORT =  process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));

//Get routes
app.get('/', (req,res) => 
res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/api/notes', (req, res) => {
    let notes = JSON.parse(fs.readFileSync('./db/db.json'))
    res.json(notes);
});

// should read notes and return save notes 
app.get("/api/notes", (req,res) =>{
    fs.readFile("db/db,json", "utf8", (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json(JSON.parse(data));
    });
});

app.post("/api/notes", (req,res) => {
    const newNote = createNewNote(req.body, allNotes);
    res.json(newNote);
});

app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.listen(PORT, () =>
console.log(`app listening at http://localhost:$(PORT)`)
);

