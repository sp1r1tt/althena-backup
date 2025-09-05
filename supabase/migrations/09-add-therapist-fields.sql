-- Add additional fields to therapists table for profile management

ALTER TABLE therapists ADD COLUMN IF NOT EXISTS profile_image_url TEXT;
ALTER TABLE therapists ADD COLUMN IF NOT EXISTS therapy_approach VARCHAR(100);
ALTER TABLE therapists ADD COLUMN IF NOT EXISTS location VARCHAR(255) DEFAULT 'Киев';
ALTER TABLE therapists ADD COLUMN IF NOT EXISTS languages TEXT[] DEFAULT ARRAY['Украинский', 'Русский'];
ALTER TABLE therapists ADD COLUMN IF NOT EXISTS category VARCHAR(100);

-- Add profile image field to users table for client profiles
ALTER TABLE users ADD COLUMN IF NOT EXISTS profile_image_url TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS bio TEXT;

-- Create therapy categories enum or just use the category field
-- We'll use the category field to store therapy types like:
-- 'Когнитивно-поведенческий терапевт (КПТ)'
-- 'Гештальт-терапевт'
-- 'Психоаналитик'
-- etc.