'use client';

import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Box, Grid, Select, MenuItem, TextField, InputLabel } from '@mui/material';


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

export default function UserEditModal({
  openModalForUser,
  data,
  handleClose,
  userFormList,
  setUserFormList,
  fetchData
}) {
  const [editedData, setEditData] = useState({...data});
  //  for late coming data we are using useEffect 
  useEffect(() => {
    setEditData({...data})
  }, [data]);
  // const [imageFile,setImageFile] = useState(null)
  // const [editedData, setEditData] = useState(data)
  // console.log(editedData)
  
  // useEffect(() => {
  //   setEditData({ ...data });
  // }, [data]);
  // console.log(editedData);
  
  // useEffect(() => {
  //   setEditData(data); /// Set the initial data received from props
  // }, [data]);

  // const onImageHandler = (e) => {
  //   e.preventDefault();
  //   const file = e.target.files[0];
  //   setImageFile(file)
  //   setEditData((prev)=> {
  //       const imageValue =  {...prev, image: file};
  //       return imageValue
  //   })
  //   console.log(imageFile)
  // }

  const handleChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(name, value);
    console.log(editedData);
  };

  // const handleUpdate = () => {
  //   // Find the index of the edited data in the userFormList
  //   const index = userFormList.findIndex((item) => item.id === editedData.id);

  //   if (index !== -1) {
  //     // Create a copy of the userFormList and update the edited item
  //     const updatedList = [...userFormList];
  //     updatedList[index] = editedData;
  //     setUserFormList(updatedList);
  //   }
  //   handleClose(); // Close the modal after updating
  // };

  // code for edit api data below

  const updateDataForApi = async (e) => {
    e.preventDefault();

    try {
      console.log('Edited data:', editedData);
      const response = await axios.put(
        `http://192.168.100.65:3000/api/v1/users/${data.id}`,
        editedData,
        {
          headers: {
            'x-access-token': localStorage.getItem('token')
          }
        }
      );
      if (response.status === 200) {
        const index = userFormList.findIndex((item) => item.id === editedData.id);

        if (index !== -1) {
          // Create a copy of the userFormList and update the edited item
          const updatedList = [...userFormList];
          updatedList[index] = editedData;
          setUserFormList(updatedList);
          fetchData()
        }
        // handleClose();
      } else {
        console.log('error from user edit modal!');
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const values = ['Admin-person', 'User-person'];
  return (
    <Modal
      open={openModalForUser}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {data && <h1 style={{ color: '#fff' }}>{data.productName}</h1>}
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
              User Edit Form
            </Typography>
            <Box component="form">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstname"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    value={editedData.firstname}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastname"
                    label="Last Name"
                    name="lastname"
                    autoComplete="family-name"
                    value={editedData.lastname}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="phone"
                    label="Phone-number"
                    type="number"
                    id="phone"
                    value={editedData.phone}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={editedData.email}
                    onChange={handleChange}
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
                    autoComplete="new-password"
                    value={editedData.password}
                    onChange={handleChange}
                  />
                </Grid>
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
                    name="RoleName"
                    value={editedData.roleName}
                    onChange={handleChange}
                  >
                    {/* <MenuItem value="Admin-person">Admin-person</MenuItem>
                        <MenuItem value="User-person">User-person</MenuItem> */}
                    {values.map((value) => (
                      <MenuItem value={value} key={value}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                {/* <Grid item xs={12}>
                  <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="raised-button-file"
                    multiple
                    type="file"

                  />
                  <label htmlFor="raised-button-file">
                    <Button variant="contained" color="inherit" component="span" className="">
                      {editedData?.image?.name ?? 'Upload an Image'}
                    </Button>
                  </label>
                </Grid> */}
              </Grid>
              <Button
                onClick={updateDataForApi}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                user update
              </Button>
              <Grid container justifyContent="flex-end">
                {/* <Grid item>
                            Already have an account? Sign in
                          </Grid> */}
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>
    </Modal>
  );
}

UserEditModal.propTypes = {
  openModalForUser: PropTypes.any,
  data: PropTypes.object,
  handleClose: PropTypes.func,
  userFormList: PropTypes.array,
  setUserFormList: PropTypes.func,
  fetchData: PropTypes.any,
};
