/* Account(username, password)*/
-- acct01-10: SignedUpUsers
insert into Account values('Triforium', 'acct01');
insert into Account values('Abderian', 'acct02');
insert into Account values('Panurgic', 'acct03');
insert into Account values('Aardwolf', 'acct04');
insert into Account values('Nonplussed', 'acct05');
insert into Account values('Prognathic', 'acct06');
insert into Account values('Monsoon', 'acct07');
insert into Account values('Vagaaa', 'acct08');
insert into Account values('Resiniferous', 'acct09');
insert into Account values('BramblecUneath', 'acct10');
-- acct11-20: Restaurant Owners
insert into Account values('Abattoir', 'acct11');
insert into Account values('Ria4Deity', 'acct12');
insert into Account values('Trumeau', 'acct13');
insert into Account values('NunoMottle', 'acct14');
insert into Account values('LukukAerobe', 'acct15');
insert into Account values('Cecutiency', 'acct16');
insert into Account values('LarcenyShuck', 'acct17');
insert into Account values('Schematism', 'acct18');
insert into Account values('Binnacle', 'acct19');
insert into Account values('Vamoose', 'acct20');

/* Food(food_type)*/
insert into Food values('cereal');
insert into Food values('fruit');
insert into Food values('coffee');
insert into Food values('pancake');
insert into Food values('waffle');
insert into Food values('boiled eggs');
insert into Food values('scrambled eggs');
insert into Food values('eggs benedict');
insert into Food values('sunny side up');
insert into Food values('juice');
insert into Food values('milk and dairy');
insert into Food values('bread and pastries');
insert into Food values('salad');
insert into Food values('grab-n-go items');
insert into Food values('bacon and sausage');
insert into Food values('all-in combo');
insert into Food values('omelette');
insert into Food values('toast');
insert into Food values('sandwich');
insert into Food values('panini');
insert into Food values('oatmeal');
insert into Food values('tea');

/* Owner(owid, name, username)*/
insert into Owner values('5699572', 'Adam', 'Abattoir');
insert into Owner values('1856132', 'Beth', 'Ria4Deity');
insert into Owner values('0249831', 'Carol', 'Trumeau');
insert into Owner values('2448608', 'David', 'NunoMottle');
insert into Owner values('6355672', 'Eaton', 'LukukAerobe');
insert into Owner values('3368104', 'Fest', 'Cecutiency');
insert into Owner values('4747245', 'Greg', 'LarcenyShuck');
insert into Owner values('1756280', 'Hellen', 'Schematism');
insert into Owner values('4385958', 'Ian', 'Binnacle');
insert into Owner values('5676173', 'Jason', 'Vamoose');

/*Restaurant(rid, name, owid)*/
insert into Restaurant values('21921', 'Mamalee', '5699572');
insert into Restaurant values('42726', 'Retro Club', '5699572');
insert into Restaurant values('82252', 'l-Aura', '1856132');
insert into Restaurant values('58136', 'The Ruby Vine', '0249831');
insert into Restaurant values('12381', 'Incognito Stand', '2448608');
insert into Restaurant values('03504', 'Nova Eatery', '6355672');
insert into Restaurant values('71046', 'le Sommet', '3368104');
insert into Restaurant values('16196', 'Fiery Tower', '3368104');
insert into Restaurant values('38449', 'Aqua', '3368104');
insert into Restaurant values('93531', 'The Nomad Shop', '3368104');
insert into Restaurant values('84921', 'Splash Cafe', '4747245');
insert into Restaurant values('06847', 'le Sortilège', '1756280');
insert into Restaurant values('02846', 'Wild Bite Here', '1756280');
insert into Restaurant values('82789', 'The Turban Grill', '4385958');
insert into Restaurant values('35878', 'Rosé', '5676173');
insert into Restaurant values('38781', 'The Point', '3368104');
insert into Restaurant values('70186', 'Tim Hortons', '6355672');
insert into Restaurant values('32243', 'Starbucks', '4747245');
insert into Restaurant values('07910', 'McDonalds', '1756280');
insert into Restaurant values('66520', 'Bean Brothers Cafe', '0249831');

-- AllUser(uid) --
insert into AllUser values('277156');
insert into AllUser values('294484');
insert into AllUser values('863588');
insert into AllUser values('578126');
insert into AllUser values('734378');
--
insert into AllUser values('656129');
insert into AllUser values('369008');
insert into AllUser values('772157');
insert into AllUser values('943127');
insert into AllUser values('294663');
insert into AllUser values('298849');
insert into AllUser values('647216');
insert into AllUser values('568122');
insert into AllUser values('997284');
insert into AllUser values('831222');

-- SignedUpUser(uid, img, name, username)
insert into SignedUpUser values('656129', '', 'Kelly', 'Triforium');
insert into SignedUpUser values('369008', '', 'Lydia', 'Abderian');
insert into SignedUpUser values('772157', '', 'MannyMUA', 'Panurgic');
insert into SignedUpUser values('943127', '', 'Ning', 'Aardwolf');
insert into SignedUpUser values('294663', '', 'Olson', 'Nonplussed');
insert into SignedUpUser values('298849', '', 'Perry', 'Prognathic');
insert into SignedUpUser values('647216', '', 'Qwkawa', 'Monsoon');
insert into SignedUpUser values('568122', '', 'Ranka', 'Vagaaa');
insert into SignedUpUser values('997284', '', 'Sally', 'Resiniferous');
insert into SignedUpUser values('831222', '', 'Thamy', 'BramblecUneath');


-- add HoursOfOperation here
insert into HoursOfOperation values ('Monday', '00:00', '24:00'); -- open 24hr
insert into HoursOfOperation values ('Monday', '6:30', '11:30');
insert into HoursOfOperation values ('Monday', '8:00', '20:00');
insert into HoursOfOperation values ('Tuesday', '00:00', '24:00');
insert into HoursOfOperation values ('Tuesday', '6:30', '11:30');
insert into HoursOfOperation values ('Tuesday', '8:00', '20:00');
insert into HoursOfOperation values ('Wednesday', '00:00', '24:00');
insert into HoursOfOperation values ('Wednesday', '6:30', '11:30');
insert into HoursOfOperation values ('Wednesday', '8:00', '20:00');
insert into HoursOfOperation values ('Thursday', '00:00', '24:00');
insert into HoursOfOperation values ('Thursday', '6:30', '11:30');
insert into HoursOfOperation values ('Thursday', '8:00', '20:00');
insert into HoursOfOperation values ('Friday', '00:00', '24:00');
insert into HoursOfOperation values ('Friday', '6:30', '11:30');
insert into HoursOfOperation values ('Friday', '8:00', '20:00');
insert into HoursOfOperation values ('Saturday', '6:30', '11:30');
insert into HoursOfOperation values ('Saturday', '10:00', '20:00');
insert into HoursOfOperation values ('Saturday', '00:00', '24:00');
insert into HoursOfOperation values ('Sunday', '00:00', '24:00');
insert into HoursOfOperation values ('Sunday', '6:30', '11:30');
insert into HoursOfOperation values ('Sunday', '10:00', '20:00');
insert into HoursOfOperation values ('Sunday', '8:00', '20:00');


-- added real lat/lons for these addresses
insert into Location values('V6R2B4', 49.264596, -123.180782, 'Vancouver', 'W Broadway', '3431', '21921');
insert into Location values('V6K2H3', 49.264144, -123.175277, 'Vancouver', 'W Broadway', '3144', '42726');
insert into Location values('V6R2G7', 49.263871, -123.187157, 'Vancouver', 'W 10th Ave', '3763', '82252');
insert into Location values('V6S2C2', 49.256388, -123.185136, 'Vancouver', 'Dunbar St', '3446', '58136');
insert into Location values('V6T0B8', 49.262053, -123.240394, 'Vancouver', 'Thunderbird Blvd', '5828', '12381');
insert into Location values('V6T1Z2', 49.269626, -123.259463, 'Vancouver', 'NW Marine Dr', '6393', '03504');
insert into Location values('V5Z2N7', 49.233681, -123.126712, 'Vancouver', 'W 41st Ave', '950', '71046');
insert into Location values('V5W3A1', 49.227818, -123.090310, 'Vancouver', 'Fraser St', '6270', '16196');
insert into Location values('V5X3T4', 49.225159, -123.091135, 'Vancouver', 'Fraser St', '6591', '38449');
insert into Location values('V5V3P7', 49.248631, -123.100819, 'Vancouver', 'Main St', '4148', '93531');
insert into Location values('V5C0B5', 49.259852, -123.001846, 'Burnaby', 'Still Creek Ave', '4510', '84921');
insert into Location values('V7L3V6', 49.312403, -123.056879, 'North Vancouver', 'Queensbury Ave', '636', '06847');
insert into Location values('V7T1X5', 49.335804, -123.135701, 'West Vancouver', 'Inglewood Ave', '725', '02846');
insert into Location values('V0N1G0', 49.396182, -123.204610, 'Vancouver', 'Cypress Bowl Rd', '6000', '82789');
insert into Location values('V3R1N5', 49.192306, -122.798910, 'Surrey', '104 Ave', '15269', '35878');


-- The Point
insert into Location values ('V6T1Z4', 49.262036, -123.255103, 'Vancouver', 'Lower Mall', '2205', '38781');
-- Tim Hortons
insert into Location values ('V6T1Z2', 49.265759, -123.254271, 'Vancouver', 'Main Mall', '2033', '70186');
-- Starbucks
insert into Location values ('V6T2H9', 49.265978, -123.242801, 'Vancouver', 'Dalhousie Rd', '5763', '32243');
-- McDonalds
insert into Location values ('V6M1Y7', 49.235011, -123.154840, 'Vancouver', 'W 41st Ave', '2095', '07910');
-- Bean Brother Cafe
insert into Location values ('V6M1Z6', 49.234773, -123.157251, 'Vancouver', 'W 41st Ave', '2179', '66520');


/* UserLikesFoodAtRestaurant(uid, food_type, rid)*/
insert into UserLikesFoodAtRestaurant values ('277156', 'cereal', '21921');
insert into UserLikesFoodAtRestaurant values ('277156', 'sandwich', '03504');
insert into UserLikesFoodAtRestaurant values ('294484', 'all-in combo', '84921');
insert into UserLikesFoodAtRestaurant values ('294484', 'sandwich', '03504');
insert into UserLikesFoodAtRestaurant values ('863588', 'tea', '93531');
insert into UserLikesFoodAtRestaurant values ('863588', 'panini', '71046');
insert into UserLikesFoodAtRestaurant values ('578126', 'omelette', '35878');
insert into UserLikesFoodAtRestaurant values ('578126', 'milk and dairy', '58136');
insert into UserLikesFoodAtRestaurant values ('734378', 'oatmeal', '38449');
insert into UserLikesFoodAtRestaurant values ('734378', 'bread and pastries', '12381');
insert into UserLikesFoodAtRestaurant values ('943127', 'coffee', '32243');
insert into UserLikesFoodAtRestaurant values ('943127', 'toast', '32243');
insert into UserLikesFoodAtRestaurant values ('997284', 'grab-n-go items', '70186');
insert into UserLikesFoodAtRestaurant values ('831222', 'grab-n-go items', '07910');
insert into UserLikesFoodAtRestaurant values ('294663', 'eggs benedict', '66520');
insert into UserLikesFoodAtRestaurant values ('772157', 'salad', '38781');

/*SignedUpUserFoodSearches(uid, food_type)*/
insert into SignedUpUserFoodSearches values ('656129', 'tea');
insert into SignedUpUserFoodSearches values ('369008', 'oatmeal');
insert into SignedUpUserFoodSearches values ('369008', 'panini');
insert into SignedUpUserFoodSearches values	('772157', 'salad');
insert into SignedUpUserFoodSearches values ('943127', 'coffee');
insert into SignedUpUserFoodSearches values ('943127', 'boiled eggs');
insert into SignedUpUserFoodSearches values ('294663', 'salad');
insert into SignedUpUserFoodSearches values ('294663', 'bread and pastries');
insert into SignedUpUserFoodSearches values ('647216', 'juice');
insert into SignedUpUserFoodSearches values ('647216', 'coffee');
insert into SignedUpUserFoodSearches values ('568122', 'coffee');
insert into SignedUpUserFoodSearches values ('568122', 'fruit');
insert into SignedUpUserFoodSearches values ('997284', 'cereal');
insert into SignedUpUserFoodSearches values ('997284', 'toast');
insert into SignedUpUserFoodSearches values ('997284', 'panini');
insert into SignedUpUserFoodSearches values ('997284', 'oatmeal');
insert into SignedUpUserFoodSearches values ('831222', 'tea');

-- fixed postal code to be string
/*SignedUpUserLocationTimeSearches(uid, day, openTime, closeTime, lat, lon, sid)*/
-- why does the TIME has to match HoursOfOperation?
insert into SignedUpUserLocationTimeSearches values 
('656129', 'Monday', '00:00', '24:00', 49.264596, -123.180782, '1');
insert into SignedUpUserLocationTimeSearches values 
('656129', 'Tuesday', '8:00', '20:00', 49.264596, -123.180782, '2');
insert into SignedUpUserLocationTimeSearches values 
('298849', 'Wednesday', '00:00', '24:00', 49.263871, -123.187157, '3');
insert into SignedUpUserLocationTimeSearches values 
('568122', 'Friday', '6:30', '11:30', 49.227818, -123.090310, '4');
insert into SignedUpUserLocationTimeSearches values 
('568122', 'Friday', '8:00', '20:00', 49.225159, -123.091135, '5');
insert into SignedUpUserLocationTimeSearches values 
('568122', 'Saturday', '6:30', '11:30', 49.312403, -123.056879, '6');
insert into SignedUpUserLocationTimeSearches values 
('772157', 'Saturday', '6:30', '11:30', 49.335804, -123.135701, '7');
insert into SignedUpUserLocationTimeSearches values 
('943127', 'Sunday', '6:30', '11:30', 49.335804, -123.135701, '8');
insert into SignedUpUserLocationTimeSearches values 
('294663', 'Thursday', '00:00', '24:00', 49.396182, -123.204610, '9');
insert into SignedUpUserLocationTimeSearches values 
('831222', 'Tuesday', '00:00', '24:00', 49.396182, -123.204610, '10');
insert into SignedUpUserLocationTimeSearches values 
('831222', 'Thursday', '8:00', '20:00', 49.192306, -122.798910, '11');


/*SignedUpUserRestaurantFavourites*/
insert into SignedUpUserRestaurantFavourites values ('656129', '21921');
insert into SignedUpUserRestaurantFavourites values ('369008', '35878');
insert into SignedUpUserRestaurantFavourites values ('369008', '03504');
insert into SignedUpUserRestaurantFavourites values	('772157', '58136');
insert into SignedUpUserRestaurantFavourites values	('772157', '21921');
insert into SignedUpUserRestaurantFavourites values ('943127', '71046');
insert into SignedUpUserRestaurantFavourites values ('943127', '58136');
insert into SignedUpUserRestaurantFavourites values ('294663', '06847');
insert into SignedUpUserRestaurantFavourites values ('294663', '02846');
insert into SignedUpUserRestaurantFavourites values ('298849', '82789');
insert into SignedUpUserRestaurantFavourites values ('647216', '06847');
insert into SignedUpUserRestaurantFavourites values ('647216', '21921');
insert into SignedUpUserRestaurantFavourites values ('568122', '93531');
insert into SignedUpUserRestaurantFavourites values ('568122', '84921');
insert into SignedUpUserRestaurantFavourites values ('997284', '21921');
insert into SignedUpUserRestaurantFavourites values ('997284', '35878');
insert into SignedUpUserRestaurantFavourites values ('997284', '71046');
insert into SignedUpUserRestaurantFavourites values ('831222', '35878');
insert into SignedUpUserRestaurantFavourites values ('943127', '32243');
insert into SignedUpUserRestaurantFavourites values ('943127', '32243');
insert into SignedUpUserRestaurantFavourites values ('997284', '70186');
insert into SignedUpUserRestaurantFavourites values ('831222', '07910');
insert into SignedUpUserRestaurantFavourites values ('294663', '66520');
insert into SignedUpUserRestaurantFavourites values ('772157', '38781');

/*RestaurantHoursOfOperation(rid, day, openTime, closeTime)*/
-- some restaurant (ie. 35878 & 82789 & 02846) do not have Hours Of Operation
insert into RestaurantHoursOfOperation values 
('21921', 'Monday', '00:00', '24:00');
insert into RestaurantHoursOfOperation values 
('21921', 'Tuesday', '00:00', '24:00');
insert into RestaurantHoursOfOperation values 
('21921', 'Wednesday', '00:00', '24:00');
insert into RestaurantHoursOfOperation values 
('21921', 'Thursday', '00:00', '24:00');
insert into RestaurantHoursOfOperation values 
('21921', 'Friday', '00:00', '24:00');
insert into RestaurantHoursOfOperation values 
('21921', 'Saturday', '00:00', '24:00');
insert into RestaurantHoursOfOperation values 
('21921', 'Sunday', '00:00', '24:00');
insert into RestaurantHoursOfOperation values 
('42726', 'Saturday', '10:00', '20:00');
insert into RestaurantHoursOfOperation values 
('42726', 'Sunday', '10:00', '20:00');
insert into RestaurantHoursOfOperation values 
('82252', 'Monday', '6:30', '11:30');
insert into RestaurantHoursOfOperation values 
('82252', 'Wednesday', '6:30', '11:30');
insert into RestaurantHoursOfOperation values 
('82252', 'Thursday', '6:30', '11:30');
insert into RestaurantHoursOfOperation values 
('82252', 'Friday', '6:30', '11:30');
insert into RestaurantHoursOfOperation values 
('82252', 'Saturday', '6:30', '11:30');
insert into RestaurantHoursOfOperation values 
('82252', 'Sunday', '6:30', '11:30');
insert into RestaurantHoursOfOperation values 
('58136', 'Monday', '8:00', '20:00');
insert into RestaurantHoursOfOperation values 
('58136', 'Tuesday', '8:00', '20:00');
insert into RestaurantHoursOfOperation values 
('58136', 'Wednesday', '8:00', '20:00');
insert into RestaurantHoursOfOperation values 
('58136', 'Thursday', '8:00', '20:00');
insert into RestaurantHoursOfOperation values 
('58136', 'Friday', '8:00', '20:00');
insert into RestaurantHoursOfOperation values 
('12381', 'Monday', '8:00', '20:00');
insert into RestaurantHoursOfOperation values 
('12381', 'Wednesday', '8:00', '20:00');
insert into RestaurantHoursOfOperation values 
('12381', 'Thursday', '8:00', '20:00');
insert into RestaurantHoursOfOperation values 
('12381', 'Friday', '8:00', '20:00');
insert into RestaurantHoursOfOperation values 
('12381', 'Sunday', '8:00', '20:00');
insert into RestaurantHoursOfOperation values 
('03504', 'Saturday', '00:00', '24:00');
insert into RestaurantHoursOfOperation values 
('03504', 'Sunday', '00:00', '24:00');
insert into RestaurantHoursOfOperation values 
('71046', 'Saturday', '00:00', '24:00');
insert into RestaurantHoursOfOperation values 
('71046', 'Sunday', '00:00', '24:00');
insert into RestaurantHoursOfOperation values 
('16196', 'Monday', '8:00', '20:00');
insert into RestaurantHoursOfOperation values 
('16196', 'Tuesday', '8:00', '20:00');
insert into RestaurantHoursOfOperation values 
('16196', 'Wednesday', '8:00', '20:00');
insert into RestaurantHoursOfOperation values 
('16196', 'Thursday', '8:00', '20:00');
insert into RestaurantHoursOfOperation values 
('16196', 'Friday', '8:00', '20:00');
insert into RestaurantHoursOfOperation values 
('16196', 'Saturday', '6:30', '11:30');
insert into RestaurantHoursOfOperation values 
('16196', 'Sunday', '6:30', '11:30');
insert into RestaurantHoursOfOperation values 
('38449', 'Monday', '6:30', '11:30');
insert into RestaurantHoursOfOperation values 
('38449', 'Tuesday', '8:00', '20:00');
insert into RestaurantHoursOfOperation values 
('38449', 'Wednesday', '6:30', '11:30');
insert into RestaurantHoursOfOperation values 
('38449', 'Thursday', '6:30', '11:30');
insert into RestaurantHoursOfOperation values 
('38449', 'Friday', '6:30', '11:30');
insert into RestaurantHoursOfOperation values 
('93531', 'Saturday', '00:00', '24:00');
insert into RestaurantHoursOfOperation values 
('93531', 'Sunday', '00:00', '24:00');
insert into RestaurantHoursOfOperation values 
('84921', 'Monday', '6:30', '11:30');
insert into RestaurantHoursOfOperation values 
('84921', 'Tuesday', '8:00', '20:00');
insert into RestaurantHoursOfOperation values 
('84921', 'Wednesday', '6:30', '11:30');
insert into RestaurantHoursOfOperation values 
('84921', 'Thursday', '6:30', '11:30');
insert into RestaurantHoursOfOperation values 
('84921', 'Friday', '6:30', '11:30');
insert into RestaurantHoursOfOperation values 
('06847', 'Monday', '8:00', '20:00');
insert into RestaurantHoursOfOperation values 
('06847', 'Tuesday', '8:00', '20:00');
insert into RestaurantHoursOfOperation values 
('06847', 'Wednesday', '8:00', '20:00');
insert into RestaurantHoursOfOperation values 
('06847', 'Thursday', '8:00', '20:00');
insert into RestaurantHoursOfOperation values 
('06847', 'Friday', '8:00', '20:00');
insert into RestaurantHoursOfOperation values 
('06847', 'Monday', '00:00', '24:00');
insert into RestaurantHoursOfOperation values 
('06847', 'Tuesday', '00:00', '24:00');
insert into RestaurantHoursOfOperation values 
('06847', 'Wednesday', '00:00', '24:00');
insert into RestaurantHoursOfOperation values 
('06847', 'Thursday', '00:00', '24:00');
insert into RestaurantHoursOfOperation values 
('06847', 'Friday', '00:00', '24:00');
insert into RestaurantHoursOfOperation values 
('06847', 'Sunday', '00:00', '24:00');
insert into RestaurantHoursOfOperation values
('38781', 'Monday', '8:00', '20:00');
insert into RestaurantHoursOfOperation values
('38781', 'Tuesday', '8:00', '20:00');
insert into RestaurantHoursOfOperation values
('38781', 'Wednesday', '8:00', '20:00');
insert into RestaurantHoursOfOperation values
('38781', 'Thursday', '8:00', '20:00');
insert into RestaurantHoursOfOperation values
('38781', 'Friday', '8:00', '20:00');
insert into RestaurantHoursOfOperation values
('38781', 'Saturday', '8:00', '20:00');
insert into RestaurantHoursOfOperation values
('38781', 'Sunday', '8:00', '20:00');
insert into RestaurantHoursOfOperation values
('70186', 'Monday', '8:00', '20:00');
insert into RestaurantHoursOfOperation values
('70186', 'Tuesday', '8:00', '20:00');
insert into RestaurantHoursOfOperation values
('70186', 'Wednesday', '8:00', '20:00');
insert into RestaurantHoursOfOperation values
('70186', 'Thursday', '8:00', '20:00');
insert into RestaurantHoursOfOperation values
('70186', 'Friday', '8:00', '20:00');
insert into RestaurantHoursOfOperation values
('70186', 'Saturday', '8:00', '20:00');
insert into RestaurantHoursOfOperation values
('70186', 'Sunday', '8:00', '20:00');
insert into RestaurantHoursOfOperation values
('32243', 'Monday', '8:00', '20:00');
insert into RestaurantHoursOfOperation values
('32243', 'Tuesday', '8:00', '20:00');
insert into RestaurantHoursOfOperation values
('32243', 'Wednesday', '8:00', '20:00');
insert into RestaurantHoursOfOperation values
('32243', 'Thursday', '8:00', '20:00');
insert into RestaurantHoursOfOperation values
('32243', 'Friday', '8:00', '20:00');
insert into RestaurantHoursOfOperation values
('32243', 'Saturday', '8:00', '20:00');
insert into RestaurantHoursOfOperation values
('32243', 'Sunday', '8:00', '20:00');
insert into RestaurantHoursOfOperation values
('07910', 'Monday', '00:00', '24:00');
insert into RestaurantHoursOfOperation values
('07910', 'Tuesday', '00:00', '24:00');
insert into RestaurantHoursOfOperation values
('07910', 'Wednesday', '00:00', '24:00');
insert into RestaurantHoursOfOperation values
('07910', 'Thursday', '00:00', '24:00');
insert into RestaurantHoursOfOperation values
('07910', 'Friday', '00:00', '24:00');
insert into RestaurantHoursOfOperation values
('07910', 'Saturday', '00:00', '24:00');
insert into RestaurantHoursOfOperation values
('07910', 'Sunday', '00:00', '24:00');
insert into RestaurantHoursOfOperation values
('66520', 'Monday', '6:30', '11:30');
insert into RestaurantHoursOfOperation values
('66520', 'Tuesday', '6:30', '11:30');
insert into RestaurantHoursOfOperation values
('66520', 'Wednesday', '6:30', '11:30');
insert into RestaurantHoursOfOperation values
('66520', 'Thursday', '6:30', '11:30');
insert into RestaurantHoursOfOperation values
('66520', 'Saturday', '10:00', '20:00');
insert into RestaurantHoursOfOperation values
('66520', 'Sunday', '10:00', '20:00');

/* FoodsServedAtRestaurants(rid, food_type) */
insert into FoodsServedAtRestaurants values ('21921', 'cereal');
insert into FoodsServedAtRestaurants values ('21921', 'fruit');
insert into FoodsServedAtRestaurants values ('42726', 'coffee');
insert into FoodsServedAtRestaurants values ('42726', 'pancake');
insert into FoodsServedAtRestaurants values ('82252', 'scrambled eggs');
insert into FoodsServedAtRestaurants values ('82252', 'juice');
insert into FoodsServedAtRestaurants values ('58136', 'milk and dairy');
insert into FoodsServedAtRestaurants values ('12381', 'bread and pastries');
insert into FoodsServedAtRestaurants values ('03504', 'sandwich');
insert into FoodsServedAtRestaurants values ('71046', 'panini');
insert into FoodsServedAtRestaurants values ('16196', 'toast');
insert into FoodsServedAtRestaurants values ('38449', 'oatmeal');
insert into FoodsServedAtRestaurants values ('93531', 'tea');
insert into FoodsServedAtRestaurants values ('84921', 'all-in combo');
insert into FoodsServedAtRestaurants values ('06847', 'bacon and sausage');
insert into FoodsServedAtRestaurants values ('02846', 'omelette');
insert into FoodsServedAtRestaurants values ('82789', 'salad');
insert into FoodsServedAtRestaurants values ('35878', 'cereal');
insert into FoodsServedAtRestaurants values ('35878', 'omelette');
insert into FoodsServedAtRestaurants values ('32243', 'coffee');
insert into FoodsServedAtRestaurants values ('32243', 'toast');
insert into FoodsServedAtRestaurants values ('70186', 'grab-n-go items');
insert into FoodsServedAtRestaurants values ('07910', 'grab-n-go items');
insert into FoodsServedAtRestaurants values ('66520', 'eggs benedict');
insert into FoodsServedAtRestaurants values ('38781', 'salad');
insert into FoodsServedAtRestaurants values ('38781', 'juice');
insert into FoodsServedAtRestaurants values ('38781', 'eggs benedict');
insert into FoodsServedAtRestaurants values ('70186', 'coffee');
insert into FoodsServedAtRestaurants values ('32243', 'grab-n-go items');
insert into FoodsServedAtRestaurants values ('07910', 'coffee');
insert into FoodsServedAtRestaurants values ('07910', 'milk and dairy');
insert into FoodsServedAtRestaurants values ('07910', 'all-in combo');
insert into FoodsServedAtRestaurants values ('66520', 'waffle');



commit work;
