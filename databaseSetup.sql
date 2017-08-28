Database Name: fix-it_tech

CREATE TABLE volunteers (
    id serial PRIMARY KEY,
    first_name character varying(35) NOT NULL,
    last_name character varying(35) NOT NULL,
    email character varying(45) NOT NULL,
    phone character varying (20) NOT NULL,
	  organization character varying (35) NOT NULL,
    role integer,
    status character varying  NOT NULL,
    created timestamp DEFAULT current_timestamp,
    modified timestamp DEFAULT current_timestamp
);

ALTER TABLE volunteers ALTER COLUMN role SET DEFAULT 2;


CREATE TABLE events (
    id serial PRIMARY KEY,
    event_name character varying(50) NOT NULL,
   	event_location character varying NOT NULL,
    event_description character varying(500) NOT NULL,
    starting timestamp,
    ending timestamp
);

CREATE TABLE proficiency (
	 id serial PRIMARY KEY,
	  level character varying(50) NOT NULL

);

INSERT INTO "proficiency" (level) VALUES
('High (3+ years)');
INSERT INTO "proficiency" (level) VALUES
('Medium (1-3 years)');
INSERT INTO "proficiency" (level) VALUES
('Low (Less than a year)');
INSERT INTO "proficiency" (level) VALUES
('None');


CREATE TABLE rsvp (
    id serial PRIMARY KEY,
    event_id integer REFERENCES events ON DELETE CASCADE,
    volunteer_id integer REFERENCES volunteers,
    response character varying(25) NOT NULL
);

CREATE TABLE skills (
    id serial PRIMARY KEY,
 	  skill character varying (100) NOT NULL,
    volunteer_id integer REFERENCES volunteers,
 	  proficiency_id integer REFERENCES proficiency

);

CREATE TABLE attendance (
	 id serial PRIMARY KEY,
 	 volunteer_id integer REFERENCES volunteers,
 	 event_id integer REFERENCES events

);

Dummy Data
