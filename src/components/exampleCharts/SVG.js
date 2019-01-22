import React from "react";

const SVG = ({
                 style = {},
                 fill = "#000",
                 width = "100%",
                 className = "",
                 viewBox = "0 0 16 16"
             }) => (
    <svg
        width={width}
        style={style}
        height={width}
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
        className={`svg-icon ${className || ""}`}
        xmlnsXlink="http://www.w3.org/1999/xlink"
    >
        <path
            fill={fill}
            d="M 5.99609 1.51367C 7.93604 1.51367  5.61206Z"
        />
    </svg>
);

export default SVG;