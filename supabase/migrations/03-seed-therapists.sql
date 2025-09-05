-- Seed therapists data (Ukrainian context)

INSERT INTO therapists (id, specializations, bio, experience_years, education, certifications, hourly_rate_uah, available_times, is_verified, rating, total_sessions) VALUES 
(
  'dr-elena-petrov',
  ARRAY['Депрессия', 'Тревожные расстройства', 'Семейная терапия'],
  'Специализируюсь на работе с депрессивными и тревожными расстройствами. Использую современные методы КПТ и схема-терапии для достижения устойчивых результатов.',
  12,
  'Киевский национальный университет имени Тараса Шевченко, факультет психологии',
  ARRAY['Сертификат по когнитивно-поведенческой терапии (Beck Institute)', 'Специализация по схема-терапии (ISST)', 'Сертификат по работе с тревожными расстройствами'],
  1400.00,
  '{
    "monday": "9:00-18:00",
    "tuesday": "9:00-18:00", 
    "wednesday": "10:00-19:00",
    "thursday": "9:00-18:00",
    "friday": "9:00-17:00",
    "saturday": "10:00-15:00",
    "sunday": "closed"
  }'::jsonb,
  true,
  4.9,
  1240
),
(
  'dr-mikhail-volkov',
  ARRAY['Панические атаки', 'ПТСР', 'Зависимости'],
  'Работаю с травматическими расстройствами и зависимостями. Сертифицированный EMDR-терапевт.',
  8,
  'Харьковский национальный университет, клиническая психология',
  ARRAY['Сертификат EMDR-терапевта', 'Специализация по работе с зависимостями', 'Гештальт-терапия'],
  1600.00,
  '{
    "monday": "10:00-19:00",
    "tuesday": "10:00-19:00", 
    "wednesday": "9:00-18:00",
    "thursday": "10:00-19:00",
    "friday": "9:00-17:00",
    "saturday": "closed",
    "sunday": "closed"
  }'::jsonb,
  true,
  4.8,
  890
),
(
  'dr-anna-sokolova',
  ARRAY['Семейная терапия', 'Детская психология', 'Подростковая терапия'],
  'Помогаю семьям и подросткам решать конфликты и улучшать отношения. Опыт работы с детьми от 7 лет.',
  15,
  'Львовский национальный университет, семейная психология',
  ARRAY['Системная семейная терапия', 'Детская психология', 'Подростковая терапия', 'Игровая терапия'],
  1520.00,
  '{
    "monday": "9:00-17:00",
    "tuesday": "9:00-17:00", 
    "wednesday": "10:00-18:00",
    "thursday": "9:00-17:00",
    "friday": "9:00-16:00",
    "saturday": "10:00-14:00",
    "sunday": "closed"
  }'::jsonb,
  true,
  4.9,
  1580
),
(
  'dr-dmitry-kozlov',
  ARRAY['Психоанализ', 'Личностные расстройства', 'Экзистенциальная терапия'],
  'Глубинная работа с личностными особенностями и жизненными кризисами. Член Европейской психоаналитической федерации.',
  20,
  'Одесский национальный университет, Институт психоанализа',
  ARRAY['Психоанализ', 'Экзистенциальная терапия', 'Член Европейской психоаналитической федерации'],
  2000.00,
  '{
    "monday": "10:00-18:00",
    "tuesday": "10:00-18:00", 
    "wednesday": "10:00-18:00",
    "thursday": "10:00-18:00",
    "friday": "10:00-16:00",
    "saturday": "closed",
    "sunday": "closed"
  }'::jsonb,
  true,
  4.7,
  2100
);

-- Add corresponding user records for therapists
INSERT INTO users (id, email, first_name, last_name, role, created_at, is_verified) VALUES
('dr-elena-petrov', 'elena.petrov@mindcare.ua', 'Елена', 'Петрова', 'therapist', NOW(), true),
('dr-mikhail-volkov', 'mikhail.volkov@mindcare.ua', 'Михаил', 'Волков', 'therapist', NOW(), true),
('dr-anna-sokolova', 'anna.sokolova@mindcare.ua', 'Анна', 'Соколова', 'therapist', NOW(), true),
('dr-dmitry-kozlov', 'dmitry.kozlov@mindcare.ua', 'Дмитрий', 'Козлов', 'therapist', NOW(), true);

-- Update therapists table to link with users
UPDATE therapists SET user_id = id WHERE id IN ('dr-elena-petrov', 'dr-mikhail-volkov', 'dr-anna-sokolova', 'dr-dmitry-kozlov');
