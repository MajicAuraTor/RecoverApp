import express from 'express';
import { protect } from '../middleware/auth';

const router = express.Router();

// Protected routes
router.use(protect);

// Dashboard stats and data
router.get('/stats', (req, res) => {
  res.json({
    success: true,
    data: {
      totalContent: 47,
      activeUsers: 1284,
      pendingReviews: 8,
      engagementRate: '94%'
    }
  });
});

router.get('/recent-activity', (req, res) => {
  res.json({
    success: true,
    data: [
      { action: 'Updated knee replacement protocol', time: '2 hours ago', type: 'update' },
      { action: 'Published new eye-drop tutorial', time: '4 hours ago', type: 'publish' },
      { action: 'Reviewed user feedback', time: '1 day ago', type: 'review' },
      { action: 'Added exercise video content', time: '2 days ago', type: 'add' },
    ]
  });
});

export default router;
