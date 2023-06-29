# PLANET
- planet_id SERIAL PRIMARY KEY 
- star_id FOREIGN KEY
- name VARCHAR(30) NOT NULL
- diameter_in_km INT
- has_moon BOOLEAN
- is_gas_planet BOOLEAN

# STAR
- star_id SERIAL PRIMARY KEY
- galaxy_id FOREIGN KEY
- name VARCHAR(30) NOT NULL
- diameter_in_km INT
- light_years_from_earth NUMERIC(10, 2)

# GALAXY
- galaxy_id SERIAL PRIMARY KEY
- name VARCHAR(30) NOT NULL
- description TEXT
- visible_by_naked_eye BOOLEAN
- from_local_group BOOLEAN

# MOON
- moon_id SERIAL PRIMARY KEY
- planet_id FOREIGN KEY
- name VARCHAR(30) NOT NULL
- diameter_in_km INT
- mean_orbit_radius_in_km INT

# METEORITE
- meteorite_id SERIAL PRIMARY KEY
- name VARCHAR(30) NOT NULL
- mass_in_kg INT
