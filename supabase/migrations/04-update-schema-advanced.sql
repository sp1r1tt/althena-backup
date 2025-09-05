-- Adding advanced features: slot holds, email queue, enhanced analytics

-- Update booking_sessions table with slot hold functionality
ALTER TABLE booking_sessions ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'hold', 'confirmed', 'canceled'));
ALTER TABLE booking_sessions ADD COLUMN IF NOT EXISTS hold_expires_at TIMESTAMP;
ALTER TABLE booking_sessions ADD COLUMN IF NOT EXISTS stripe_payment_intent_id VARCHAR(255);

-- Update test_results with recommendations
ALTER TABLE test_results ADD COLUMN IF NOT EXISTS recommended_categories TEXT[];
ALTER TABLE test_results ADD COLUMN IF NOT EXISTS linked_booking_id TEXT REFERENCES booking_sessions(id);

-- Email queue for notifications
CREATE TABLE IF NOT EXISTS email_queue (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  type VARCHAR(50) NOT NULL,
  to_email VARCHAR(255) NOT NULL,
  payload JSONB NOT NULL,
  scheduled_at TIMESTAMP DEFAULT NOW(),
  sent_at TIMESTAMP,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed')),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Analytics events tracking (table already exists from 01-create-tables.sql)
-- Adding additional columns if they don't exist
ALTER TABLE analytics_events ADD COLUMN IF NOT EXISTS session_id VARCHAR(255);
ALTER TABLE analytics_events ADD COLUMN IF NOT EXISTS event_data JSONB;
ALTER TABLE analytics_events ADD COLUMN IF NOT EXISTS utm_source VARCHAR(100);
ALTER TABLE analytics_events ADD COLUMN IF NOT EXISTS utm_medium VARCHAR(100);
ALTER TABLE analytics_events ADD COLUMN IF NOT EXISTS utm_campaign VARCHAR(100);
ALTER TABLE analytics_events ADD COLUMN IF NOT EXISTS referrer TEXT;
ALTER TABLE analytics_events ADD COLUMN IF NOT EXISTS user_agent TEXT;
ALTER TABLE analytics_events ADD COLUMN IF NOT EXISTS ip_address INET;
ALTER TABLE analytics_events ADD COLUMN IF NOT EXISTS country VARCHAR(2);

-- Comments system for therapist reviews
CREATE TABLE IF NOT EXISTS comments (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  post_id TEXT, -- can reference therapist_id or other entities
  user_id TEXT REFERENCES users(id),
  body TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  status VARCHAR(20) DEFAULT 'published' CHECK (status IN ('pending', 'published', 'hidden')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Packages and subscriptions
CREATE TABLE IF NOT EXISTS packages (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL, -- in Ukrainian hryvnia (UAH)
  billing_period VARCHAR(20) DEFAULT 'monthly' CHECK (billing_period IN ('monthly', 'yearly')),
  features JSONB NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_subscriptions (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id TEXT REFERENCES users(id),
  package_id TEXT REFERENCES packages(id),
  stripe_subscription_id VARCHAR(255),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'canceled', 'past_due', 'paused')),
  current_period_start TIMESTAMP,
  current_period_end TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Seed data for packages
INSERT INTO packages (name, description, price, billing_period, features, is_active) VALUES
('Базовый', 'Базовый пакет для индивидуальной терапии', 299.00, 'monthly',
 '["5 сессий в месяц", "Чат с терапевтом", "Доступ к психологическим тестам"]'::jsonb, true),

('Премиум', 'Расширенный пакет с дополнительными услугами', 499.00, 'monthly',
 '["10 сессий в месяц", "Приоритетная запись", "Видео-звонки", "Экстренная поддержка 24/7"]'::jsonb, true),

('Семейный', 'Специальный пакет для семейной терапии', 699.00, 'monthly',
 '["8 парных сессий", "Индивидуальные консультации", "Домашние задания", "Семейные тесты"]'::jsonb, true),

('Студенческий', 'Специальное предложение для студентов', 199.00, 'monthly',
 '["3 сессии в месяц", "Скидка 30%", "Онлайн-формат", "Студенческие тесты"]'::jsonb, true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_booking_sessions_status ON booking_sessions(status);
CREATE INDEX IF NOT EXISTS idx_booking_sessions_hold_expires ON booking_sessions(hold_expires_at) WHERE status = 'hold';
CREATE INDEX IF NOT EXISTS idx_analytics_events_user ON analytics_events(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created ON analytics_events(created_at);
CREATE INDEX IF NOT EXISTS idx_email_queue_status ON email_queue(status);
CREATE INDEX IF NOT EXISTS idx_email_queue_scheduled ON email_queue(scheduled_at);
