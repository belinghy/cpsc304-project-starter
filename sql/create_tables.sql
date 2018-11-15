-- changed all id types to be of char 45 to be able to generate unique ids using uuid
CREATE TABLE Account
(username CHAR(20) not null PRIMARY KEY,
 password CHAR(20) not null );
 -- Note: need assertions to ensure every account belongs to an owner OR signedupuser

CREATE TABLE Food
(food_type varchar(40) not null PRIMARY KEY );

CREATE TABLE Owner
(owid 		CHAR(45) not null PRIMARY KEY,
 name		CHAR(20) not null,
 username 	CHAR(20) not null,
FOREIGN KEY(username) REFERENCES Account
	ON DELETE CASCADE
	ON UPDATE CASCADE );
-- ** Note: We can’t enforce that each owner should belong to
-- at least one restaurant in restaurant table on this or restaurant table
--  (so must do that separately with assertion)

CREATE TABLE Restaurant
(rid 	CHAR(45) not null PRIMARY KEY,
 name	CHAR(25) not null,
 owid	CHAR(45),
FOREIGN KEY(owid) REFERENCES Owner
	ON DELETE SET NULL
	ON UPDATE CASCADE );


CREATE TABLE GuestUser
(uid	CHAR(45) not null PRIMARY KEY );


CREATE TABLE SignedUpUser
(uid 		CHAR(45) not null PRIMARY KEY,
 img	VARCHAR(255),
 name 		CHAR(20) not null,
 username 	CHAR(20) not null,
FOREIGN KEY(username) REFERENCES Account
	ON DELETE CASCADE
	ON UPDATE CASCADE );

CREATE TABLE HoursOfOperation
(day 		CHAR(10) not null,
 openTime 	TIME not null,
 closeTime 	TIME,
PRIMARY KEY(day, openTime, closeTime) );

CREATE TABLE Location
(postalCode CHAR(6),
 lat		FLOAT not null,
 lon 		FLOAT not null,
 city 		CHAR(20),
 street 	CHAR(30),
 number 	CHAR(45),
 rid		CHAR(45),
primary Key (lat, lon)
FOREIGN KEY(rid) REFERENCES Restaurant
	ON DELETE CASCADE
	ON UPDATE CASCADE );
-- changed on delete set null to cascade

CREATE TABLE UserLikesFoodAtRestaurant(
uid			CHAR(45) not null,
food_type 	CHAR(20) not null,
rid			CHAR(45) not null,
PRIMARY KEY(uid, food_type, rid),
FOREIGN KEY(uid)REFERENCES GuestUser
	ON DELETE CASCADE
	ON UPDATE CASCADE,
FOREIGN KEY(food_type) REFERENCES Food
	ON DELETE CASCADE
	ON UPDATE CASCADE,
FOREIGN KEY(rid) REFERENCES Restaurant
	ON DELETE CASCADE
	ON UPDATE CASCADE);

CREATE TABLE SignedUpUserFoodSearches(
uid			CHAR(45) not null,
food_type 	CHAR(20) not null,
PRIMARY KEY(uid, food_type),
FOREIGN KEY(uid) REFERENCES SignedUpUser
	ON DELETE CASCADE
	ON UPDATE CASCADE,
FOREIGN KEY(food_type) REFERENCES Food
	ON DELETE CASCADE
	ON UPDATE CASCADE);

CREATE TABLE SignedUpUserLocationTimeSearches(
uid			CHAR(45) not null,
day			CHAR(10) not null,
openTime  	TIME not null,
closeTime 	TIME not null,
lat 		FLOAT not null,
lon			FLOAT not null,
sid         CHAR(45) not null unique,
PRIMARY KEY(uid, day, openTime, closeTime, lat, lon),
FOREIGN KEY(uid) REFERENCES SignedUpUser
	ON DELETE CASCADE
	ON UPDATE CASCADE,
FOREIGN KEY(day, openTime, closeTime) REFERENCES HoursOfOperation
	ON DELETE CASCADE
	ON UPDATE CASCADE,
FOREIGN KEY(lat, lon) REFERENCES Location
	ON DELETE CASCADE
	ON UPDATE CASCADE);
-- change the last two ON DELETE SET NULL to CASCADE

CREATE TABLE SignedUpUserRestaurantFavourites(
uid		CHAR(45) not null,
rid		CHAR(45) not null,
PRIMARY KEY(uid, rid),
FOREIGN KEY(uid) REFERENCES SignedUpUser
	ON DELETE CASCADE
	ON UPDATE CASCADE,
FOREIGN KEY(rid) REFERENCES Restaurant
	ON DELETE CASCADE
	ON UPDATE CASCADE);
-- change the 2nd ON DELETE SET NULL to CASCADE

CREATE TABLE RestaurantHoursOfOperation (
rid			CHAR(45) not null,
day			CHAR(10) not null,
openTime	TIME not null,
closeTime	TIME not null,
PRIMARY KEY(rid, day, openTime, closeTime),
FOREIGN KEY(rid) REFERENCES Restaurant
	ON DELETE CASCADE
	ON UPDATE CASCADE,
FOREIGN KEY(day,openTime, closeTime) REFERENCES HoursOfOperation
	ON DELETE NO ACTION
	ON UPDATE CASCADE);


CREATE TABLE FoodsServedAtRestaurants(
rid			CHAR(45) not null,
food_type 	CHAR(20) not null,
PRIMARY KEY(rid, food_type),
FOREIGN KEY(rid) REFERENCES Restaurant
	ON DELETE CASCADE
	ON UPDATE CASCADE,
FOREIGN KEY(food_type) REFERENCES Food
	ON DELETE CASCADE
	ON UPDATE CASCADE);
-- change the 2nd ON DELETE NO ACTION to CASCADE
-- ** Note: We can’t enforce that each restaurant should belong to this table
-- (so must do that separately with assertions)

commit;
