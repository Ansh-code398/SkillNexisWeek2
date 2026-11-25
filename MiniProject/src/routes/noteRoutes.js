import express from 'express';
import Note from '../models/Note.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();


router.use(protect);


router.get('/', async (req, res) => {
  try {
    const filter = { user: req.user._id };


    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search, 'i');
      filter.$or = [
        { title: searchRegex },
        { content: searchRegex }
      ];
    }


    if (req.query.tag) {
      filter.tags = req.query.tag;
    }

    if (typeof req.query.isPinned !== 'undefined') {
      filter.isPinned = req.query.isPinned === 'true';
    }

    const notes = await Note.find(filter).sort({ isPinned: -1, updatedAt: -1 });

    return res.status(200).json({
      success: true,
      count: notes.length,
      data: notes
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, content, tags, isPinned, color } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Note title is required'
      });
    }

    if (!content || !content.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Note content is required'
      });
    }

    let parsedTags = [];
    if (Array.isArray(tags)) {
      parsedTags = tags.map((t) => t.trim()).filter(Boolean);
    } else if (typeof tags === 'string') {
      parsedTags = tags.split(',').map((t) => t.trim()).filter(Boolean);
    }

    const note = await Note.create({
      title: title.trim(),
      content: content.trim(),
      tags: parsedTags,
      isPinned: Boolean(isPinned),
      color: color || '#ffffff',
      user: req.user._id
    });

    return res.status(201).json({
      success: true,
      message: 'Note created successfully',
      data: note
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        error: error.message
      });
    }
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
});


router.get('/tags', async (req, res) => {
  try {
    const tags = await Note.distinct('tags', { user: req.user._id });
    return res.status(200).json({
      success: true,
      count: tags.length,
      data: tags
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        success: false,
        error: `Note not found with id ${req.params.id}`
      });
    }

    
    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to access this note'
      });
    }

    return res.status(200).json({
      success: true,
      data: note
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: `Invalid note ID: ${req.params.id}`
      });
    }
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
});


router.put('/:id', async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        success: false,
        error: `Note not found with id ${req.params.id}`
      });
    }

    // Check ownership
    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to update this note'
      });
    }

    const updateData = { ...req.body };
    if (typeof updateData.tags === 'string') {
      updateData.tags = updateData.tags.split(',').map((t) => t.trim()).filter(Boolean);
    }

    delete updateData.user;

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      message: 'Note updated successfully',
      data: note
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: `Invalid note ID: ${req.params.id}`
      });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        error: error.message
      });
    }
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        success: false,
        error: `Note not found with id ${req.params.id}`
      });
    }

    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to delete this note'
      });
    }

    await note.deleteOne();

    return res.status(200).json({
      success: true,
      message: 'Note deleted successfully',
      data: {}
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: `Invalid note ID: ${req.params.id}`
      });
    }
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

export default router;
