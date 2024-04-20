import React, { useState } from "react";

import styled from "@emotion/styled";
import { CardContainer, CardFlex } from "../../styles/main/cardStlye";
import { Common } from "../../styles/CommonCss";
import { ProCardContainer } from "../../styles/product/proCardCss";

const ProductCard = ({ product }) => {
  return (
    <ProCardContainer>
      <a href={product.link}>
        <img
          className="card-img"
          src={product.imageSrc}
          alt={product.productNm}
        />
      </a>
      <CardFlex>
        <div className="tagform">
          <img src="./images/star.png" alt="star" />
          <p>{product.rating}</p>
        </div>
      </CardFlex>
      <p className="productNm" style={{ color: Common.color.p900 }}>
        {product.productNm}
      </p>
      <p className="productNm">{product.subinfo}</p>
      <h2 className="price">{product.price}원</h2>
    </ProCardContainer>
  );
};
export default ProductCard;
