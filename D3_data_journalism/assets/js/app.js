

// ----------------------------------------------------

// Load data
d3.csv('assets/data/data.csv').then(function(data) {
    
  // Format the data
  data.forEach(function(d_var) {
    d_var.healthcare = +d_var.healthcare;
    d_var.poverty = +d_var.poverty;
  });

    
    
    // Variables
    // var body = d3.select('body')
      var margin = { top: 50, right: 50, bottom: 50, left: 50 }
      var h = 500 - margin.top - margin.bottom
      var w = 800 - margin.left - margin.right
      var formatPercent = d3.format('.2%');
      // Scales
    // var colorScale = d3.scale.category20()



    // create scales
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
      var xAxis = d3.axisBottom(xScale)
        // .ticks(5)
      // Y-axis
      var yAxis = d3.axisLeft(yScale)
        // .ticks(5)
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
            .attr('r',15)
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
        .text(function (d) { return d.state})
    // X-axis
    
    svg.append('g')
        .attr('class','axis')
        .attr('transform', 'translate(0,' + h + ')')
        .call(xAxis)
        .append('text') // X-axis Label
      
      .attr('y',-10)
      .attr('x',w)
      .attr('dy','.71em')
      .style('text-anchor','middle')
      .attr("fill", "black")
      .attr("font-size", "80px")
      .text('Healthcare')
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
        .attr("fill", "black")
        .text('Poverty')
  

  })
  