insert into branch values
( 10, 'Main', '1234 Main St.', 'Vancouver', 5551234 );

insert into branch values
( 20, 'Richmond', '23 No.3 Road', 'Richmond', 5552331 );

insert into branch values
( 30, 'West Creek', '251 Creek Rd.', 'Sechelt', 5552511 );

insert into branch values
( 40, 'Blenheim', '1342 W. 22 Ave.', 'Burnaby', 5551342 );

insert into driver values
( 111111111, 'Bob Smith', '111 E. 11 St.', 'Vancouver', '01-JAN-1975', 5551111 );

insert into driver values
( 222222222, 'John Walters', '222 E. 22 St.', 'Burnaby', '02-FEB-1976', 5552222 );

insert into driver values
( 333333333, 'Troy Rops', '333 W. 33 Ave.', 'Richmond', '03-MAR-1970', 5553333 );

insert into driver values
( 444444444, 'Kevin Mark', '444 E. 4 Ave.', 'Vancouver', '04-APR-1974', 5554444 );

insert into exam values
( 111111111, 20, '02-DEC-1997', 'L', 97 );

insert into exam values
( 222222222, 30, '09-MAY-1996', 'L', 25 );

insert into exam values
( 222222222, 40, '10-JUN-1996', 'L', 51 );

insert into exam values
( 111111111, 20, '25-MAY-1997', 'D', 79 );

insert into exam values
( 333333333, 20, '27-JUN-1997', 'L', 49 );

insert into exam values
( 222222222, 40, '29-AUG-1996', 'D', 81 );

insert into exam values
( 333333333, 10, '07-JUL-1997', 'L', 45 );

insert into exam values
( 444444444, 10, '27-JUL-1997', 'L', 71 );

insert into exam values
( 444444444, 20, '30-AUG-1997', 'D', 65 );

insert into exam values
( 333333333, 20, '27-JUL-1997', 'L', 61 );

insert into license values
( 1, 111111111, 'D', 5, '25-MAY-1999', '25-MAY-1997', 20 );

insert into license values
( 2, 222222222, 'D', 5, '29-AUG-1998', '29-AUG-1996', 40 );

insert into license values
( 3, 333333333, 'L', 5, '27-DEC-1997', '27-JUN-1997', 20 );

insert into license values
( 4, 444444444, 'D', 5, '30-AUG-1999', '30-AUG-1997', 20 );

commit work;