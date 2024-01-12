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
import UserTableRow from '../purchase-table-row';
import TableEmptyRows from '../table-empty-rows';
import UserTableHead from '../purchase-table-head';
import UserTableToolbar from '../purchase-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function PurchaseViewPage() {
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

  // const [purchaseData, setPurchaseData] = useState([]);

  //  CODE FOR FETCHING PURCHASE DATA FROM API
  const fetchData = async () => {
    try {
      const response = await axios.get('http://192.168.100.65:3000/api/v1/purchase',{
        headers: {
          'x-access-token': localStorage.getItem('token')
        }
      });
      if (response.status === 200) {
        setPurchaseData(response.data);
      }
      console.log(response);
      console.log(response.data);
    } catch (error) {
      console.log('Error from Api', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  //  CODE FOR FETCHING PURCHASE DATA FROM API

  const onSubmitHandler =  async (e) =>  {
    e.preventDefault();

    try {
      const newPurcahseItem = {
        id: purchase.id,
        itemName: purchase.itemName,
        itemdescription: purchase.itemdescription,
        quantity: purchase.quantity,
        unitPrice: purchase.unitPrice,
        totalAmount: purchase.totalAmount,
      };
      const createPurchaseForm = await axios.post(
        'http://192.168.100.65:3000/api/v1/purchase',
        newPurcahseItem,{
          headers: {
            'x-access-token': localStorage.getItem('token')
          }
        }
      );
        fetchData()
      if (createPurchaseForm.status === 200) {
        setPurchase({
          id: '',
          itemName: '',
          itemdescription: '',
          quantity: '',
          unitPrice: '',
          totalAmount: '',
        });
      } 
    } catch (error) {
      console.error("Error from createApi", error)
    }
    setOpen(false)
  };
  // console.log(purchaseData);
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

  // code for open new purchase modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [purchaseData, setPurchaseData] = useState([]);
  const [purchase, setPurchase] = useState({
    id: '',
    itemName: '',
    itemdescription: '',
    quantity: '',
    unitPrice: '',
    totalAmount: '',
  });

  const onChangeHandler = (e) => {
    e.preventDefault();
    
    const { name, value } = e.target;
    setPurchase((prev) => {
      const name_data = { ...prev, [name]: value };
      return name_data;
    });
    console.log(purchase);
  };
  console.log(purchase);

  // const randomGenerateId = () => {
  //   // Generate a random number and concatenate with a timestamp to create a unique ID
  //   const randomId = Math.random().toString(36).substr(2, 9);
  //   const timestamp = new Date().getTime();
  //   return `${randomId}-${timestamp}`;
  // };

  // const onSubmitHandler = (e) => {
  //   e.preventDefault();

  //   const newId = randomGenerateId();
  //   const newPurchaseData = {
  //     id: purchase.id,
  //     itemName: purchase.itemName,
  //     itemdescription: purchase.itemdescription,
  //     quantity: purchase.quantity,
  //     unitPrice: purchase.unitPrice,
  //     totalAmount: purchase.totalAmount,
  //   };
  //   setPurchaseData((prev) => [...prev, newPurchaseData]);
  //   setPurchase({
  //     id: '',
  //     itemName: '',
  //     itemdescription: '',
  //     quantity: '',
  //     unitPrice: '',
  //     totalAmount: '',
  //   });
  //   console.log(purchase);
  //   handleClose();
  // };
  // console.log(purchaseData);

  // useEffect(() => {
  //   const savedPurchaseItem = JSON.parse(localStorage.getItem('purchaseData'));
  //   if (savedPurchaseItem) {
  //     setPurchaseData(savedPurchaseItem);
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem('purchaseData', JSON.stringify(purchaseData));
  // }, [purchaseData]);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h3">Purchase_Page</Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleOpen}
        >
          New Purchased Item
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
                  Create Product Form
                </Typography>
                <Box component="form">
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        autoComplete="given-name"
                        name="itemName"
                        required
                        fullWidth
                        id="productName"
                        label="Medicine_Name"
                        autoFocus
                        value={purchase.itemName}
                        onChange={onChangeHandler}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        required
                        fullWidth
                        id="discription"
                        label="Item_Discription"
                        name="itemdescription"
                        autoComplete="family-name"
                        value={purchase.itemdescription}
                        onChange={onChangeHandler}
                        multiline
                        rows={4}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="quantity"
                        label="Quantity"
                        type="number"
                        id="price"
                        value={purchase.quantity}
                        onChange={onChangeHandler}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="quantity"
                        label="Unit_Price"
                        name="unitPrice"
                        autoComplete="quantity"
                        type="number"
                        value={purchase.unitPrice}
                        onChange={onChangeHandler}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="quantity"
                        label="Total_Amount"
                        name="totalAmount"
                        autoComplete="quantity"
                        type="number"
                        value={purchase.totalAmount}
                        onChange={onChangeHandler}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    onClick={onSubmitHandler}
                    type="submit"
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
                  { id: 'name', label: 'Medicine_Name' },
                  { id: 'itemdescription', label: 'Item-Description' },
                  { id: 'quantity', label: 'Quantity' },
                  // { id: 'isVerified', label: 'Verified', align: 'center' },
                  { id: 'unitPrice', label: 'Unit_Price' },
                  { id: 'totalAmount', label: 'Total-Amount' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {purchaseData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <UserTableRow
                      key={index}
                      userId={row.id}
                      itemName={row.itemName}
                      quantity={row.quantity}
                      totalAmount={row.totalAmount}
                      itemdescription={row.itemdescription}
                      avatarUrl={row.avatarUrl}
                      isVerified={row.isVerified}
                      unitPrice={row.unitPrice}
                      selected={selected.indexOf(row.itemName) !== -1}
                      handleClick={(event) => handleClick(event, row.itemName)}
                      purchaseData={purchaseData}
                      setPurchaseData={setPurchaseData}
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
