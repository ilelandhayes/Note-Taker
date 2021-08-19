const express = require('express');
const notes = express.Router();
const fs = require('fs');
const {readFromFile, readAndAppend} = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');

notes.get('/', (req, res) => 
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

notes.post('/', (req, res) => {

    const { title, text } = req.body;

    if (title && text) {

        const newNote = {
            title,
            text,
            tip_id: uuidv4(),
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


module.exports = notes;