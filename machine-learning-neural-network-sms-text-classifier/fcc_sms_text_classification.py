# import libraries
try:
  # %tensorflow_version only exists in Colab.
  !pip install tf-nightly # Google Colab
except Exception:
  pass

!pip install tensorflow-datasets # Google Colab

import tensorflow as tf
import tensorflow_datasets as tfds
from tensorflow import keras
from keras.preprocessing.text import Tokenizer
from keras_preprocessing.sequence import pad_sequences

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import re

# get data files
!wget https://cdn.freecodecamp.org/project-data/sms/train-data.tsv # Google Colab
!wget https://cdn.freecodecamp.org/project-data/sms/valid-data.tsv # Google Colab

train_file_path = "train-data.tsv"
test_file_path = "valid-data.tsv"

train_data = pd.read_csv(train_file_path, names=["type", "message"], sep="\t", header=None)
test_data = pd.read_csv(test_file_path, names=["type", "message"], sep="\t", header=None)

train_data.head()

train_data['message'] = train_data['message'].apply(lambda x: x.lower())
train_data['message'] = train_data['message'].apply(lambda x: re.sub('[^a-zA-z0-9\s]', ' ', x))

tokenizer = Tokenizer(num_words=10000, split=' ')
tokenizer.fit_on_texts(train_data['message'].values)

X = tokenizer.texts_to_sequences(train_data['message'].values)
X = pad_sequences(X, maxlen=190)

Y = pd.factorize(train_data["type"])[0].astype('float32')

model = keras.Sequential()

model.add(keras.layers.Embedding(10000, 128, input_length=X.shape[1]))
model.add(keras.layers.LSTM(196, dropout=0.2, recurrent_dropout=0.2))
model.add(keras.layers.Dense(1, activation='sigmoid'))

model.compile(optimizer="adam", metrics=['accuracy'], loss='binary_crossentropy')

model.summary()

model.fit(X, Y, epochs=10)

# function to predict messages based on model
# (should return list containing prediction and label, ex. [0.008318834938108921, 'ham'])
def predict_message(pred_text):
  pred_text = re.sub('[^a-zA-z0-9\s]', ' ', pred_text)
  
  test_X = tokenizer.texts_to_sequences([pred_text])
  test_X = pad_sequences(test_X, maxlen=190)

  num = model.predict(test_X)[0]
  label = ["ham", "spam"][round(num[0])]
  
  prediction = [num, label]
  return prediction

pred_text = "how are you doing today?"

prediction = predict_message(pred_text)
print(prediction)

predict_message("sale today! to stop texts call 98912460324")

# Run this cell to test your function and model. Do not modify contents.
def test_predictions():
  test_messages = ["how are you doing today",
                   "sale today! to stop texts call 98912460324",
                   "i dont want to go. can we try it a different day? available sat",
                   "our new mobile video service is live. just install on your phone to start watching.",
                   "you have won £1000 cash! call to claim your prize.",
                   "i'll bring it tomorrow. don't forget the milk.",
                   "wow, is your arm alright. that happened to me one time too"
                  ]

  test_answers = ["ham", "spam", "ham", "spam", "spam", "ham", "ham"]
  passed = True

  for msg, ans in zip(test_messages, test_answers):
    prediction = predict_message(msg)
    if prediction[1] != ans:
      passed = False

  if passed:
    print("You passed the challenge. Great job!")
  else:
    print("You haven't passed yet. Keep trying.")

test_predictions()