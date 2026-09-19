import type { Metadata } from "next";
import { NotFoundSpline } from "./not-found-spline";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you're looking for doesn't exist or has been moved.",
};

const NotFoundPage = () => {
  return <NotFoundSpline />;
};

export default NotFoundPage;
