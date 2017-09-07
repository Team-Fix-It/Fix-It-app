Database Name: fix-it_tech

Last Updated: 8/31 @ 10:07pm

CREATE TABLE volunteers (
  id serial PRIMARY KEY,
  first_name character varying(35) NOT NULL,
  last_name character varying(35) NOT NULL,
  email character varying(45) NOT NULL UNIQUE,
  phone character varying (20),
  organization character varying (35),
  role integer,
  status character varying,
  created timestamp DEFAULT current_timestamp,
  modified timestamp DEFAULT current_timestamp,
  heard_about character varying(200),
  follow_up character varying(20),
  why_volunteer character varying(200),
  previous_experience character varying(200)
);

ALTER TABLE volunteers ALTER COLUMN role SET DEFAULT 2;


CREATE TABLE events (
  id serial PRIMARY KEY,
  event_name character varying(50) NOT NULL,
  event_location character varying NOT NULL,
  event_description character varying(3000) NOT NULL,
  event_date date NOT NULL,
  starting_time timestamp with time zone NOT NULL,
  ending_time timestamp with time zone NOT NULL
);

CREATE TABLE proficiency (
  id serial PRIMARY KEY,
  level character varying(50) NOT NULL
);

CREATE TABLE rsvp (
  id serial PRIMARY KEY,
  event_id integer REFERENCES events ON DELETE CASCADE,
  volunteer_id integer REFERENCES volunteers ON DELETE CASCADE,
  response character varying(25) NOT NULL
);

CREATE TABLE skills (
  id serial PRIMARY KEY,
  skill character varying (100) NOT NULL
);

CREATE TABLE skillsProfile (
  id serial PRIMARY KEY,
  skill_id integer REFERENCES skills,
  volunteer_id integer REFERENCES volunteers,
  proficiency_id integer REFERENCES proficiency
);

CREATE TABLE attendance (
  id serial PRIMARY KEY,
  volunteer_id integer REFERENCES volunteers,
  event_id integer REFERENCES events
);

CREATE TABLE email (
  id serial PRIMARY KEY,
  first_name character varying(35) NOT NULL,
  last_name character varying(35) NOT NULL,
  email character varying(50) NOT NULL,
  added_date timestamp DEFAULT current_timestamp
);

INSERT INTO "skills" (skill) VALUES('Windows');
INSERT INTO "skills" (skill) VALUES('Mac OS');
INSERT INTO "skills" (skill) VALUES('Linux');
INSERT INTO "skills" (skill) VALUES('Data Back Up and Recovery');
INSERT INTO "skills" (skill) VALUES('Malware, Anti-Virus');
INSERT INTO "skills" (skill) VALUES('Security and User Privacy');
INSERT INTO "skills" (skill) VALUES('System Performance');
INSERT INTO "skills" (skill) VALUES('User Support for Email, Internet, MS Office, Google Apps');
INSERT INTO "skills" (skill) VALUES('Hardware Repair and Peripheral Connections');
INSERT INTO "skills" (skill) VALUES('Smartphone Repair and User Support');
INSERT INTO "skills" (skill) VALUES('Network');
INSERT INTO "skills" (skill) VALUES('Database');
INSERT INTO "skills" (skill) VALUES('Programming');
INSERT INTO "skills" (skill) VALUES('Web Development');
INSERT INTO "skills" (skill) VALUES('Project Management');
INSERT INTO "skills" (skill) VALUES('Event Management');

INSERT INTO "proficiency" (level) VALUES
('High (3+ years)');
INSERT INTO "proficiency" (level) VALUES
('Medium (1-3 years)');
INSERT INTO "proficiency" (level) VALUES
('Low (Less than a year)');
INSERT INTO "proficiency" (level) VALUES
('None');
INSERT INTO "proficiency" (level) VALUES
('Interested in Learning');

INSERT INTO "volunteers" (first_name, last_name, email, phone, organization, role, status) VALUES
('Frodo', 'Baggins', 'fordo@gmail.com', '612-123-4567', 'The Shire', 2, 'active');

INSERT INTO "volunteers" (first_name, last_name, email, phone, organization, role, status) VALUES
('Legolas', 'Too good for a last name', 'legolas@yahoo.com', '612-456-4567', 'Elves of Northern Mirkwood', 2, 'inactive');
