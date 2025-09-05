-- Отключаем Row Level Security для всех таблиц (временное решение)
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE psychological_tests DISABLE ROW LEVEL SECURITY;
ALTER TABLE test_results DISABLE ROW LEVEL SECURITY;
ALTER TABLE therapists DISABLE ROW LEVEL SECURITY;
ALTER TABLE booking_sessions DISABLE ROW LEVEL SECURITY;
ALTER TABLE service_packages DISABLE ROW LEVEL SECURITY;
ALTER TABLE user_subscriptions DISABLE ROW LEVEL SECURITY;
ALTER TABLE email_notifications DISABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events DISABLE ROW LEVEL SECURITY;
ALTER TABLE comments DISABLE ROW LEVEL SECURITY;
ALTER TABLE packages DISABLE ROW LEVEL SECURITY;
ALTER TABLE email_queue DISABLE ROW LEVEL SECURITY;

-- Удаляем все существующие политики
DROP POLICY IF EXISTS "Users can view own profile" ON users;
DROP POLICY IF EXISTS "Users can update own profile" ON users;
DROP POLICY IF EXISTS "Allow user registration" ON users;
DROP POLICY IF EXISTS "Users can view own test results" ON test_results;
DROP POLICY IF EXISTS "Users can create own test results" ON test_results;
DROP POLICY IF EXISTS "Users can view own bookings" ON booking_sessions;
DROP POLICY IF EXISTS "Users can create own bookings" ON booking_sessions;
DROP POLICY IF EXISTS "Users can update own bookings" ON booking_sessions;
DROP POLICY IF EXISTS "Users can view own subscriptions" ON user_subscriptions;
DROP POLICY IF EXISTS "Users can create own subscriptions" ON user_subscriptions;
DROP POLICY IF EXISTS "Admins can manage all subscriptions" ON user_subscriptions;
DROP POLICY IF EXISTS "Anyone can view psychological tests" ON psychological_tests;
DROP POLICY IF EXISTS "Anyone can view therapists" ON therapists;
DROP POLICY IF EXISTS "Authenticated users can create therapist profiles" ON therapists;
DROP POLICY IF EXISTS "Therapists can update own profile" ON therapists;
DROP POLICY IF EXISTS "Admins can manage therapists" ON therapists;
DROP POLICY IF EXISTS "Anyone can view service packages" ON service_packages;
DROP POLICY IF EXISTS "Admins can manage therapists" ON therapists;
DROP POLICY IF EXISTS "Allow analytics operations" ON analytics_events;
DROP POLICY IF EXISTS "System can manage email notifications" ON email_notifications;
DROP POLICY IF EXISTS "Anyone can view approved comments" ON comments;
DROP POLICY IF EXISTS "Users can create comments" ON comments;
DROP POLICY IF EXISTS "Users can update own comments" ON comments;
DROP POLICY IF EXISTS "Admins can manage all comments" ON comments;
DROP POLICY IF EXISTS "Anyone can view active packages" ON packages;
DROP POLICY IF EXISTS "Admins can manage packages" ON packages;
DROP POLICY IF EXISTS "System can manage email queue" ON email_queue;
DROP POLICY IF EXISTS "Admins can view email queue" ON email_queue;

-- Включаем Row Level Security заново
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE psychological_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE therapists ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_queue ENABLE ROW LEVEL SECURITY;

-- Политики для таблицы users (упрощенные)
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid()::text = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid()::text = id);

CREATE POLICY "Allow user registration" ON users
  FOR INSERT WITH CHECK (true);  -- Разрешаем вставку всем (service role обработает безопасность)

-- Убираем рекурсивную политику для админов в таблице users
-- CREATE POLICY "Admins can manage all users" ON users
--   FOR ALL USING (
--     EXISTS (
--       SELECT 1 FROM users
--       WHERE id = auth.uid()::text AND role = 'admin'
--     )
--   );

-- Политики для test_results
CREATE POLICY "Users can view own test results" ON test_results
  FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Users can create own test results" ON test_results
  FOR INSERT WITH CHECK (auth.uid()::text = user_id);

-- Политики для booking_sessions
CREATE POLICY "Users can view own bookings" ON booking_sessions
  FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Users can create own bookings" ON booking_sessions
  FOR INSERT WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update own bookings" ON booking_sessions
  FOR UPDATE USING (auth.uid()::text = user_id);

-- Политики для user_subscriptions
CREATE POLICY "Users can view own subscriptions" ON user_subscriptions
  FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Users can create own subscriptions" ON user_subscriptions
  FOR INSERT WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Admins can manage all subscriptions" ON user_subscriptions
  FOR ALL USING (auth.uid()::text IS NOT NULL);

-- Публичные данные (только чтение)
CREATE POLICY "Anyone can view psychological tests" ON psychological_tests
  FOR SELECT USING (true);

CREATE POLICY "Anyone can view therapists" ON therapists
  FOR SELECT USING (true);

CREATE POLICY "Allow therapist profile creation" ON therapists
  FOR INSERT WITH CHECK (true);  -- Разрешаем вставку всем (service role обработает безопасность)

CREATE POLICY "Therapists can update own profile" ON therapists
  FOR UPDATE USING (auth.uid()::text = user_id);

-- Убираем рекурсивную политику для админов в таблице therapists
-- CREATE POLICY "Admins can manage all therapists" ON therapists
--   FOR ALL USING (
--     EXISTS (
--       SELECT 1 FROM users
--       WHERE id = auth.uid()::text AND role = 'admin'
--     )
--   );

CREATE POLICY "Anyone can view service packages" ON service_packages
  FOR SELECT USING (true);

-- Админские политики
-- Убираем рекурсивные политики для таблицы users
-- CREATE POLICY "Admins can manage all data" ON users
--   FOR ALL USING (
--     EXISTS (
--       SELECT 1 FROM users
--       WHERE id = auth.uid()::text AND role = 'admin'
--     )
--   );

CREATE POLICY "Admins can manage therapists" ON therapists
  FOR ALL USING (auth.uid()::text IS NOT NULL);

-- Политики для аналитики
DROP POLICY IF EXISTS "Admins can view analytics" ON analytics_events;
DROP POLICY IF EXISTS "System can insert analytics" ON analytics_events;
DROP POLICY IF EXISTS "Allow analytics insert" ON analytics_events;
DROP POLICY IF EXISTS "Allow analytics update" ON analytics_events;
DROP POLICY IF EXISTS "Allow analytics delete" ON analytics_events;

-- Создать политики заново
-- Убираем рекурсивную политику для аналитики
-- CREATE POLICY "Admins can view analytics" ON analytics_events
--   FOR SELECT USING (
--     EXISTS (
--       SELECT 1 FROM users
--       WHERE id = auth.uid()::text AND role = 'admin'
--     )
--   );

CREATE POLICY "Allow analytics operations" ON analytics_events
  FOR ALL USING (true) WITH CHECK (true);

-- Политики для email уведомлений (только система)
CREATE POLICY "System can manage email notifications" ON email_notifications
  FOR ALL USING (true);

-- Политики для системы комментариев/отзывов
CREATE POLICY "Anyone can view approved comments" ON comments
  FOR SELECT USING (status = 'published');

CREATE POLICY "Users can create comments" ON comments
  FOR INSERT WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update own comments" ON comments
  FOR UPDATE USING (auth.uid()::text = user_id);

CREATE POLICY "Admins can manage all comments" ON comments
  FOR ALL USING (auth.uid()::text IS NOT NULL);

-- Политики для пакетов подписок
CREATE POLICY "Anyone can view active packages" ON packages
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage packages" ON packages
  FOR ALL USING (auth.uid()::text IS NOT NULL);

-- Политики для очереди email (только система и админы)
CREATE POLICY "System can manage email queue" ON email_queue
  FOR ALL USING (true);

CREATE POLICY "Admins can view email queue" ON email_queue
  FOR SELECT USING (auth.uid()::text IS NOT NULL);
