import React from "react";
//styled-components
import styled from "styled-components";

function Divider() {
  return (
    <div>
      <DividerStyle />
    </div>
  );
}

export default Divider;

const DividerStyle = styled.div`
  height: 8px;
  background: #d9d9d9;
`;
