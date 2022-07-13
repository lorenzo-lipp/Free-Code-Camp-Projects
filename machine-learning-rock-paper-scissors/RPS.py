import random

cache = []

def player(prev_play, opponent_history=[]):
  global cache
  if prev_play:
    opponent_history.append(prev_play)
  else:
    cache = []
  
  if len(opponent_history) < 15:
    guess = random.choice("RPS")
  else:
    guess = pick_model(opponent_history)

  return guess

def pick_model(history):
  global cache
  win = {"R": "P", "P": "S", "S": "R"}
  choices = []
  last_nine = "".join(history[-9:])
  
  if len(cache) > 0:
    cache.append("".join(history[-10:]))
    last_plays = cache
  else:
    last_plays = batchString("".join(history))
    cache = last_plays
    
  for string in last_plays:
    if last_nine == string[:9]:
      choices.append(string[-1])

  if len(choices) > 1:
    guess = win[random.choice(choices)]
  else:
    guess = win[history[-3]]
  
  return guess 

def batchString(string):
  result = []
  for index, x in enumerate(string):
    next_element = string[index: index + 10]
    if (len(next_element) < 10):
      return result
    result.append(next_element)