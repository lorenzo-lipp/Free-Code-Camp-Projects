import re

def arithmetic_arranger(problems, showAnswers=False):
  # Checks if there is more than 5 problems
  if (len(problems) > 5):
    return "Error: Too many problems."

  # Divides the problem in 3 items of a list, 0 and 2 are the numbers, 1 is the operator
  list_of_problems = []
  for p in problems:
    this_problem = re.match(r'([\w]+)\s*(\S)\s*([\w]+)', p)
    list_of_problems.append([this_problem.group(1), this_problem.group(2), this_problem.group(3)])

  arranged_problems_list = ["", "", "", ""]
  for problem in list_of_problems:
    # Check if one of the numbers is bigger than 4 digits
    if len(problem[0]) > 4 or len(problem[2]) > 4:
      return "Error: Numbers cannot be more than four digits."
    # Check the operator
    if problem[1] != "+" and problem[1] != "-":
      return "Error: Operator must be '+' or '-'."
    # Check if numbers are integers and only contain digits
    try:
      if problem[1] == "+":
        result = int(problem[0]) + int(problem[2])
      else:
        result = int(problem[0]) - int(problem[2])
    except:
      return "Error: Numbers must only contain digits."
    # If it is not the first iteration, adds four blankspaces in each line end 
    if arranged_problems_list[0] != "":
      for index, item in enumerate(arranged_problems_list):
          arranged_problems_list[index] += "    "
    
    size = max(len(problem[0]), len(problem[2])) + 2
    arranged_problems_list[0] += problem[0].rjust(size, " ")
    arranged_problems_list[1] += problem[1] + problem[2].rjust(size - 1, " ")
    arranged_problems_list[2] += "".rjust(size, "-")
    arranged_problems_list[3] += str(result).rjust(size, " ")

  if showAnswers:
    arranged_problems = "\n".join(arranged_problems_list)
  else:
    arranged_problems = "\n".join(arranged_problems_list[:-1])
  
  return arranged_problems
