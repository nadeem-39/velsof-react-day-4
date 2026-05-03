import { useEffect, useState, type ReactElement } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import DeleteBookDialog from "@/components/localComponents/DeleteBookDialog";
import EditBookDialog from "@/components/localComponents/EditBookDialog";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  type SortingState,
  type ColumnDef,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import instance from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { tableQueryParams } from "@/lib/tableQueryParams";

type bookDataTemplate = {
  author: string;
  id: number;
  title: string;
};
type BooksResponse = {
  data: bookDataTemplate[];
  total: number;
};

const BookList = (): ReactElement => {
  const { page, limit, search, updateParams } = tableQueryParams();
  let [view, setView] = useState<boolean>(true);
  const [pagination, setPagination] = useState({
    pageIndex: page,
    pageSize: limit,
  });

  // console.log(page, limit);

  console.log(pagination.pageIndex, pagination.pageSize);

  const [sorting, setSorting] = useState<SortingState>([]);

  const [globalFilter, setGlobalFilter] = useState(search);

  const fetchBooks = async (
    pageIndex: number,
    pageSize: number,
    search: string,
  ): Promise<BooksResponse> => {
    const res = await instance({
      params: {
        _page: pageIndex,
        _limit: pageSize,
        _sort: sorting[0]?.id,
        _order: sorting[0]?.desc ? "desc" : "asc",
        q: search,
      },
      url: "/book",
      method: "get",
    });
    return {
      data: res.data, // array
      total: Number(res.headers["x-total-count"]),
    };
  };

  const { data, isLoading, error } = useQuery({
    queryKey: [
      "books",
      pagination.pageIndex,
      pagination.pageSize,
      globalFilter,
    ],
    queryFn: () =>
      fetchBooks(pagination.pageIndex, pagination.pageSize, globalFilter),
    placeholderData: (prev) => prev,
  });

  const columns: ColumnDef<bookDataTemplate>[] = [
    { accessorKey: "id", header: "ID", enableSorting: true },
    { accessorKey: "title", header: "Title", enableSorting: true },
    { accessorKey: "author", header: "Author", enableSorting: true },
    {
      id: "edit",
      header: "Edit",
      cell: ({ row }) => {
        const book = row.original;
        return <EditBookDialog {...book}>✏️</EditBookDialog>;
      },
    },
    {
      id: "delete",
      header: "Delete",
      cell: ({ row }) => {
        const book = row.original;
        return <DeleteBookDialog {...book}>🚫</DeleteBookDialog>;
      },
    },
  ];

  // to set the page 0 and starting from 0 to n
  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: page,
    }));
  }, [globalFilter]);

  const table = useReactTable<bookDataTemplate>({
    data: data?.data ?? [],
    columns,
    pageCount: Math.ceil((data?.total || 0) / pagination.pageSize),

    state: { pagination, sorting },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    manualFiltering: true,
  });

  if (isLoading)
    return (
      <div className="flex  m-auto w-9/12 mt-50 flex-col gap-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <div className="flex gap-4" key={index}>
            <Skeleton className="h-4 flex-1 bg-gray-400" />
            <Skeleton className="h-4 w-24 bg-gray-400" />
            <Skeleton className="h-4 w-20 bg-gray-400" />
          </div>
        ))}
      </div>
    );
  if (error) return <span>Error please try again</span>;

  return (
    <div className=" flex justify-center ">
      <Card className="p-4 ring-0 bg-gray-100">
        <CardHeader className="items-center text-center">
          <CardTitle className="text-4xl font-bold">Books List</CardTitle>
          <Button
            className=" m-auto w-25 bg-blue-500 text-white cursor-pointer"
            onClick={() => {
              setView(!view);
            }}
          >
            {view ? "Hide list" : "View list"}{" "}
          </Button>
        </CardHeader>
        {view ? (
          <CardContent>
            <Input
              className=" w-50 border-gray-300"
              value={globalFilter}
              onChange={(e) => {
                setGlobalFilter(e.target.value);
                updateParams({ search: e.target.value });
              }}
              placeholder="Search books..."
            ></Input>
            <select
              className={" border border-gray-300 rounded m-2 p-2"}
              value={pagination.pageSize}
              onChange={(e) => {
                updateParams({ limit: e.target.value });
                setPagination((prev) => ({
                  ...prev,
                  pageSize: Number(e.target.value),
                  pageIndex: page,
                }));
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((hg) => (
                  <TableRow key={hg.id} className="bg-black text-white">
                    {hg.headers.map((header) => (
                      <TableHead
                        className="w-50 text-center"
                        key={header.id}
                        onClick={header.column.getToggleSortingHandler()}
                        style={{ cursor: "pointer" }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}

                        {header.column.getIsSorted() === "asc" && " 🔼"}
                        {header.column.getIsSorted() === "desc" && " 🔽"}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                <TableRow className="text-center p-2">
                  {table.getRowModel().rows.length === 0 && "No data found"}
                </TableRow>
                {table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} className="border-gray-200">
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="font-medium text-center"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {/* pagination */}
            <div className="flex justify-between mt-5">
              <Button
                className={"bg-green-700 text-white "}
                onClick={() => {
                  updateParams({ page: page - 1 });
                  return table.previousPage();
                }}
                disabled={!table.getCanPreviousPage()}
              >
                Prev
              </Button>

              <span>
                {" "}
                Page {pagination.pageIndex + 1} of{" "}
                {Math.ceil((data?.total || 0) / pagination.pageSize)}
              </span>

              <Button
                className={"bg-green-700 text-white "}
                onClick={() => {
                  updateParams({ page: page + 1 });
                  return table.nextPage();
                }}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </CardContent>
        ) : (
          <p>Click above Button to view Book list</p>
        )}
      </Card>
    </div>
  );
};

export default BookList;
