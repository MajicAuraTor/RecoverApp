import express from 'express';
import { protect, authorize } from '../middleware/auth';
import { pool as db } from '../config/database';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

const router = express.Router();

// Protected routes
router.use(protect);

// Content management routes

// GET /api/v1/content - Get all content items
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute<RowDataPacket[]>(
      'SELECT * FROM content_items ORDER BY created_at DESC'
    );
    
    res.json({
      success: true,
      data: rows,
      count: rows.length
    });
    return;
  } catch (error) {
    console.error('Error fetching content:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch content items'
    });
    return;
  }
});

// POST /api/v1/content - Create new content (Admin only)
router.post('/', authorize('admin'), async (req, res) => {
  try {
    const { title, content_type, content, status = 'draft' } = req.body;
    
    // Validation
    if (!title || !content_type) {
      return res.status(400).json({
        success: false,
        message: 'Title and content type are required'
      });
    }

    const [result] = await db.execute<ResultSetHeader>(
      `INSERT INTO content_items (title, content_type, content, status, author_id, created_at, updated_at) 
       VALUES (?, ?, ?, ?, 1, NOW(), NOW())`,
      [title, content_type, content || '', status]
    );

    res.status(201).json({
      success: true,
      message: 'Content created successfully',
      data: {
        id: result.insertId,
        title,
        content_type,
        content,
        status
      }
    });
    return;
  } catch (error) {
    console.error('Error creating content:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create content item'
    });
    return;
  }
});

// GET /api/v1/content/:id - Get specific content item
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.execute<RowDataPacket[]>(
      'SELECT * FROM content_items WHERE id = ?',
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Content item not found'
      });
    }

    res.json({
      success: true,
      data: rows[0]
    });
    return;
  } catch (error) {
    console.error('Error fetching content:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch content item'
    });
    return;
  }
});

// PUT /api/v1/content/:id - Update content item (Admin only)
router.put('/:id', authorize('admin'), async (req, res) => {
  try {
    const { title, content_type, content, status } = req.body;
    const contentId = req.params.id;

    // Check if content exists
    const [existing] = await db.execute<RowDataPacket[]>(
      'SELECT id FROM content_items WHERE id = ?',
      [contentId]
    );

    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Content item not found'
      });
    }

    // Update content
    await db.execute(
      `UPDATE content_items 
       SET title = ?, content_type = ?, content = ?, status = ?, updated_at = NOW()
       WHERE id = ?`,
      [title, content_type, content, status, contentId]
    );

    res.json({
      success: true,
      message: 'Content updated successfully',
      data: {
        id: contentId,
        title,
        content_type,
        content,
        status
      }
    });
    return;
  } catch (error) {
    console.error('Error updating content:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update content item'
    });
    return;
  }
});

// DELETE /api/v1/content/:id - Delete content item (Admin only)
router.delete('/:id', authorize('admin'), async (req, res) => {
  try {
    const [result] = await db.execute<ResultSetHeader>(
      'DELETE FROM content_items WHERE id = ?',
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Content item not found'
      });
    }

    res.json({
      success: true,
      message: 'Content deleted successfully'
    });
    return;
  } catch (error) {
    console.error('Error deleting content:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete content item'
    });
    return;
  }
});

export default router;
