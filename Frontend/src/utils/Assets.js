// Exaxmples of usage:
//* 1. In a background image: <div style={{backgroundImage: `url('${toAbsoluteUrl('/media/misc/pattern-1.jpg')}')`}}>...
//* 2. In img tag: <img src={toAbsoluteUrl('/media/avatars/300-2.jpg')} />
const toAbsoluteUrl = (pathname) => {
  const baseUrl = import.meta.env.BASE_URL;
  // console.log(baseUrl);
  if (baseUrl && baseUrl !== "/") {
    // console.log("base: ", baseUrl);
    // console.log("condi:", import.meta.env.BASE_URL + pathname);
    return import.meta.env.BASE_URL + pathname;
  } else {
    // console.log("else: ", pathname);
    return pathname;
  }
};
export { toAbsoluteUrl };
