DROP TABLE IF EXISTS Referrals;
DROP TABLE IF EXISTS Appointments;
DROP TABLE IF EXISTS Prescription;
DROP TABLE IF EXISTS Medication;
DROP TABLE IF EXISTS Creates_Record;
DROP TABLE IF EXISTS Patient;
DROP TABLE IF EXISTS Specialist;
DROP TABLE IF EXISTS Doctor;
DROP TABLE IF EXISTS Location;

CREATE TABLE Location(
    address varchar(300),
    clinicName varchar(100),
    phoneNum varchar(20),
    PRIMARY KEY (address));

CREATE TABLE Doctor(
    doctorid int,
    doctorname varchar(100),
    email varchar(50),
    phone varchar(20),
    address varchar(300),
    PRIMARY KEY(doctorid),
    FOREIGN KEY(address)
		REFERENCES Location
        ON DELETE CASCADE);

CREATE TABLE Specialist (
    doctorid int,
     areaOfSpecialization varchar(50),
     PRIMARY KEY(doctorid),
     FOREIGN KEY(doctorid)
          REFERENCES Doctor
          ON DELETE CASCADE);

CREATE TABLE Patient(
    patientid SERIAL,
    age int,
    address varchar(300),
    patientname varchar(100),
    gender varchar(20),
    phoneNum varchar(20),
    PRIMARY KEY(patientid));

CREATE TABLE Creates_Record (
     recordID int,
     dateCreated varchar(50),
     summary  varchar(300),
     doctorid  int,
     patientid int,
     PRIMARY KEY(recordID),
     FOREIGN KEY(doctorid)
        REFERENCES Doctor
        ON DELETE SET NULL,
     FOREIGN KEY(patientid)
        REFERENCES Patient
        ON DELETE CASCADE);

CREATE TABLE Medication(
      medicationName varchar(100),
      manufacturer varchar(100),
      directions varchar(600),
      PRIMARY KEY(medicationName));

CREATE TABLE Prescription(
    patientid int,
    doctorid int,
    medicationName varchar(100),
    dosage int,
    PRIMARY KEY (patientid, doctorid, medicationName),
	FOREIGN KEY (medicationName)
        REFERENCES Medication
        ON DELETE SET NULL,
    FOREIGN KEY (patientid)
        REFERENCES Patient
        ON DELETE CASCADE,
    FOREIGN KEY (doctorid)
        REFERENCES Doctor
        ON DELETE SET NULL);

CREATE TABLE Appointments(
    patientid int,
    doctorid int,
    appointmentDateTime TIMESTAMP ,
    duration int,
    PRIMARY KEY(patientid,appointmentDateTime),
    FOREIGN KEY(patientid)
        REFERENCES Patient
        ON DELETE CASCADE,
   FOREIGN KEY(doctorid)
        REFERENCES Doctor
        ON DELETE CASCADE);

CREATE TABLE Referrals(
    patientid int,
    doctorid int,
    referraldoctorid int,
    referralDate DATE,
    PRIMARY KEY(patientid, doctorid, referraldoctorid),
    FOREIGN KEY(patientid)
          REFERENCES Patient
          ON DELETE CASCADE,
    FOREIGN KEY( doctorid)
          REFERENCES Doctor
          ON DELETE CASCADE,
    FOREIGN KEY(referraldoctorid)
         REFERENCES Doctor
         ON DELETE CASCADE);


/**
** Insert Location Rows
 */
INSERT INTO Location(address, clinicName, phoneNum)
	VALUES
	  ('1485 6th Ave W Vancouver BC', 'Tesla clinic', '778-123-4567'),
    ('147 Rouville Rue Dollard-des-Ormeaux QC', 'Healthy Hearts', '7781234568'),
    ( '12483 Loyalist Pky Picton ON', 'Sathshis Derm Clinic', '7781234569'),
    ('Halstead Beach Rd Cold Springs ON', 'Pediatric center', '7781234570'),
    ('24892 Ferguson Ave Maple Ridge BC', 'Neurology clinic', '7781234571');

/**
** Insert Doctor Rows
 */
INSERT INTO Doctor(doctorid, doctorname, email, phone, address)
VALUES (53, 'Elon Musk', 'elon.musk@gmail.com', '7781234567', '1485 6th Ave W Vancouver BC');

INSERT INTO Doctor(doctorid, doctorname, email, phone, address)
VALUES (58, 'Larry Page', 'larry.page@gmail.com', '7781234568', '147 Rouville Rue Dollard-des-Ormeaux QC');

INSERT INTO Doctor(doctorid, doctorname, email, phone, address)
VALUES (63, 'Satoshi Nakamoto', 'satoshi.nakamoto@gmail.com', '7781234569', '12483 Loyalist Pky Picton ON');

INSERT INTO Doctor(doctorid, doctorname, email, phone, address)
VALUES (77, 'Satya Nadella', 'satya.nadella@gmail.com', '7781234570', 'Halstead Beach Rd Cold Springs ON');


INSERT INTO Doctor(doctorid, doctorname, email, phone, address)
VALUES (78, 'Sundar Pichai', 'sundar.pichai@gmail.com', '7781234571', '24892 Ferguson Ave Maple Ridge BC');

/**
** Insert SPECIALIST Rows
 */
INSERT INTO SPECIALIST(doctorid,areaOfSpecialization)
VALUES (53, 'Chiropractor');

INSERT INTO SPECIALIST(doctorid,areaOfSpecialization)
VALUES (58, 'Surgeon');

INSERT INTO SPECIALIST(doctorid,areaOfSpecialization)
VALUES(63, 'Dermatologist');

INSERT INTO SPECIALIST(doctorid,areaOfSpecialization)
VALUES (77, 'Pediatrics');

INSERT INTO SPECIALIST(doctorid,areaOfSpecialization)
VALUES(78, 'Neurology');

/**
** Insert Patient Rows
 */
INSERT INTO Patient(patientid,age,address,patientname,gender,phoneNum)
VALUES 	(128,40,'500 Kingston Rd Toronto ON M4L 1V3','Bruce Wayne', 'male','2286266');
INSERT intO Patient(patientid,age,address,patientname,gender,phoneNum)
VALUES	(143,100,'3 Germain St Toronto ON M5M 1W4','Diana Prince','female','9696626');
INSERT intO Patient(patientid,age,address,patientname,gender,phoneNum)
VALUES	(153,23,'234 Willow Ave Toronto ON M4E 3K7','Barry Allen','male','8435274');
INSERT intO Patient(patientid,age,address,patientname,gender,phoneNum)
VALUES	(111,30,'26 Goodwood Park York ON M4C 2G5','Victor Stone','male','8292674');
INSERT intO Patient(patientid,age,address,patientname,gender,phoneNum)
VALUES	(123,29,'48 St Clair Ave W Toronto ON M4V 2Z2','Hal Jordan','male','5268376');

/**
** Insert Creates_Record Rows
 */
INSERT INTO Creates_Record (recordID, dateCreated, summary, doctorid, patientid)
VALUES (10345, 'Feb 15 2017', 'Patient reported fever and cough, and was diagnosed with seasonal flu', 53, 128);

INSERT INTO Creates_Record (recordID, dateCreated, summary, doctorid, patientid)
VALUES (10346, 'Feb 25 2017', 'Patient had inflamed ankles, was prescribed with antibiotics and painkillers', 58, 143);

INSERT INTO Creates_Record (recordID, dateCreated, summary, doctorid, patientid)
VALUES (10347, 'Feb 26 2017', 'Patient reported rapid hair loss, diagnosis inconclusive and referred to specialist Sundar Pichai', 63, 153);

INSERT INTO Creates_Record (recordID, dateCreated, summary, doctorid, patientid)
VALUES (10348, 'Mar 1 2017', 'Patient was referred by Dr.Sakamoto, further diagnosis concludes patient has a rare case of Alopecia', 78, 111);

INSERT INTO Creates_Record (recordID, dateCreated, summary, doctorid, patientid)
VALUES (10349, 'Mar 20 2017', 'Patient came in with strong stomach pain, and was diagnosed with early stage ulcers', 77, 123);


/**
** Insert Medication Rows
 */
INSERT intO Medication(medicationName,manufacturer,directions)
VALUES 	('Advil', 'Pfizer', 'Take 2 pills as needed');
INSERT intO Medication(medicationName,manufacturer,directions)
VALUES	('Tylenol', 'Pfizer', 'Take 1 after meals');
INSERT intO Medication(medicationName,manufacturer,directions)
VALUES	('Melatonin','Pfizer', 'Take 1-2 tablets before bed');
INSERT intO Medication(medicationName,manufacturer,directions)
VALUES	('Penicillin', 'Pfizer', 'Take 20mg twice daily until finished');
INSERT intO Medication(medicationName,manufacturer,directions)
VALUES	('Xanax', 'Pfizer', 'Take once daily, do not discontinue without consulting doctor' );


/**
** Build Referrals Rows
 */
INSERT intO Referrals(patientid, doctorid, referraldoctorid, referralDate)
VALUES	(128,77,78, TO_DATE('01/02/2017', 'MM/MDD/YYYY'));
INSERT intO Referrals(patientid, doctorid, referraldoctorid, referralDate)
VALUES	(128,77,58, TO_DATE('04/28/2017', 'MM/MDD/YYYY'));
INSERT intO Referrals(patientid, doctorid, referraldoctorid, referralDate)
VALUES	(128,77,53, TO_DATE('10/22/2016', 'MM/MDD/YYYY'));
INSERT intO Referrals(patientid, doctorid, referraldoctorid, referralDate)
VALUES	(111,77,63, TO_DATE('02/01/2018', 'MM/MDD/YYYY'));
INSERT intO Referrals(patientid, doctorid, referraldoctorid, referralDate)
VALUES	(123,77,78, TO_DATE('02/06/2017', 'MM/MDD/YYYY'));



/**
** Build Appointments Rows
 */
INSERT intO Appointments(patientid, doctorid, appointmentDateTime, duration)
VALUES	(128,77, TO_TIMESTAMP('01/02/2017 12:00', 'MM/DD/YYYY HH24:MI') ,1);
INSERT intO Appointments(patientid, doctorid, appointmentDateTime, duration)
VALUES	(128,77, TO_TIMESTAMP('04/28/2017 12:00', 'MM/DD/YYYY HH24:MI'),1);
INSERT intO Appointments(patientid, doctorid, appointmentDateTime, duration)
VALUES	(143, 78, TO_TIMESTAMP('10/22/2016 12:00', 'MM/DD/YYYY HH24:MI'),1);
INSERT intO Appointments(patientid, doctorid, appointmentDateTime, duration)
VALUES	(143, 78, TO_TIMESTAMP('02/01/2018 12:00', 'MM/DD/YYYY HH24:MI'),1);
INSERT intO Appointments(patientid, doctorid, appointmentDateTime, duration)
VALUES	(153, 78, TO_TIMESTAMP('02/06/2017 12:00', 'MM/DD/YYYY HH24:MI'),2);




/**
** Build Prescription Rows
 */
INSERT intO Prescription(patientid, doctorid, medicationName, dosage)
VALUES	(128,77, 'Melatonin', 1);
INSERT intO Prescription(patientid, doctorid, medicationName, dosage)
VALUES	(128,77, 'Tylenol', 2);
INSERT intO Prescription(patientid, doctorid, medicationName, dosage)
VALUES	(143, 78, 'Melatonin', 3);
INSERT intO Prescription(patientid, doctorid, medicationName, dosage)
VALUES	(143, 78, 'Tylenol', 4);
INSERT intO Prescription(patientid, doctorid, medicationName, dosage)
VALUES	(153, 78, 'Xanax', 5);
