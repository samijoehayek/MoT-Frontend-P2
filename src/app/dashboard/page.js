"use client";
import React, { Fragment, useState, useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const [loadWebGL, setLoadWebGL] = useState(false);

  const { unityProvider, loadingProgression, isLoaded } = useUnityContext({
    loaderUrl: "Test/Build/Build.loader.js",
    dataUrl: "Test/Build/Build.data.unityweb",
    frameworkUrl: "Test/Build/Build.framework.js.unityweb",
    codeUrl: "Test/Build/Build.wasm.unityweb",
  });

  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token")
      ? urlParams.get("token")
      : localStorage.getItem("token");
      setLoadWebGL(true);
    // getUserByJWT(token)
    //   .then(() => {
    //     localStorage.setItem("token", token);
    //     document.cookie = `token=${token}`;
    //     setLoadWebGL(true);
    //   })
    //   .catch((error) => {
    //     console.log("Login failed: ", error);
    //     router.push("/");
    //   });
  }, []);

  return (
    loadWebGL && (
      <Fragment>
        {!isLoaded && (
          <p>Loading Application ... {Math.round(loadingProgression * 100)}</p>
        )}
        <Unity
          unityProvider={unityProvider}
          style={{
            visibility: isLoaded ? "visible" : "hidden",
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
      </Fragment>
    )
  );
};

export default Dashboard;
