/*
  # Add Confirmation Fields to Newsletter Subscribers

  1. Changes
    - Add `confirmed` column (boolean, default false)
    - Add `confirmed_at` column (timestamptz, nullable)
  
  2. Notes
    - These fields track whether user has confirmed their email
    - confirmed_at is set when user confirms
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'newsletter_subscribers' AND column_name = 'confirmed'
  ) THEN
    ALTER TABLE newsletter_subscribers ADD COLUMN confirmed boolean DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'newsletter_subscribers' AND column_name = 'confirmed_at'
  ) THEN
    ALTER TABLE newsletter_subscribers ADD COLUMN confirmed_at timestamptz;
  END IF;
END $$;
