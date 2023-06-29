import pandas as pd
import matplotlib.pyplot as plt
from scipy.stats import linregress

def draw_plot():
    # Read data from file
    df = pd.read_csv("./epa-sea-level.csv")
    # Create scatter plot
    plt.scatter("Year", "CSIRO Adjusted Sea Level", data=df, s=6, color="blue")
    # Create first line of best fit
    res = linregress(df["Year"], df["CSIRO Adjusted Sea Level"])
    plt.plot(range(1880, 2051), res.intercept + res.slope * range(1880, 2051), color="red")
    # Create second line of best fit
    res_2000 = linregress(df[df["Year"] >= 2000]["Year"], df[df["Year"] >= 2000]["CSIRO Adjusted Sea Level"])
    plt.plot(range(2000, 2051), res_2000.intercept + res_2000.slope * range(2000, 2051), color="orange")
    # Add labels and title
    plt.xticks(range(1850, 2076, 25))
    plt.xlabel("Year")
    plt.ylabel("Sea Level (inches)")
    plt.title("Rise in Sea Level")
    # Save plot and return data for testing (DO NOT MODIFY)
    plt.savefig('sea_level_plot.png')
    return plt.gca()