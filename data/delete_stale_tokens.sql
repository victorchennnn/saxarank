/**
 * Schedule a cron job that deletes stale battle tokens.
 * We define stale as 30+ minutes old.
 *
 * The cron should run once a day for now (at 1am), but we may need to increase the frequency.
 */
CREATE extension IF NOT EXISTS pg_cron;

GRANT usage ON SCHEMA cron TO "postgres";
GRANT all privileges ON all tables IN SCHEMA cron TO "postgres";

SELECT cron.schedule('delete-stale-tokens', '0 1 * * *', 'DELETE FROM battle_tokens WHERE created_at < NOW() - INTERVAL ''30 minutes''');

SELECT * FROM cron.job;
