import express from 'express';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

// All routes are protected and require admin role
router.use(protect);
router.use(authorize('admin'));

// User management routes
router.get('/', (req, res) => {
  res.json({ message: 'Get all users - Admin only' });
});

router.get('/:id', (req, res) => {
  res.json({ message: `Get user ${req.params.id} - Admin only` });
});

router.put('/:id', (req, res) => {
  res.json({ message: `Update user ${req.params.id} - Admin only` });
});

router.delete('/:id', (req, res) => {
  res.json({ message: `Delete user ${req.params.id} - Admin only` });
});

export default router;
