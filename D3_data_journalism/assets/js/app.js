// @TODO: YOUR CODE HERE!


// set the dimensions and margins of the graph
// var margin = {
//     top: 10, 
//     right: 30, 
//     bottom: 30, 
//     left: 60},

//     width = 460 - margin.left - margin.right,
//     height = 400 - margin.top - margin.bottom;

// // append the svg object to the body of the page
// var svg = d3.select("#scatter")
//   .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//     .attr("transform",
//           "translate(" + margin.left + "," + margin.top + ")");

// //Read the data
// d3.csv("data.csv", function(data) {
//         // Format the data
//         data.forEach(function(d) {
            
//             d.healthcare = +d.healthcare;
//             d.poverty = +d.poverty;
//           });
// //    console.log(data);
//   // Add X axis
//   var xScale = d3.scaleLinear()
//     .domain(([
//     	d3.min([0,d3.min(data,function (d) { return d.healthcare })]),
//     	d3.max([0,d3.max(data,function (d) { return d.healthcare })])
//     	]))
//     .range([ 0, width ]);
//   svg.append("g")
//     .attr("transform", "translate(0," + height + ")")
//     .call(d3.axisBottom(x));

//   // Add Y axis
//   var yScale = d3.scaleLinear()
//     .domain([
//     	d3.min([0,d3.min(data,function (d) { return d.poverty })]),
//     	d3.max([0,d3.max(data,function (d) { return d.poverty })])
//     	])
//     .range([ height, 0]);
//   svg.append("g")
//     .call(d3.axisLeft(y));
  

//   });
//   // Add dots
//   svg.append('g')
//     .selectAll("dot")
//     .data(data)
//     .enter()
//     .append("circle")
//       .attr("cx", function (d) { return xScale(d.healthcare); } )
//       .attr("cy", function (d) { return yScale(d.poverty); } )
//       .attr("r", 1.5)
//       .style("fill", "#69b3a2")

// })




// ----------------------------------------------------


d3.csv('assets/data/data.csv', function (data) {
    // Variables
    // var body = d3.select('body')
      var margin = { top: 50, right: 50, bottom: 50, left: 50 }
      var h = 500 - margin.top - margin.bottom
      var w = 500 - margin.left - margin.right
      var formatPercent = d3.format('.2%')
      // Scales
    // var colorScale = d3.scale.category20()
    var xScale = d3.scaleLinear()
      .domain([
          d3.min([0,d3.min(data,function (d) { return d.healthcare })]),
          d3.max([0,d3.max(data,function (d) { return d.healthcare })])
          ])
      .range([0,w])
    var yScale = d3.scaleLinear()
      .domain([
          d3.min([0,d3.min(data,function (d) { return d.poverty })]),
          d3.max([0,d3.max(data,function (d) { return d.poverty })])
          ])
      .range([h,0])
      // SVG
      var svg = d3.select("#scatter")
            .append("svg")
            .attr("width", w + margin.left + margin.right)
            .attr("height", h + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
                    

    //   var svg = body.append('svg')
    //       .attr('height',h + margin.top + margin.bottom)
    //       .attr('width',w + margin.left + margin.right)
    //     .append('g')
    //       .attr('transform','translate(' + margin.left + ',' + margin.top + ')')
      // X-axis
      var xAxis = d3.svg.axis()
        .scale(xScale)
        .tickFormat(formatPercent)
        .ticks(5)
        .orient('bottom')
    // Y-axis
      var yAxis = d3.svg.axis()
        .scale(yScale)
        .tickFormat(formatPercent)
        .ticks(5)
        .orient('left')
    // Circles
    var circles = svg.selectAll('circle')
        .data(data)
        .enter()
      .append('circle')
        .attr('cx',function (d) { return xScale(d.healthcare) })
        .attr('cy',function (d) { return yScale(d.poverty) })
        .attr('r','10')
        .attr('stroke','black')
        .attr('stroke-width',1)
        // .attr('fill',function (d,i) { return colorScale(i) })
        .on('mouseover', function () {
          d3.select(this)
            .transition()
            .duration(500)
            .attr('r',20)
            .attr('stroke-width',3)
        })
        .on('mouseout', function () {
          d3.select(this)
            .transition()
            .duration(500)
            .attr('r',10)
            .attr('stroke-width',1)
        })
      .append('title') // Tooltip
        .text(function (d) { return d.state +
                             '\nReturn: ' + d.healthcare +
                             '\nStd. Dev.: ' + d.poverty })
    // X-axis
    svg.append('g')
        .attr('class','axis')
        .attr('transform', 'translate(0,' + h + ')')
        .call(xAxis)
      .append('text') // X-axis Label
        .attr('class','label')
        .attr('y',-10)
        .attr('x',w)
        .attr('dy','.71em')
        .style('text-anchor','end')
        .text('Annualized Standard Deviation')
    // Y-axis
    svg.append('g')
        .attr('class', 'axis')
        .call(yAxis)
      .append('text') // y-axis Label
        .attr('class','label')
        .attr('transform','rotate(-90)')
        .attr('x',0)
        .attr('y',5)
        .attr('dy','.71em')
        .style('text-anchor','end')
        .text('Annualized Return')
  })
  