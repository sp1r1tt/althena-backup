-- Mental Health Platform Database Schema

-- Users table for authentication and profiles
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(20),
  date_of_birth DATE,
  gender VARCHAR(20),
  role VARCHAR(20) DEFAULT 'client' CHECK (role IN ('client', 'therapist', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_verified BOOLEAN DEFAULT FALSE,
  subscription_status VARCHAR(50) DEFAULT 'free'
);

-- Psychological tests table
CREATE TABLE IF NOT EXISTS psychological_tests (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  questions JSONB NOT NULL,
  scoring_logic JSONB NOT NULL,
  is_free BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Test results table
CREATE TABLE IF NOT EXISTS test_results (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  test_id TEXT REFERENCES psychological_tests(id) ON DELETE CASCADE,
  answers JSONB NOT NULL,
  score INTEGER,
  result_text TEXT,
  recommendations TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Therapists table
CREATE TABLE IF NOT EXISTS therapists (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE NULL,
  specializations TEXT[],
  bio TEXT,
  experience_years INTEGER,
  education TEXT,
  certifications TEXT[],
  hourly_rate_uah DECIMAL(10,2),
  available_times JSONB,
  is_verified BOOLEAN DEFAULT FALSE,
  rating DECIMAL(3,2) DEFAULT 0,
  total_sessions INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Booking sessions table
CREATE TABLE IF NOT EXISTS booking_sessions (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  therapist_id TEXT REFERENCES therapists(id) ON DELETE CASCADE,
  session_date TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  status VARCHAR(50) DEFAULT 'pending',
  payment_status VARCHAR(50) DEFAULT 'pending',
  stripe_payment_intent_id VARCHAR(255),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Service packages table
CREATE TABLE IF NOT EXISTS service_packages (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  duration_days INTEGER,
  features TEXT[],
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User subscriptions table
CREATE TABLE IF NOT EXISTS user_subscriptions (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  package_id TEXT REFERENCES service_packages(id) ON DELETE CASCADE,
  stripe_subscription_id VARCHAR(255),
  status VARCHAR(50) DEFAULT 'active',
  starts_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ends_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Email notifications log
CREATE TABLE IF NOT EXISTS email_notifications (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  email_type VARCHAR(100) NOT NULL,
  subject VARCHAR(255),
  content TEXT,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status VARCHAR(50) DEFAULT 'sent'
);

-- Analytics events table
CREATE TABLE IF NOT EXISTS analytics_events (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
  event_type VARCHAR(100) NOT NULL,
  event_data JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_test_results_user_id ON test_results(user_id);
CREATE INDEX IF NOT EXISTS idx_booking_sessions_user_id ON booking_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_booking_sessions_therapist_id ON booking_sessions(therapist_id);
CREATE INDEX IF NOT EXISTS idx_booking_sessions_date ON booking_sessions(session_date);
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_user_id ON user_subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_user_id ON analytics_events(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_type ON analytics_events(event_type);
