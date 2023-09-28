"use client"

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("0d83628e-ec50-44ad-9159-b4c5da86b021");
  });

  return null;
}

export default CrispChat;