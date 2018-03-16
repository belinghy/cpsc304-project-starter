drop table Referrals;
drop table Appointments;
drop table Prescription;
drop table Medication;
drop table Creates_Record;
drop table Patient;
drop table Specialist;
drop table Doctor;
drop table Location;

CREATE TABLE Location(
    address varchar(300),
    clinicName varchar(100),
    phone# int,
    PRIMARY KEY (address));

CREATE TABLE Doctor(
    id int,
    doctorname varchar(100),
    email varchar(50),
    phone int,
    address varchar(300),
    PRIMARY KEY(id),
    FOREIGN KEY(address)
		REFERENCES Location
        ON DELETE CASCADE);

CREATE TABLE Specialist (
     id int,
     areaOfSpecialization varchar(50),
     PRIMARY KEY(id),
     FOREIGN KEY(id)
          REFERENCES Doctor
          ON DELETE CASCADE);

CREATE TABLE Patient(
    id int,
    age int,
    address varchar(300),
    patientname varchar(100),
    gender varchar(20),
    phone# int,
    PRIMARY KEY(id));

CREATE TABLE Creates_Record (
     recordID int,
     datecreated varchar(50),
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
      medicationname varchar(100),
      manufacturer varchar(100),
      directions varchar(600),
      PRIMARY KEY(medicationname));

CREATE TABLE Prescription(
    patientid int,
    doctorid int,
    medicationname varchar(100),
    dosage varchar(200),
    PRIMARY KEY (patientid, doctorid, medicationname),
	FOREIGN KEY (medicationname)
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
    appointmentdate DATE ,
    duration int,
    PRIMARY KEY(patientid,appointmentdate),
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
    referralDate date,
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

/*

INSERT into Location
	VALUES
	(‘Tesla clinic’, 7781234567, ’1485 6th Ave W Vancouver BC’,
	‘Healthy Hearts’, 7781234568, ’147 Rouville Rue Dollard-des-Ormeaux QC’,
	‘Sathshi’s Derm Clinic’, 7781234569, ’12483 Loyalist Pky Picton ON’,
	‘Pediatric center’, 7781234570, ’Halstead Beach Rd Cold Springs ON’
	‘Neurology clinic’, 7781234571, ’24892 Ferguson Ave Maple Ridge BC’);


INSERT intO Doctor(id, name, email, phone, address)
VALUES (53, 'Elon Musk', 'elon.musk@gmail.com', 7781234567, '1485 6th Ave W Vancouver BC');

INSERT intO Doctor(id, name, email, phone, address)
VALUES (58, 'Larry Page', 'larry.page@gmail.com', 7781234568, '147 Rouville Rue Dollard-des-Ormeaux QC');

INSERT intO Doctor(id, name, email, phone, address)
VALUES (63, 'Satoshi Nakamoto', 'satoshi.nakamoto@gmail.com', 7781234569, '12483 Loyalist Pky Picton ON');

INSERT intO Doctor(id, name, email, phone, address)
VALUES (77, 'Satya Nadella', 'satya.nadella@gmail.com', 7781234570, 'Halstead Beach Rd Cold Springs ON');


INSERT intO Doctor(id, name, email, phone, address)
VALUES (78, 'Sundar Pichai', 'sundar.pichai@gmail.com', 7781234571, '24892 Ferguson Ave Maple Ridge BC');


INSERT intO SPECIALIST(id,areaOfSpecialization)
VALUES (53’, ‘Chiropractor’)
INSERT intO SPECIALIST(id,areaOfSpecialization)
VALUES (58, ‘Surgeon’)
INSERT intO SPECIALIST(id,areaOfSpecialization)
VALUES(63 Dermatologist)
INSERT intO SPECIALIST(id,areaOfSpecialization)
VALUES (77, Pediatrics)
INSERT intO SPECIALIST(id,areaOfSpecialization)
VALUES(78, Neurology)

INSERT intO Creates_Record (recordID, date created, summary, doctorid, patientid)
VALUES (10345, 'Feb 15 2017', 'Patient reported fever and cough, and was diagnosed with seasonal flu', 53, 128);

INSERT intO Creates_Record (recordID, date created, summary, doctorid, patientid)
VALUES (10346, 'Feb 25 2017', 'Patient had inflamed ankles, was prescribed with antibiotics and painkillers', 58, 143);

INSERT intO Creates_Record (recordID, date created, summary, doctorid, patientid)
VALUES (10347, 'Feb 26 2017', 'Patient reported rapid hair loss, diagnosis inconclusive and referred to specialist Sundar Pichai', 63, 153);

INSERT intO Creates_Record (recordID, date created, summary, doctorid, patientid)
VALUES (10348, 'Mar 1 2017', 'Patient was referred by Dr.Sakamoto, further diagnosis concludes patient has a rare case of Alopecia', 78, 111);

INSERT intO Creates_Record (recordID, date created, summary, doctorid, patientid)
VALUES (10349, 'Mar 20 2017', 'Patient came in with strong stomach pain, and was diagnosed with early stage ulcers', 77, 123);

INSERT intO Patient(id,age,address,name,gender,phone#)
VALUES 	(128,40,’500 Kingston Rd Toronto ON M4L 1V3’,’Bruce Wayne’, ‘male’,2286266)
INSERT intO Patient(id,age,address,name,gender,phone#)
VALUES	(143,100,‘3 Germain St Toronto ON M5M 1W4‘,’Diana Prince’,’female’,9696626)
INSERT intO Patient(id,age,address,name,gender,phone#)
VALUES	(153,23,’234 Willow Ave Toronto ON M4E 3K7’,’Barry Allen’,’male’,8435274)
INSERT intO Patient(id,age,address,name,gender,phone#)
VALUES	(111,30,’26 Goodwood Park York ON M4C 2G5’,’Victor Stone’,’male’,8292674)
INSERT intO Patient(id,age,address,name,gender,phone#)
VALUES	(123,29,’48 St Clair Ave W Toronto ON M4V 2Z2’,’Hal Jordan’,’male’,5268376)

INSERT intO Medication(name,manufacturer,directions)
VALUES 	(‘Advil’, ‘Pfizer’, ‘Take 2 pills as needed’)
INSERT intO Medication(name,manufacturer,directions)
VALUES	(‘Tylenol’, ‘Pfizer’, ‘Take 1 after meals’)
INSERT intO Medication(name,manufacturer,directions)
VALUES	(‘Melatonin’,’Pfizer’, ‘Take 1-2 tablets before bed’)
INSERT intO Medication(name,manufacturer,directions)
VALUES	(‘Penicillin’, ‘Pfizer’, ‘Take 20mg twice daily until finished’)
INSERT intO Medication(name,manufacturer,directions)
VALUES	(‘Xanax’, ‘Pfizer’, ‘Take once daily, do not discontinue without consulting doctor’ )

INSERT intO Referrals(patientid, doctorid, referraldoctorid, date)
VALUES	(128,77,78, ‘010217’)
INSERT intO Referrals(patientid, doctorid, referraldoctorid, date)
VALUES	(128,77,58, ‘042817’)
INSERT intO Referrals(patientid, doctorid, referraldoctorid, date)
VALUES	(128,77,53, ‘102216’)
INSERT intO Referrals(patientid, doctorid, referraldoctorid, date)
VALUES	(111,77,63, ‘020118’)
INSERT intO Referrals(patientid, doctorid, referraldoctorid, date)
VALUES	(123,77,78, ‘020617’)

INSERT intO Appointments(patientid, doctorid, datetime, duration)
VALUES	(128,77, ‘1518760800’,3600)
INSERT intO Appointments(patientid, doctorid, datetime, duration)
VALUES	(128,77, ‘1521183600’,1800)
INSERT intO Appointments(patientid, doctorid, datetime, duration)
VALUES	(130, 80, ‘1521183600’,3600)
INSERT intO Appointments(patientid, doctorid, datetime, duration)
VALUES	(130, 80, ‘1521529200’,5400)
INSERT intO Appointments(patientid, doctorid, datetime, duration)
VALUES	(123, 80, ‘1521529200’,1800)

INSERT intO Prescription(patientid, doctorid, drug-name, dosage)
VALUES	(128,77, ‘levothyroxine’, ‘b.i.d’)
INSERT intO Prescription(patientid, doctorid, drug-name, dosage)
VALUES	(128,77, ‘rosuvastatin’, ‘b.i.d’)
INSERT intO Prescription(patientid, doctorid, drug-name, dosage)
VALUES	(130, 80, ‘Insulin’, ‘q.o.d’)
INSERT intO Prescription(patientid, doctorid, drug-name, dosage)
VALUES	(130, 80, ‘albuterol’, ‘q.6h’)
INSERT intO Prescription(patientid, doctorid, drug-name, dosage)
VALUES	(123, 80, ‘levothyroxine’, ‘b.i.d’) */
