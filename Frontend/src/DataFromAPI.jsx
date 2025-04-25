import React from "react";

export default function DataFromAPI() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    const additionalHeaders = new Headers();
    additionalHeaders.append(
      "Authorization",
      "Basic " + btoa("admin:password")
    );
    additionalHeaders.append("Content-Type", "application/json");

    const myInit = {
      //   method: "POST",
      method: "GET",
      headers: additionalHeaders,
      mode: "cors",
      //   body: JSON.stringify({
      //     username: "test",
      //     first_name: "first",
      //     last_name: "last",
      //     password: "password",
      //     email: "whatever@example.com",
      //   }),
    };

    //   myRequest = new Request()

    fetch("http://127.0.0.1:8000/users/", myInit)
      .then((res) => res.json())
      .then((jsondata) => {
        // console.log(jsondata);
        setData(jsondata);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <h1>Returned data from api</h1>
      <h1>{data ? JSON.stringify(data, null, 2) : "Loading..."}</h1>
    </>
  );
}
