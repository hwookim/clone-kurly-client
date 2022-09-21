import request from './utils/request';

// api 미구현 상태
const images = {
  async upload(image) {
    const imageFile = new FormData();
    imageFile.append('imageFile', image);

    const { data } = await request.post('/images', imageFile, {
      headers: { 'content-type': 'multipart/form-data' },
    });
    return data;
  },
};

export default images;
