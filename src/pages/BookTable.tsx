// BookTable.tsx
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
} from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";

type Book = {
  id: number;
  title: string;
  author: string;
};

type BooksResponse = {
  data: Book[];
  total: number;
};

export default function BookTable() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const fetchBooks = async (
    pageIndex: number,
    pageSize: number,
  ): Promise<BooksResponse> => {
    const res = await axios.get("http://localhost:3001/book", {
      params: {
        _page: pageIndex + 1,
        _limit: pageSize,
      },
    });
    // console.log(res.data);

    return {
      data: res.data, // array
      total: Number(res.headers["x-total-count"]),
    };
  };

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["books", pagination.pageIndex, pagination.pageSize],
    queryFn: () => fetchBooks(pagination.pageIndex, pagination.pageSize),
    // keepPreviousData: true,
  });

  console.log(data);

  const columns: ColumnDef<Book>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "title", header: "Title" },
    { accessorKey: "author", header: "Author" },
    {
      id: "edit",
      header: "Actions",
      cell: ({ row }) => {
        const book = row.original;
        return <button onClick={() => console.log(book)}>Edit</button>;
      },
    },
    {
      id: "delete",
      header: "Actions",
      cell: ({ row }) => {
        const book = row.original;
        return <button onClick={() => console.log(book)}>Delete</button>;
      },
    },
  ];

  const table = useReactTable<Book>({
    data: data?.data ?? [],
    columns,
    pageCount: data?.total || 0 / pagination.pageSize,

    state: { pagination },
    onPaginationChange: setPagination,

    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
  });

  console.log(table.getHeaderGroups());

  return (
    <div>
      {/* loading states */}
      {isLoading && <p>Loading...</p>}
      {isFetching && !isLoading && <p>Updating...</p>}

      {/* table */}
      <table>
        <thead>
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* pagination */}
      <button
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        Prev
      </button>

      <span> Page {pagination.pageIndex + 1} </span>

      <button
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        Next
      </button>
    </div>
  );
}
