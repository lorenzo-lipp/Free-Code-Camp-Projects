# import libraries (you may add additional imports but you may not have to)
import numpy as np
import pandas as pd
from scipy.sparse import csr_matrix
from sklearn.neighbors import NearestNeighbors
import matplotlib.pyplot as plt

# get data files
!wget https://cdn.freecodecamp.org/project-data/books/book-crossings.zip # Google Colab

!unzip book-crossings.zip # Google Colab

books_filename = 'BX-Books.csv'
ratings_filename = 'BX-Book-Ratings.csv'

# import csv data into dataframes
df_books = pd.read_csv(
  books_filename,
  encoding = "ISO-8859-1",
  sep=";",
  header=0,
  names=['isbn', 'title', 'author'],
  usecols=['isbn', 'title', 'author'],
  dtype={'isbn': 'str', 'title': 'str', 'author': 'str'})

df_ratings = pd.read_csv(
  ratings_filename,
  encoding = "ISO-8859-1",
  sep=";",
  header=0,
  names=['user', 'isbn', 'rating'],
  usecols=['user', 'isbn', 'rating'],
  dtype={'user': 'int32', 'isbn': 'str', 'rating': 'float32'})

# add your code here - consider creating a new cell for each section of code

book_filter = df_ratings["isbn"].value_counts()
rating_filter = df_ratings["user"].value_counts()

df_books = df_books[df_books["isbn"].isin(book_filter[book_filter.ge(100)].index)]
df_books.head()

df_ratings = df_ratings[df_ratings["user"].isin(rating_filter[rating_filter.ge(200)].index)]
df_ratings.head()

df = df_books.merge(df_ratings)
df = df.drop_duplicates(['title', 'user'])
df.head()

df_piv = df.pivot(index='title', columns='user', values='rating').fillna(0)
df_piv.head()

knn = NearestNeighbors(n_neighbors=6, algorithm='auto', metric='cosine')
knn.fit(csr_matrix(df_piv.values))

# function to return recommended books - this will be tested
def get_recommends(book = ""):
  search = df_piv[df_piv.index == book].values
  result = knn.kneighbors(search)
  recommended_books = [book, []]
  for i in reversed(range(1,6)):
    recommended_books[1].append([df_piv.iloc[result[1][0][i]].name, result[0][0][i]])
  return recommended_books

# Run this to test the model

books = get_recommends("Where the Heart Is (Oprah's Book Club (Paperback))")
print(books)

def test_book_recommendation():
  test_pass = True
  recommends = get_recommends("Where the Heart Is (Oprah's Book Club (Paperback))")
  if recommends[0] != "Where the Heart Is (Oprah's Book Club (Paperback))":
    test_pass = False
  recommended_books = ["I'll Be Seeing You", 'The Weight of Water', 'The Surgeon', 'I Know This Much Is True']
  recommended_books_dist = [0.8, 0.77, 0.77, 0.77]
  for i in range(2): 
    if recommends[1][i][0] not in recommended_books:
      test_pass = False
    if abs(recommends[1][i][1] - recommended_books_dist[i]) >= 0.05:
      test_pass = False
  if test_pass:
    print("You passed the challenge! 🎉🎉🎉🎉🎉")
  else:
    print("You haven't passed yet. Keep trying!")

test_book_recommendation()