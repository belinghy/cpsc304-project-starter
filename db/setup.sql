DROP TABLE updatedBy;
DROP TABLE matchesPlayedByTeams;
DROP TABLE leagues;
DROP TABLE teamsInLeague;
DROP TABLE playersInTeam;
DROP TABLE managers;
DROP TABLE coaches;
DROP TABLE staffInTeam;


CREATE TABLE staffInTeam (
staffId char(5),
name char(20),
teamId int NOT NULL,
PRIMARY KEY (staffId),
FOREIGN KEY (teamId) references Teams
	ON DELETE NO ACTION
	ON UPDATE CASCADE
);

CREATE TABLE coaches (
staffId int,
title char(20),
PRIMARY KEY (staffId),
FOREIGN KEY (staffId) references Staff
);

CREATE TABLE managers (
staffId int,
teamId int,
PRIMARY KEY (staffId),
FOREIGN KEY (staffId) references Staff
);


CREATE TABLE playersInTeam (
name char(20),
Jersey# int,
position char(3),
ratings double(1, 2),
fouls int,
onGoal% int,
goals int,
assists int,
teamId int NOT NULL,
PRIMARY KEY (name, Jersey#),
FOREIGN KEY (teamId) references teamsInLeague
);

CREATE TABLE teamsInLeague (
 	tName char(20),
	teamId int,
	wins int,
	losses int,
	draws int,
ratings double(1, 2),
goals int,
totalYellowCards int,
totalRedCards int,
standing int,
lName char(20) NOT NULL,
 	country char(20) NOT NULL,
PRIMARY KEY (tName),
FOREIGN KEY (lName, country) references leagues
);


CREATE TABLE leagues (
 	name char(20),
 	country char(20),
#Teams int,
PRIMARY KEY (name, country),
ON DELETE CASCADE
);

CREATE TABLE matchesPlayedByTeams(
 	matchId int,
 	location char(20),
	teamId int
result char(4) NOT NULL,
 	time int,
	date date,
 	goals int,
	#yellowCards int,
	#redCards int,
	PRIMARY KEY (teamId, matchId)
FOREIGN KEY (teamId) references teamsInLeague
	ON DELETE CASCADE
);

CREATE TABLE updatedBy (
 	staffId int,
 	name char (20) NOT NULL,
 	Jersey# int NOT NULL,
PRIMARY KEY (staffId, name, Jersey#)
FOREIGN KEY (staffId) references managers,
FOREIGN KEY (name, Jersey#) references PlayersInLeague
);

-- TODO create dummy data to initialize tables below here