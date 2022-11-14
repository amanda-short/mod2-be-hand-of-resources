-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP table if exists cities;
DROP table if exists countries;
DROP table if exists dragons;
DROP table if exists movies;
DROP table if exists songs;

CREATE table cities (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR,
    state VARCHAR,
    population VARCHAR
);

CREATE table countries (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR,
    language VARCHAR,
    population VARCHAR
);

CREATE table dragons (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR,
    origin VARCHAR,
    color VARCHAR
);

CREATE table movies (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR,
    release INT NOT NULL,
    studio VARCHAR
);

CREATE table songs (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR,
    artist VARCHAR,
    release INT NOT NULL
);

INSERT INTO cities (
    name,
    state,
    population
)
VALUES
  ('NYC', 'New York', '8.4 million'),
  ('St Louis', 'Missouri', '293,000'),
  ('Seattle', 'Washington', '733,000'),
  ('San Diego', 'California', '1.3 million'),
  ('Nashville', 'Tennessee', '692,000');
 

  INSERT INTO countries (
    name,
    language,
    population
)
VALUES
  ('Italy', 'Italian', '59 million'),
  ('Belgium', 'Dutch', '12 million'),
  ('Mexico', 'Spanish', '130 million'),
  ('Djibouti', 'Arabic', '1 million'),
  ('Kenya', 'Swahili', '55 million');
  

  INSERT INTO dragons (
    name,
    origin,
    color 
)
VALUES
  ('Hungarian Horntail', 'Hungary', 'Black'),
  ('Swedish Short Snout', 'Sweden', 'Silvery Blue'),
  ('Chinese Fireball', 'China', 'Scarlet'),
  ('Common Welsh Green', 'Wales', 'Green'),
  ('Norwegian Ridgeback', 'Norway', 'Black');
 

  INSERT INTO movies (
    title,
    release,
    studio 
)
VALUES
  ('Titanic', '1997', 'Paramount Pictures'),
  ('9 to 5', '1980', 'IPC Films'),
  ('Erin Brockovish', '2000', 'Universal Pictures'),
  ('Forrest Gump', '1994', 'The Tisch Company'),
  ('Wild', '2014', 'Pacific Standard');
 

  INSERT INTO songs (
    name,
    artist,
    release
)
VALUES
  ('Creep', 'Radiohead', '1992'),
  ('Imagine', 'John Lennon', '1971'),
  ('Respect', 'Aretha Franklin', '1967'),
  ('I Will Always Love You', 'Whitney Houston', '1992'),
  ('Purple Rain', 'Prince', '1984');
  
