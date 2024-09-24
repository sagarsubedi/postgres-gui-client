import type { MetaFunction } from "@remix-run/node";
import { Button } from "../components/ui/button";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Button>
        <Link to="/gui">GUI</Link>
      </Button>
    </div>
  );
}
