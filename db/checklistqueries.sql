-- TODO Selection and Projection Query
-- Find the team name and standing of teams with 10 red cards

SELECT tname, standing
FROM teamsInLeague
WHERE redCards = 10


-- TODO Join Query

SELECT attribute
FROM managers
INNER JOIN teamsInLeague ON teamInLeague.teamID=managers.teamId
WHERE teamsInLeague.tName = + "'" + tName + "'",


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
    WHERE P.goals > = 10);


-- TODO Aggregation query
-- Find the names of the player(s) who have scored the most goals

SELECT name
FROM playersInTeam
WHERE goals = (SELECT max(goals) from playersInTeam)

-- Find the names of the player(s) who have scored the least goals
SELECT name
FROM playersInTeam
WHERE goals = (SELECT min(goals) from playersInTeam)


-- TODO Nested aggregation with group-by
-- Find the number of players on each team

SELECT tName, COUNT(*)
FROM teamsInLeague
JOIN playersInTeam ON teamsInLeague.teamID=playersInTeam.teamID
GROUP BY tName
ORDER BY COUNT(*) DESC;
