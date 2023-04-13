import { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import axios from "axios";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const Products = ({ cat, sort }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = () => {
      try {
        if (cat) {
          axios.get("https://pastrybox.000webhostapp.com/server/index.php?direct=product").then((res) => {
            const allprod = res.data;
            const categoryfiltered = allprod.filter((prod) => prod.type === cat)
            setProducts(categoryfiltered);
          });
        } else {
          axios.get("https://pastrybox.000webhostapp.com/server/index.php?direct=product").then((res) => {
            setProducts(res.data);
          });
        }
      } catch (err) {console.log(err)}
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    if (sort === "newest") {
      setProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setProducts((prev) => [...prev].sort((a, b) => a.price - b.price));
    } else {
      setProducts((prev) => [...prev].sort((a, b) => b.price - a.price));
    }
  }, [sort]);

  return (
    <Container>
      {products.map((item) => (
        <Product item={item} key={item.sku} />
      ))}
    </Container>
  );
};

export default Products;
