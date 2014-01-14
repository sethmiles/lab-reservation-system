-- Lab Reservation Database Creation Script

-- Lab user 
CREATE TABLE IF NOT EXISTS lab_user(
  id serial PRIMARY KEY,
  netId varchar(8),
  name varchar(70),
  email varchar(255),
  major varchar(70),
  role varchar(30)
);

-- Computer
CREATE TABLE IF NOT EXISTS computer(
id serial PRIMARY KEY,
name varchar(255),
isPowered boolean,
isLoggedIn boolean,
remoteConnectionCount integer,
lab_user_id integer REFERENCES lab_user
);

-- Series
CREATE TABLE IF NOT EXISTS series(
id serial PRIMARY KEY,
name varchar(255),
lab_user_id integer REFERENCES lab_user
);

-- Registration
CREATE TABLE IF NOT EXISTS registration(
id serial PRIMARY KEY,
start_time timestamp,
end_time timestamp,
note varchar(500),
lab_user_id integer REFERENCES lab_user,
computer_id integer REFERENCES computer,
series_id integer REFERENCES series
);

-- Class Section
CREATE TABLE IF NOT EXISTS class_section(
  id serial PRIMARY KEY,
  section_num integer,
  title varchar(30),
  class_num integer,
  teacher_id integer REFERENCES lab_user
);

-- Lab User and Class Section
CREATE TABLE IF NOT EXISTS lab_user_class_section(
  lab_user_id integer REFERENCES lab_user,
  class_section_id integer REFERENCES class_section,
  PRIMARY KEY(lab_user_id, class_section_id)
);
