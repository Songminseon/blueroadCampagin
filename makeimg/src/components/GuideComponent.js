import React from "react";
import styled from "styled-components";
import drag from "../img/drag.svg";

//not functional component

const ButtonWrapper = styled.div`
  width: 200px;
  height: 40px;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid #e5e5e5;
  border-radius: 3px;
  margin-top: 11px;
  margin-bottom: 11px;
  margin-left: calc(50vw - 100px);
  text-align: center;
  display: flex;
  align-items: center;

  img {
    width: 10px;
    height: 10px;
    margin-left: 11px;
  }

  div{
    width:190px;
    height:20px;
    display:flex;
    align-items:center;
    margin-left:5px;
  }

  h3 {
    font-size: 0.6875rem;
    font-weight: 500;
    line-height: 1.25rem;
    letter-spacing: -0.015rem;
    margin: 0 auto;
    color: white;
  }
`;

const GuideComponent = () => {
  return (
    <>
      <ButtonWrapper>
        <img src={drag} alt="조절" />
        <div>
          <h3>끌어서 위치를 조절하세요</h3>
        </div>
      </ButtonWrapper>
    </>
  );
};

export default GuideComponent;

