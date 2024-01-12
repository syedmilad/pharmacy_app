import axios from 'axios';
import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import { Box, Grid, TextField } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { users } from 'src/_mock/user';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../product-table-row';
import TableEmptyRows from '../table-empty-rows';
import UserTableHead from '../product-table-head';
import UserTableToolbar from '../product-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  height: '650px',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ProductsView() {
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

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  // const [selectedFile, setSelectedFile] = useState(null);
  
  const [ProductsFormList, setProductsFormList] = useState([]);
  const [productDetails, setProductDetails] = useState({
    id: '',
    productName: '',
    discription: '',
    price: '',
    quantity: '',
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setProductDetails((prev) => {
      const ans2 = { ...prev, [name]: value };
      return ans2;
    });
  };


  console.log(ProductsFormList)

  // useEffect(() => {
  //   console.log('User Form List:', ProductsFormList);
  // }, [ProductsFormList]);

  useEffect(() => {
    const savedProductsFormList = JSON.parse(localStorage.getItem('ProductsFormList'));
    if (savedProductsFormList) {
      setProductsFormList(savedProductsFormList);
    }
  }, []);

  // console.log(setProductDetails(""))  

  // console.log(ProductsFormList);

  useEffect(() => {
    localStorage.setItem('ProductsFormList', JSON.stringify(ProductsFormList));
  }, [ProductsFormList]);

  const generateRandomId = () => {
    // Generate a random number and concatenate with a timestamp to create a unique ID
    const randomId = Math.random().toString(36).substr(2, 9);
    const timestamp = new Date().getTime();
    return `${randomId}-${timestamp}`;
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const newId = generateRandomId();
    const newproductDetails = {
      id: newId,
      productName: productDetails.productName,
      discription: productDetails.discription,
      price: productDetails.price,
      quantity: productDetails.quantity,
    };

    setProductsFormList((prevProductsList) => [...prevProductsList, newproductDetails]); // Append new user details to the existing list
    setProductDetails({
      id: '',
      productName: '',
      discription: '',
      price: '',
      quantity: '',
    });
    console.log(productDetails);
    console.log(ProductsFormList);
    setOpen(false);
  };

  // const onFileChangeHandler = (event) => {
  //   const file = event.target.files[0]
  //   setSelectedFile(file)
  //   console.log(file)
  //   setProductDetails((prev)=> {
  //     return {...prev, [file]: [file.name]}
  //   })

  //   const image = URL.createObjectURL(selectedFile);
  //   console.log(image)
  // }
  // const [imagesrc, setImageSrc] = useState(null);

  // const onImageHandlers = (e) => {
  //   const file = e.target.files[0];
  //   if(file){
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       const imageData = {...productDetails, image: reader.result}
  //       setProductDetails(imageData)
  //     }
  //     reader.readAsDataURL(file)
  //   }
  //   console.log(productDetails)
  //   console.log(file)
  
  // }

  const [productData, setProductData] = useState([])
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/purchase",{
        headers: {
          'x-access-token': localStorage.getItem('token')
        }
      });
      if (response.status === 200) {
        setProductData(response.data);
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
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Products_Page</Typography>

        <Box>
          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleOpen}
          >
            Create Product
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
                  <Box component="form" onSubmit={onSubmitHandler}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12}>
                        <TextField
                          autoComplete="given-name"
                          name="productName"
                          required
                          fullWidth
                          id="productName"
                          label="ProductName"
                          autoFocus
                          value={productDetails.productName}
                          onChange={onChangeHandler}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <TextField
                          required
                          fullWidth
                          id="discription"
                          label="Discription"
                          name="discription"
                          type="number"
                          autoComplete="family-name"
                          value={productDetails.discription}
                          onChange={onChangeHandler}
                          multiline
                          rows={4}
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
                          value={productDetails.price}
                          onChange={onChangeHandler}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          id="quantity"
                          label="Quantity"
                          name="quantity"
                          autoComplete="quantity"
                          value={productDetails.quantity}
                          onChange={onChangeHandler}
                        />
                      </Grid>
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
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
                  { id: 'name', label: 'Product_Name' },
                  { id: 'company', label: 'Description' },
                  { id: 'role', label: 'Quantity' },
                  { id: 'isVerified', label: 'Verified', align: 'center' },
                  { id: 'status', label: 'Price' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {productData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <UserTableRow
                      key={index}
                      userId={row.id}
                      name={row.itemName}
                      role={row.quantity}
                      status={row.price}
                      company={row.itemdescription}
                      avatarUrl={row.avatarUrl}
                      // isVerified={row.isVerified}
                      isVerified={row.isVerified}
                      selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => handleClick(event, row.name)}
                      ProductsFormList={ProductsFormList}
                      setProductsFormList={setProductsFormList}
                      productDetails={productDetails}
                      setProductDetails={setProductDetails}
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