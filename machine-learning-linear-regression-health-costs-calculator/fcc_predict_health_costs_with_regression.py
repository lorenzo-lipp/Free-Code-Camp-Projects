# Import libraries. You may or may not use all of these.
!pip install -q git+https://github.com/tensorflow/docs # Google Colab
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

try:
  # %tensorflow_version only exists in Colab.
  %tensorflow_version 2.x
except Exception:
  pass
import tensorflow as tf

from tensorflow import keras
from tensorflow.keras import layers

import tensorflow_docs as tfdocs
import tensorflow_docs.plots
import tensorflow_docs.modeling

# Import data
!wget https://cdn.freecodecamp.org/project-data/health-costs/insurance.csv # Google Colab
dataset = pd.read_csv('insurance.csv')
dataset["age"] = dataset["age"].astype('float32')
dataset["children"] = dataset["children"].astype('float32')
dataset["sex"] = (dataset["sex"] == "male").astype('float32')
dataset["smoker"] = (dataset["smoker"] == "yes").astype('float32')
dataset["region"] = pd.factorize(dataset["region"])[0].astype('float32')

dataset.tail()

train_dataset = dataset.sample(frac=0.8, random_state=166)
test_dataset = dataset[~dataset.index.isin(train_dataset.index)]

train_dataset = train_dataset.reset_index(drop=True)
test_dataset = test_dataset.reset_index(drop=True)

train_labels = train_dataset.pop('expenses')
test_labels = test_dataset.pop('expenses')

model = keras.Sequential()

model.add(layers.Dense(64, activation="relu", input_shape=[len(train_dataset.keys())]))
model.add(layers.Dense(32, activation="relu"))
model.add(layers.Dense(1))

model.compile(optimizer="RMSprop", metrics=['mae', 'mse'], loss='mae')

model.summary()

model.fit(
    x=train_dataset,
    y=train_labels,
    epochs=1000,
    validation_split=0.3,
    verbose=0)

# RUN THIS CELL TO TEST YOUR MODEL. DO NOT MODIFY CONTENTS.
# Test model by checking how well the model generalizes using the test set.
loss, mae, mse = model.evaluate(test_dataset, test_labels, verbose=2)

print("Testing set Mean Abs Error: {:5.2f} expenses".format(mae))

if mae < 3500:
  print("You passed the challenge. Great job!")
else:
  print("The Mean Abs Error must be less than 3500. Keep trying.")

# Plot predictions.
test_predictions = model.predict(test_dataset).flatten()

a = plt.axes(aspect='equal')
plt.scatter(test_labels, test_predictions)
plt.xlabel('True values (expenses)')
plt.ylabel('Predictions (expenses)')
lims = [0, 50000]
plt.xlim(lims)
plt.ylim(lims)
_ = plt.plot(lims,lims)