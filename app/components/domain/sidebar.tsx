import { Plus, Search, Table2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Table } from "../../../service/types";
import { useState } from "react";

export default function Sidebar({ tables }: { tables: Table[] }) {
  const [search, setSearch] = useState("");
  const filteredTables = tables.filter((table) =>
    table.table_name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="h-screen w-64 bg-white border-r flex flex-col">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold mb-4">Table Editor</h1>
      </div>
      <div className="p-4">
        <Button className="w-full mb-4">
          <Plus className="mr-2 h-4 w-4" /> New table
        </Button>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tables..."
            className="pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        <ul className="space-y-1 p-4">
          {tables.length > 0 ? (
            filteredTables.map((table) => (
              <li
                key={table.table_name}
                className="flex items-center space-x-2 px-2 py-1 hover:bg-gray-100 rounded"
              >
                <Table2 className="h-4 w-4" />
                <span>{table.table_name}</span>
              </li>
            ))
          ) : (
            <li>No tables found</li>
          )}
        </ul>
      </div>
    </div>
  );
}
