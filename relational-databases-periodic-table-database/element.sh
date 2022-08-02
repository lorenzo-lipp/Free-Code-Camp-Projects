#!/bin/bash
PSQL="psql -U freecodecamp -d periodic_table -t -c"

if [[ $1 ]]
then

  if [[ $1 =~ ^[0-9]+$ ]]
  then
    echo "$($PSQL "SELECT atomic_number, name, symbol, type, atomic_mass, melting_point_celsius, boiling_point_celsius 
      FROM properties INNER JOIN types USING(type_id) INNER JOIN elements USING(atomic_number) 
      WHERE atomic_number = $1")" | while read ATOMIC_NUMBER BAR NAME BAR SYMBOL BAR TYPE BAR MASS BAR MELTING_POINT BAR BOILING_POINT
    do
      if [[ -z $ATOMIC_NUMBER ]]
      then
        echo "I could not find that element in the database."
      else
        echo "The element with atomic number $ATOMIC_NUMBER is $NAME ($SYMBOL). It's a $TYPE, with a mass of $MASS amu. Hydrogen has a melting point of $MELTING_POINT celsius and a boiling point of $BOILING_POINT celsius."
      fi
    done
  else
    echo "$($PSQL "SELECT atomic_number, name, symbol, type, atomic_mass, melting_point_celsius, boiling_point_celsius 
      FROM properties INNER JOIN types USING(type_id) INNER JOIN elements USING(atomic_number) 
      WHERE name = '$1' OR symbol = '$1'")" | while read ATOMIC_NUMBER BAR NAME BAR SYMBOL BAR TYPE BAR MASS BAR MELTING_POINT BAR BOILING_POINT
    do
      if [[ -z $ATOMIC_NUMBER ]]
      then
        echo "I could not find that element in the database."
      else
        echo "The element with atomic number $ATOMIC_NUMBER is $NAME ($SYMBOL). It's a $TYPE, with a mass of $MASS amu. $NAME has a melting point of $MELTING_POINT celsius and a boiling point of $BOILING_POINT celsius."
      fi
    done
  fi
else
  echo "Please provide an element as an argument."
fi