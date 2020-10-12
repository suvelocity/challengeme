# use chart:
- import charts component
- add 2 props: 
1) ``` chart = {[0]} ``` or ``` chart = {[0,1,2]} ``` 0 = Bar chart , 1 = Line chart, 2 = Pie chart, array give an option to desplay the same data in some charts with bottom nav bar. if you want to desplay pie chart you must provide only 1 raw data object.

2) ``` data = {data} ```   
``` javascript
 const data={
    labels: ['January', 'February', 'March','April', 'May'], // array of values for x axis (strings)
    title: 'test', // title for the chart
    rawData: [
      {
        label: 'data1',// name of the line (one or two words)
        backgroundColor: 'red',//raw color
        borderColor: 'red',//use the same as background color
        fill: false, // change the line chart
        data: [65, 59, 80, 81, 56], // array of values for Y axis (numbers)
      },
      {
        label: 'data1',// name of the line (one or two words)
        backgroundColor: 'green',//raw color
        borderColor: 'green',//use the same as background color
        fill: false, // change the line chart
        data: [44, 50, 86, 61, 56], // array of values for Y axis (numbers)
      }
        // you can add as many object as you wand, each one will a different line with different color
    ]
} 
```

- ``` <Charts chart= {[0,1,2]} data={data} /> ```