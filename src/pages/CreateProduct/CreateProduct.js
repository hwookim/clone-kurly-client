import React, { useRef, useState } from 'react';

import Input from '../../components/Input';

import './CreateProduct.scss';

export default function CreateProduct() {
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: 0,
    discount: 0,
    thumbnail: '',
  });
  const { title, description, price, discount, thumbnail } = product;
  const imgInputRef = useRef(null);
  const salesPrice = parseInt(price * (1 - discount / 100));

  const handleClickThumbnailInput = () => {
    imgInputRef.current?.click();
  };

  const handleSelectThumbnail = (event) => {
    const files = event.target.files;
    if (!files[0]) {
      return;
    }

    const imgURL = URL.createObjectURL(files[0]);
    setProduct((prev) => ({
      ...prev,
      thumbnail: imgURL,
    }));
  };

  const handleChangeForm = (event) => {
    const { name, value } = event.target;
    if (name === 'thumbnail') return;

    if (name === 'discount') return;

    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeDiscount = (event) => {
    const { value } = event.target;

    const discount = value > 100 ? 100 : value < 0 ? 0 : value;

    setProduct((prev) => ({
      ...prev,
      discount,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(product);
  };

  return (
    <form
      className="create-product"
      onChange={handleChangeForm}
      onSubmit={handleSubmit}
    >
      <div>
        <button
          className="thumbnail-input-btn"
          onClick={handleClickThumbnailInput}
        >
          {thumbnail ? (
            <img src={thumbnail} alt="thumbnail-img" className="thumbnail" />
          ) : (
            <div className="thumbnail-text">
              <div className="material-symbols-outlined">image</div>
              <div>이미지를 선택해주세요</div>
            </div>
          )}
        </button>
        <input
          type="file"
          accept="image/*"
          hidden
          name="thumbnail"
          ref={imgInputRef}
          onChange={handleSelectThumbnail}
        />
      </div>
      <div className="right">
        <div className="create-input">
          <label className="create-input-label" htmlFor="title">
            상품명<span className="point">*</span>
          </label>
          <div className="create-input-wrapper">
            <Input name="title" defaultValue={title} />
          </div>
        </div>
        <div className="create-input">
          <label className="create-input-label" htmlFor="description">
            상품 설명
          </label>
          <div className="create-input-wrapper">
            <Input name="description" defaultValue={description} />
          </div>
        </div>
        <div className="create-input">
          <label className="create-input-label" htmlFor="price">
            상품 가격<span className="point">*</span>
          </label>
          <div className="create-input-wrapper">
            <Input
              className="number"
              type="number"
              name="price"
              defaultValue={price}
            />
          </div>
          <span className="create-input-unit">원</span>
        </div>
        <div className="create-input">
          <label className="create-input-label" htmlFor="discount">
            할인율
          </label>
          <div className="create-input-wrapper">
            <Input
              className="number"
              type="number"
              name="discount"
              defaultValue={discount}
              onChange={handleChangeDiscount}
            />
          </div>
          <span className="create-input-unit">%</span>
        </div>
        <div className="sales-price">
          할인 후 상품 금액 :
          <span className="sales-price-value">
            {salesPrice.toLocaleString()}
          </span>
          <span className="sales-price-unit">원</span>
        </div>
        <button type="submit" variant="primary" className="submit-btn">
          상품 생성하기
        </button>
      </div>
    </form>
  );
}
