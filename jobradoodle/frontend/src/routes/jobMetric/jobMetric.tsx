import { useMemo, TouchEvent, MouseEvent } from "react";
import { Bar } from "@visx/shape";
import { scaleBand, scaleLinear } from "@visx/scale";
import { localPoint } from "@visx/event";
import useMeasure from "react-use-measure";
import { Group } from "@visx/group";
import { TooltipWithBounds, useTooltip, defaultStyles } from "@visx/tooltip";
import { AxisBottom, AxisLeft } from "@visx/axis";
import styled from "styled-components";
import { applyJobLen,interviewJobLen,offerJobLen} from "../../components/kanbanboard/kanbanboard";

export interface UserData {
  name: string;
  value: number;
}



const data = [
  { name: "application", value: applyJobLen },
  { name: "interview", value: interviewJobLen },
  { name: "offer", value: offerJobLen }
];
const getYValue = (d: UserData) => d.value;

const getXValue = (d: UserData) => d.name;

const tooltipStyles = {
  ...defaultStyles,
  borderRadius: 4,
  padding: 15,
  background: "black",
  color: "white",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif'
};

const margin = 32;
const Container = styled.div`
    position: relative;
    width: 600px;
    height: 400px;
    min-width: 300px;
`;
const Wrapper=styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Chart = () => {
  const [ref, bounds] = useMeasure();

  const width = bounds.width || 100;
  const height = bounds.height || 100;

  const innerWidth = width - margin;
  const innerHeight = height - margin;

  const {
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipLeft = 0,
    tooltipTop = 0
  } = useTooltip<UserData>();

  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [margin, innerWidth],
        domain: data.map(getXValue),
        padding: 0.2
      }),
    [innerWidth]
  );

  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [innerHeight, margin],
        domain: [
          Math.min(...data.map(getYValue)),
          Math.max(...data.map(getYValue))
        ]
      }),
    [innerHeight]
  );

  return (
    <Wrapper>
      {/* <div ref={ref} className="container"> */}
      <Container ref={ref}>
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
          <Group>
            {data.map((d) => {
              const xValue = getXValue(d);
              const barWidth = xScale.bandwidth()-30;
              const barHeight = innerHeight - (yScale(getYValue(d)) ?? 0);
              const barX = xScale(xValue);
              const barY = innerHeight - barHeight;

              return (
                <Bar
                  key={`bar-${xValue}`}
                  x={barX}
                  y={barY}
                  width={barWidth}
                  height={barHeight}
                  fill="orange"
                  onMouseMove={(
                    event:
                      | TouchEvent<SVGRectElement>
                      | MouseEvent<SVGRectElement>
                  ) => {
                    const point = localPoint(event);

                    if (!point) return;

                    showTooltip({
                      tooltipData: d,
                      tooltipTop: point.y,
                      tooltipLeft: point.x
                    });
                  }}
                  onMouseLeave={() => {
                    hideTooltip();
                  }}
                />
              );
            })}
          </Group>

          <Group>
            <AxisBottom
              top={innerHeight}
              scale={xScale}
              // tickFormat={(date) => timeFormat("%m/%d")(new Date(date))}
            />
          </Group>

          <Group>
            <AxisLeft left={margin} scale={yScale} />
          </Group>
        </svg>

        {tooltipData ? (
          <TooltipWithBounds
            key={Math.random()}
            top={tooltipTop}
            left={tooltipLeft}
            style={tooltipStyles}
          >
            <b>{`${getXValue(tooltipData)}`}</b>: {getYValue(tooltipData)}
          </TooltipWithBounds>
        ) : null}
      </Container>
    </Wrapper>
  );
};

export default Chart;
