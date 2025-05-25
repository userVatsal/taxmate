-- Create tax_analysis table
CREATE TABLE IF NOT EXISTS tax_analysis (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    result TEXT NOT NULL, -- JSON string of analysis result
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create tax_deadline table
CREATE TABLE IF NOT EXISTS tax_deadline (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    type TEXT NOT NULL,
    due_date DATETIME NOT NULL,
    description TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'upcoming',
    priority TEXT NOT NULL DEFAULT 'medium',
    reminder_days TEXT NOT NULL, -- JSON array of days
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_tax_analysis_user_id ON tax_analysis(user_id);
CREATE INDEX IF NOT EXISTS idx_tax_deadline_user_id ON tax_deadline(user_id);
CREATE INDEX IF NOT EXISTS idx_tax_deadline_status ON tax_deadline(status); 