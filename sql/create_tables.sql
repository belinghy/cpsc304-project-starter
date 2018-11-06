CREATE TABLE Account 
(username CHAR(20) not null PRIMARY KEY, 
 password CHAR(20) not null );

CREATE TABLE Food
(food_type varchar(40) not null PRIMARY KEY );

CREATE TABLE Owner
(oid 		INTEGER not null PRIMARY KEY,
 name		CHAR(20) not null,
 username 	CHAR(20) not null,
FOREIGN KEY(username) REFERENCES Account
	ON DELETE CASCADE
	ON UPDATE CASCADE );
-- ** Note: We can’t enforce that each owner should belong to 
-- at least one restaurant in restaurant table on this or restaurant table
--  (so must do that separately with assertion)

CREATE TABLE Restaurant 
(rid 	INTEGER not null PRIMARY KEY,
 name	CHAR(25) not null,
 oid	INTEGER,
FOREIGN KEY(oid) REFERENCES Owner
	ON DELETE SET NULL
	ON UPDATE CASCADE );


CREATE TABLE GuestUser 
(uid	INTEGER not null PRIMARY KEY );


CREATE TABLE SignedUpUser 
(uid 		INTEGER not null PRIMARY KEY,
 profilePic	VARCHAR(255),
 name 		CHAR(20) not null,
 username 	CHAR(20) not null,
FOREIGN KEY(username) REFERENCES Account
	ON DELETE CASCADE
	ON UPDATE CASCADE );

CREATE TABLE HoursOfOperation 
(day 		CHAR(10) not null,
 openTime 	TIME not null,
 closeTime 	TIME not null,
PRIMARY KEY(day, openTime, closeTime) );

CREATE TABLE Location 
(postalCode CHAR(6) not null primary key,
 city 		CHAR(20) not null,
 street 	CHAR(30) not null,
 number 	INTEGER,
 rid		INTEGER,
FOREIGN KEY(rid) REFERENCES Restaurant
	ON DELETE CASCADE
	ON UPDATE CASCADE );
-- changed on delete set null to cascade

CREATE TABLE UserLikesFoodAtRestaurant(
uid			INTEGER not null,
food_type 	CHAR(20) not null,
rid			INTEGER not null,
PRIMARY KEY(uid, food_type, rid),
FOREIGN KEY(uid)REFERENCES GuestUser
	ON DELETE CASCADE
	ON UPDATE CASCADE
FOREIGN KEY(food_type) REFERENCES Food
	ON DELETE CASCADE
	ON UPDATE CASCADE
FOREIGN KEY(rid) REFERENCES Restaurant
	ON DELETE CASCADE
	ON UPDATE CASCADE);

CREATE TABLE SignedUpUserFoodSearches(
uid			INTEGER not null,
food_type 	CHAR(20) not null,
PRIMARY KEY(uid, food_type),
FOREIGN KEY(uid) REFERENCES SignedUpUser
	ON DELETE CASCADE
	ON UPDATE CASCADE
FOREIGN KEY(food_type) REFERENCES Food
	ON DELETE CASCADE
	ON UPDATE CASCADE);

CREATE TABLE SignedUpUserLocationTimeSearches(
uid			INTEGER not null,
day			CHAR(10) not null,
openTime  	TIME not null,
closeTime 	TIME not null,
postalCode 	CHAR(6) not null,
PRIMARY KEY(uid, day, openTime, closeTime, postalCode),
FOREIGN KEY(uid) REFERENCES SignedUpUser
	ON DELETE CASCADE
	ON UPDATE CASCADE
FOREIGN KEY(day, openTime, closeTime) REFERENCES HoursOfOperation
	ON DELETE CASCADE
	ON UPDATE CASCADE
FOREIGN KEY(postalCode) REFERENCES Location
	ON DELETE CASCADE
	ON UPDATE CASCADE);
-- change the last two ON DELETE SET NULL to CASCADE

CREATE TABLE SignedUpUserRestaurantFavourites(
uid		INTEGER not null,
rid		INTEGER not null,
PRIMARY KEY(uid, rid),
FOREIGN KEY(uid) REFERENCES SignedUpUser
	ON DELETE CASCADE
	ON UPDATE CASCADE
FOREIGN KEY(rid) REFERENCES Restaurant
	ON DELETE CASCADE
	ON UPDATE CASCADE);
-- change the 2nd ON DELETE SET NULL to CASCADE

CREATE TABLE RestaurantHoursOfOperation (
rid			INTEGER not null,
day			CHAR(10) not null,
openTime	TIME not null,
closeTime	TIME not null,
PRIMARY KEY(rid, day, openTime, closeTime),
FOREIGN KEY(rid) REFERENCES Restaurant
	ON DELETE CASCADE
	ON UPDATE CASCADE
FOREIGN KEY(day,openTime, closeTime) REFERENCES HoursOfOperation
	ON DELETE CASCADE
	ON UPDATE CASCADE);
-- change the 2nd ON DELETE NO ACTION to CASCADE

CREATE TABLE FoodsServedAtRestaurants(
rid			INTEGER not null,
food_type 	CHAR(20) not null,
PRIMARY KEY(rid, food_type),
FOREIGN KEY(rid) REFERENCES Restaurant
	ON DELETE CASCADE
	ON UPDATE CASCADE
FOREIGN KEY(food_type) REFERENCES Food
	ON DELETE CASCASE
	ON UPDATE CASCADE);
-- change the 2nd ON DELETE NO ACTION to CASCADE
-- ** Note: We can’t enforce that each restaurant should belong to this table 
-- (so must do that separately with exceptions)

commit;