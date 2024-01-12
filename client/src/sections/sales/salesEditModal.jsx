'use client';

// import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Box, Grid, TextField } from '@mui/material';


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

export default function SalesDatasEditModal({
  openModalForUser,
  data,
  handleClose,
  allSales,
  setAllSales
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

  const handleUpdate = () => {
    // Find the index of the edited data in the userFormList
    const index = allSales.findIndex((item) => item.id === editedData.id);

    if (index !== -1) {
      // Create a copy of the userFormList and update the edited item
      const updatedList = [...allSales];
      updatedList[index] = editedData;
      setAllSales(updatedList);
    }
    handleClose(); // Close the modal after updating
  };

  // code for edit api data below

  // const updateDataForApi = async () => {
  //   try {
  //     console.log('Edited data:', editedData);
  //     const response = await axios.put(
  //       `http://192.168.100.65:3000/api/v1/users/${data.id}`,
  //       editedData
  //     );
  //     if (response.status === 200) {
  //       const index = userFormList.findIndex((item) => item.id === editedData.id);

  //       if (index !== -1) {
  //         // Create a copy of the userFormList and update the edited item
  //         const updatedList = [...userFormList];
  //         updatedList[index] = editedData;
  //         setUserFormList(updatedList);
  //       }
  //       // handleClose();
  //     } else {
  //       console.log('error');
  //     }
  //   } catch (error) {
  //     console.log('error', error);
  //   }
  // };

  return (
    <Modal
    open={openModalForUser}
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
            Edit form for sales
          </Typography>
          <Box component="form"  onSubmit={handleUpdate}>
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
                  value={editedData.saleItem}
                  onChange={handleChange}
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
                  value={editedData.quantity}
                  onChange={handleChange}
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
                  value={editedData.price}
                  onChange={handleChange}
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
                  value={editedData.totalPrice}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              editedData  
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  </Modal>
  );
}

SalesDatasEditModal.propTypes = {
  openModalForUser: PropTypes.any,
  data: PropTypes.object,
  handleClose: PropTypes.func,
  allSales: PropTypes.array,
  setAllSales: PropTypes.func,
};
