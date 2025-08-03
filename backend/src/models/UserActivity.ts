import { executeQuery } from '../config/database';
import { RowDataPacket, OkPacket } from 'mysql2';

export interface UserActivity {
  id: number;
  user_id: number;
  activity_type: 'login' | 'milestone_completed' | 'reminder_set' | 'report_submitted';
  description: string;
  created_at: Date;
}

export class UserActivityModel {
  // Get user's recent activities
  static async findByUserId(userId: number, limit: number = 50): Promise<UserActivity[]> {
    const activities = await executeQuery(
      'SELECT * FROM user_activities WHERE user_id = ? ORDER BY created_at DESC LIMIT ?',
      [userId, limit]
    ) as RowDataPacket[];

    return activities as UserActivity[];
  }

  // Get activities by type
  static async findByType(userId: number, activityType: string, limit: number = 20): Promise<UserActivity[]> {
    const activities = await executeQuery(
      'SELECT * FROM user_activities WHERE user_id = ? AND activity_type = ? ORDER BY created_at DESC LIMIT ?',
      [userId, activityType, limit]
    ) as RowDataPacket[];

    return activities as UserActivity[];
  }

  // Log new activity
  static async logActivity(userId: number, activityType: string, description: string): Promise<UserActivity> {
    const result = await executeQuery(
      'INSERT INTO user_activities (user_id, activity_type, description) VALUES (?, ?, ?)',
      [userId, activityType, description]
    ) as OkPacket;

    const newActivity = await this.findById(result.insertId);
    if (!newActivity) {
      throw new Error('Failed to log activity');
    }
    
    return newActivity;
  }

  // Find activity by ID
  static async findById(id: number): Promise<UserActivity | null> {
    const activities = await executeQuery(
      'SELECT * FROM user_activities WHERE id = ?',
      [id]
    ) as RowDataPacket[];

    return activities.length > 0 ? activities[0] as UserActivity : null;
  }

  // Get activity summary for dashboard
  static async getActivitySummary(userId: number, days: number = 7): Promise<{
    total: number;
    byType: Record<string, number>;
    recent: UserActivity[];
  }> {
    // Get total count
    const totalResult = await executeQuery(
      'SELECT COUNT(*) as total FROM user_activities WHERE user_id = ? AND created_at >= DATE_SUB(NOW(), INTERVAL ? DAY)',
      [userId, days]
    ) as RowDataPacket[];

    // Get count by type
    const typeResult = await executeQuery(
      'SELECT activity_type, COUNT(*) as count FROM user_activities WHERE user_id = ? AND created_at >= DATE_SUB(NOW(), INTERVAL ? DAY) GROUP BY activity_type',
      [userId, days]
    ) as RowDataPacket[];

    // Get recent activities
    const recentActivities = await this.findByUserId(userId, 10);

    const byType: Record<string, number> = {};
    typeResult.forEach((row: any) => {
      byType[row.activity_type] = row.count;
    });

    return {
      total: totalResult[0].total,
      byType,
      recent: recentActivities
    };
  }

  // Clean old activities (keep only last 90 days)
  static async cleanOldActivities(days: number = 90): Promise<number> {
    const result = await executeQuery(
      'DELETE FROM user_activities WHERE created_at < DATE_SUB(NOW(), INTERVAL ? DAY)',
      [days]
    ) as OkPacket;

    return result.affectedRows;
  }
}
