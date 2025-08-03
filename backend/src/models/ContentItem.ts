import { executeQuery } from '../config/database';
import { RowDataPacket, OkPacket } from 'mysql2';

export interface ContentItem {
  id: number;
  title: string;
  content_type: 'tutorial' | 'exercise' | 'article' | 'video';
  content: string;
  status: 'draft' | 'published' | 'archived';
  author_id: number;
  created_at: Date;
  updated_at: Date;
}

export class ContentItemModel {
  // Get all published content items
  static async findPublished(limit: number = 20, offset: number = 0): Promise<ContentItem[]> {
    const items = await executeQuery(
      'SELECT * FROM content_items WHERE status = "published" ORDER BY created_at DESC LIMIT ? OFFSET ?',
      [limit, offset]
    ) as RowDataPacket[];

    return items as ContentItem[];
  }

  // Get content by type
  static async findByType(contentType: string, limit: number = 20): Promise<ContentItem[]> {
    const items = await executeQuery(
      'SELECT * FROM content_items WHERE content_type = ? AND status = "published" ORDER BY created_at DESC LIMIT ?',
      [contentType, limit]
    ) as RowDataPacket[];

    return items as ContentItem[];
  }

  // Get content by ID
  static async findById(id: number): Promise<ContentItem | null> {
    const items = await executeQuery(
      'SELECT * FROM content_items WHERE id = ?',
      [id]
    ) as RowDataPacket[];

    return items.length > 0 ? items[0] as ContentItem : null;
  }

  // Create new content item
  static async create(itemData: Omit<ContentItem, 'id' | 'created_at' | 'updated_at'>): Promise<ContentItem> {
    const result = await executeQuery(
      'INSERT INTO content_items (title, content_type, content, status, author_id) VALUES (?, ?, ?, ?, ?)',
      [itemData.title, itemData.content_type, itemData.content, itemData.status, itemData.author_id]
    ) as OkPacket;

    const newItem = await this.findById(result.insertId);
    if (!newItem) {
      throw new Error('Failed to create content item');
    }
    
    return newItem;
  }

  // Update content item
  static async update(id: number, updates: Partial<ContentItem>): Promise<ContentItem | null> {
    const setClause = Object.keys(updates).map(key => `${key} = ?`).join(', ');
    const values = Object.values(updates);
    
    await executeQuery(
      `UPDATE content_items SET ${setClause} WHERE id = ?`,
      [...values, id]
    );

    return this.findById(id);
  }

  // Delete content item
  static async delete(id: number): Promise<boolean> {
    const result = await executeQuery(
      'DELETE FROM content_items WHERE id = ?',
      [id]
    ) as OkPacket;

    return result.affectedRows > 0;
  }
}
