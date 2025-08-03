import { executeQuery } from '../config/database';
import { RowDataPacket, OkPacket } from 'mysql2';

export interface UserReminder {
  id: number;
  user_id: number;
  title: string;
  description: string;
  reminder_time: Date;
  frequency: 'once' | 'daily' | 'weekly' | 'monthly';
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export class UserReminderModel {
  // Get user's active reminders
  static async findByUserId(userId: number): Promise<UserReminder[]> {
    const reminders = await executeQuery(
      'SELECT * FROM user_reminders WHERE user_id = ? AND is_active = true ORDER BY reminder_time ASC',
      [userId]
    ) as RowDataPacket[];

    return reminders as UserReminder[];
  }

  // Get upcoming reminders
  static async findUpcoming(userId: number, hours: number = 24): Promise<UserReminder[]> {
    const reminders = await executeQuery(
      'SELECT * FROM user_reminders WHERE user_id = ? AND is_active = true AND reminder_time BETWEEN NOW() AND DATE_ADD(NOW(), INTERVAL ? HOUR) ORDER BY reminder_time ASC',
      [userId, hours]
    ) as RowDataPacket[];

    return reminders as UserReminder[];
  }

  // Create new reminder
  static async create(reminderData: Omit<UserReminder, 'id' | 'created_at' | 'updated_at'>): Promise<UserReminder> {
    const result = await executeQuery(
      'INSERT INTO user_reminders (user_id, title, description, reminder_time, frequency, is_active) VALUES (?, ?, ?, ?, ?, ?)',
      [reminderData.user_id, reminderData.title, reminderData.description, reminderData.reminder_time, reminderData.frequency, reminderData.is_active]
    ) as OkPacket;

    const newReminder = await this.findById(result.insertId);
    if (!newReminder) {
      throw new Error('Failed to create reminder');
    }
    
    return newReminder;
  }

  // Find reminder by ID
  static async findById(id: number): Promise<UserReminder | null> {
    const reminders = await executeQuery(
      'SELECT * FROM user_reminders WHERE id = ?',
      [id]
    ) as RowDataPacket[];

    return reminders.length > 0 ? reminders[0] as UserReminder : null;
  }

  // Update reminder
  static async update(id: number, updates: Partial<UserReminder>): Promise<UserReminder | null> {
    const setClause = Object.keys(updates).map(key => `${key} = ?`).join(', ');
    const values = Object.values(updates);
    
    await executeQuery(
      `UPDATE user_reminders SET ${setClause} WHERE id = ?`,
      [...values, id]
    );

    return this.findById(id);
  }

  // Delete reminder
  static async delete(id: number): Promise<boolean> {
    const result = await executeQuery(
      'DELETE FROM user_reminders WHERE id = ?',
      [id]
    ) as OkPacket;

    return result.affectedRows > 0;
  }

  // Toggle reminder active status
  static async toggleActive(id: number): Promise<UserReminder | null> {
    await executeQuery(
      'UPDATE user_reminders SET is_active = NOT is_active WHERE id = ?',
      [id]
    );

    return this.findById(id);
  }
}
