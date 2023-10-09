import * as React from "react";
import {
    ChatBubbleIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import { format } from "date-fns";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  Row,
} from "@tanstack/react-table";


import { DataTableColumnHeader } from "@/components/data_table_header";
import { Button, buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "@/app/api/_trpc/client";
import AlertDialogComponent from "./alert_dialog_component";
import {  useToast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "./ui/label";
import ToolTipComponent from "./tooltip_component";
import Link from "next/link";
import { ChevronRight } from "lucide-react";


export type Docs =  {id: string, name:string, createdAt: Date, messages: number}
const Actions=({ row }: {row: Row<Docs>}) => {

    const ctx=api.useContext()
    const { mutate: del } = api.documents.deleteOne.useMutation({
      onSuccess: () => {
        ctx.documents.getAll.invalidate();
      },
      onError: () => {
        toast({
          description: "Something went wrong",
          variant: "destructive",
          action: <ToastAction altText="Try again">Try Again</ToastAction>,
        });
      },
    });
    const { mutate: rename } = api.documents.changeName.useMutation({
      onSuccess: () => {
        ctx.documents.getAll.invalidate();
      },
      onError: () => {
        toast({
          description: "Something went wrong",
          variant: "destructive",
          action: <ToastAction altText="Try again">Try Again</ToastAction>,
        });
      },
    });
    const NameSchema = z.object({
      name: z.string(),
    });
    type TNameSchema = z.infer<typeof NameSchema>;
    const {
      register,
      handleSubmit,
    //   formState: { errors },
    //   setValue
    } = useForm<TNameSchema>({
      resolver: zodResolver(NameSchema),
    });
    const { toast } = useToast();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <DotsHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
        
        >
           <AlertDialogComponent form='edit' description='Edit the name of the resource. Click save when done' title="Edit Name" trigger="Edit name of Resource"  action={null}>
 <form
 id='edit'
className="grid gap-4 py-4"
onSubmit={handleSubmit((data) =>
  rename({ id: row.getValue('id'), name: data.name})
)}
>
<div className="grid grid-cols-4 items-center gap-4">
  <Label htmlFor="name" className="text-right">
    Name
  </Label>
  <Input
    id="name"
    {...register(row.getValue('name') )}
    defaultValue={row.getValue('name') }
    className="col-span-3"
  />
</div>
</form>
 </AlertDialogComponent>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
      
        <DropdownMenuItem>View user details</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export const columns: ColumnDef<Docs>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "id",
    header: "id",
    cell: ({ row }) => (
        <ToolTipComponent content="Name of the resource">
                  <Link
                    className={buttonVariants({
                      variant: "link",
                      className: "truncate",
                    })}
                
                    href={{
                      pathname: "/documents/[id]",
                      query: { id: row.getValue('id') },
                    }}
                  >
                    {row.getValue('name')}
                  </Link>
                </ToolTipComponent>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Date Created" />;
    },
    cell: ({ row }) => (
      <div className="lowercase">
        {format(new Date(row.getValue('createdAt')), "MM/dd/yyyy")}
      </div>
    ),
  },
  {
    accessorKey: "messages",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Chats" />;
    },
    cell: ({ row }) => (
        <ToolTipComponent content="Document's number of chats">
       <Link
                    className={buttonVariants({
                      variant: "link",
                      className: "truncate",
                    })}
                
                    href={{
                      pathname: "/documents/[id]",
                      query: { id: row.getValue('id') },
                    }}
                  >
          <ChatBubbleIcon className="w-5 h-5" />
          <p className="text-xs font-extralight">
            {row.getValue('messages')}
          </p>
        </Link>
      </ToolTipComponent>
    ),
  },

 
  {
    accessorKey: "chat",
    header: "chat",
    cell: ({ row }) => (
        <ToolTipComponent content="Click to start chatting with this document">
        <Link
          href={{
            pathname: "/documents/[id]",
            query: { id: row.getValue('id') },
          }}
          className={buttonVariants({
            className: "w-fit",
            variant: "secondary",
            size: "sm",
          })}
        >
          Chat
          <ChevronRight className="h-5 w-5 ml-1.5" />
        </Link>
      </ToolTipComponent>
    ),
  },



  {
    id: "actions",
    enableHiding: false,
    cell: ({row})=> {
        return <Actions row={row} />
    }
  },
];

export function DataTable({data}: {data: Docs[]}) {
 
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex  w-full flex-row flex-wrap items-center justify-between py-4">
        <Input
          placeholder="Filter by Name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="mr-4 max-w-xs"
        />
    
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              View <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function ResourceTable() {
    const {
        data
      } = api.documents.getAll.useQuery({})

  return (
    <>
      <div className="hidden md:flex">
      
        
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">My Resources</h2>
         
          </div>
          {!data &&
            Array(10).fill(<Skeleton className="h-16 w-full rounded-md" />)}
          {data && <DataTable data={data.map(d=> ({id: d.id, name:d.name, createdAt: d.createdAt, messages: d.Message.length}))} />}
        </div>
      </div>
    </>
  );
}
