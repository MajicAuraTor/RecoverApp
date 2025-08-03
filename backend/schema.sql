-- 🗄️ RECOVERAPP MYSQL SCHEMA
-- This schema matches the API endpoints in your URL-based navigation system
-- Run this in MySQL Workbench to create your database structure

CREATE DATABASE IF NOT EXISTS webappdb;
USE webappdb;

-- Users table (for authentication)
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    is_active BOOLEAN DEFAULT TRUE
);

-- Content items table (for /content URL)
CREATE TABLE content_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    content_type ENUM('tutorial', 'exercise', 'article', 'video') NOT NULL,
    content TEXT,
    status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
    author_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id)
);

-- User reminders table (for /reminders URL)
CREATE TABLE user_reminders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    reminder_time DATETIME NOT NULL,
    frequency ENUM('once', 'daily', 'weekly', 'monthly') DEFAULT 'once',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- User milestones table (for /progress URL)
CREATE TABLE user_milestones (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    target_date DATE,
    completion_date DATE NULL,
    status ENUM('pending', 'in_progress', 'completed', 'cancelled') DEFAULT 'pending',
    progress_percentage DECIMAL(5,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Daily reports table (for /reports URL)
CREATE TABLE daily_reports (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    report_date DATE NOT NULL,
    mood_rating INT CHECK (mood_rating BETWEEN 1 AND 10),
    pain_level INT CHECK (pain_level BETWEEN 1 AND 10),
    activity_level INT CHECK (activity_level BETWEEN 1 AND 10),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY unique_user_date (user_id, report_date),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- User activities table (for dashboard activity feed)
CREATE TABLE user_activities (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    activity_type ENUM('login', 'milestone_completed', 'reminder_set', 'report_submitted') NOT NULL,
    description VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Insert sample admin user (password: 'admin123' - hash this in production!)
INSERT INTO users (username, email, password_hash, role, first_name, last_name) VALUES 
('admin', 'admin@recoverapp.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeIAd9/Bc8r9V8VCG', 'admin', 'Ian', 'Brooks');

-- Insert sample user (password: 'user123' - hash this in production!)
INSERT INTO users (username, email, password_hash, role, first_name, last_name) VALUES 
('testuser', 'user@recoverapp.com', '$2b$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'user', 'Robert', 'Harris');

-- Insert sample content
INSERT INTO content_items (title, content_type, content, status, author_id) VALUES
('Getting Started with Recovery', 'tutorial', 'This tutorial will help you begin your recovery journey...', 'published', 1),
('Daily Exercises', 'exercise', 'Perform these exercises daily for optimal recovery...', 'published', 1);

-- Insert sample reminders
INSERT INTO user_reminders (user_id, title, description, reminder_time, frequency) VALUES
(2, 'Take Morning Medication', 'Remember to take your prescribed medication', '2025-08-04 08:00:00', 'daily'),
(2, 'Physical Therapy Session', 'Weekly PT appointment', '2025-08-07 14:00:00', 'weekly');

-- Insert sample milestones
INSERT INTO user_milestones (user_id, title, description, target_date, status, progress_percentage) VALUES
(2, 'Walk 1000 Steps Daily', 'Build up daily walking routine', '2025-08-15', 'in_progress', 65.5),
(2, 'Complete Physical Therapy', 'Finish all PT sessions', '2025-09-30', 'pending', 25.0);

-- Insert sample daily reports
INSERT INTO daily_reports (user_id, report_date, mood_rating, pain_level, activity_level, notes) VALUES
(2, '2025-08-01', 7, 4, 6, 'Feeling good today, less pain than yesterday'),
(2, '2025-08-02', 6, 5, 5, 'Pain increased slightly, but mood stable');

-- Insert sample activities
INSERT INTO user_activities (user_id, activity_type, description) VALUES
(2, 'login', 'User logged into the application'),
(2, 'report_submitted', 'Daily health report submitted'),
(2, 'reminder_set', 'New medication reminder created');

-- Create indexes for better performance
CREATE INDEX idx_user_reminders_user_time ON user_reminders(user_id, reminder_time);
CREATE INDEX idx_user_milestones_user_status ON user_milestones(user_id, status);
CREATE INDEX idx_daily_reports_user_date ON daily_reports(user_id, report_date);
CREATE INDEX idx_user_activities_user_created ON user_activities(user_id, created_at);

-- Display table structure for verification
SHOW TABLES;
