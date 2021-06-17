import React from "react";
import Lottie from "react-lottie";
import loadingAnimation from "../../assets/loading.json";

export default function Loading() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return <Lottie options={defaultOptions} height={125} width={125} />;
}
