/**
 * Standard ELO rating system with a dynamic K-value based on matches played
 * K = [ (2_000 - played) / 2_000 min=0, max=1 ] * 15 + 5
 * (basically between 5 and 20)
 *
 * E_win is the probability that the winner will win
 * new elo = old elo + K * (actual - expected)
 *
 * This is a duplicate of the actual function in supabase.
 */
DECLARE
  winner_elo numeric;
  winner_battles integer;
  loser_elo numeric;
  loser_battles integer;

  e_win numeric;
  k_win numeric;
  e_lose numeric;
  k_lose numeric;
  new_winner_elo numeric;
  new_loser_elo numeric;

BEGIN
  SELECT elo, battles INTO winner_elo, winner_battles
    FROM clubs
    WHERE id = winner_id;

  SELECT elo, battles INTO loser_elo, loser_battles
    FROM clubs 
    WHERE id = loser_id;

  e_win = 1.0 / (1.0 + POWER(10.0, (loser_elo - winner_elo) / 400.0));
  k_win = GREATEST(2000 - winner_battles, 0)::NUMERIC / 2000.0 * 15.0 + 5.0;
    
  e_lose = 1.0 - e_win;
  k_lose = GREATEST(2000 - loser_battles, 0)::NUMERIC / 2000.0 * 15.0 + 5.0;
    
  new_winner_elo = winner_elo + k_win * (1.0 - e_win);
  new_loser_elo = loser_elo + k_lose * (-e_lose);

  UPDATE clubs 
    SET 
        elo = new_winner_elo,
        battles = battles + 1
    WHERE id = winner_id;

  UPDATE clubs 
    SET 
        elo = new_loser_elo,
        battles = battles + 1
    WHERE id = loser_id;
END;
