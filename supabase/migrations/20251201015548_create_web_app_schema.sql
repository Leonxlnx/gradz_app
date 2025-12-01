/*
  # Gradz Web App Database Schema

  1. New Tables
    - `gradz_users`
      - `id` (uuid, primary key, references auth.users)
      - `name` (text, user's chosen name)
      - `email` (text, unique)
      - `streak` (integer, current streak count)
      - `last_activity` (date, last time user was active)
      - `onboarding_completed` (boolean)
      - `mood` (text, selected mood during onboarding)
      - `interests` (text array, selected interests)
      - `goal` (text, learn/give/both)
      - `push_notifications` (boolean, default true)
      - `reminder_time` (time, notification time)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `quotes`
      - `id` (uuid, primary key)
      - `text` (text, quote content)
      - `author` (text, quote author)
      - `category` (text, quote category)
      - `created_at` (timestamptz)
    
    - `challenges`
      - `id` (uuid, primary key)
      - `title` (text, challenge title)
      - `description` (text, challenge description)
      - `category` (text, challenge category)
      - `difficulty` (text, easy/medium/hard)
      - `created_at` (timestamptz)
    
    - `lectures`
      - `id` (uuid, primary key)
      - `title` (text, lecture title)
      - `content` (text, lecture content)
      - `category` (text, lecture category)
      - `read_time` (integer, estimated read time in minutes)
      - `created_at` (timestamptz)
    
    - `user_collections`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references gradz_users)
      - `item_type` (text, quote/challenge/lecture)
      - `item_id` (uuid, references quotes/challenges/lectures)
      - `collected_at` (timestamptz)
      - `notes` (text, optional user notes)
    
    - `daily_content`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references gradz_users)
      - `date` (date, content date)
      - `quote_id` (uuid, references quotes)
      - `challenge_id` (uuid, references challenges)
      - `lecture_id` (uuid, references lectures)
      - `challenge_accepted` (boolean, default false)
      - `lecture_read` (boolean, default false)
      - `created_at` (timestamptz)
    
    - `health_goals`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references gradz_users)
      - `goal_text` (text, goal description)
      - `completed` (boolean, default false)
      - `date` (date, goal date)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Public read access for quotes, challenges, lectures
*/

-- Create gradz_users table
CREATE TABLE IF NOT EXISTS gradz_users (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  streak integer DEFAULT 0,
  last_activity date DEFAULT CURRENT_DATE,
  onboarding_completed boolean DEFAULT false,
  mood text,
  interests text[] DEFAULT '{}',
  goal text,
  push_notifications boolean DEFAULT true,
  reminder_time time DEFAULT '09:00:00',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE gradz_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON gradz_users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON gradz_users FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON gradz_users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create quotes table
CREATE TABLE IF NOT EXISTS quotes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  text text NOT NULL,
  author text NOT NULL,
  category text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view quotes"
  ON quotes FOR SELECT
  TO authenticated
  USING (true);

-- Create challenges table
CREATE TABLE IF NOT EXISTS challenges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  category text,
  difficulty text DEFAULT 'medium',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view challenges"
  ON challenges FOR SELECT
  TO authenticated
  USING (true);

-- Create lectures table
CREATE TABLE IF NOT EXISTS lectures (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  category text,
  read_time integer DEFAULT 5,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE lectures ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view lectures"
  ON lectures FOR SELECT
  TO authenticated
  USING (true);

-- Create user_collections table
CREATE TABLE IF NOT EXISTS user_collections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES gradz_users ON DELETE CASCADE,
  item_type text NOT NULL,
  item_id uuid NOT NULL,
  collected_at timestamptz DEFAULT now(),
  notes text
);

ALTER TABLE user_collections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own collections"
  ON user_collections FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own collections"
  ON user_collections FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own collections"
  ON user_collections FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create daily_content table
CREATE TABLE IF NOT EXISTS daily_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES gradz_users ON DELETE CASCADE,
  date date NOT NULL DEFAULT CURRENT_DATE,
  quote_id uuid REFERENCES quotes,
  challenge_id uuid REFERENCES challenges,
  lecture_id uuid REFERENCES lectures,
  challenge_accepted boolean DEFAULT false,
  lecture_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, date)
);

ALTER TABLE daily_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own daily content"
  ON daily_content FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own daily content"
  ON daily_content FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own daily content"
  ON daily_content FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create health_goals table
CREATE TABLE IF NOT EXISTS health_goals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES gradz_users ON DELETE CASCADE,
  goal_text text NOT NULL,
  completed boolean DEFAULT false,
  date date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE health_goals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own health goals"
  ON health_goals FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own health goals"
  ON health_goals FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own health goals"
  ON health_goals FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own health goals"
  ON health_goals FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_daily_content_user_date ON daily_content(user_id, date);
CREATE INDEX IF NOT EXISTS idx_user_collections_user ON user_collections(user_id);
CREATE INDEX IF NOT EXISTS idx_health_goals_user_date ON health_goals(user_id, date);