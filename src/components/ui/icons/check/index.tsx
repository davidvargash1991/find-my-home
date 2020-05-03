import React from "react";
import colors from "styles/colors";

const Check = () => (
  <svg height="15px" version="1.1" viewBox="0 0 18 15" width="18px">
    <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
      <g fill={colors.orange} transform="translate(-423.000000, -47.000000)">
        <g id="check" transform="translate(423.000000, 47.500000)">
          <path
            d="M6,10.2 L1.8,6 L0.4,7.4 L6,13 L18,1 L16.6,-0.4 L6,10.2 Z"
            id="Shape"
          />
        </g>
      </g>
    </g>
  </svg>
  // <svg height="16px" width="16px">
  //   <path
  //     fill={colors.orange}
  //     d="M640 192L256 576 128 448 0 576l256 256 512-512L640 192z"
  //   />
  // </svg>
);

export default Check;
