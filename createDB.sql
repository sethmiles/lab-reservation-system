-- Lab Reservation Database Creation Script

-- User 
CREATE TABLE IF NOT EXISTS users(
  id serial PRIMARY KEY,
  netId varchar(8),
  name varchar(70),
  email varchar(255),
  major varchar(70),
  role varchar(30)
);

-- Computer
CREATE TABLE IF NOT EXISTS computers(
id serial PRIMARY KEY,
name varchar(255),
isPowered boolean,
isLoggedIn boolean,
memoryUsage integer,
remoteConnectionCount integer,
users_class_section_id integer REFERENCES users_class_sections
);

-- Series
CREATE TABLE IF NOT EXISTS series(
id serial PRIMARY KEY,
name varchar(255),
user_id integer REFERENCES users
);

-- Reservations
CREATE TABLE IF NOT EXISTS reservations(
id serial PRIMARY KEY,
start_time timestamp,
end_time timestamp,
note varchar(500),
user_id integer REFERENCES users,
computer_id integer REFERENCES computers,
series_id integer REFERENCES series
);

-- Class Section
CREATE TABLE IF NOT EXISTS class_sections(
  id serial PRIMARY KEY,
  section_num integer,
  title varchar(30),
  class_num integer,
  timeslot time,
  sunday boolean,
  moday boolean,
  tuesday boolean,
  wednesday boolean,
  thursday boolean,
  friday boolean,
  saturday boolean,
  teacher_id integer REFERENCES users
);

-- Lab User and Class Section
CREATE TABLE IF NOT EXISTS user_class_sections(
  user_id integer REFERENCES users,
  class_section_id integer REFERENCES class_sections,
  PRIMARY KEY(user_id, class_section_id)
);
