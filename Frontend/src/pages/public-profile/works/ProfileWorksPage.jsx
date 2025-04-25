import { Fragment, useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container } from "@/components/container";
import { toAbsoluteUrl } from "@/utils/Assets";
import { KeenIcon } from "@/components";
import { UserProfileHero } from "@/partials/heros";
import { Navbar, NavbarActions, NavbarDropdown } from "@/partials/navbar";
import { PageMenu } from "@/pages/public-profile";
import { Works } from "./blocks";
import { AuthContext } from "../../../auth/providers/JWTProvider";
const ProfileWorksPage = () => {
  const image = (
    <img
      src={toAbsoluteUrl("/media/avatars/300-1.png")}
      className="rounded-full border-3 border-success h-[100px] shrink-0"
    />
  );

  const { currentUser, auth } = useContext(AuthContext);
  const [queryData, setQueryData] = useState(undefined);

  // ########################################################33
  function get_response() {
    const additionalHeaders = new Headers();
    additionalHeaders.append(
      "Authorization",
      // "Basic " + btoa("admin:password")
      `Bearer ${auth.access_token}`
    );
    additionalHeaders.append("Content-Type", "application/json");

    const myInit = {
      method: "GET",
      headers: additionalHeaders,
      mode: "cors",
    };

    fetch("http://127.0.0.1:8000/promptdata/", myInit)
      .then((res) => {
        return res.json();
      })
      .then((jsondata) => {
        // console.log(jsondata);
        setQueryData(jsondata);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  useEffect(() => {
    get_response();
  }, []);

  console.log("happy");
  console.log(queryData);

  let tableData;
  if (queryData == undefined) {
    tableData = (
      <tr>
        <td>just a prompt</td>
        <td>just a script</td>
        <td>5 Jan, 2024</td>
      </tr>
    );
  } else {
    tableData = queryData.map((data) => (
      <tr>
        <td>{data.prompt}</td>
        <td>{data.script}</td>
        <td>{data.creation_time}</td>
      </tr>
    ));
  }

  console.log(tableData);

  // ########################################################33

  // console.log(currentUser);
  return (
    <Fragment>
      <UserProfileHero
        name={currentUser.username.toUpperCase()}
        image={image}
        info={[
          {
            label: "KeenThemes",
            icon: "abstract",
          },
          {
            label: "SF, Bay Area",
            icon: "geolocation",
          },
          {
            email: "jenny@kteam.com",
            icon: "sms",
          },
        ]}
      />
      <br />
      <button className="bg-gray-400 p-2 rounded-[10px] text-yellow-500 ml-[600px] text-sm border border-gray-700">
        <Link to="/public-profile/profiles/creator">Create Script</Link>
      </button>
      <br />
      <br />

      <Container>
        <table class="table align-middle text-gray-700 font-medium text-sm">
          <thead>
            <tr>
              <th>Prompts</th>
              <th>Scripts</th>
              <th>Creation Date</th>
            </tr>
          </thead>
          <tbody>
            {/* <tr>
              <td>just a prompt</td>
              <td>just a script</td>
              <td>5 Jan, 2024</td>
            </tr> */}
            {tableData}
          </tbody>
        </table>
      </Container>
    </Fragment>
  );
};
export { ProfileWorksPage };
