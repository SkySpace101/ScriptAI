import { Fragment, useState, useEffect, useContext } from "react";
import { toAbsoluteUrl } from "@/utils/Assets";
import { KeenIcon } from "@/components";
import { Container } from "@/components/container";
import { UserProfileHero } from "@/partials/heros";
import { Navbar, NavbarActions, NavbarDropdown } from "@/partials/navbar";
import { PageMenu } from "@/pages/public-profile";
import { ProfileCreatorContent } from ".";
import { AuthContext } from "../../../../auth/providers/JWTProvider";
const ProfileCreatorPage = () => {
  const image = (
    <div className="flex items-center justify-center rounded-full border-2 border-danger-clarity bg-light size-[100px] shrink-0">
      <img
        src={toAbsoluteUrl("/media/brand-logos/inferno.svg")}
        className="size-11"
      />
    </div>
  );

  const { auth, currentUser } = useContext(AuthContext);
  // const [prompt, setPrompt] = useState("");
  const [script, setScript] = useState(null);

  // console.log(auth);

  function get_response(prompt) {
    const additionalHeaders = new Headers();
    additionalHeaders.append(
      "Authorization",
      // "Basic " + btoa("admin:password")
      `Bearer ${auth.access_token}`
    );
    additionalHeaders.append("Content-Type", "application/json");

    const myInit = {
      method: "POST",
      // method: "GET",
      headers: additionalHeaders,
      mode: "cors",
      body: JSON.stringify({
        prompt: prompt,
      }),
    };

    console.log(myInit);

    fetch("http://127.0.0.1:8000/promptdata/", myInit)
      .then((res) => res.json())
      .then((jsondata) => {
        // console.log(jsondata);
        setScript((prevState) => jsondata.script);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  function handleGenerateScript(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    prompt = formData.get("prompt");
    get_response(prompt);
    console.log(formData.get("prompt"));
  }

  function handleReset(e) {
    e.preventDefault();
    document.querySelector(".prompt").value = "";
    setScript((prevState) => null);
    console.log("reset");
  }

  console.log(script);

  return (
    <Fragment>
      <UserProfileHero
        name="Jane Doe"
        image={image}
        info={[
          {
            email: "janedoe@example.ocm",
            icon: "sms",
          },
        ]}
      />
      <hr />
      <br />
      <br />
      <Container>
        <h1 class="text-3xl text-center">Create Your Script</h1>
        <br />
        <br />
        <form onSubmit={handleGenerateScript}>
          <label htmlFor="prompt">
            <h1 className="text-center">Enter the Prompt for Script:</h1>
            <br />
            <input
              className="prompt input w-[50%] mx-auto"
              placeholder="e.g. Write me a script for a detective story."
              type="text"
              name="prompt"
            />
          </label>
          <br />
          <input type="text" className="border" />
          <br />
          <div class="btn-group md:ml-[35%] lg:ml-[40%]">
            <button class="btn btn-primary mr-10">Generate Script</button>
            <button class="btn btn-primary" onClick={handleReset}>
              Reset
            </button>
          </div>
        </form>
      </Container>
      <br />
      <br />
      {script && (
        <Container>
          <div className="card w-[800px] mx-auto bg-gray-100">
            <div className="card-header">
              <h3 className="card-title">Generated Script</h3>
            </div>
            <div className="card-body scrollable-y">
              {/* Centralize your team information with our management tools. Access
              detailed instructions, expert advice, and technical documentation
              to maintain an up-to-date team directory. */}
              {script}
            </div>
            <div className="card-footer justify-center">
              <a className="btn btn-link" href="#">
                Dashboard
              </a>
            </div>
          </div>
        </Container>
      )}
      <br />
      <br />
    </Fragment>
  );
};
export { ProfileCreatorPage };
