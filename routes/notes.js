const express = require('express');
const notes = express.Router();
const fs = require('fs');
const { v4: uuidV4 } = require('uuid');
const {readFromFile, readAndAppend, writeToFile} = require('../helpers/fsUtils');


notes.get('/', (req, res) => 
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

notes.post('/', (req, res) => {

    const { title, text } = req.body;

    if (title && text) {

        const newNote = {
            title,
            text,
            tip_id: uuidV4(),
        };

        readAndAppend(newNote, './db/db.json'); 

        const response = {
            status: 'success',
            body: newNote,
          };

        res.json(response);
    } else {
        res.json('Error in posting new note');
    }
});

// DELETE Route for a specific tip
notes.delete('/:note_id', (req, res) => {
    const tipId = req.params.tip_id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        // Make a new array of all tips except the one with the ID provided in the URL
        const result = json.filter((tip) => tip.tip_id !== tipId);
  
        // Save that array to the filesystem
        writeToFile('./db/db.json', result);
  
        // Respond to the DELETE request
        res.json(`Item ${tipId} has been deleted 🗑️`);
      });
  });


module.exports = notes;