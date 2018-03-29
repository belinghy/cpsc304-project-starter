-- TODO Selection and Projection Query
-- Find the team name and standing of teams with 10 red cards

SELECT tname, standing
FROM teamsInLeague
WHERE totalRedCards = 10;

-- Find the team name and standing of teams with 5 yellow cards

SELECT tname, standing
FROM teamsInLeague
WHERE totalYellowCards = 5;


-- TODO Join Query
-- Find the names and corresponding teams of all players

SELECT pName, tName
FROM playersInTeam P, teamsInLeague T
WHERE P.teamId = T.teamId;


-- TODO Division query
-- Find the names of players who have more than 10 goals

SELECT name
FROM playersInTeam P
WHERE NOT EXISTS (
  SELECT P.name
  FROM playersInTeam P
  WHERE P.goals <= 10);

-- Find the names of players who have less than 10 goals
  SELECT name
  FROM playersInTeam P
  WHERE NOT EXISTS (
    SELECT P.name
    FROM playersInTeam P
    WHERE P.goals >= 10);


-- TODO Aggregation query
-- Find the names of the player(s) who have scored the most goals

SELECT name
FROM playersInTeam
WHERE goals = (SELECT max(goals) from playersInTeam);

-- Find the names of the player(s) who have scored the least goals
SELECT name
FROM playersInTeam
WHERE goals = (SELECT min(goals) from playersInTeam);


-- TODO Nested aggregation with group-by
-- Find the team with the highest avergae goals scored per player
select max(AveragesByTeam.avgGoals)
from (
    select AVG(goals) as avgGoals
    from playersInTeam
    group by teamId
  )AveragesByTeam;


-- Find the number of players on each team
SELECT tName, COUNT(*)
FROM teamsInLeague
JOIN playersInTeam ON teamsInLeague.teamID=playersInTeam.teamID
GROUP BY tName
ORDER BY COUNT(*) DESC;



-- TODO  Delete operation
-- Cascading: Delete a team in a league (teamsInLeague)
-- If you delete a team in a league (teamsInLeague), it follows that all the playes on the team must also be deleted,
-- since a player needs to play for a team
-- This is handled in the creation of the tables
DELETE FROM teamsInLeague
WHERE tName = someRandomTeam;

-- Non-Cascading: Delete a player on a team (playersInTeam)
-- If you delete a player on a team (playersInTeam), there are no tables that need to be updated
DELETE FROM playersInTeam
WHERE Jersey# = 10;


-- TODO  Update operation:
-- Change the jersey number of the highest goal-scorer to number 10

UPDATE playersInTeam
SET Jersey# = 10
WHERE goals = (SELECT min(goals) from playersInTeam);
