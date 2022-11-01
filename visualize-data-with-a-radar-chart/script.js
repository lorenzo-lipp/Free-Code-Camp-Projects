let canvas = document.querySelector('#graph').getContext('2d');

new Chart(canvas, {
  type: 'radar',
  data: {
    labels: ['GTI08', 'GTU100', 'GAM08', 'INF14', 'ADS19'],
    datasets: [{
      label: 'Class average',
      data: [7.16, 8.75, 9.25, 5.48, 7.37],
      backgroundColor: 'rgba(54, 162, 235, 0.3)',
      borderColor: 'rgb(54, 162, 235)',
      pointBackgroundColor: 'rgb(54, 162, 235)',
      pointBorderColor: 'rgb(255, 255, 255)',
      pointHoverRadius: 5.5
    }, {
      label: 'Student average',
      data: [9.3, 10, 10, 10, 9.65],
      backgroundColor: 'rgba(255, 99, 132, 0.3)',
      borderColor: 'rgb(255, 99, 132)',
      pointBackgroundColor: 'rgb(255, 99, 132)',
      pointBorderColor: 'rgb(255, 255, 255)',
      pointHoverRadius: 5.5
    }]
  },
  options: {
    title: {
      display: true,
      text: 'Comparing class and student grades\' average'
    },
    scale: {
      ticks: {
        min: 0
      }
    }
  }
});