import { executeQuery } from '../config/database';
import { RowDataPacket, OkPacket } from 'mysql2';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  username?: string;
  created_at: Date;
  updated_at: Date;
}

export class UserModel {
  // Find user by email
  static async findByEmail(email: string): Promise<User | null> {
    const users = await executeQuery(
      'SELECT * FROM users WHERE email = ?',
      [email]
    ) as RowDataPacket[];
    
    return users.length > 0 ? users[0] as User : null;
  }

  // Find user by ID
  static async findById(id: number): Promise<User | null> {
    const users = await executeQuery(
      'SELECT * FROM users WHERE id = ?',
      [id]
    ) as RowDataPacket[];
    
    return users.length > 0 ? users[0] as User : null;
  }

  // Create new user
  static async create(userData: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User> {
    const result = await executeQuery(
      'INSERT INTO users (name, email, password, role, username) VALUES (?, ?, ?, ?, ?)',
      [userData.name, userData.email, userData.password, userData.role, userData.username || null]
    ) as OkPacket;

    const newUser = await this.findById(result.insertId);
    if (!newUser) {
      throw new Error('Failed to create user');
    }
    
    return newUser;
  }

  // Update user
  static async update(id: number, updates: Partial<User>): Promise<User | null> {
    const setClause = Object.keys(updates).map(key => `${key} = ?`).join(', ');
    const values = Object.values(updates);
    
    await executeQuery(
      `UPDATE users SET ${setClause} WHERE id = ?`,
      [...values, id]
    );

    return this.findById(id);
  }

  // Delete user
  static async delete(id: number): Promise<boolean> {
    const result = await executeQuery(
      'DELETE FROM users WHERE id = ?',
      [id]
    ) as OkPacket;

    return result.affectedRows > 0;
  }

  // Get all users with pagination
  static async findAll(limit: number = 50, offset: number = 0): Promise<User[]> {
    const users = await executeQuery(
      'SELECT * FROM users ORDER BY created_at DESC LIMIT ? OFFSET ?',
      [limit, offset]
    ) as RowDataPacket;

    return users as User[];
  }
}
