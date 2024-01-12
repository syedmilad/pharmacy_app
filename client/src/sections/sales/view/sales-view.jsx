import axios from 'axios';
import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { Box, Grid, Modal, TextField } from '@mui/material';

import { users } from 'src/_mock/user';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../sales-table-row';
import UserTableHead from '../sales-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../sales-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function SalesView() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: users,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  const [salesData, setSalesData] = useState([]);
  // const [sale,setSale] = useState({})

  const fetchData = async () => {
    try {
      const response = await axios.get('http://192.168.100.65:3000/api/v1/sales',{
        headers: {
          'x-access-token': localStorage.getItem('token')
        }
      });
      if (response.status === 200) {
        setSalesData(response.data);
        console.log(response.data);
      } else {
        console.log('Error is else block');
      }
    } catch (error) {
      console.error('Error from sales api', error);
    }
  };

  useEffect(() => {
    console.log("sales api")
    fetchData();
  }, []);

  console.log(salesData)

  // code for custom sales functionality without api

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [sale, setSale] = useState({
    id: '',
    saleItem: '',
    quantity: '',
    price: '',
    totalPrice: '',
  });
  const [allSales,setAllSales] = useState([]);

  const onChangeHandler = (e) => {
    e.preventDefault();
    const {name, value} = e.target
    setSale((prev)=> {
      const ans = {...prev, [name]: value}
      return ans;
    })
    // console.log(sale)
  }

  const generateRandomId = () => {
    // Generate a random number and concatenate with a timestamp to create a unique ID
    const randomId = Math.random().toString(36).substr(2, 9);
    const timestamp = new Date().getTime();
    return `${randomId}-${timestamp}`;
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const newId = generateRandomId()
    const newSale = {
      id: newId,
      saleItem: sale.saleItem,
      quantity: sale.quantity,
      price: sale.price,
      totalPrice: sale.totalPrice
    }
    setAllSales((prev)=> [...prev, newSale])
    setSale({
      id: '',
      saleItem: '',
      quantity: '',
      price: '',
      totalPrice: '',
    })
    console.log(allSales);
    setOpen(false)
  }

  useEffect(() => {
    const savedItem = JSON.parse(localStorage.getItem("sale"))
    setAllSales(savedItem)
  }, []);

  useEffect(() => {
   localStorage.setItem("sale", JSON.stringify(allSales))
  }, [allSales]);

  console.log(allSales)

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h3 ">Sales</Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleOpen}
        >
          New Sale Item
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Container component="main">
              <Box
                sx={{
                  marginTop: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Typography sx={{ mb: 4 }} component="h4" variant="h4">
                  Create Sale Form
                </Typography>
                <Box component="form" onSubmit={onSubmitHandler}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        autoComplete="given-name"
                        name="saleItem"
                        required
                        fullWidth
                        id="productName"
                        label="Medicine_Name"
                        autoFocus
                        value={sale.saleItem}
                        onChange={onChangeHandler}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        required
                        fullWidth
                        id="discription"
                        label="Item_Quantity"
                        name="quantity"
                        autoComplete="family-name"
                        value={sale.quantity}
                        onChange={onChangeHandler}
                        // multiline
                        // rows={4}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="price"
                        label="Price"
                        type="number"
                        id="price"
                        value={sale.price}
                        onChange={onChangeHandler}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="quantity"
                        label="Unit_Price"
                        name="totalPrice"
                        autoComplete="quantity"
                        type="number"
                        value={sale.totalPrice}
                        onChange={onChangeHandler}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    // onSubmit={onSubmitHandler}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sale
                  </Button>
                </Box>
              </Box>
            </Container>
          </Box>
        </Modal>
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={users.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'company', label: 'Company' },
                  { id: 'role', label: 'Role' },
                  { id: 'isVerified', label: 'Verified', align: 'center' },
                  { id: 'status', label: 'Status' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {salesData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <UserTableRow
                      key={index}
                      userId={row.id}
                      salesOrderId={row.salesOrderId}
                      name={row.productName}
                      role={row.price}
                      status={row.totalAmount}
                      company={row.quantity}
                      avatarUrl={row.avatarUrl}
                      isVerified={row.isVerified}
                      selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => handleClick(event, row.name)}
                      allSales={allSales}
                      setAllSales={setAllSales}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, users.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
