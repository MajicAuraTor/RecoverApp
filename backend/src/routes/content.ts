import express from 'express';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

// Protected routes
router.use(protect);

// Content management routes
router.get('/', (req, res) => {
  res.json({ message: 'Get all content items' });
});

router.post('/', authorize('admin'), (req, res) => {
  res.json({ message: 'Create new content - Admin only' });
});

router.get('/:id', (req, res) => {
  res.json({ message: `Get content item ${req.params.id}` });
});

router.put('/:id', authorize('admin'), (req, res) => {
  res.json({ message: `Update content item ${req.params.id} - Admin only` });
});

router.delete('/:id', authorize('admin'), (req, res) => {
  res.json({ message: `Delete content item ${req.params.id} - Admin only` });
});

export default router;
