"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => <div style={{ height: "100vh", background: "#000" }} />,
});

export function NotFoundSpline() {
  return (
    <Suspense fallback={<div style={{ height: "100vh", background: "#000" }} />}>
      <Spline scene="/assets/404.spline" style={{ height: "100vh" }} />
    </Suspense>
  );
}
