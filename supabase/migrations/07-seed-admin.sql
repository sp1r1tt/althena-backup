-- Seed admin user data

-- Create admin user
-- You can change this email to any email you want
INSERT INTO users (id, email, first_name, last_name, role, created_at, is_verified) VALUES
('admin-user', '6weeks.dev02@gmail.com', 'Админ', 'Админович', 'admin', NOW(), true)
ON CONFLICT (email) DO UPDATE SET
  role = 'admin',
  is_verified = true;

-- IMPORTANT NOTES:
-- 1. Replace 'your-admin-email@example.com' with your desired admin email
-- 2. After running this migration, you need to:
--    a. Register with your chosen email on the website
--    b. Set any password you want during registration
--    c. Confirm the email
--    d. Login to access admin features like /admin/analytics
--
-- Alternative: Use the API endpoint to create admin:
-- POST /api/admin/create-admin with JSON body containing email, password, firstName, lastName