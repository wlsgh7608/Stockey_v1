import * as Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import highchartsStock from "highcharts/modules/stock"
import styled from "styled-components"
import { sampleData } from "./dummyData"
import { useState } from "react"
import { makePriceFormat } from "../../IndustryMainPage/makePriceFormat"

highchartsStock(Highcharts)
Highcharts.setOptions({
  lang: {
    rangeSelectorZoom: "",
    shortMonths: [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ],
    weekdays: ["일", "월", "화", "수", "목", "금", "토"],
    rangeSelectorTo: "⁓",
  },
})

const IndustryCandleChart = () => {
  const dummyData = sampleData

  const options: Highcharts.Options = {
    chart: {
      borderColor: "var(--custom-background)",
      borderRadius: 20,
      borderWidth: 2,
      margin: 20,
      backgroundColor: "transparent",
    },
    credits: {
      enabled: false,
    },
    navigator: {
      enabled: true,
      handles: {
        backgroundColor: "var(--custom-purple-2)",
        borderColor: "var(--custom-black)",
        height: 20,
      },
      height: 60,
      margin: 30,
      maskFill: "rgba(212, 193, 255, 0.4)",
    },
    plotOptions: {},
    rangeSelector: {
      allButtonsEnabled: false,
      buttons: [
        {
          type: "week",
          count: 1,
          text: "1주",
        },
        {
          type: "month",
          count: 1,
          text: "1개월",
        },
        {
          type: "year",
          count: 1,
          text: "1년",
        },
        {
          type: "all",
          text: "전체",
        },
      ],
      selected: 5,
      inputDateFormat: "%Y.%m.%d",
      inputEditDateFormat: "%Y.%m.%d",
      inputBoxHeight: 20,
      inputStyle: {
        color: "var(--custom-black)",
        fontSize: "1.4rem",
        fontWeight: "bold",
      },
      buttonTheme: {
        width: 40,
        r: 8,
        style: {
          color: "var(--custom-black)",
          fontWeight: "bold",
        },
        states: {
          select: {
            fill: "#D1F7EB",
          },
        },
      },
    },
    scrollbar: {
      enabled: false,
    },
    series: [
      {
        name: "산업산업",
        type: "line",
        data: dummyData,
        color: "var(--custom-mint)",
      },
    ],
    title: {
      text: "",
    },
    tooltip: {
      split: false,
      formatter: function (this: any) {
        let tooltipContent =
          "<b>" + Highcharts.dateFormat("%Y년 %m월 %d일", this.x) + "</b><br>"
        tooltipContent += `<span style="color:${this.color}">${
          this.series.name
        }</span>: <b>${makePriceFormat(this.y)}</b> `

        const index =
          this.series.points.findIndex((point: any) => {
            return point.x === this.x
          }) - 1

        if (index >= 0) {
          const prevPoint = this.series.points[index]

          tooltipContent += `(${
            Math.round(((this.y - prevPoint.y) / prevPoint.y) * 10000) / 100
          }%)<br/>`
        }

        return tooltipContent
      },
    },
    xAxis: {
      type: "datetime",
      labels: {
        step: 1,
      },
    },
    yAxis: {
      type: "linear",
    },
  }

  return (
    <AreaDiv>
      <TitleDiv>산업 규모</TitleDiv>
      <ChartWrapper>
        <HighchartsReact
          highcharts={Highcharts}
          constructorType={"stockChart"}
          options={options}
        />
      </ChartWrapper>
    </AreaDiv>
  )
}

export default IndustryCandleChart

const ChartWrapper = styled.div`
  width: 100%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 24px;
  background-color: var(--custom-background);
`

const AreaDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const TitleDiv = styled.div`
  height: 2.4rem;
  width: auto;
  padding: 0px;

  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 2.4rem;
  line-height: 2.4rem;
  /* or 83% */

  display: flex;
  align-items: center;
  letter-spacing: 0.1px;
`
