import * as React from "react";

import { Card, Grid, Page, StatsCard } from "tabler-react";
import "tabler-react/dist/Tabler.css";

import C3Chart from "react-c3js";
import 'c3/c3.css';

import AppNav from "../AppNav";

function Dashboard() {
  return (
    <>
      <AppNav/>
      <Page.Content title="Dashboard">
        <Grid.Row cards>
          <Grid.Col width={6} sm={4} lg={2}>
            <StatsCard layout={1} movement={6} total="43" label="New Tickets"/>
          </Grid.Col>
          <Grid.Col width={6} sm={4} lg={2}>
            <StatsCard layout={1} movement={-3} total="17" label="Closed Today"/>
          </Grid.Col>
          <Grid.Col width={6} sm={4} lg={2}>
            <StatsCard layout={1} movement={9} total="7" label="New Replies"/>
          </Grid.Col>
          <Grid.Col width={6} sm={4} lg={2}>
            <StatsCard layout={1} movement={3} total="27.3k" label="Followers"/>
          </Grid.Col>
          <Grid.Col width={6} sm={4} lg={2}>
            <StatsCard layout={1} movement={-2} total="$95" label="Daily earnings"/>
          </Grid.Col>
          <Grid.Col width={6} sm={4} lg={2}>
            <StatsCard layout={1} movement={-1} total="621" label="Products"/>
          </Grid.Col>
        </Grid.Row>

        <Grid.Row cards>
          <Grid.Col width={18} sm={4} lg={6}>
            <Card>
              <Card.Header>
                <Card.Title>Chart title</Card.Title>
              </Card.Header>
              <Card.Body>
                <C3Chart
                  style={{height: "16rem"}}
                  data={{
                    columns: [
                      ["data1", 63],
                      ["data2", 37]
                    ],
                    type: "pie",
                    colors: {
                      data1: "#00DC6E",
                      data2: "#c82333"
                    },
                    names: {
                      data1: "Incomes",
                      data2: "Expenses"
                    }
                  }}
                  legend={{
                    show: false
                  }}
                  padding={{
                    bottom: 0,
                    top: 0
                  }}
                />
              </Card.Body>
            </Card>
          </Grid.Col>

          <Grid.Col width={18} sm={4} lg={6}>
            <Card>
              <Card.Header>
                <Card.Title>Chart title</Card.Title>
              </Card.Header>
              <Card.Body>
                <C3Chart
                  style={{height: "16rem"}}
                  data={{
                    columns: [
                      ["data1", 63],
                      ["data2", 37],
                    ],
                    type: "donut",
                    colors: {
                      data1: "#00DC6E",
                      data2: "#c82333"
                    },
                    names: {
                      data1: "Incomes",
                      data2: "Expenses",
                    },
                  }}
                  legend={{
                    show: false
                  }}
                  padding={{
                    bottom: 0,
                    top: 0,
                  }}
                />
              </Card.Body>
            </Card>
          </Grid.Col>
        </Grid.Row>

        <Grid.Row>
          <Grid.Col lg={12}>
            <Card>
              <Card.Header>
                <Card.Title>Development Activity</Card.Title>
              </Card.Header>

              <C3Chart
                style={{height: "16rem"}}
                data={{
                  columns: [
                    // each columns data
                    [
                      "data1",
                      0,
                      5,
                      1,
                      2,
                      7,
                      5,
                      6,
                      8,
                      24,
                      7,
                      12,
                      5,
                      6,
                      3,
                      2,
                      2,
                      6,
                      30,
                      10,
                      10,
                      15,
                      14,
                      47,
                      65,
                      55,
                    ],
                  ],
                  type: "area", // default type of chart
                  groups: [["data1", "data2", "data3"]],
                  colors: {
                    data1: "#00DC6E"
                  },
                  names: {
                    data1: "Incomes"
                  }
                }}
                axis={{
                  y: {
                    padding: {
                      bottom: 0
                    },
                    show: false,
                    tick: {
                      outer: false
                    }
                  },
                  x: {
                    padding: {
                      left: 0,
                      right: 0
                    },
                    show: false
                  }
                }}
                legend={{
                  position: "inset",
                  padding: 0,
                  inset: {
                    anchor: "top-left",
                    x: 20,
                    y: 8,
                    step: 10
                  }
                }}
                tooltip={{
                  format: {
                    title: function (x) {
                      return "";
                    }
                  }
                }}
                padding={{
                  bottom: 0,
                  left: -1,
                  right: -1
                }}
                point={{
                  show: false
                }}
              />
            </Card>
          </Grid.Col>
        </Grid.Row>
      </Page.Content>
    </>
  );
}

export default Dashboard;