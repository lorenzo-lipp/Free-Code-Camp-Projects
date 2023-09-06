# Page View Time Series Visualizer

- This python script plots a line chart, a bar chart, and a box plot using data from a CSV file.

Technologies used: Python, Numpy, Pandas, Matplotlib, Seaborn

# Live Version

https://replit.com/@lorenzo-lipp/Page-View-Time-Series-Visualizer

![image](./images/line_plot.png)
![image](./images/bar_plot.png)
![image](./images/box_plot.png)

# Running Locally

To run this locally, run the following commands in a terminal:

```
python main.py
```

# Requirements

- Use Pandas to import the data from "fcc-forum-pageviews.csv". Set the index to the date column.
- Clean the data by filtering out days when the page views were in the top 2.5% of the dataset or bottom 2.5% of the dataset.
- Create a draw_line_plot function that uses Matplotlib to draw a line chart similar to "examples/Figure_1.png". The title should be Daily freeCodeCamp Forum Page Views 5/2016-12/2019. The label on the x axis should be Date and the label on the y axis should be Page Views.
-Create a draw_bar_plot function that draws a bar chart similar to "examples/Figure_2.png". It should show average daily page views for each month grouped by year. The legend should show month labels and have a title of Months. On the chart, the label on the x axis should be Years and the label on the y axis should be Average Page Views.
- Create a draw_box_plot function that uses Seaborn to draw two adjacent box plots similar to "examples/Figure_3.png". These box plots should show how the values are distributed within a given year or month and how it compares over time. The title of the first chart should be Year-wise Box Plot (Trend) and the title of the second chart should be Month-wise Box Plot (Seasonality). Make sure the month labels on bottom start at Jan and the x and y axis are labeled correctly. The boilerplate includes commands to prepare the data.