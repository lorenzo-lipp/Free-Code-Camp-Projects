import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import numpy as np

# Import data
df = pd.read_csv('./medical_examination.csv')

# Add 'overweight' column
df['overweight'] = (df['weight'] / ((df['height'] / 100) ** 2) > 25).astype(int)

# Normalize data by making 0 always good and 1 always bad. If the value of 'cholesterol' or 'gluc' is 1, make the value 0. If the value is more than 1, make the value 1.
columns = ['cholesterol', 'gluc']
for column in columns:
  df[column] = (df[column] > 1).astype(int)

# Draw Categorical Plot
def draw_cat_plot():
    # Create DataFrame for cat plot using `pd.melt` using just the values from 'cholesterol', 'gluc', 'smoke', 'alco', 'active', and 'overweight'.
    df_cat = df.melt(id_vars=['cardio'], value_vars=['cholesterol', 'gluc', 'smoke', 'alco', 'active', 'overweight'])

    # Group and reformat the data to split it by 'cardio'. Show the counts of each feature. You will have to rename one of the columns for the catplot to work correctly.
    df_cat = df_cat.groupby(['cardio', 'variable', 'value']).size().reset_index().rename(columns={0: 'total'})

    # Draw the catplot with 'sns.catplot()'
    cat_plot = sns.catplot(x="variable",
                      y="total", 
                      kind="bar", 
                      col="cardio", 
                      data=df_cat, 
                      errorbar=None, 
                      hue="value")
    fig = cat_plot.figure
  
    # Do not modify the next two lines
    fig.savefig('catplot.png')
    return fig


# Draw Heat Map
def draw_heat_map():
    # Clean the data
    df_heat = df[(df['ap_lo'] <= df['ap_hi']) 
                  & (df['height'] >= df['height'].quantile(0.025)) 
                  & (df['height'] <= df['height'].quantile(0.975)) 
                  & (df['weight'] >= df['weight'].quantile(0.025)) 
                  & (df['weight'] <= df['weight'].quantile(0.975))]

    # Calculate the correlation matrix
    corr = df_heat.corr()

    # Generate a mask for the upper triangle
    mask = np.zeros_like(corr, dtype=bool)
    mask[np.triu_indices_from(mask)] = True

    # Set up the matplotlib figure
    fig, ax = plt.subplots(figsize=(14, 11))

    # Draw the heatmap with 'sns.heatmap()'
    heat_map = sns.heatmap(corr,
                           mask=mask,
                           center=0,
                           vmax=0.24,
                           vmin=-0.24,
                           linewidths=0.15,
                           annot=True,
                           cmap="icefire",
                           fmt='.1f')
    fig = heat_map.figure

    # Do not modify the next two lines
    fig.savefig('heatmap.png')
    return fig
