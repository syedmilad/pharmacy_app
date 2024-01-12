import axios from 'axios';
import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
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
import TableEmptyRows from '../table-empty-rows';
import UserTableRow from '../purchaseOrder-table-row';
import UserTableHead from '../purchaseOrder-table-head';
import UserTableToolbar from '../purchaseOrder-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function SalesOrder() {
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

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    height: '650px',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [purchaseOrder, setPurchaseOrder] = useState([]);
  const [purchase, setPurchase] = useState({
    itemName: '',
    itemdescription: '',
    orderDate: '',
    // orderNumber: '',
    quantity: '',
    totalAmount: '',
    unitPrice: '',
    vendor: '',
    vendorPhone: '',
    image: null,
  });

  // api to get all purchase_order item

  const fetchSales = async () => {
    try {
      const response = await axios.get('http://192.168.100.65:3000/api/v1/sales-order',{
        headers: {
          'x-access-token': localStorage.getItem('token')
        }
      });
     
      console.log(response, "sales order api")
    } catch (error) {
      console.error('Error from api sales order', error);
    }
  };
  useEffect(() => {
    fetchSales();
  }, []);
  

  const fetchPurchase = async () => {
    try {
      const response = await axios.get('http://192.168.100.65:3000/api/v1/purchase-order',{
        headers: {
          'x-access-token': localStorage.getItem('token')
        }
      });
      if (response) {
        console.log(response)
        console.log(response.data.purchaseOrder);
        setPurchaseOrder(response.data.purchaseOrder);
      }
    } catch (error) {
      console.error('Error from api', error);
    }
  };
  useEffect(() => {
    fetchPurchase();
  }, []);

  // creating a api for form submit handler

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      // const purchaseData = {
      //   itemName: purchase.itemName,
      //   itemdescription: purchase.itemdescription,
      //   orderDate: purchase.orderDate,
      //   orderNumber: purchase.orderNumber,
      //   quantity: purchase.quantity,
      //   totalAmount: purchase.totalAmount,
      //   unitPrice: purchase.unitPrice,
      //   vendor: purchase.vendor,
      //   vendorPhone: purchase.vendorPhone,
      //   image: purchase.image,
      // };
      // const response = await axios.post(
      //   'http://192.168.100.65:3000/api/v1/purchase-order/',
      //   purchaseData
      // );
      // console.log(response)
      // console.log(response.data)
      const formData = new FormData();
      formData.append('itemName', purchase.itemName);
      formData.append('itemdescription', purchase.itemdescription);
      formData.append('orderDate', purchase.orderDate);
      // formData.append('orderNumber', purchase.orderNumber);
      formData.append('quantity', purchase.quantity);
      formData.append('totalAmount', purchase.totalAmount);
      formData.append('unitPrice', purchase.unitPrice);
      formData.append('vendor', purchase.vendor);
      formData.append('vendorPhone', purchase.vendorPhone);
      formData.append('image', purchase.image);

      const response = await axios.post(
        'http://192.168.100.65:3000/api/v1/purchase-order/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            "x-acces-token": localStorage.getItem('token'),
          },
        }
      );
      fetchPurchase()
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }

    setOpen(false);
  };

  //   making api for creating a purshase order form

  const onChangeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setPurchase((prev) => {
      const ans = { ...prev, [name]: value };
      return ans;
    });
  };

  // const onChangeImageHandler = (e) => {
  //   console.log(e.target.files[0]);
  //   const file = e.target.files[0];
  //   setPurchase((prev) => {
  //     const img = { ...prev, image: file, };
  //     return img;
  //   });
  // };

  const onChangeImageHandler = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setPurchase((prev) => ({
      ...prev,
      image: file,
    }));
  };

  console.log(purchase);

  useEffect(() => {
    console.log(purchase);
  }, [purchase]);



  console.log(purchaseOrder);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Purchase_Order</Typography>

        <Box>
          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleOpen}
          >
            Purchase Order From
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Container component="form" >
                <Box
                  sx={{
                    marginTop: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Typography sx={{ mb: 2 }} component="h4" variant="h4">
                    Purchase-item
                  </Typography>
                  <Box component="form">
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12}>
                        <TextField
                          autoComplete="given-name"
                          name="itemName"
                          required
                          fullWidth
                          id="itemName"
                          label="itemName"
                          autoFocus
                          value={purchase.itemName}
                          onChange={onChangeHandler}
                        />
                      </Grid>
                      <Grid item xs={6} sm={6}>
                        <TextField
                          required
                          fullWidth
                          id="vendor"
                          label="vendor"
                          name="vendor"
                          type="text"
                          autoComplete="family-name"
                          value={purchase.vendor}
                          onChange={onChangeHandler}
                        />
                      </Grid>
                      <Grid item xs={6} sm={6}>
                        <TextField
                          required
                          fullWidth
                          id="vendorPhone"
                          label="vendorPhone"
                          name="vendorPhone"
                          type="text"
                          autoComplete="family-name"
                          value={purchase.vendorPhone}
                          onChange={onChangeHandler}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          name="itemdescription"
                          label="itemdescription"
                          type="text"
                          id="itemdescription"
                          multiline
                          rows={4}
                          value={purchase.itemdescription}
                          onChange={onChangeHandler}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          required
                          fullWidth
                          id="orderDate"
                          label="orderDate"
                          name="orderDate"
                          autoComplete="orderDate"
                          value={purchase.orderDate}
                          onChange={onChangeHandler}
                        />
                      </Grid>
                      {/* <Grid item xs={4}>
                        <TextField
                          required
                          fullWidth
                          id="orderNumber"
                          label="orderNumber"
                          name="orderNumber"
                          autoComplete="orderNumber"
                          value={purchase.orderNumber}
                          onChange={onChangeHandler}
                        />
                      </Grid> */}
                      <Grid item xs={4}>
                        <TextField
                          required
                          fullWidth
                          id="quantity"
                          label="quantity"
                          name="quantity"
                          autoComplete="quantity"
                          value={purchase.quantity}
                          onChange={onChangeHandler}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          required
                          fullWidth
                          id="unitPrice"
                          label="unitPrice"
                          name="unitPrice"
                          autoComplete="unitPrice"
                          value={purchase.unitPrice}
                          onChange={onChangeHandler}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          required
                          fullWidth
                          id="totalAmount"
                          label="totalAmount"
                          name="totalAmount"
                          autoComplete="totalAmount"
                          value={purchase.totalAmount}
                          onChange={onChangeHandler}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <input
                          accept="image/*"
                          type="file"
                          style={{ display: 'none' }}
                          multiple
                          id="raised-button-file"
                          onChange={onChangeImageHandler}
                        />
                        <label htmlFor="raised-button-file">
                          <Button variant="contained" color="inherit" component="span" className="">
                            {purchase?.image?.name ?? 'please upload a image'}
                          </Button>
                        </label>
                      </Grid>
                    </Grid>
                    <Button
                      type="submit"
                      onClick={onSubmitHandler}
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Create
                    </Button>
                  </Box>
                </Box>
              </Container>
            </Box>
          </Modal>
        </Box>
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
                  { id: 'name', label: 'M-Name' },
                  { id: 'disc', label: 'Disc' },
                  { id: 'vendor', label: 'V-Name' },
                  { id: 'orderNumber', label: 'OrderNumber' },
                  { id: 'v-phone', label: 'V-Phone' },
                  { id: 'orderDate', label: 'OrderDate' },
                  { id: 'quantity', label: 'Quantity' },
                  { id: 'unitPrice', label: 'UnitPrice' },
                  { id: 'totalAmount', label: 'TotalAmount' },

                  { id: '' },
                ]}
              />
              <TableBody>
                {purchaseOrder
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <UserTableRow
                      key={index}
                      userId={row.id}
                      itemName={row.itemName}
                      itemdescription={row.itemdescription}
                      vendor={row.vendor}
                      orderNumber={row.orderNumber}
                      vendorPhone={row.vendorPhone}
                      orderDate={row.orderDate}
                      quantity={row.quantity}
                      unitPrice={row.unitPrice}
                      totalAmount={row.totalAmount}
                      imageAvatarUrl={row.image}
                      avatarUrl={row.avatarUrl}
                      selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => handleClick(event, row.name)}
                      purchaseOrder={purchaseOrder}
                      setPurchaseOrder={setPurchaseOrder}
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
