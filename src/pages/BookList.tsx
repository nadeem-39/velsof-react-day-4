import { useEffect, useState, type ReactElement } from "react";
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

  // console.log(pagination.pageIndex, pagination.pageSize);

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
        return <EditBookDialog {...book} />;
      },
    },
    {
      id: "delete",
      header: "Delete",
      cell: ({ row }) => {
        const book = row.original;
        return <DeleteBookDialog {...book} />;
      },
    },
  ];

  // to set the page 0 and starting from 0 to n
  useEffect(() => {
    if (globalFilter) {
      setPagination((prev) => ({
        ...prev,
        pageIndex: 0,
      }));
    } else {
      setPagination((prev) => ({
        ...prev,
        pageIndex: page,
      }));
    }
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

  // return (
  //   <div className=" flex justify-center ">
  //     <Card className="p-4 ring-0 bg-gray-100">
  //       <CardHeader className="items-center text-center">
  //         <CardTitle className="text-4xl font-bold">Books List</CardTitle>
  //         <Button
  //           className=" m-auto w-25 bg-blue-500 text-white cursor-pointer"
  //           onClick={() => {
  //             setView(!view);
  //           }}
  //         >
  //           {view ? "Hide list" : "View list"}{" "}
  //         </Button>
  //       </CardHeader>
  //       {view ? (
  //         <CardContent>
  //           <Input
  //             className=" w-50 border-gray-300"
  //             value={globalFilter}
  //             onChange={(e) => {
  //               setGlobalFilter(e.target.value);
  //               updateParams({ search: e.target.value });
  //             }}
  //             placeholder="Search books..."
  //           ></Input>
  //           <select
  //             className={" border border-gray-300 rounded m-2 p-2"}
  //             value={pagination.pageSize}
  //             onChange={(e) => {
  //               updateParams({ limit: e.target.value });
  //               setPagination((prev) => ({
  //                 ...prev,
  //                 pageSize: Number(e.target.value),
  //                 pageIndex: page,
  //               }));
  //             }}
  //           >
  //             <option value={5}>5</option>
  //             <option value={10}>10</option>
  //             <option value={20}>20</option>
  //             <option value={50}>50</option>
  //           </select>
  //           <Table>
  //             <TableHeader>
  //               {table.getHeaderGroups().map((hg) => (
  //                 <TableRow key={hg.id} className="bg-black text-white">
  //                   {hg.headers.map((header) => (
  //                     <TableHead
  //                       className="w-50 text-center"
  //                       key={header.id}
  //                       onClick={header.column.getToggleSortingHandler()}
  //                       style={{ cursor: "pointer" }}
  //                     >
  //                       {flexRender(
  //                         header.column.columnDef.header,
  //                         header.getContext(),
  //                       )}

  //                       {header.column.getIsSorted() === "asc" && " 🔼"}
  //                       {header.column.getIsSorted() === "desc" && " 🔽"}
  //                     </TableHead>
  //                   ))}
  //                 </TableRow>
  //               ))}
  //             </TableHeader>
  //             <TableBody>
  //               <TableRow className="text-center p-2">
  //                 {table.getRowModel().rows.length === 0 && "No data found"}
  //               </TableRow>
  //               {table.getRowModel().rows.map((row) => (
  //                 <TableRow key={row.id} className="border-gray-200">
  //                   {row.getVisibleCells().map((cell) => (
  //                     <TableCell
  //                       key={cell.id}
  //                       className="font-medium text-center"
  //                     >
  //                       {flexRender(
  //                         cell.column.columnDef.cell,
  //                         cell.getContext(),
  //                       )}
  //                     </TableCell>
  //                   ))}
  //                 </TableRow>
  //               ))}
  //             </TableBody>
  //           </Table>
  //           {/* pagination */}
  //           <div className="flex justify-between mt-5">
  //             <Button
  //               className={"bg-green-700 text-white "}
  //               onClick={() => {
  //                 updateParams({ page: page - 1 });
  //                 return table.previousPage();
  //               }}
  //               disabled={!table.getCanPreviousPage()}
  //             >
  //               Prev
  //             </Button>

  //             <span>
  //               {" "}
  //               Page {pagination.pageIndex + 1} of{" "}
  //               {Math.ceil((data?.total || 0) / pagination.pageSize)}
  //             </span>

  //             <Button
  //               className={"bg-green-700 text-white "}
  //               onClick={() => {
  //                 updateParams({ page: page + 1 });
  //                 return table.nextPage();
  //               }}
  //               disabled={!table.getCanNextPage()}
  //             >
  //               Next
  //             </Button>
  //           </div>
  //         </CardContent>
  //       ) : (
  //         <p>Click above Button to view Book list</p>
  //       )}
  //     </Card>
  //   </div>
  // );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-flex align-items-center justify-content-between">
            <h4 className="mb-0 font-size-18">Books List</h4>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-4">Filter</h5>

              <div className="row">
                <div className="col-lg-4 col-md-4">
                  <label className="sr-only">Search</label>
                  <div className="input-group mb-2 mr-sm-3">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <i className="mdi mdi-magnify"></i>
                      </div>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      id="inlineFormSearchl2"
                      value={globalFilter}
                      onChange={(e) => {
                        setGlobalFilter(e.target.value);
                        updateParams({ search: e.target.value });
                      }}
                      placeholder="Search books..."
                    />
                  </div>
                </div>
                <div className="col-lg-1 col-md-1 text-right">
                  <select
                    className={" border-1 border-gray-300 rounded  p-2"}
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
                </div>

                <div className="col-lg-7 col-md-7 text-right">
                  <button
                    className=" w-25 btn btn-primary"
                    onClick={() => {
                      setView(!view);
                    }}
                  >
                    {view ? "Hide list" : "View list"}{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <div className="TableHeader">
                <div className="row">
                  <div className="col-lg-3">
                    <h4 className="card-title">Books List</h4>
                  </div>
                </div>
              </div>
              {view ? (
                <>
                  <div className="table-responsive">
                    <table
                      className="table mb-0 listingData dt-responsive"
                      id="datatable"
                    >
                      <thead>
                        {table.getHeaderGroups().map((hg) => (
                          <tr key={hg.id} className="bg-black text-white">
                            {hg.headers.map((header) => (
                              <th
                                className=" text-center"
                                key={header.id}
                                onClick={header.column.getToggleSortingHandler()}
                                style={{ cursor: "pointer" }}
                              >
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext(),
                                )}

                                {header.column.getIsSorted() === "asc" && " 🔼"}
                                {header.column.getIsSorted() === "desc" &&
                                  " 🔽"}
                              </th>
                            ))}
                          </tr>
                        ))}
                      </thead>
                      <tbody>
                        <tr className="text-center p-2">
                          {table.getRowModel().rows.length === 0 &&
                            "No data found"}
                        </tr>
                        {table.getRowModel().rows.map((row) => (
                          <tr key={row.id} className="border-gray-200">
                            {row.getVisibleCells().map((cell) => (
                              <td
                                key={cell.id}
                                className="font-medium text-center"
                              >
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext(),
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="row pt-3">
                    <div className="col-sm-12 col-md-5">
                      <div
                        className="dataTables_info"
                        id="datatable_info"
                        role="status"
                        aria-live="polite"
                      >
                        Showing Entry {pagination.pageIndex + 1} of{" "}
                        {Math.ceil((data?.total || 0) / pagination.pageSize)}
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-7 dataTables_wrapper ">
                      <div
                        className="dataTables_paginate paging_simple_numbers"
                        id="datatable_paginate"
                      >
                        <ul className="pagination">
                          <li
                            className="paginate_button page-item"
                            id="datatable_previous"
                          >
                            <button
                              aria-controls="datatable"
                              data-dt-idx="2"
                              className="page-link cursor-pointer bg-red-700"
                              onClick={() => {
                                updateParams({ page: page - 1 });

                                return table.previousPage();
                              }}
                              disabled={!table.getCanPreviousPage()}
                            >
                              Previous
                            </button>
                          </li>
                          <li className="paginate_button page-item active">
                            <a
                              aria-controls="datatable"
                              data-dt-idx="1"
                              className="page-link"
                            >
                              {pagination.pageIndex + 1}{" "}
                            </a>
                          </li>
                          <li
                            className="paginate_button page-item"
                            id="datatable_next"
                          >
                            <button
                              aria-controls="datatable"
                              data-dt-idx="2"
                              className="page-link cursor-pointer bg-red-700"
                              onClick={() => {
                                updateParams({ page: page + 1 });

                                return table.nextPage();
                              }}
                              disabled={!table.getCanNextPage()}
                            >
                              Next
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <p>Click above Button to view Book list</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookList;
