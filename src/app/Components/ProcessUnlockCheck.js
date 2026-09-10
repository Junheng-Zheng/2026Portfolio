"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isProcessUnlocked } from "../lib/passwordAuth";

export default function ProcessUnlockCheck({ children }) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (isProcessUnlocked()) {
      setAllowed(true);
      return;
    }

    router.replace("/");
  }, [router]);

  if (!allowed) return null;

  return children;
}
