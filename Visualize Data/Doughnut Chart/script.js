d3.csv('https://gist.githubusercontent.com/lorenzo-lipp/e6b056993fc9a22654a0a0c2a0c5c7f6/raw/08e8bd9d69d6dde497a6b8f4bdfe4929eb7108eb/2510001501-eng.csv')
  .then(data => {
    let canvas = document.querySelector('#graph').getContext('2d');

    new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: data.map(v => v['Type']),
        datasets: [{
          data: data.map(v => +v['July 2022'].replaceAll(',', '')),
          backgroundColor: [
            '#22577a',
            '#38a3a5',
            '#57cc99',
            '#80ed99',
            '#c7f9cc',
            '#a7c957'
          ],
          borderWidth: 2,
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Electric power generation, monthly generation by type of electricity in Megawatt hours - Statistics Canada'
        },
      }
    })
  });