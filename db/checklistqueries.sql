-- TODO Selection and Projection Query
-- Find the team name and standing of teams with 10 red cards

SELECT t_name, standing
FROM teams_in_league
WHERE total_red_cards = 10;

-- Find the team name and standing of teams with 5 yellow cards

SELECT t_name, standing
FROM teams_in_league
WHERE total_yellow_cards = 5;


-- TODO Join Query
-- Find the names and corresponding teams of all players

SELECT p_name, t_name
FROM players_in_team P, teams_in_league T
WHERE P.team_id = T.team_id;


-- TODO Division query
-- Find the names of players who have more than 10 goals

SELECT p_name
FROM players_in_team P
WHERE NOT EXISTS (
  SELECT P.p_name
  FROM players_in_team P
  WHERE P.goals <= 10);

-- Find the names of players who have less than 10 goals
  SELECT p_name
  FROM players_in_team P
  WHERE NOT EXISTS (
    SELECT P.p_name
    FROM players_in_team P
    WHERE P.goals >= 10);


-- TODO Aggregation query
-- Find the names of the player(s) who have scored the most goals

SELECT p_name
FROM players_in_team
WHERE goals = (SELECT max(goals) from players_in_team);

-- Find the names of the player(s) who have scored the least goals
SELECT p_name
FROM players_in_team
WHERE goals = (SELECT min(goals) from players_in_team);


-- TODO Nested aggregation with group-by
-- Find the team with the highest avergae goals scored per player
select max(averages_by_team.avg_goals)
from (
    select AVG(goals) as avg_goals
    from players_in_team
    group by team_id
  )averages_by_team;


-- Find the number of players on each team
SELECT t_name, COUNT(*)
FROM teams_in_league
JOIN players_in_team ON teams_in_league.team_id=players_in_team.team_id
GROUP BY t_name
ORDER BY COUNT(*) DESC;



-- TODO  Delete operation
-- Cascading: Delete a team in a league (teams_in_league)
-- If you delete a team in a league (teams_in_league), it follows that all the playes on the team must also be deleted,
-- since a player needs to play for a team
-- This is handled in the creation of the tables
DELETE FROM teams_in_league
WHERE t_name = someRandomTeam;

-- Non-Cascading: Delete a player on a team (players_in_team)
-- If you delete a player on a team (players_in_team), there are no tables that need to be updated
DELETE FROM players_in_team
WHERE jersey_# = 10;


-- TODO  Update operation:
-- Change the jersey number of the highest goal-scorer to number 10

UPDATE players_in_team
SET jersey_# = 10
WHERE goals = (SELECT min(goals) from players_in_team);
