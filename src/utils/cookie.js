const cookie = {
  set(key, value, expires) {
    let cookieString = `${key}=${value}`;
    if (expires !== undefined) {
      const expiresDate = new Date();
      expiresDate.setTime(expiresDate.setDate(expiresDate.getDate() + expires));
      cookieString = `${cookieString}; expires=${expiresDate}; path=/;`;
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
