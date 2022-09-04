const cookie = {
  set(key, value, expires) {
    let cookieString = `${key}=${value}`;
    if (expires !== undefined) {
      const expiresDate = new Date();
      cookieString = `${cookieString}; expires=${expiresDate.setDate(expiresDate.getDate() + expires)}`;
    }

    document.cookie = cookieString;
  },

  get(key) {
    return document.cookie
      .split('; ')
      .find((row) => row.startsWith(key))
      ?.split('=')[1];
  },

  remove(key) {
    this.set(key, '', -1);
  },
};

export default cookie;
