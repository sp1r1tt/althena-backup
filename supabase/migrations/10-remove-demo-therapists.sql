-- Remove demo therapists from database
-- This removes the seeded demo therapists: Елена Петрова, Михаил Волков, Анна Соколова, Дмитрий Козлов

-- Delete therapist records
DELETE FROM therapists
WHERE id IN ('dr-elena-petrov', 'dr-mikhail-volkov', 'dr-anna-sokolova', 'dr-dmitry-kozlov');

-- Delete corresponding user records
DELETE FROM users
WHERE id IN ('dr-elena-petrov', 'dr-mikhail-volkov', 'dr-anna-sokolova', 'dr-dmitry-kozlov');

-- Note: This will only remove the demo therapists, not real registered therapists