import axios from 'axios';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { Grid, Select, MenuItem, TextField, InputLabel } from '@mui/material';

import { users } from 'src/_mock/user';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
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

export default function UserPage() {
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

  const resetForm = () => {
    setUserDetailForApi({
      firstname: '',
      lastname: '',
      phone: '',
      email: '',
      password: '',
      roleName: '',
      image: '',
    });
  }

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    resetForm();
    setOpen(true)
  }
  const handleClose = () => setOpen(false)


  // const [selectedFile, setSelectedFile] = useState(null);

  const [userDataFromAi, setUserDataFromAi] = useState([]);
  const [userDetailForApi, setUserDetailForApi] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    password: '',
    roleName: '',
    image: null
  });

  console.log(userDataFromAi)

    useEffect(() => {
      if (open) {
        setUserDetailForApi({
          firstname: '',
          lastname: '',
          phone: '',
          email: '',
          password: '',
          roleName: '',
          image: '',
        });
      }
    }, [open]);


  // console.log('userDetails23424W', userDetailForApi);  
  const onSubmitHandlerForCreateForm = async (e) => {
    e.preventDefault();

    try {
     

      // const formData = {
      //   firstname: userDetailForApi.firstname,
      //   lastname: userDetailForApi.lastname,
      //   email: userDetailForApi.email,
      //   password: userDetailForApi.password,
      //   roleName: userDetailForApi.roleName,
      //   phone: userDetailForApi.phone,
      //   iamge: userDetailForApi.image,
      // };
      const formData = new FormData();
      formData.append('firstname', userDetailForApi.firstname);
      formData.append('lastname', userDetailForApi.lastname);
      formData.append('email', userDetailForApi.email);
      formData.append('password', userDetailForApi.password);
      formData.append('roleName', userDetailForApi.roleName);
      formData.append('phone', userDetailForApi.phone);
      formData.append('image', userDetailForApi.image);

      const response = await axios.post('http://localhost:3000/api/v1/users', formData,{
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-access-token': localStorage.getItem('token'),
        }
      });
      console.log(response, "add");
      console.log('Response from Create User API:', response.data);
      fetchData();
      // setUserDetailForApi({
      //   firstname: '',
      //   lastname: '',
      //   phone: '',
      //   email: '',
      //   password: '',
      //   roleName: '',
      // });
    } catch (error) {
      console.log('Error Submitting From:', error);
    }
    setOpen(false);
  };

  // const onSubmitHandlerCreateForm = (e) => {
  //   e.preventDefault();

  //   const newUserAdd = {
  //     id: userDetailForApi.id,
  //     firstname: userDetailForApi.firstname,
  //     lastname: userDetailForApi.lastname,
  //     email: userDetailForApi.email,
  //     password: userDetailForApi.password,
  //     RoleName: userDetailForApi.RoleName
  //   }

  //   setUserDataFromAi((prev)=> [...prev, newUserAdd]);
  //   setUserDetailForApi({
  //     id: "",
  //     firstname: "",
  //     lastname: "",
  //     email: "",
  //     password: "",
  //     RoleName: ""
  //   })
  //   console.log(userDetailForApi);
  //   console.log(userDetailForApi);
  //   setOpen(false); // instead of this work below work for api create user
  // }

  const onChangeHandler = (e) => {
    const {name, value} = e.target;
    console.log('name, value: ' , e.target.name, e.target.value);
    setUserDetailForApi((prev) => {
      const ans = { ...prev, [name]: value };
      return ans
    });
  };
  
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/users',{
        headers: {
          'x-access-token': localStorage.getItem('token')
        }
      });
      console.log(response);
      setUserDataFromAi(response.data); // Update state with fetched data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
};
  useEffect(() => {
    fetchData(); // Call the function to fetch data when component mounts
  }, []); // 

  console.log(userDetailForApi)

  // const onChangeApi = () => {
  //   console.log(userDataFromAi);
  // };

  // const [userFormList, setUserFormList] = useState([]);
  // const [userDetails, setUserDetails] = useState({
  //   id: '',
  //   firstName: '',
  //   lastName: '',
  //   number: '',
  //   email: '',
  //   password: '',
  //   role: '',
  //   image: null,
  // });

  // const onChangeHandler = (e) => {
  //   const { name, value } = e.target;
  //   setUserDetails((prev) => {
  //     const ans2 = { ...prev, [name]: value };
  //     return ans2;
  //   });
  // };

  // useEffect(() => {
  //   console.log('User Form List:', userFormList);
  // }, [userFormList]);

  // useEffect(() => {
  //   const savedUserFormList = JSON.parse(localStorage.getItem('userFormList'));
  //   if (savedUserFormList) {
  //     setUserFormList(savedUserFormList);
  //   }
  // }, []);

  // console.log(userFormList);

  // useEffect(() => {
  //   localStorage.setItem('userFormList', JSON.stringify(userFormList));
  // }, [userFormList]);

  // const generateRandomId = () => {
  //   // Generate a random number and concatenate with a timestamp to create a unique ID
  //   const randomId = Math.random().toString(36).substr(2, 9);
  //   const timestamp = new Date().getTime();
  //   return `${randomId}-${timestamp}`;
  // };

  // const onSubmitHandler = (e) => {
  //   e.preventDefault( );

  //   const newId = generateRandomId();
  //   const newUserDetails = {
  //     id: newId,
  //     firstName: userDetails.firstName,
  //     lastName: userDetails.lastName,
  //     number: userDetails.number,
  //     email: userDetails.email,
  //     password: userDetails.password,
  //     role: userDetails.role,
  //     image: userDetails.image,
  //   };

  //   setUserFormList((prevUserList) => [...prevUserList, newUserDetails]); // Append new user details to the existing list
  //   setUserDetails({
  //     id: '',
  //     firstName: '',
  //     lastName: '',
  //     number: '',
  //     email: '',
  //     password: '',
  //     role: '',
  //     image: null,
  //   });
  //   console.log(userDetails);
  //   console.log(userFormList);
  //   setOpen(false);
  // };

  // const onFileChangeHandler = (event) => {
  //   const file = event.target.files[0]
  //   setSelectedFile(file)
  //   console.log(file)
  //   setUserDetails((prev)=> {
  //     return {...prev, [file]: [file.name]}
  //   })

  //   const image = URL.createObjectURL(selectedFile);
  //   console.log(image)
  // }
  // const [imagesrc, setImageSrc] = useState(null);

  const onImageHandler = (e) => {
    const file = e.target.files[0];
    setUserDetailForApi((prev)=> ({
      ...prev,
       image: file
    }))
  }

  console.log(userDetailForApi)



  // const onImageHandlers = (e) => {
  //   const file = e.target.files[0];
  //   if(file){
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       const imageData = {...userDetails, image: reader.result}
  //       setUserDetails(imageData)
  //     }
  //     reader.readAsDataURL(file)
  //   }
  //   console.log(userDetails)
  //   console.log(file)
  // }

  // const onImageHandler = (e) => {
  //   const image = e.target.files[0];
  //   setUserDetails((prev) => {
  //     const ans = { ...prev, image };
  //     return ans;
  //   });
  // };

  return (
    <Container>
      <Button>Api check</Button>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Users_Page</Typography>
        <Box>
          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleOpen}
          >
            Create User
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              {/* <Typography id="modal-modal-title" variant="h6" component="h2">
                Text in a modal
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography> */}

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
                    Create User Form
                  </Typography>
                  <Box component="form" onSubmit={onSubmitHandlerForCreateForm}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          // autoComplete="given-name"
                          name="firstname"
                          required
                          fullWidth
                          id="firstName"
                          label="First Name"
                          autoFocus
                          value={userDetailForApi.firstname}
                          onChange={onChangeHandler}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          id="lastName"
                          label="Last Name"
                          name="lastname"
                          // autoComplete="family-name"
                          value={userDetailForApi.lastname}
                          onChange={onChangeHandler}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          name="phone"
                          label="Phone-number"
                          type="number"
                          id="number"
                          value={userDetailForApi.phone}
                          onChange={onChangeHandler}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          // autoComplete="email"
                          value={userDetailForApi.email}
                          onChange={onChangeHandler}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          name="password"
                          label="Password"
                          type="password"
                          id="password"
                          // autoComplete="new-password"
                          value={userDetailForApi.password}
                          onChange={onChangeHandler}
                        />
                      </Grid>
                      {/* <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          name="RoleName"
                          label="RoleName"
                          type="RoleName"
                          id="RoleName"
                          value={userDetailForApi.RoleName}
                          onChange={onChangeHandler}
                        />
                      </Grid> */}
                      <Grid item xs={12}>
                        <InputLabel required id="demo-simple-select-label">
                          Person-role
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={age}
                          label="Age"
                          required
                          fullWidth
                          name="roleName"
                          value={userDetailForApi.roleName}
                          onChange={onChangeHandler}
                        >
                          <MenuItem value="Admin-person">Admin-person</MenuItem>
                          <MenuItem value="User-person">User-person</MenuItem>
                        </Select>
                      </Grid>

                      <Grid item xs={12}>
                        <input
                          accept="image/*"
                          style={{ display: 'none' }}
                          id="raised-button-file"
                          multiple
                          type="file"
                          onChange={onImageHandler}
                          // onChange={onImageHandler}
                        />
                        <label htmlFor="raised-button-file">
                          <Button variant="contained" color="inherit" component="span" className="">
                            {userDetailForApi?.image?.name ?? 'Upload an Image'}
                            {/* {userDetails.image && <img style={{height: '50px', width: '50px'}} src={userDetails.image} alt="Uploaded" /> } */}
                          </Button>
                        </label>
                      </Grid>
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                      Create
                    </Button>
                    {/* <Grid container justifyContent="flex-end"></Grid> */}
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
                  { id: 'name', label: 'Name' },
                  { id: 'company', label: 'Email' },
                  { id: 'role', label: 'Role' },
                  { id: 'isVerified', label: 'Verified', align: 'center' },
                  { id: 'status', label: 'Phone_number' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {userDataFromAi
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <UserTableRow
                      key={index}
                      userId={row.id}
                      // name={`${row.firstName} ${row.lastName}`}
                      name={`${row.firstname} ${row.lastname}`}
                      // role={row.role}
                      role={row.roleName}
                      // status={row.status}
                      // status={row.number}
                      status={row.phone}
                      company={row.email}
                      image={row.image}
                      avatarUrl={row.avatarUrl}
                      isVerified={row.isVerified}
                      selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => handleClick(event, row.name)}
                      // userFormList={userFormList}
                      // setUserFormList={setUserFormList}
                      // userDetails={userDetails}
                      // setUserDetails={setUserDetails}
                      userFormList={userDataFromAi}
                      setUserFormList={setUserDataFromAi}
                      userDetails={userDetailForApi}
                      setUserDetails={setUserDetailForApi}
                      fetchData={fetchData}
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
