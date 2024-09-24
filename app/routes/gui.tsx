import { LogtoContext } from "@logto/remix";
import { json, LoaderFunction, redirect } from "@remix-run/node";
import { logto } from "../../service/auth.server";
import { Form } from "@remix-run/react";
import { Button } from "../components/ui/button";

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

export default function Gui() {
  return (
    <div>
      <Form action="/api/logto/sign-out" method="get">
        <Button type="submit">Sign Out</Button>
      </Form>
    </div>
  );
}
