class Category:
  def __init__(self, type):
    self.type = type
    self.ledger = []
    self.funds = 0
    self.fundsWithdraw = 0

  def __str__(self):
    lines = []
    lines.append(self.type.center(30, "*"))
    for deposit in self.ledger:
      description = str(deposit["description"])[:23].ljust(23, " ")
      amount = "{:.2f}".format(deposit["amount"])[:7].rjust(7, " ")
      lines.append(description + amount)
    lines.append("Total: " + str(self.funds))
    return "\n".join(lines)

  def deposit(self, amount, description=""):
    self.funds += amount
    self.ledger.append({ "amount": amount, "description": description })

  def withdraw(self, amount, description=""):
    if self.check_funds(amount):
      self.funds -= amount
      self.fundsWithdraw += amount
      self.ledger.append({ "amount": -amount, "description": description })
      return True
    else:
      return False

  def get_balance(self):
    return self.funds

  def transfer(self, amount, category):
    if self.check_funds(amount):
      self.funds -= amount
      self.fundsWithdraw += amount
      self.ledger.append({ "amount": -amount, "description": "Transfer to " + category.type})
      category.deposit(amount, "Transfer from " + self.type)
      return True
    else:
      return False

  def check_funds(self, amount):
    return self.funds >= amount

def create_spend_chart(categories):
  size = len(categories)
  biggest_word = 0
  total_withdraw = 0
  start = 0
  lines = []
  lines.append("Percentage spent by category")
  percent = 100

  for category in categories:
    length = len(category.type)
    total_withdraw += category.fundsWithdraw
    
    if length > biggest_word:
      biggest_word = length
  
  while percent >= 0:
    string = str(percent) + "|"
    string = string.rjust(4, " ")

    for category in categories:
      if category.fundsWithdraw / total_withdraw >= percent / 100:
        string += " o "
      else:
        string += "   "
    
    lines.append(string.rjust(4, " ").ljust(5 + size * 3, " "))
    percent -= 10

  lines.append("    ".ljust(5 + size * 3, "-"))

  while biggest_word > start:
    string = "    "

    for category in categories:
      length = len(category.type)
      if length > start:
        string += category.type[start].center(3, " ")
      else:
        string += "".center(3, " ")

    string = string.ljust(5 + size * 3, " ")
    lines.append(string)
    start += 1
    
  return "\n".join(lines)