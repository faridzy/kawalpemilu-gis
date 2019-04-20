let w = 1200,
    h = 400;

let margin = {
  top: 60,
  bottom: 40,
  left: 70,
  right: 40
};

let width = w - margin.left - margin.right;
let height = h - margin.top - margin.bottom;

let tooltip = d3.select("#map")
                .append("div")
                .style("position", "fixed")
                .style("z-index", 1)
                .style("visibility", "hidden");;

// define map projection
let projection = d3.geoMercator()
                  .translate([-1900, 150])
                  .scale([1200]);

//Define default path generator
let path = d3.geoPath()
            .projection(projection);
            
let svg = d3.select("#map")
            .append("svg")
            .attr("id", "chart")
            .attr("width", w)
            .attr("height", h)
            .append("g")
            .attr("tranform", "translate(0" + margin.left + "," + margin.top + ")");



let date = Date.now();
let APIurl = "https://kawal-c1.appspot.com/api/c/0?" + date;
let lengthOfData;
let jsonFeatures;
let candidateOneTotal = 0; 
let candidateTwoTotal = 0;
let validTotal = 0;
let invalidTotal = 0;
let TPSTotal = 0;
let receivedTPSTotal = 0;
let unprocessedTPSTotal = 0;
let errorTPSTotal = 0;


let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

//Warna untuk Jokowi Maruf
let candidateOneColor = d3.scaleLinear()
                          .domain([.5, .6, .7, .8, .9])
                          .range(["#E05F6B", "#DD4F5D", "#C94855", "#B5414D", "#A13A44"])

// Warna untuk Prabowo Sandi
let candidateTwoColor = d3.scaleLinear()
                          .domain([.5, .6, .7, .8, .9])
                          .range(["#85B4DF", "#79ADDC", "#6E9EC8", "#648EB5", "#597EA1"])


d3.select("#last-update")
  .text(() => {
    let lastUpdateTime = new Date();
    let time = lastUpdateTime.toLocaleDateString('id-ID', options) + " " + lastUpdateTime.toLocaleTimeString();
    return time;
  })

d3.json(APIurl, function(error, data) {

  lengthOfData = data["children"].length;
  d3.json("src/assets/json/indonesia.json", function(error, id) {

    if (error) {
      return console.log(error);
    }
    for (let i = 0; i< lengthOfData; i++) {
      let provinceID = data["children"][i][0];
      let provinceName = data["children"][i][1];
      let provinceTPSNo = data["children"][i][2];
      TPSTotal += provinceTPSNo;
      let receivedTPS = data["data"][provinceID]["sum"]["cakupan"];
      receivedTPSTotal += receivedTPS;
      let unprocessedTPS = data["data"][provinceID]["sum"]["pending"];
      unprocessedTPSTotal += unprocessedTPS;
      let errorTPS = data["data"][provinceID]["sum"]["error"];
      errorTPSTotal += errorTPS;
      let candidateOne = data["data"][provinceID]["sum"]["pas1"];
      candidateOneTotal += candidateOne;
      let candidateTwo = data["data"][provinceID]["sum"]["pas2"];
      candidateTwoTotal += candidateTwo;
      let valid = data["data"][provinceID]["sum"]["sah"];
      validTotal += valid;
      let invalid = data["data"][provinceID]["sum"]["tSah"];
      invalidTotal += invalid;

      if (i < lengthOfData - 2) {
        jsonFeatures = topojson.feature(id, id.objects.states_provinces).features;

        for (let j = 0; i < jsonFeatures.length; j++) {

          let provinceNameJSON;
          if (jsonFeatures[j]["properties"]["name"] == null) {
              continue;
          } else {
              provinceNameJSON = jsonFeatures[j]["properties"]["name"];
          }

          if (provinceNameJSON.toLowerCase() == provinceName.toLowerCase()) {

            jsonFeatures[j]["properties"]["provinceID"] = provinceID;

            jsonFeatures[j]["properties"]["provinceTPSNo"] = provinceTPSNo;

            jsonFeatures[j]["properties"]["receivedTPS"] = receivedTPS;

            jsonFeatures[j]["properties"]["unprocessedTPS"] = unprocessedTPS;

            jsonFeatures[j]["properties"]["errorTPS"] = errorTPS;

            jsonFeatures[j]["properties"]["candidateOne"] = candidateOne;

            jsonFeatures[j]["properties"]["candidateTwo"] = candidateTwo;

            jsonFeatures[j]["properties"]["valid"] = valid;

            jsonFeatures[j]["properties"]["invalid"] = invalid;

            break;
          }
        }

      }
    }
            
    d3.select("#total-votes")
      .text(() => {
        return (validTotal + invalidTotal).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      })

    d3.select("#valid-votes")
      .text(() => {
        return validTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      })

    d3.select("#valid-votes-percentage")
      .text(() => {
        return (validTotal / (validTotal + invalidTotal) * 100).toFixed(2) + "%";
      })
    
    d3.select("#invalid-votes-percentage")
      .text(() => {
        return (invalidTotal / (validTotal + invalidTotal) * 100).toFixed(2) + "%";
      })
    
    d3.select("#invalid-votes")
      .text(() => {
        return invalidTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      })

    d3.select("#jokomaruf-vote")
      .text(candidateOneTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    
    d3.select("#prabowosandi-vote")
      .text(candidateTwoTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));

    d3.select("#jokomaruf-vote-percentage")
      .text(() => {
        return (candidateOneTotal / (candidateOneTotal + candidateTwoTotal) * 100).toFixed(2) + "%"
      })
    
    d3.select("#prabowosandi-vote-percentage")
      .text(() => {
        return (candidateTwoTotal / (candidateOneTotal + candidateTwoTotal) * 100).toFixed(2) + "%"
      })

    d3.select("#received-TPS")
      .text(() => {
        return receivedTPSTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " (" + (receivedTPSTotal/TPSTotal * 100).toFixed(2) +  "%)";
      })

    d3.select("#unprocessed-TPS")
    .text(() => {
      return unprocessedTPSTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    })

    d3.select("#error-TPS")
    .text(() => {
      return errorTPSTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    })

    svg.selectAll(".province")
        .data(jsonFeatures)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("class", "province")
        .attr("id", d => {
          return d["properties"]["postal"];
        })
        .style("fill", d => {
          if (d["properties"]["candidateOne"] > d["properties"]["candidateTwo"]) {
            return candidateOneColor(d["properties"]["candidateOne"]/ (d["properties"]["candidateOne"] + d["properties"]["candidateTwo"]));
          } else {
            return candidateTwoColor(d["properties"]["candidateTwo"]/ (d["properties"]["candidateOne"] + d["properties"]["candidateTwo"]))
          }
        })
        .style('stroke', 'black')
        .on("mouseover", d => {

          let tempTotal = d["properties"]["candidateOne"] + d["properties"]["candidateTwo"]
          let tempCandidateOnePercentage = ((d["properties"]["candidateOne"] / tempTotal) * 100).toFixed(2)
          let tempCandidateTwoPercentage = ((d["properties"]["candidateTwo"] / tempTotal) * 100).toFixed(2)

          tooltip.html(`
            <div class="tooltip">
              <p style="text-align: center; font-weight: bold; font-size: 14px;">${d["properties"]["name"].toUpperCase()}</p>
              <p style="padding: 0 2px;"><span style="float: left; color: #AC0B13;">${d["properties"]["candidateOne"].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span> <span style="float: right; color: #79ADDC;">${d["properties"]["candidateTwo"].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span></p><br/>
              <p><span style="float: left; color: #AC0B13;">${tempCandidateOnePercentage}%</span> <span style="float: right; color: #79ADDC;">${tempCandidateTwoPercentage}%</span></p><br/>
            </div>
          `)

          tooltip.style("visibility", "visible");
        })
        .on("mouseout", () => {
            tooltip.style("visibility", "hidden");
        })
        .on("mousemove", () => {
            tooltip.style("top", (d3.event.clientY - 90) + 'px').style("left", (d3.event.clientX - 80) + 'px');    
        })
  
      d3.select("#presidential-election")
        .on("click", function(){

          d3.select("#legislative-election")
            .style("background-color", "#DAC6B5");

          d3.select("#presidential-election")
            .style("background-color", "#B3A395");
  
          d3.select("#president")
            .style("display", "block");
  
          d3.select("#legislative")
            .style("display", "none");

          svg.selectAll(".province")
            .transition()
            .duration(1000)
            .style("fill", d => {
              if (d["properties"]["candidateOne"] > d["properties"]["candidateTwo"]) {
                return candidateOneColor(d["properties"]["candidateOne"]/ (d["properties"]["candidateOne"] + d["properties"]["candidateTwo"]));
              } else {
                return candidateTwoColor(d["properties"]["candidateTwo"]/ (d["properties"]["candidateOne"] + d["properties"]["candidateTwo"]))
              }
            })

          svg.selectAll(".province")
            .on("mouseover", d => {

              let tempTotal = d["properties"]["candidateOne"] + d["properties"]["candidateTwo"]
              let tempCandidateOnePercentage = ((d["properties"]["candidateOne"] / tempTotal) * 100).toFixed(2)
              let tempCandidateTwoPercentage = ((d["properties"]["candidateTwo"] / tempTotal) * 100).toFixed(2)
    
              tooltip.html(`
                <div class="tooltip">
                  <p style="text-align: center; font-weight: bold; font-size: 14px;">${d["properties"]["name"].toUpperCase()}</p>
                  <p style="padding: 0 2px;"><span style="float: left; color: #AC0B13;">${d["properties"]["candidateOne"].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span> <span style="float: right; color: #79ADDC;">${d["properties"]["candidateTwo"].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span></p><br/>
                  <p><span style="float: left; color: #AC0B13;">${tempCandidateOnePercentage}%</span> <span style="float: right; color: #79ADDC;">${tempCandidateTwoPercentage}%</span></p><br/>
                </div>
              `)
    
              tooltip.style("visibility", "visible");
            })
          
        })
  })
})

console.log("Test")