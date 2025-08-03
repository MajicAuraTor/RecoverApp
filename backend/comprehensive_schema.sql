-- 🗄️ COMPREHENSIVE MYSQL SCHEMA FOR WEBAPPDB
-- This preserves your existing tables and adds new ones for URL-based navigation
-- Run this in MySQL Workbench after backing up your existing data

USE webappdb;

-- ==== PRESERVE EXISTING TABLES STRUCTURE ====
-- Your existing tables will remain untouched
-- admin, audit_logs, medical_records, patient_procedures, users, patients, procedure_steps, procedure_types, procedures

-- ==== ADD NEW TABLES FOR URL NAVIGATION SYSTEM ====

-- Content items table (for /content URL) - only create if doesn't exist
CREATE TABLE IF NOT EXISTS content_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    content_type ENUM('tutorial', 'exercise', 'article', 'video') NOT NULL,
    content TEXT,
    status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
    author_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_content_status (status),
    INDEX idx_content_type (content_type)
);

-- User reminders table (for /reminders URL)
CREATE TABLE IF NOT EXISTS user_reminders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    reminder_time DATETIME NOT NULL,
    frequency ENUM('once', 'daily', 'weekly', 'monthly') DEFAULT 'once',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_user_reminders_user_time (user_id, reminder_time),
    INDEX idx_user_reminders_active (is_active)
);

-- User milestones table (for /progress URL)
CREATE TABLE IF NOT EXISTS user_milestones (
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
    INDEX idx_user_milestones_user_status (user_id, status),
    INDEX idx_user_milestones_target_date (target_date)
);

-- Daily reports table (for /reports URL)
CREATE TABLE IF NOT EXISTS daily_reports (
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
    INDEX idx_daily_reports_user_date (user_id, report_date)
);

-- User activities table (for dashboard activity feed)
CREATE TABLE IF NOT EXISTS user_activities (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    activity_type ENUM('login', 'milestone_completed', 'reminder_set', 'report_submitted') NOT NULL,
    description VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_user_activities_user_created (user_id, created_at),
    INDEX idx_user_activities_type (activity_type)
);

-- ==== ENSURE YOUR USERS TABLE HAS REQUIRED FIELDS ====
-- Add columns to existing users table if they don't exist

-- Check if username column exists and add if missing
SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists 
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = 'webappdb' 
  AND TABLE_NAME = 'users' 
  AND COLUMN_NAME = 'username';

SET @sql = IF(@col_exists = 0, 
    'ALTER TABLE users ADD COLUMN username VARCHAR(255) UNIQUE NULL AFTER id', 
    'SELECT "username column already exists"');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Check if password column exists and add if missing
SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists 
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = 'webappdb' 
  AND TABLE_NAME = 'users' 
  AND COLUMN_NAME = 'password';

SET @sql = IF(@col_exists = 0, 
    'ALTER TABLE users ADD COLUMN password VARCHAR(255) NULL', 
    'SELECT "password column already exists"');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Check if role column exists and add if missing
SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists 
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = 'webappdb' 
  AND TABLE_NAME = 'users' 
  AND COLUMN_NAME = 'role';

SET @sql = IF(@col_exists = 0, 
    'ALTER TABLE users ADD COLUMN role ENUM("admin", "user", "patient") DEFAULT "user"', 
    'SELECT "role column already exists"');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- ==== INSERT TEST DATA FOR LOGIN ====
-- These are safe INSERT IGNORE statements that won't duplicate existing data

-- Test admin user (username: admin, password: admin123)
INSERT IGNORE INTO users (username, email, password, role) VALUES 
('admin', 'admin@webappdb.com', '$2a$12$MoSV8auU7jmk0KIa6E00/Oj19omcWV5luthAvdBE6t7ZVtcBtv5a2', 'admin');

-- Test regular user (username: testuser, password: user123)  
INSERT IGNORE INTO users (username, email, password, role) VALUES 
('testuser', 'user@webappdb.com', '$2a$12$yOFr1Q0onwijF3BvGkN34ufvDE9g9QePCAMzyuavHwO8SMDTXsmlm', 'user');

-- Test patient user (username: patient1, password: patient123)
INSERT IGNORE INTO users (username, email, password, role) VALUES 
('patient1', 'patient@webappdb.com', '$2a$12$6vn8ZoWRO7lBpio7jQd5B.7iE6G2Eau09GsInPAV/ufQ2QqnQyaQO', 'patient');

-- Get user IDs for sample data
SET @admin_id = (SELECT id FROM users WHERE username = 'admin' LIMIT 1);
SET @user_id = (SELECT id FROM users WHERE username = 'testuser' LIMIT 1);
SET @patient_id = (SELECT id FROM users WHERE username = 'patient1' LIMIT 1);

-- Sample content items
INSERT IGNORE INTO content_items (title, content_type, content, status, author_id) VALUES
('Getting Started Guide', 'tutorial', 'Welcome to your healthcare dashboard. This guide will help you navigate...', 'published', @admin_id),
('Daily Exercise Routine', 'exercise', 'Follow these daily exercises for optimal recovery...', 'published', @admin_id),
('Medication Tracking', 'article', 'Learn how to properly track your medications...', 'published', @admin_id);

-- Sample reminders for test user
INSERT IGNORE INTO user_reminders (user_id, title, description, reminder_time, frequency) VALUES
(@user_id, 'Take Morning Medication', 'Remember to take your prescribed medication', '2025-08-04 08:00:00', 'daily'),
(@user_id, 'Physical Therapy Session', 'Weekly PT appointment', '2025-08-07 14:00:00', 'weekly'),
(@patient_id, 'Blood Pressure Check', 'Check and record blood pressure', '2025-08-04 18:00:00', 'daily');

-- Sample milestones
INSERT IGNORE INTO user_milestones (user_id, title, description, target_date, status, progress_percentage) VALUES
(@user_id, 'Walk 1000 Steps Daily', 'Build up daily walking routine', '2025-08-15', 'in_progress', 65.5),
(@user_id, 'Complete Physical Therapy', 'Finish all PT sessions', '2025-09-30', 'pending', 25.0),
(@patient_id, 'Reduce Pain Level', 'Achieve pain level below 3/10', '2025-08-31', 'in_progress', 40.0);

-- Sample daily reports
INSERT IGNORE INTO daily_reports (user_id, report_date, mood_rating, pain_level, activity_level, notes) VALUES
(@user_id, '2025-08-01', 7, 4, 6, 'Feeling good today, less pain than yesterday'),
(@user_id, '2025-08-02', 6, 5, 5, 'Pain increased slightly, but mood stable'),
(@patient_id, '2025-08-01', 5, 7, 3, 'Difficult day, high pain levels'),
(@patient_id, '2025-08-02', 6, 6, 4, 'Slight improvement with new medication');

-- Sample user activities
INSERT IGNORE INTO user_activities (user_id, activity_type, description) VALUES
(@user_id, 'login', 'User logged into the application'),
(@user_id, 'report_submitted', 'Daily health report submitted'),
(@user_id, 'reminder_set', 'New medication reminder created'),
(@patient_id, 'login', 'Patient logged into the application'),
(@patient_id, 'milestone_completed', 'Completed daily exercise milestone');

-- ==== VERIFICATION ====
-- Show all tables
SHOW TABLES;

-- Show test users for login verification
SELECT id, username, email, role, 'Password: admin123/user123/patient123' as password_info 
FROM users 
WHERE username IN ('admin', 'testuser', 'patient1');

-- Show sample data counts
SELECT 'content_items' as table_name, COUNT(*) as record_count FROM content_items
UNION ALL
SELECT 'user_reminders', COUNT(*) FROM user_reminders  
UNION ALL
SELECT 'user_milestones', COUNT(*) FROM user_milestones
UNION ALL
SELECT 'daily_reports', COUNT(*) FROM daily_reports
UNION ALL
SELECT 'user_activities', COUNT(*) FROM user_activities;
