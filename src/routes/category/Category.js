import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { CategoriesContext } from "../../contexts/CategoriesContext";

import "./Category.scss";
import ProductCard from "../../components/product-card/ProductCard";

const Category = () => {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <>
    <h2 className='category-title'>{category.toUpperCase()}</h2>
    <div className="category2-container">
      {products &&
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </div>
    </>
  );
};

export default Category;
