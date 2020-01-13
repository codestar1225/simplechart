import React, { Component } from "react";
import axios from "axios";
import './App.css';
import { Picky } from "react-picky";
import "react-picky/dist/picky.css";
import Chart from "react-apexcharts";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      arrayValue: [],
      List: [],
      // departmentarray: [],
      options: {
        xaxis: {
          categories: []
        },
        plotOptions: {
          bar: {
            horizontal: true
          }
        },
        chart: {
          id: "basic-bar",
          type: 'bar',
          // stacked: true,
          // stackType: '100%'
        },
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 45,33,10,27,28, 50,60]
        }
      ]
    };
    this.selectOption = this.selectOption.bind(this);
    this.selectMultipleOption = this.selectMultipleOption.bind(this);
  }

  selectOption(value) {
    console.log("Vals", value);
    this.setState({ value });
  }
  selectMultipleOption(value) {
    console.count('onChange')
    console.log("Val", value);
    this.setState({ arrayValue: value });
  }

  componentDidMount() {
    this.refresh();
  }

  refresh = () => {
    axios.get("http://localhost:8080/getcourse")
      .then(res => {
        console.log(res.data);
        var names = [...new Set(res.data.map(a => a.learningGroupName))];
        names.map(value => {
          this.state.List.push(value);
        });
        var departments = [...new Set(res.data.map(a => a.Organization))];
        departments.map(value => {
          if (value === null) {
            // this.state.departmentarray.push("Not Classified");
            this.state.options.xaxis.categories.push("Not Classified");
          }
          else { 
            // this.state.departmentarray.push(value);
            this.state.options.xaxis.categories.push(value);
          }
          console.log(value);
        });
      })
      .catch(err => {
        console.log(err);
      });

  }


  render() {
    return (
      <div className="App">
        <div className="multiselector">
          <h3>Course/Stream</h3>
          <Picky
            value={this.state.arrayValue}
            options={this.state.List}
            onChange={this.selectMultipleOption}
            // open={true}
            valueKey="id"
            labelKey="name"
            multiple={true}
            includeSelectAll={true}
            includeFilter={true}
          />
          <br />
          <div>
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="bar"
              width="700"
              height="600"
            />
          </div>
        </div>
      </div>
    );
  }

}

export default App;
