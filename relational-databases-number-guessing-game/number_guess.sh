#!/bin/bash

echo "Enter your username:"
read NAME

NUMBER=$(expr $RANDOM % 1000 + 1)
PSQL="psql -U freecodecamp -d number_guess -t -c"
TRIES=0

echo $($PSQL "SELECT * FROM users WHERE username='$NAME'") | while read USERNAME BAR GAMES_PLAYED BAR BEST_GAME
do
  if [[ -z $USERNAME ]]
  then
    echo "Welcome, $NAME! It looks like this is your first time here."
  else
    echo "Welcome back, $USERNAME! You have played $GAMES_PLAYED games, and your best game took $BEST_GAME guesses."
  fi
done

ASK_GUESS() {

  if [[ $1 ]]
  then 
    echo $1
  else
    echo "Guess the secret number between 1 and 1000:"
  fi

  read GUESS

  if [[ $GUESS =~ ^[0-9]+$ ]]
  then

    TRIES=$(( TRIES + 1 ))

    if [[ $NUMBER -lt $GUESS ]]
    then
      ASK_GUESS "It's lower than that, guess again:"
    elif [[ $NUMBER -gt $GUESS ]]
    then
      ASK_GUESS "It's higher than that, guess again:"
    else
      echo "You guessed it in $TRIES tries. The secret number was $NUMBER. Nice job!"
    fi

  else
    ASK_GUESS "That is not an integer, guess again:"
  fi
}

ASK_GUESS

echo $($PSQL "SELECT * FROM users WHERE username='$NAME'") | while read USERNAME BAR GAMES_PLAYED BAR BEST_GAME
do
  if [[ -z $USERNAME ]]
  then
    INSERT_RESULT=$($PSQL "INSERT INTO users(username, games_played, best_game) VALUES('$NAME', 1, $TRIES)")
  elif [[ $BEST_GAME -gt $TRIES ]]
  then
    UPDATE_RESULT=$($PSQL "UPDATE users SET best_game = $TRIES, games_played = games_played + 1 WHERE username = '$USERNAME'")
  else
    UPDATE_RESULT=$($PSQL "UPDATE users SET games_played = games_played + 1 WHERE username = '$USERNAME'")
  fi
done