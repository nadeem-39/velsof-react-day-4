import { useSearchParams } from "react-router-dom";

export function tableQueryParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 5);
  const sort = searchParams.get("sort") || "";
  const search = searchParams.get("search") || "";

  const updateParams = (updates: Record<string, any>) => {
    const newParams = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (value === "" || value === null || value === undefined) {
        newParams.delete(key);
      } else {
        newParams.set(key, String(value));
      }
    });

    setSearchParams(newParams);

    // console.log(searchParams.get("page"));
    // console.log(searchParams.get("limit"));
  };

  return { page, limit, sort, search, updateParams };
}
