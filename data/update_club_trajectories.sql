-- This file updates the "previous_ranking" for clubs to show up/down arrows.
-- To run this: Copy and paste into the Supabase SQL Editor.

CREATE OR REPLACE FUNCTION update_club_trajectories()
RETURNS void AS $$
BEGIN
    -- Create a list of NEW rankings based on ELO
    CREATE TEMPORARY TABLE ranking_data AS
    SELECT
        id,
        ROW_NUMBER() OVER (ORDER BY elo DESC) as current_ranking
    FROM clubs;

    -- Save those rankings into the "previous_ranking" column
    UPDATE clubs c
    SET previous_ranking = r.current_ranking
    FROM ranking_data r
    WHERE c.id = r.id;

    DROP TABLE ranking_data;
END;
$$ LANGUAGE plpgsql;

-- Stop any old timer (ignores error if it doesn't exist)
SELECT cron.unschedule('update-club-trajectories');

-- Start the new timer (every minute)
SELECT cron.schedule('update-club-trajectories', '* * * * *', 'SELECT update_club_trajectories()');

-- Confirm it is active
SELECT * FROM cron.job;
