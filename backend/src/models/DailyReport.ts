import { executeQuery } from '../config/database';
import { RowDataPacket, OkPacket } from 'mysql2';

export interface DailyReport {
  id: number;
  user_id: number;
  report_date: Date;
  mood_rating: number; // 1-10
  pain_level: number; // 1-10
  activity_level: number; // 1-10
  notes: string;
  created_at: Date;
  updated_at: Date;
}

export class DailyReportModel {
  // Get user's daily reports
  static async findByUserId(userId: number, limit: number = 30): Promise<DailyReport[]> {
    const reports = await executeQuery(
      'SELECT * FROM daily_reports WHERE user_id = ? ORDER BY report_date DESC LIMIT ?',
      [userId, limit]
    ) as RowDataPacket[];

    return reports as DailyReport[];
  }

  // Get report for specific date
  static async findByUserAndDate(userId: number, date: string): Promise<DailyReport | null> {
    const reports = await executeQuery(
      'SELECT * FROM daily_reports WHERE user_id = ? AND report_date = ?',
      [userId, date]
    ) as RowDataPacket[];

    return reports.length > 0 ? reports[0] as DailyReport : null;
  }

  // Get reports within date range
  static async findByDateRange(userId: number, startDate: string, endDate: string): Promise<DailyReport[]> {
    const reports = await executeQuery(
      'SELECT * FROM daily_reports WHERE user_id = ? AND report_date BETWEEN ? AND ? ORDER BY report_date ASC',
      [userId, startDate, endDate]
    ) as RowDataPacket[];

    return reports as DailyReport[];
  }

  // Create or update daily report
  static async createOrUpdate(reportData: Omit<DailyReport, 'id' | 'created_at' | 'updated_at'>): Promise<DailyReport> {
    // Check if report exists for this date
    const existingReport = await this.findByUserAndDate(reportData.user_id, reportData.report_date.toISOString().split('T')[0]);
    
    if (existingReport) {
      // Update existing report
      const result = await this.update(existingReport.id, reportData);
      if (!result) {
        throw new Error('Failed to update daily report');
      }
      return result;
    } else {
      // Create new report
      const result = await executeQuery(
        'INSERT INTO daily_reports (user_id, report_date, mood_rating, pain_level, activity_level, notes) VALUES (?, ?, ?, ?, ?, ?)',
        [reportData.user_id, reportData.report_date, reportData.mood_rating, reportData.pain_level, reportData.activity_level, reportData.notes]
      ) as OkPacket;

      const newReport = await this.findById(result.insertId);
      if (!newReport) {
        throw new Error('Failed to create daily report');
      }
      
      return newReport;
    }
  }

  // Find report by ID
  static async findById(id: number): Promise<DailyReport | null> {
    const reports = await executeQuery(
      'SELECT * FROM daily_reports WHERE id = ?',
      [id]
    ) as RowDataPacket[];

    return reports.length > 0 ? reports[0] as DailyReport : null;
  }

  // Update report
  static async update(id: number, updates: Partial<DailyReport>): Promise<DailyReport | null> {
    const setClause = Object.keys(updates).map(key => `${key} = ?`).join(', ');
    const values = Object.values(updates);
    
    await executeQuery(
      `UPDATE daily_reports SET ${setClause} WHERE id = ?`,
      [...values, id]
    );

    return this.findById(id);
  }

  // Get average ratings for user
  static async getAverageRatings(userId: number, days: number = 30): Promise<{mood: number, pain: number, activity: number}> {
    const result = await executeQuery(
      'SELECT AVG(mood_rating) as avg_mood, AVG(pain_level) as avg_pain, AVG(activity_level) as avg_activity FROM daily_reports WHERE user_id = ? AND report_date >= DATE_SUB(CURDATE(), INTERVAL ? DAY)',
      [userId, days]
    ) as RowDataPacket[];

    const averages = result[0];
    return {
      mood: parseFloat(averages.avg_mood) || 0,
      pain: parseFloat(averages.avg_pain) || 0,
      activity: parseFloat(averages.avg_activity) || 0
    };
  }

  // Delete report
  static async delete(id: number): Promise<boolean> {
    const result = await executeQuery(
      'DELETE FROM daily_reports WHERE id = ?',
      [id]
    ) as OkPacket;

    return result.affectedRows > 0;
  }
}
