import { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { mobile } from "../responsive";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  ${mobile({ padding: "5px" })}
`;
const Title = styled.h2`
  font-size: 50px;
  margin-bottom: 5px;
  ${mobile({ fontSize: "30px" })}
`;
const Container2 = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  ${mobile({ padding: "5px" })}
`;
const PopularProducts = ({ cat, filters, sort }) => {
  const [popularData, setPopularData] = useState([]);
  useEffect(() => {
    const getPopularProducts = async () => {
      try {
        await axios
          .get("http://localhost/reactphp/server/index.php?direct=product")
          .then((res) => {
            setPopularData(res.data);
          })
          .catch((err) => {
            toast.error(err);
          });
      } catch (err) {
        console.log(err);
        toast.error(err);
      }
    };
    getPopularProducts();
  }, []);

  return (
    <Container2>
      <Title>Popular Right Now</Title>
      <Container>
        {popularData.map((item) => (
          <Product key={item.sku} item={item} />
        ))}
      </Container>
      <ToastContainer
        position="top-center"
        autoClose={1200}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Container2>
  );
};

export default PopularProducts;
