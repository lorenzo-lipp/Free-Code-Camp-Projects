import copy
import random
# Consider using the modules imported above.

class Hat:
  def __init__(self, **kwargs):
    self.contents = []
    
    for k, v in kwargs.items():
      while(v > 0):
        self.contents.append(k)
        v -= 1

  def draw(self, num):
    result = []

    if num > len(self.contents):
      num = len(self.contents)
    
    while num > 0:
      ball = random.choice(self.contents)
      result.append(ball)
      self.contents.remove(ball)
      num -= 1
    
    return result
    
def experiment(hat, expected_balls, num_balls_drawn, num_experiments):
  match_experiment = 0
  experiments = num_experiments
  expected_balls_len = len(expected_balls)
  
  while experiments > 0:
    hat_copy = copy.deepcopy(hat)
    matches = 0
    result = hat_copy.draw(num_balls_drawn)
    experiments -= 1

    for k, v in expected_balls.items():
      quantity = 0
      
      for i in result:
        if i == k:
          quantity += 1

      if quantity >= v:
        matches += 1
    
    if matches >= expected_balls_len:
      match_experiment += 1
    
  return match_experiment / num_experiments
    