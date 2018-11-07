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


insert into Food values('cereals');
insert into Food values('fruit and parfait');
insert into Food values('coffee');
insert into Food values('pancakes and waffles');
insert into Food values('eggs');
insert into Food values('juice');
insert into Food values('milk and dairy subs');
insert into Food values('bread and pastries');
insert into Food values('salads');
insert into Food values('grab-n-go items');
insert into Food values('bacon and sausages');
insert into Food values('all-in combos');


insert into Owner values(5699572, 'Adam', 'Abattoir');
insert into Owner values(1856132, 'Beth', 'Ria4Deity');
insert into Owner values(0249831, 'Carol', 'Trumeau');
insert into Owner values(2448608, 'David', 'NunoMottle');
insert into Owner values(6355672, 'Eaton', 'LukukAerobe');
insert into Owner values(3368104, 'Fest', 'Cecutiency');
insert into Owner values(4747245, 'Greg', 'LarcenyShuck');
insert into Owner values(1756280, 'Hellen', 'Schematism');
insert into Owner values(4385958, 'Ian', 'Binnacle');
insert into Owner values(5676173, 'Jason', 'Vamoose');


insert into Restaurant values(21921, 'Mamalee', 5699572);
insert into Restaurant values(42726, 'Retro Club', 5699572);
insert into Restaurant values(82252, 'l-Aura', 1856132);
insert into Restaurant values(58136, 'The Ruby Vine', 0249831);
insert into Restaurant values(12381, 'Incognito Stand', 2448608);
insert into Restaurant values(03504, 'Nova Eatery', 6355672);
insert into Restaurant values(71046, 'le Sommet', 3368104);
insert into Restaurant values(16196, 'Fiery Tower', 3368104);
insert into Restaurant values(38449, 'Aqua', 3368104);
insert into Restaurant values(93531, 'The Nomad Shop', 3368104);
insert into Restaurant values(84921, 'Splash Cafe', 4747245);
insert into Restaurant values(06847, 'le Sortilège', 1756280);
insert into Restaurant values(02846, 'Wild Bite Here', 1756280);
insert into Restaurant values(82789, 'The Turban Grill', 4385958);
insert into Restaurant values(35878, 'Rosé', 5676173);


insert into GuestUser values(277156);
insert into GuestUser values(294484);
insert into GuestUser values(863588);
insert into GuestUser values(578126);
insert into GuestUser values(734378);


insert into SignedUpUser values(656129, '', 'Kelly', 'Triforium');
insert into SignedUpUser values(369008, '', 'Lydia', 'Abderian');
insert into SignedUpUser values(772157, '', 'MannyMUA', 'Panurgic');
insert into SignedUpUser values(943127, '', 'Ning', 'Aardwolf');
insert into SignedUpUser values(294663, '', 'Olson', 'Nonplussed');
insert into SignedUpUser values(298849, '', 'Perry', 'Prognathic');
insert into SignedUpUser values(647216, '', 'Qwkawa', 'Monsoon');
insert into SignedUpUser values(568122, '', 'Ranka', 'Vagaaa');
insert into SignedUpUser values(997284, '', 'Sally', 'Resiniferous');
insert into SignedUpUser values(831222, '', 'Thamy', 'BramblecUneath');


-- add HoursOfOperation here
insert into HoursOfOperation values ('Monday', 00:00, 24:00); -- open 24hr
insert into HoursOfOperation values ('Monday', 6:30, 11:30);
insert into HoursOfOperation values ('Monday', 8:00, 20:00);
insert into HoursOfOperation values ('Monday', 8:00, 8:00); -- does not open on Mondays
insert into HoursOfOperation values ('Tuesday', 00:00, 24:00);
insert into HoursOfOperation values ('Tuesday', 6:30, 11:30);
insert into HoursOfOperation values ('Tuesday', 8:00, 20:00);
insert into HoursOfOperation values ('Tuesday', 8:00, 8:00); -- does not open on Tuesdays
insert into HoursOfOperation values ('Wednesday', 00:00, 24:00);
insert into HoursOfOperation values ('Wednesday', 6:30, 11:30);
insert into HoursOfOperation values ('Wednesday', 8:00, 20:00);
insert into HoursOfOperation values ('Wednesday', 8:00, 8:00); -- does not open on Mondays
insert into HoursOfOperation values ('Thursday', 00:00, 24:00);
insert into HoursOfOperation values ('Thursday', 6:30, 11:30);
insert into HoursOfOperation values ('Thursday', 8:00, 20:00);
insert into HoursOfOperation values ('Thursday', 8:00, 8:00); -- does not open on Thursdays
insert into HoursOfOperation values ('Friday', 00:00, 24:00);
insert into HoursOfOperation values ('Friday', 6:30, 11:30);
insert into HoursOfOperation values ('Friday', 8:00, 20:00);
insert into HoursOfOperation values ('Friday', 8:00, 8:00); -- does not open on Fridays
insert into HoursOfOperation values ('Friday', 00:00, 24:00);
insert into HoursOfOperation values ('Saturday', 6:30, 11:30);
insert into HoursOfOperation values ('Saturday', 10:00, 20:00);
insert into HoursOfOperation values ('Saturday', 8:00, 8:00); -- does not open on Saturdays
insert into HoursOfOperation values ('Sunday', 00:00, 24:00);
insert into HoursOfOperation values ('Sunday', 6:30, 11:30);
insert into HoursOfOperation values ('Sunday', 10:00, 20:00);
insert into HoursOfOperation values ('Sunday', 8:00, 8:00); -- does not open on Sundays


insert into Location values('V6R2B4', 'Vancouver', 'W Broadway', 3431, 21921);
insert into Location values('V6K2H3', 'Vancouver', 'W Broadway', 3144, 42726);
insert into Location values('V6R2G7', 'Vancouver', 'W 10th Ave', 3763, 82252);
insert into Location values('V6S2C2', 'Vancouver', 'Dunbar St', 3446, 58136);
insert into Location values('V6T0B8', 'Vancouver', 'Thunderbird Blvd', 5828, 12381);
insert into Location values('V6T1Z2', 'Vancouver', 'NW Marine Dr', 6393, 03504);
insert into Location values('V5Z2N7', 'Vancouver', 'W 41st Ave', 950, 71046);
insert into Location values('V5W3A1', 'Vancouver', 'Fraser St', 6270, 16196);
insert into Location values('V5X3T4', 'Vancouver', 'Fraser St', 6591, 38449);
insert into Location values('V5V3P7', 'Vancouver', 'Main St', 4148, 93531);
insert into Location values('V5C0B5', 'Burnaby', 'Still Creek Ave', 4510, 84921);
insert into Location values('V7L3V6', 'North Vancouver', 'Queensbury Ave', 636, 06847);
insert into Location values('V7T1X5', 'West Vancouver', 'Inglewood Ave', 725, 02846);
insert into Location values('V0N1G0', 'Vancouver', 'Cypress Bowl Rd', 6000, 82789);
insert into Location values('V3R1N5', 'Surrey', '104 Ave', 15269, 35878);


commit work;