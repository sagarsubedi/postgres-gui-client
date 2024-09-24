import { useState } from "react";
import { Check, ChevronDown, Plus, Search, Table2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

const schemas = [
  { value: "public", label: "public" },
  { value: "private", label: "private" },
  { value: "shared", label: "shared" },
];

export default function Sidebar({ tables }: { tables: string[] }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("public");

  return (
    <div className="h-screen w-64 bg-white border-r flex flex-col">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold mb-4">Table Editor</h1>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              {value
                ? schemas.find((schema) => schema.value === value)?.label
                : "Select schema..."}
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Search schema..." />
              <CommandEmpty>No schema found.</CommandEmpty>
              <CommandGroup>
                {schemas.map((schema) => (
                  <CommandItem
                    key={schema.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={`mr-2 h-4 w-4 ${
                        value === schema.value ? "opacity-100" : "opacity-0"
                      }`}
                    />
                    {schema.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <div className="p-4">
        <Button className="w-full mb-4">
          <Plus className="mr-2 h-4 w-4" /> New table
        </Button>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search tables..." className="pl-8" />
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        <ul className="space-y-1 p-4">
          {tables.map((table) => (
            <li
              key={table}
              className="flex items-center space-x-2 px-2 py-1 hover:bg-gray-100 rounded"
            >
              <Table2 className="h-4 w-4" />
              <span>{table}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
