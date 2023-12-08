import { Search } from "@mui/icons-material";
import {
  CircularProgress,
  Grid,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useDebounce } from "hooks";
import { DashboardLayout } from "layouts";
import { ChangeEvent, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { ProductsData } from "types";
import { QUERY_KEYS } from "utils";

const defaultProductsUrl = `https://dummyjson.com/products?limit=100`;

const searchProductsUrl = (query: string) =>
  `https://dummyjson.com/products/search?q=${query}`;

function DashboardProductsPage() {
  const [searchText, setSearchText] = useState<string>("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const debouncedSearchString = useDebounce(searchText, 700);

  const {
    isLoading,
    isRefetching,
    data: productData,
    refetch,
  } = useQuery<ProductsData>(QUERY_KEYS.products, () =>
    fetch(
      searchText === ""
        ? defaultProductsUrl
        : searchProductsUrl(debouncedSearchString)
    ).then((res) => res.json())
  );

  useEffect(() => {
    setPage(0);
    refetch();
  }, [debouncedSearchString, refetch]);

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeSearchField = (
    text: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchText(text.target.value);
  };

  return (
    <DashboardLayout>
      {isLoading || isRefetching ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "16px",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <>
          <Grid container marginBottom={"16px"} rowSpacing={1}>
            <Grid style={{ display: "flex", alignSelf: "center" }} item md={6}>
              <Typography
                style={{
                  fontWeight: "600",
                }}
              >
                List Of Products
              </Typography>
            </Grid>
            <Grid
              style={{
                display: "flex",
                alignSelf: "center",
                justifyContent: "right",
              }}
              item
              md={6}
            >
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                value={searchText}
                onChange={handleChangeSearchField}
                margin="normal"
                label="Search"
              />
            </Grid>
          </Grid>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell align="center">Categories</TableCell>
                  <TableCell align="center">Price</TableCell>
                  <TableCell align="center">Brand</TableCell>
                  <TableCell align="center">Stock</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productData?.products
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((product) => (
                    <TableRow
                      key={product.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {product.title}
                      </TableCell>
                      <TableCell align="center">{product.category}</TableCell>
                      <TableCell align="center">{product.price}</TableCell>
                      <TableCell align="center">{product.brand}</TableCell>
                      <TableCell align="center">{product.stock}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                count={productData?.products.length || 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(_, newPage) => setPage(newPage)}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Table>
          </TableContainer>
        </>
      )}
    </DashboardLayout>
  );
}

export default DashboardProductsPage;
