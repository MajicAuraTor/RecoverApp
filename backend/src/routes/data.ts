import express from 'express';
import { executeQuery } from '../config/database';
import { protect, AuthRequest } from '../middleware/auth';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

const router = express.Router();

// 📊 DATA ROUTES FOR YOUR URL-BASED NAVIGATION
// These routes correspond to your frontend URLs and fetch data from MySQL

// GET /api/data/dashboard - for /dashboard URL
router.get('/dashboard', protect, async (req: AuthRequest, res) => {
  try {
    // Example: Fetch dashboard statistics from your MySQL schema
    const dashboardStats = await executeQuery(`
      SELECT 
        COUNT(*) as total_users,
        COUNT(CASE WHEN created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY) THEN 1 END) as new_users_week,
        COUNT(CASE WHEN last_login >= DATE_SUB(NOW(), INTERVAL 1 DAY) THEN 1 END) as active_users_today
      FROM users
    `) as RowDataPacket[];
    
    const recentActivity = await executeQuery(`
      SELECT activity_type, description, created_at 
      FROM user_activities 
      ORDER BY created_at DESC 
      LIMIT 10
    `) as RowDataPacket[];

    res.json({
      success: true,
      data: {
        stats: dashboardStats[0],
        recentActivity
      }
    });
  } catch (error) {
    console.error('Dashboard data error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch dashboard data' });
  }
});

// GET /api/data/content - for /content URL  
router.get('/content', protect, async (req: AuthRequest, res) => {
  try {
    // Example: Fetch content management data
    const contentItems = await executeQuery(`
      SELECT id, title, content_type, status, created_at, updated_at
      FROM content_items 
      ORDER BY updated_at DESC
    `) as RowDataPacket[];
    
    const contentStats = await executeQuery(`
      SELECT 
        content_type,
        COUNT(*) as count,
        COUNT(CASE WHEN status = 'published' THEN 1 END) as published_count
      FROM content_items 
      GROUP BY content_type
    `) as RowDataPacket[];

    res.json({
      success: true,
      data: {
        items: contentItems,
        stats: contentStats
      }
    });
  } catch (error) {
    console.error('Content data error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch content data' });
  }
});

// GET /api/data/reminders - for /reminders URL
router.get('/reminders', protect, async (req: AuthRequest, res) => {
  try {
    const userId = req.user?.id;
    
    // Fetch user's reminders from MySQL
    const reminders = await executeQuery(`
      SELECT id, title, description, reminder_time, frequency, is_active, created_at
      FROM user_reminders 
      WHERE user_id = ? 
      ORDER BY reminder_time ASC
    `, [userId]) as RowDataPacket[];
    
    const upcomingReminders = await executeQuery(`
      SELECT COUNT(*) as count
      FROM user_reminders 
      WHERE user_id = ? AND reminder_time > NOW() AND is_active = 1
    `, [userId]) as RowDataPacket[];

    res.json({
      success: true,
      data: {
        reminders,
        upcoming: upcomingReminders[0].count
      }
    });
  } catch (error) {
    console.error('Reminders data error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch reminders data' });
  }
});

// GET /api/data/progress - for /progress URL
router.get('/progress', protect, async (req: AuthRequest, res) => {
  try {
    const userId = req.user?.id;
    
    // Fetch user's progress/milestones
    const milestones = await executeQuery(`
      SELECT id, title, description, target_date, completion_date, status, progress_percentage
      FROM user_milestones 
      WHERE user_id = ? 
      ORDER BY target_date ASC
    `, [userId]) as RowDataPacket[];
    
    const progressStats = await executeQuery(`
      SELECT 
        COUNT(*) as total_milestones,
        COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_milestones,
        AVG(progress_percentage) as average_progress
      FROM user_milestones 
      WHERE user_id = ?
    `, [userId]) as RowDataPacket[];

    res.json({
      success: true,
      data: {
        milestones,
        stats: progressStats[0]
      }
    });
  } catch (error) {
    console.error('Progress data error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch progress data' });
  }
});

// GET /api/data/reports - for /reports URL
router.get('/reports', protect, async (req: AuthRequest, res) => {
  try {
    const userId = req.user?.id;
    
    // Fetch daily summary/reports data
    const dailyReports = await executeQuery(`
      SELECT report_date, mood_rating, pain_level, activity_level, notes, created_at
      FROM daily_reports 
      WHERE user_id = ? 
      ORDER BY report_date DESC 
      LIMIT 30
    `, [userId]) as RowDataPacket[];
    
    const reportTrends = await executeQuery(`
      SELECT 
        AVG(mood_rating) as avg_mood,
        AVG(pain_level) as avg_pain,
        AVG(activity_level) as avg_activity,
        COUNT(*) as total_reports
      FROM daily_reports 
      WHERE user_id = ? AND report_date >= DATE_SUB(NOW(), INTERVAL 30 DAY)
    `, [userId]) as RowDataPacket[];

    res.json({
      success: true,
      data: {
        reports: dailyReports,
        trends: reportTrends[0]
      }
    });
  } catch (error) {
    console.error('Reports data error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch reports data' });
  }
});

// POST routes for creating/updating data
router.post('/reminders', protect, async (req: AuthRequest, res) => {
  try {
    const userId = req.user?.id;
    const { title, description, reminder_time, frequency } = req.body;
    
    const result = await executeQuery(`
      INSERT INTO user_reminders (user_id, title, description, reminder_time, frequency, is_active)
      VALUES (?, ?, ?, ?, ?, 1)
    `, [userId, title, description, reminder_time, frequency]) as ResultSetHeader;

    res.json({
      success: true,
      message: 'Reminder created successfully',
      data: { id: result.insertId }
    });
  } catch (error) {
    console.error('Create reminder error:', error);
    res.status(500).json({ success: false, message: 'Failed to create reminder' });
  }
});

export default router;
