/** @format */

import Image from "next/image";
import GithubIcon from "./GithubIcon";
import fsr from "../../public/fsr.png";
import mit from "../../public/mit.png";
import { useRouter } from "next/router";

function Layout({ children }) {
  const { route } = useRouter();
  //console.log(route);
  return (
    <>
      <header>
        <figure className="logo-fsr">
          <Image
            objectFit="cover"
            objectPosition="center"
            src={fsr}
            alt="fsr"
          />
        </figure>
        <div>
          <h1 className="title">
            {route.includes("classifier")
              ? "Sentiments Analysis"
              : "Tweets Labeler"}
          </h1>
          <p className="title">
            Tweets labeler for sentiments analysis purpose
          </p>
        </div>
        <figure className="logo-mit">
          <Image
            objectFit="cover"
            objectPosition="center"
            src={mit}
            alt="mit"
          />
        </figure>
      </header>
      <main>{children}</main>
      <footer>
        <p>Developed by: Essofyany Bilal</p>
        <span
          onClick={() =>
            window.location.assign(
              "https://github.com/essofyany/darija-tweets-labeler"
            )
          }
        >
          <GithubIcon />
        </span>
        <p>2021/2020</p>
      </footer>
    </>
  );
}

export default Layout;
