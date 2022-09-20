import React, { useRef, useState } from 'react';

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
  );
}
