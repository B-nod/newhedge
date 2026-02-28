import { Suspense } from "react";
import LoginPage from "./pages";

const pages = ({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPage />
    </Suspense>
  );
};

export default pages;
