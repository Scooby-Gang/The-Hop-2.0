# TheHop!

## Plan something to do right now!

In a hectic society with so much responsibility, spontaneity is all but lost.
If you desire the ability to find events happening NOW, get TheHop. 

  - Search various events at your current or another selected location 
  - Filter genres & tastes
  - Set a radius from the location
  - Create a free account to save events.

  CREATE TABLE users (
  userid SERIAL PRIMARY KEY,
  username VARCHAR,
  password VARCHAR,
  home_location VARCHAR DEFAULT NULL,
  email VARCHAR DEFAULT NULL
  )

  CREATE TABLE events (
  eventid VARCHAR PRIMARY KEY,
  title VARCHAR,
  category VARCHAR(50),
  labels VARCHAR,
  description VARCHAR,
  predicted_attendance INTEGER,
  latitude NUMERIC(11, 8),
  longitude NUMERIC(11, 8),
  start_time VARCHAR, changed this into VARCHAR from timestamp on 4/6/2022
  private VARCHAR(50),
  rank INTEGER,
  local_rank INTEGER,
  address VARCHAR
  )

  CREATE TABLE user_events(
  user_event_id SERIAL PRIMARY KEY,
  userid INTEGER,
  eventid VARCHAR
  ) 

  Also for the .env file, we included these 6 variables:
  POSTGRESQL_USER=<we used ElephantSQL for our PostgreSQL so you can get this there>
  POSTGRESQL_PASSWORD=<same as above>
  SESSION_SECRET=<can be a long random string, used to encrypt and decrypt the cookie token>
  SESSION_MAX_AGE=<we used 360000000 as this value>
  GOOGLE_MAPS=<you need to create an API key at google console and enable the Maps JavaScript API, Places API, Geocoding API, they have $200 free credit each month>
  PREDICTHQ_API_KEY=<you need to create an API key for the Events API at Predict HQ and enable the features including predicted attendance, this has a 14-day expiry>


## Community concerts, performing arts festivals, religious observances, sports, & more…right near you…
# TheHop!
