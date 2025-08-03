import { executeQuery } from '../config/database';
import { RowDataPacket, OkPacket } from 'mysql2';

export interface UserMilestone {
  id: number;
  user_id: number;
  title: string;
  description: string;
  target_date: Date;
  completion_date: Date | null;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  progress_percentage: number;
  created_at: Date;
  updated_at: Date;
}

export class UserMilestoneModel {
  // Get user's milestones
  static async findByUserId(userId: number): Promise<UserMilestone[]> {
    const milestones = await executeQuery(
      'SELECT * FROM user_milestones WHERE user_id = ? ORDER BY target_date ASC',
      [userId]
    ) as RowDataPacket[];

    return milestones as UserMilestone[];
  }

  // Get active milestones
  static async findActive(userId: number): Promise<UserMilestone[]> {
    const milestones = await executeQuery(
      'SELECT * FROM user_milestones WHERE user_id = ? AND status IN ("pending", "in_progress") ORDER BY target_date ASC',
      [userId]
    ) as RowDataPacket[];

    return milestones as UserMilestone[];
  }

  // Get completed milestones
  static async findCompleted(userId: number): Promise<UserMilestone[]> {
    const milestones = await executeQuery(
      'SELECT * FROM user_milestones WHERE user_id = ? AND status = "completed" ORDER BY completion_date DESC',
      [userId]
    ) as RowDataPacket[];

    return milestones as UserMilestone[];
  }

  // Create new milestone
  static async create(milestoneData: Omit<UserMilestone, 'id' | 'created_at' | 'updated_at'>): Promise<UserMilestone> {
    const result = await executeQuery(
      'INSERT INTO user_milestones (user_id, title, description, target_date, completion_date, status, progress_percentage) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [milestoneData.user_id, milestoneData.title, milestoneData.description, milestoneData.target_date, milestoneData.completion_date, milestoneData.status, milestoneData.progress_percentage]
    ) as OkPacket;

    const newMilestone = await this.findById(result.insertId);
    if (!newMilestone) {
      throw new Error('Failed to create milestone');
    }
    
    return newMilestone;
  }

  // Find milestone by ID
  static async findById(id: number): Promise<UserMilestone | null> {
    const milestones = await executeQuery(
      'SELECT * FROM user_milestones WHERE id = ?',
      [id]
    ) as RowDataPacket[];

    return milestones.length > 0 ? milestones[0] as UserMilestone : null;
  }

  // Update milestone progress
  static async updateProgress(id: number, progressPercentage: number): Promise<UserMilestone | null> {
    let status = 'in_progress';
    let completionDate = null;

    if (progressPercentage >= 100) {
      status = 'completed';
      completionDate = new Date();
    }

    await executeQuery(
      'UPDATE user_milestones SET progress_percentage = ?, status = ?, completion_date = ? WHERE id = ?',
      [progressPercentage, status, completionDate, id]
    );

    return this.findById(id);
  }

  // Update milestone
  static async update(id: number, updates: Partial<UserMilestone>): Promise<UserMilestone | null> {
    const setClause = Object.keys(updates).map(key => `${key} = ?`).join(', ');
    const values = Object.values(updates);
    
    await executeQuery(
      `UPDATE user_milestones SET ${setClause} WHERE id = ?`,
      [...values, id]
    );

    return this.findById(id);
  }

  // Delete milestone
  static async delete(id: number): Promise<boolean> {
    const result = await executeQuery(
      'DELETE FROM user_milestones WHERE id = ?',
      [id]
    ) as OkPacket;

    return result.affectedRows > 0;
  }
}
