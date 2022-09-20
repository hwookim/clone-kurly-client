import React, { useRef, useState } from 'react';

import Input from '../../components/Input';

import './CreateProduct.scss';

export default function CreateProduct() {
  const [thumbnail, setThumbnail] = useState();
  const imgInputRef = useRef(null);

  const handleClickThumbnailInput = () => {
    imgInputRef.current?.click();
  };

  const handleSelectThumbnail = (event) => {
    const files = event.target.files;
    if (!files[0]) {
      return;
    }

    const imgURL = URL.createObjectURL(files[0]);
    setThumbnail(imgURL);
  };

  return (
    <div className="create-product">
      <div>
        <button
          className="thumbnail-input-btn"
          onClick={handleClickThumbnailInput}
        >
          {thumbnail ? (
            <img src={thumbnail} alt="thumbnail-img" className="thumbnail" />
          ) : (
            <div className="thumbnail-text">
              <div class="material-symbols-outlined">image</div>
              <div>이미지를 선택해주세요</div>
            </div>
          )}
        </button>
        <input
          type="file"
          accept="image/*"
          hidden
          ref={imgInputRef}
          onChange={handleSelectThumbnail}
        />
      </div>
      <div className="right">
        <div className="create-input">
          <label className="create-input-label">
            상품명<span className="point">*</span>
          </label>
          <div className="create-input-wrapper">
            <Input />
          </div>
        </div>
        <div className="create-input">
          <label className="create-input-label">상품 설명</label>
          <div className="create-input-wrapper">
            <Input />
          </div>
        </div>
        <div className="create-input">
          <label className="create-input-label">
            상품 가격<span className="point">*</span>
          </label>
          <div className="create-input-wrapper">
            <Input type="number" />
          </div>
          <span className="create-input-unit">원</span>
        </div>
        <div className="create-input">
          <label className="create-input-label">할인율</label>
          <div className="create-input-wrapper">
            <Input type="number" />
          </div>
          <span className="create-input-unit">%</span>
        </div>
        <div className="sales-price">
          할인 후 상품 금액 :<span className="sales-price-value">{0}</span>
          <span className="sales-price-unit">원</span>
        </div>
        <button type="submit" variant="primary" className="submit-btn">
          상품 생성하기
        </button>
      </div>
    </div>
  );
}
