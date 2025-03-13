const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const Notes = require("../models/Note");

//ROUTE 1:Get All the notes using GET"/api/auth/getuser".Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});
//ROUTE 2:post All the notes using GET"/api/auth/addnote".Login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title name").isLength({ min: 3 }),
    body("description", "Description must be 5 character").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //error handling
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//ROUTE 3:post update an existing note PUT"/api/auth/updatenote".Login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  //create newNote object
  try {
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }
    //find note to be updated
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(403).send("Not Allowed");
    }
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});
//ROUTE 4:Delete a note DELTET"/api/notes/delete note".Login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // Find note to be deleted
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    // Allow deletion only if the user owns this note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ error: "Unauthorized: Not allowed to delete this note" });
    }

    // Delete the note
    await Notes.findByIdAndDelete(req.params.id);

    res.json({ success: "Note has been deleted", note });
  } catch (error) {
    console.error("Error deleting note:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
