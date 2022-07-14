import numpy as np

def calculate(list):
  if (len(list) != 9):
    raise ValueError("List must contain nine numbers.")

  flatten = np.array(list)
  arr = np.reshape(flatten, (3,3))
  list_mean = []
  list_variance = []
  list_std = []
  list_max = []
  list_min = []
  list_sum = []

  for i in range(2):
      list_mean.append(arr.mean(axis=i).tolist())
      list_variance.append(arr.var(axis=i).tolist())
      list_std.append(arr.std(axis=i).tolist())
      list_max.append(arr.max(axis=i).tolist())
      list_min.append(arr.min(axis=i).tolist())
      list_sum.append(arr.sum(axis=i).tolist())
  
  list_mean.append(flatten.mean().tolist())
  list_variance.append(flatten.var().tolist())
  list_std.append(flatten.std().tolist())
  list_max.append(flatten.max().tolist())
  list_min.append(flatten.min().tolist())
  list_sum.append(flatten.sum().tolist())

  calculations = {
  'mean': list_mean,
  'variance': list_variance,
  'standard deviation': list_std,
  'max': list_max,
  'min': list_min,
  'sum': list_sum
  }
  
  return calculations