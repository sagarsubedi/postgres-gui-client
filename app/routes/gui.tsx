import { LogtoContext } from "@logto/remix";
import { json, LoaderFunction, redirect } from "@remix-run/node";
import { logto } from "../../service/auth.server";
import { Form } from "@remix-run/react";
import { Button } from "../components/ui/button";
import Sidebar from "../components/domain/sidebar";

type LoaderResponse = {
  readonly context: LogtoContext;
};

export const loader: LoaderFunction = async ({ request }) => {
  const context = await logto.getContext({ getAccessToken: false })(request);

  if (!context.isAuthenticated) {
    return redirect("/api/logto/sign-in");
  }
  return json<LoaderResponse>({ context });
};

const tables = [
  "analytics",
  "chapters",
  "questions",
  "subscriptions",
  "user_answers",
  "user_progress",
  "user_streaks",
];
export default function Gui() {
  return (
    <div>
      <Sidebar tables={tables} />
      <Form action="/api/logto/sign-out" method="get">
        <Button type="submit">Sign Out</Button>
      </Form>
    </div>
  );
}
