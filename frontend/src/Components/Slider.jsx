import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { sliderItems } from "../data";
import { mobile } from "../responsive";
import { useNavigate } from "react-router-dom";
const Container = styled.div`
  width: 100%;
  height: 80vh;
  margin-top: 7.5%;
  display: flex;
  position: relative;
  overflow: hidden;
  ${mobile({
    width: "100%",
    height: "60vh",
    boxSizing: "border-box",
    display: "none",
    position: "relative",
    overflow: "hidden",
  })}
`;

const Arrow = styled.div`
  width: 30px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
  ${mobile({ width: "15px",
    height: "25px" })}
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
  width: 20vw;
  height: 80%;
  display: flex;
  align-items: center;
  background-color: ${(props) => props.bg};
  ${mobile({ height: "80vh" })}
`;
const Image = styled.img`
  height: 100%;
  width: 100%;
  opacity: 0.8;
  object-fit: cover;
`;



const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  color: black;
  border: white;
  background-color: white;
  cursor: pointer;
  ${mobile({ fontSize: "15px" })};
`;

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex >= 0.2 ? slideIndex - 0.2 :  slideIndex + 0.2);
    } else {
      setSlideIndex(slideIndex <=1 ? slideIndex + 0.2 : 0);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      handleClick("right");
    }, 3000);

    return () => clearInterval(interval);
  }, [handleClick]);

  return (
    <Container>
      <Wrapper slideIndex={slideIndex}>
        {sliderItems.map((item) => (
          <Slide bg={item.bg} key={item.id}>
            <Image src={item.img} alt={item.title} />
          </Slide>
        ))}
      </Wrapper>
    </Container>
  );
};

export default Slider;
