import React from "react";

export const Spinner = () => {
  return (
    <div className="spinner">
      <svg
        width="125px"
        height="125px"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        className="lds-flat-ring"
        style={{ background: "none" }}
      >
        <defs />
        <circle cx="50" cy="50" r="45" fill="none" />
        <circle
          cx="50"
          cy="50"
          fill="none"
          r="15"
          stroke="none"
          strokeWidth="0"
        />
        <circle
          cx="50"
          cy="50"
          fill="none"
          r="15"
          stroke="#e40000"
          strokeWidth="1.5"
          strokeLinecap="square"
          transform="rotate(528.75 50 50)"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            calcMode="linear"
            values="0 50 50;180 50 50;720 50 50"
            keyTimes="0;0.5;1"
            dur="1.6s"
            begin="0s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-dasharray"
            calcMode="linear"
            values="0.9424777960769379 93.30530181161684;84.82300164692441 9.424777960769376;0.9424777960769379 93.30530181161684"
            keyTimes="0;0.5;1"
            dur="1.6"
            begin="0s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  );
}
