import React, { Component } from "react";

import styled, { keyframes } from "styled-components";


class ScrollDown extends Component {
    scrollDown = () => {

        // window.scrollTo({
        //     top: document.documentElement.scrollHeight,
        //     behavior: 'auto'
        //     /* you can also use 'auto' behaviour 
        //        in place of 'smooth' */
        // });

    }
    render() {

        return (
            <div className="App">
                {/* <OvalButton /> */}

                <ArrowContainer onClick={() => { this.scrollDown() }}>

                    <Chevron />
                    <Chevron />
                    <Chevron />
                </ArrowContainer>
            </div>
        );
    }
}

export default ScrollDown;

const OvalButtonAnimation = keyframes`
0% {
  transform: translate(0, 0);
  opacity: 0;
}
40% {
  opacity: 1;
}
80% {
  transform: translate(0, 20px);
  opacity: 0;
}
100% {
  opacity: 0;
}

`;

const OvalButton = styled.div`
  position: absolute;
  height: 50px;
  width: 30px;
  bottom: 20vh;
  left: 50vw;
  right: 0;
  background-color: #10404c;
  border: 2px solid #10404c;
  border-radius: 20px;
  cursor: pointer;
  outline: none;

  &::before {
    position: absolute;
    top: 10px;
    left: 50%;
    content: "";
    width: 6px;
    height: 6px;
    margin-left: -3px;
    background-color: #10404c;
    border-radius: 100%;
    animation: ${OvalButtonAnimation} 2s infinite;
    box-sizing: border-box;
  }
`;

const ArrowContainer = styled.div`
  position: absolute;
  width: 24px;
  height: 24px;
  height: 50px;
  width: 30px;
  left: 65%;
  right: 0;
bottom: 30%;
  cursor: pointer;
`;

const ChevronAnimation = keyframes`
 25% {
    opacity: 1;

  }
  33% {
    opacity: 1;
    transform: translateY(30px);
  }
  67% {
    opacity: 1;
    transform: translateY(40px);
  }
  100% {
    opacity: 0;
    transform: translateY(55px) scale3d(0.5, 0.5, 0.5);
  }

`;

const Chevron = styled.div`
  position: absolute;
  width: 28px;
  height: 8px;
  opacity: 0;
  transform: scale3d(0.5, 0.5, 0.5);
  animation: ${ChevronAnimation} 3s ease-out infinite;

  &:first-child {
    animation: ${ChevronAnimation} 3s ease-out 1s infinite;
  }
  &:nth-child(2) {
    animation: ${ChevronAnimation} 3s ease-out 2s infinite;
  }

  &::before,
  &::after {
    content: " ";
    position: absolute;
    top: 0;
    height: 100%;
    width: 51%;
    background: #10404c;
  }

  &::before {
    left: 0;
    transform: skew(0deg, 30deg);
  }

  &::after {
    right: 0;
    width: 50%;
    transform: skew(0deg, -30deg);
  }
`;
