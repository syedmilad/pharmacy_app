'use client';

import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState, useEffect} from 'react';

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

export default function PurchaseEditModal({
  openModalForUser,
  data,
  handleClose,  
  purchaseData,
  setPurchaseData,
}) {
 
  const [editedData, setEditData] = useState({...data});
  // const [editedData2, setEditData2] = useState({});
  useEffect(() => {
    setEditData({...data});
  }, [data])  
  console.log(data)
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

  // useEffect(() => {
    console.log(editedData)
  // }, []);
 

  // code for edit api data below

  const updateDataForApi = async () => {
    try {
      console.log('Edited data:', editedData);
      const response = await axios.put( 
        `http://192.168.100.65:3000/api/v1/purchase/${data.id}`,
        editedData,{
          headers: {
            'x-access-token': localStorage.getItem('token')
          }
        }
      );
      if (response.status === 200) {
        const index = purchaseData.findIndex((item) => item.id === editedData.id);

        if (index !== -1) {
          // Create a copy of the userFormList and update the edited item
          const updatedList = [...purchaseData];
          updatedList[index] = editedData;
          setPurchaseData(updatedList);
        }
        // handleClose();
      } else {
        console.log('error');
      }
    } catch (error) {
      console.log('error', error);
    }
  };

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
                  Edit Purchase Form
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
                        value={editedData.itemName}
                        onChange={handleChange}
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
                        value={editedData.itemdescription}
                        onChange={handleChange}
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
                        value={editedData.quantity}
                        onChange={handleChange}
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
                        value={editedData.unitPrice}
                        onChange={handleChange}
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
                        value={editedData.totalAmount}
                        onChange={handleChange}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    onClick={updateDataForApi}
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
  );
}

PurchaseEditModal.propTypes = {
  openModalForUser: PropTypes.any,
  data: PropTypes.object,
  handleClose: PropTypes.func,
  purchaseData: PropTypes.array,
  setPurchaseData: PropTypes.func,
};

