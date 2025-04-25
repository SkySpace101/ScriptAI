const getData = (key) => {
  try {
    const data = localStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Read from local storage", error);
  }
};
const setData = (key, value) => {
  try {
    // console.log(`This is the auth ${value}`);
    localStorage.setItem(key, JSON.stringify(value));
    // console.log(localStorage);
  } catch (error) {
    console.error("Save in local storage", error);
  }
};
export { getData, setData };
