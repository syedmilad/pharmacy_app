'use client';

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

export default function ModalCom({
  open,
  data,
  handleClose,
  setProductsFormList ,
  ProductsFormList,
  productDetails,
  setProductDetails,
}) {
  const [editedData, setEditData] = useState({});

  useEffect(() => {
    setEditData(data); /// Set the initial data received from props
  }, [data]);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,  
    }));
    // console.log(name, value);
    // console.log(editedData);
  };

  const handleUpdate = () => {
    // Find the index of the edited data in the ProductsFormList
    const index = ProductsFormList.findIndex((item) => item.id === editedData.id);
    
    if (index !== -1) {
      // Create a copy of the ProductsFormList and update the edited item
      const updatedList = [...ProductsFormList];  
      updatedList[index] = editedData;
      setProductsFormList(updatedList);
    }
    handleClose(); // Close the modal after updating
  };

  return (
    <Box>
      <Modal
        open={open}
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
                Create Product Form
              </Typography>
              <Box component="form">
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
                      value={editedData.productName}
                      onChange={handleChange}
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
                      value={editedData.discription}
                      onChange={handleChange}
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
                      value={editedData.price}
                      onChange={handleChange}
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
                      value={editedData.quantity}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
                <Button onClick={handleUpdate} type="button" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                  update
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>
      </Modal>
    </Box>
  );
}

ModalCom.propTypes = {
  open: PropTypes.any,
  data: PropTypes.object,
  handleClose: PropTypes.func,
  ProductsFormList: PropTypes.array,
  setProductsFormList: PropTypes.func,
  productDetails: PropTypes.object,
  setProductDetails: PropTypes.func,
};
