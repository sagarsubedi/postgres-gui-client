import { LogtoContext } from "@logto/remix";
import { json, LoaderFunction, redirect } from "@remix-run/node";
import { logto } from "../../service/auth.server";
import { Form, useLoaderData } from "@remix-run/react";
import { Button } from "../components/ui/button";
import Sidebar from "../components/domain/sidebar";
import { prisma } from "../../service/prisma.server";
import { Table } from "../../service/types";

type LoaderResponse = {
  readonly context: LogtoContext;
  readonly tables: Table[];
};

export const loader: LoaderFunction = async ({ request }) => {
  const context = await logto.getContext({ getAccessToken: false })(request);

  if (!context.isAuthenticated) {
    return redirect("/api/logto/sign-in");
  }

  const tables = await prisma.$queryRaw<Table[]>`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
  `;

  return json<LoaderResponse>({
    context,
    tables: tables,
  });
};

export default function Gui() {
  const { tables } = useLoaderData<LoaderResponse>();
  return (
    <div>
      <Sidebar tables={tables} />
      <Form action="/api/logto/sign-out" method="get">
        <Button type="submit">Sign Out</Button>
      </Form>
    </div>
  );
}
