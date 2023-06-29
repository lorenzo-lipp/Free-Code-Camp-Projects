# Sea Level Predictor

- This python script plots a graphic predicting the sea level using data from a CSV file.

Technologies used: Python, Numpy, Pandas, Matplotlib

# Live Version

https://replit.com/@lorenzo-lipp/Sea-Level-Predictor

![image](./images/sea_level_plot.png)

# Running Locally

To run this locally, run the following commands in a terminal:

```
python main.py
```

# Requirements

- Use Pandas to import the data from epa-sea-level.csv.
- Use matplotlib to create a scatter plot using the Year column as the x-axis and the CSIRO Adjusted Sea Level column as the y-axis.
- Use the linregress function from scipy.stats to get the slope and y-intercept of the line of best fit. Plot the line of best fit over the top of the scatter plot. Make the line go through the year 2050 to predict the sea level rise in 2050.
- Plot a new line of best fit just using the data from year 2000 through the most recent year in the dataset. Make the line also go through the year 2050 to predict the sea level rise in 2050 if the rate of rise continues as it has since the year 2000.
- The x label should be Year, the y label should be Sea Level (inches), and the title should be Rise in Sea Level.

# Data Source
Global Average Absolute Sea Level Change, 1880-2014 from the US Environmental Protection Agency using data from CSIRO, 2015; NOAA, 2015.