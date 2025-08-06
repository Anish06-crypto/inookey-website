import sqlite3 from 'sqlite3';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let db;

// Initialize database
async function initializeDatabase() {
  return new Promise((resolve, reject) => {
    const dbPath = path.join(__dirname, '../data/inookey_ai.db');
    
    // Ensure data directory exists
    const dataDir = path.dirname(dbPath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('❌ Database connection error:', err);
        reject(err);
      } else {
        console.log('✅ Connected to SQLite database');
        createTables()
          .then(resolve)
          .catch(reject);
      }
    });
  });
}

// Create database tables
async function createTables() {
  return new Promise((resolve, reject) => {
    const tables = [
      // Conversations table
      `CREATE TABLE IF NOT EXISTS conversations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_id TEXT NOT NULL,
        user_message TEXT NOT NULL,
        ai_response TEXT NOT NULL,
        intent TEXT,
        confidence REAL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      
      // Appointments table
      `CREATE TABLE IF NOT EXISTS appointments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_id TEXT NOT NULL,
        customer_name TEXT,
        customer_email TEXT,
        customer_phone TEXT,
        project_description TEXT,
        preferred_date TEXT,
        preferred_time TEXT,
        status TEXT DEFAULT 'pending',
        notes TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      
      // Knowledge base table
      `CREATE TABLE IF NOT EXISTS knowledge_base (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category TEXT NOT NULL,
        question TEXT NOT NULL,
        answer TEXT NOT NULL,
        keywords TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      
      // User sessions table
      `CREATE TABLE IF NOT EXISTS user_sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_id TEXT UNIQUE NOT NULL,
        user_agent TEXT,
        ip_address TEXT,
        started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        last_activity DATETIME DEFAULT CURRENT_TIMESTAMP,
        total_messages INTEGER DEFAULT 0
      )`
    ];

    let completed = 0;
    const totalTables = tables.length;

    tables.forEach((tableSQL, index) => {
      db.run(tableSQL, (err) => {
        if (err) {
          console.error(`❌ Error creating table ${index + 1}:`, err);
          reject(err);
        } else {
          completed++;
          if (completed === totalTables) {
            console.log('✅ Database tables created successfully');
            resolve();
          }
        }
      });
    });
  });
}

// Save conversation to database
async function saveConversation(conversationData) {
  return new Promise((resolve, reject) => {
    const { sessionId, userMessage, aiResponse, intent, confidence } = conversationData;
    
    const sql = `
      INSERT INTO conversations (session_id, user_message, ai_response, intent, confidence)
      VALUES (?, ?, ?, ?, ?)
    `;
    
    db.run(sql, [sessionId, userMessage, aiResponse, intent, confidence], function(err) {
      if (err) {
        console.error('❌ Error saving conversation:', err);
        reject(err);
      } else {
        // Update session activity
        updateSessionActivity(sessionId);
        resolve(this.lastID);
      }
    });
  });
}

// Get conversation history
async function getConversationHistory(sessionId, limit = 20) {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT * FROM conversations 
      WHERE session_id = ? 
      ORDER BY timestamp DESC 
      LIMIT ?
    `;
    
    db.all(sql, [sessionId, limit], (err, rows) => {
      if (err) {
        console.error('❌ Error fetching conversation history:', err);
        reject(err);
      } else {
        resolve(rows.reverse()); // Return in chronological order
      }
    });
  });
}

// Save appointment booking
async function saveAppointment(appointmentData) {
  return new Promise((resolve, reject) => {
    const {
      sessionId,
      customerName,
      customerEmail,
      customerPhone,
      projectDescription,
      preferredDate,
      preferredTime,
      notes
    } = appointmentData;
    
    const sql = `
      INSERT INTO appointments (
        session_id, customer_name, customer_email, customer_phone,
        project_description, preferred_date, preferred_time, notes
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    db.run(sql, [
      sessionId, customerName, customerEmail, customerPhone,
      projectDescription, preferredDate, preferredTime, notes
    ], function(err) {
      if (err) {
        console.error('❌ Error saving appointment:', err);
        reject(err);
      } else {
        resolve(this.lastID);
      }
    });
  });
}

// Get appointment by ID
async function getAppointment(appointmentId) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM appointments WHERE id = ?';
    
    db.get(sql, [appointmentId], (err, row) => {
      if (err) {
        console.error('❌ Error fetching appointment:', err);
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

// Update appointment status
async function updateAppointmentStatus(appointmentId, status, notes = null) {
  return new Promise((resolve, reject) => {
    const sql = `
      UPDATE appointments 
      SET status = ?, notes = ?, updated_at = CURRENT_TIMESTAMP 
      WHERE id = ?
    `;
    
    db.run(sql, [status, notes, appointmentId], function(err) {
      if (err) {
        console.error('❌ Error updating appointment:', err);
        reject(err);
      } else {
        resolve(this.changes);
      }
    });
  });
}

// Create or update user session
async function createOrUpdateSession(sessionId, userAgent = null, ipAddress = null) {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT OR REPLACE INTO user_sessions (
        session_id, user_agent, ip_address, last_activity
      )
      VALUES (?, ?, ?, CURRENT_TIMESTAMP)
    `;
    
    db.run(sql, [sessionId, userAgent, ipAddress], function(err) {
      if (err) {
        console.error('❌ Error creating/updating session:', err);
        reject(err);
      } else {
        resolve(this.lastID);
      }
    });
  });
}

// Update session activity
async function updateSessionActivity(sessionId) {
  return new Promise((resolve, reject) => {
    const sql = `
      UPDATE user_sessions 
      SET last_activity = CURRENT_TIMESTAMP, total_messages = total_messages + 1
      WHERE session_id = ?
    `;
    
    db.run(sql, [sessionId], function(err) {
      if (err) {
        console.error('❌ Error updating session activity:', err);
        reject(err);
      } else {
        resolve(this.changes);
      }
    });
  });
}

// Get session statistics
async function getSessionStats(sessionId) {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT 
        us.session_id,
        us.started_at,
        us.last_activity,
        us.total_messages,
        COUNT(c.id) as conversation_count
      FROM user_sessions us
      LEFT JOIN conversations c ON us.session_id = c.session_id
      WHERE us.session_id = ?
      GROUP BY us.session_id
    `;
    
    db.get(sql, [sessionId], (err, row) => {
      if (err) {
        console.error('❌ Error fetching session stats:', err);
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

// Get analytics data
async function getAnalytics() {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT 
        COUNT(DISTINCT session_id) as total_sessions,
        COUNT(*) as total_conversations,
        COUNT(DISTINCT DATE(timestamp)) as active_days,
        AVG(confidence) as avg_confidence,
        intent,
        COUNT(*) as intent_count
      FROM conversations 
      WHERE timestamp >= datetime('now', '-7 days')
      GROUP BY intent
      ORDER BY intent_count DESC
    `;
    
    db.all(sql, [], (err, rows) => {
      if (err) {
        console.error('❌ Error fetching analytics:', err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

// Close database connection
function closeDatabase() {
  if (db) {
    db.close((err) => {
      if (err) {
        console.error('❌ Error closing database:', err);
      } else {
        console.log('✅ Database connection closed');
      }
    });
  }
}

export {
  initializeDatabase,
  saveConversation,
  getConversationHistory,
  saveAppointment,
  getAppointment,
  updateAppointmentStatus,
  createOrUpdateSession,
  updateSessionActivity,
  getSessionStats,
  getAnalytics,
  closeDatabase
}; 