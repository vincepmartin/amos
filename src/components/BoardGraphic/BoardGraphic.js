import React from "react";
import PropTypes from "prop-types";
import Pie from "@visx/shape/lib/shapes/Pie";
import { Group } from "@visx/group";

function BoardGraphic({ width, height, margin, letters, onClick}) {
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const radius = Math.min(innerWidth, innerHeight) / 2;
  const centerY = innerHeight / 2;
  const centerX = innerWidth / 2;
  const top = centerY + margin.top;
  const left = centerX + margin.left;

  return (
    <svg width={width} height={height}>
      <Group top={top} left={left}>
        {/* Outer graph */}
        <Pie
          data={letters.slice(1)}
          pieValue={10}
          outerRadius={radius}
          innerRadius={30}
        >
          {(pie) => {
            return pie.arcs.map((arc, index) => {
              const letter = arc.data;
              const [centroidX, centroidY] = pie.path.centroid(arc);
              const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.1;
              const arcPath = pie.path(arc);

              return (
                <g
                  key={`arc-${letter}-${index}`}
                  onClick={() => onClick(letter)}
                >
                  <path d={arcPath} fill={"#ab7f76"} />
                  {hasSpaceForLabel && (
                    <text
                      x={centroidX}
                      y={centroidY}
                      dy=".5em"
                      fill="#ffffff"
                      fontSize={22}
                      textAnchor="middle"
                      pointerEvents="none"
                    >
                      {letter}
                    </text>
                  )}
                </g>
              );
            });
          }}
        </Pie>

        {/* Inner graph */}
        <Pie data={letters[0]} pieValue={100} outerRadius={40}>
          {(pie) => {
            return pie.arcs.map((arc, index) => {
              const letter = arc.data;
              const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.1;
              const arcPath = pie.path(arc);

              return (
                <g key={`arc-${letter}-${index}`} onClick={() => onClick(letter)}>
                  <path d={arcPath} fill={"#ffffff"} />
                  {hasSpaceForLabel && (
                    <text
                      x={0}
                      y={0}
                      dy=".5em"
                      fill="#000000"
                      fontSize={22}
                      textAnchor="middle"
                      pointerEvents="none"
                    >
                      {letter}
                    </text>
                  )}
                </g>
              );
            });
          }}
        </Pie>
      </Group>
    </svg>
  );
}

BoardGraphic.defaultProps = {
  margin: { top: 20, right: 20, bottom: 20, left: 20 },
  width: 500,
  height: 500,
};

BoardGraphic.propTypes = {
  letters: PropTypes.array.isRequired,
  margin: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default BoardGraphic;

