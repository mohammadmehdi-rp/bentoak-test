import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  TablePagination,
} from "@mui/material";
import { DashboardLayout } from "layouts";
import { useState } from "react";
import { useQuery } from "react-query";
import { ProductsData } from "types";
import { QUERY_KEYS } from "utils";

const TABLE_DATA_LENGTH = 100;

function DashboardProductsPage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { isLoading, data: productData } = useQuery<ProductsData>(
    QUERY_KEYS.products,
    () =>
      fetch(`https://dummyjson.com/products?limit=${TABLE_DATA_LENGTH}`).then(
        (res) => res.json()
      )
  );

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <DashboardLayout>
      <Typography style={{ marginBottom: "16px", fontWeight: "600" }}>
        List Of Products
      </Typography>
      {isLoading ? (
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
              count={TABLE_DATA_LENGTH}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(_, newPage) => setPage(newPage)}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Table>
        </TableContainer>
      )}
    </DashboardLayout>
  );
}

export default DashboardProductsPage;
