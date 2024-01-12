{
  /* <Container>
<Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
  <Typography variant="h4">Users</Typography>
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
          {userFormList
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => (
              <UserTableRow
                key={index}
                name={`${row.firstName} ${row.lastName}`}
                role={row.role}
                // status={row.status}
                status={row.number}
                company={row.email}
                avatarUrl={row.avatarUrl}
                isVerified={row.isVerified}
                selected={selected.indexOf(row.name) !== -1}
                handleClick={(event) => handleClick(event, row.name)}
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
 */
}

//  product name,
//  decription,
//  price,
//  quantity

// profucts name
// item name,
// quantity,
// unit price,
// total amount

// sales dashboard
// product name,
// price,
// total price
// quantity

// "lint": "eslint \"src/**/*.{js,jsx,ts,tsx}\"",
//     "lint:fix": "eslint --fix \"src/**/*.{js,jsx,ts,tsx}\"",

// "eslint-config-airbnb": "^19.0.4",
//     "eslint-config-prettier": "^9.0.0",
//     "eslint-import-resolver-alias": "^1.1.2",
//     "eslint-plugin-import": "^2.28.1",
//     "eslint-plugin-jsx-a11y": "^6.7.1",
//     "eslint-plugin-perfectionist": "^2.1.0",
//     "eslint-plugin-prettier": "^5.0.0",
//     "eslint-plugin-react": "^7.33.2",
//     "eslint-plugin-react-hooks": "^4.6.0",
//     "eslint-plugin-unused-imports": "^3.0.0",

// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import Modal from '@mui/material/Modal';
// import Button from '@mui/material/Button';
// import Container from '@mui/material/Container';
// import Typography from '@mui/material/Typography';
// import { Box, Grid, TextField } from '@mui/material';

// const style = {
//   // Your modal styles here...
// };

// export default function ModalCom({ open, data, handleClose, setProductsFormList }) {
//   const [editedData, setEditedData] = useState({});

//   useEffect(() => {
//     setEditedData(data); // Set the initial data received from props
//   }, [data]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEditedData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleUpdate = () => {
//     // Find the index of the edited data in the ProductsFormList
//     const index = setProductsFormList.findIndex((item) => item.id === editedData.id);

//     if (index !== -1) {
//       // Create a copy of the ProductsFormList and update the edited item
//       const updatedList = [...setProductsFormList];
//       updatedList[index] = editedData;
//       setProductsFormList(updatedList);
//     }

//     handleClose(); // Close the modal after updating
//   };

//   return (
//     <Box>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style}>
//           {/* Modal content here */}
//           <Container component="main">
//             {/* ... */}
//             <Box component="form">
//               <Grid container spacing={2}>
//                 {/* Your form fields here */}
//               </Grid>
//               <Button onClick={handleUpdate} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
//                 Update
//               </Button>
//             </Box>
//           </Container>
//         </Box>
//       </Modal>
//     </Box>
//   );
// }

// ModalCom.propTypes = {
//   open: PropTypes.any,
//   data: PropTypes.object,
//   handleClose: PropTypes.func,
//   setProductsFormList: PropTypes.func,
// };

// {/* <Grid item xs={12}>
//   <input
//     accept="image/*"
//     style={{ display: 'none' }}
//     id="raised-button-file"
//     multiple
//     type="file"
//     value={editedData.image}
//     onChange={onImageHandler}
//   />
//   <label htmlFor="raised-button-file">
//     <Button variant="contained" color="inherit" component="span" className="">
//       {userDetails?.image?.name ?? 'Upload an Image'}
//       {/* {userDetails.image && <img style={{height: '50px', width: '50px'}} src={userDetails.image} alt="Uploaded" /> } */}
//     </Button>
//   </label>
// </Grid>; */}

import React, { useState } from 'react';
import axios from 'axios';

// Your React component
function CreateUserForm() {
  const [userDetailForApi, setUserDetailForApi] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    password: '',
    RoleName: '',
  });

  const onSubmitHandlerCreateForm = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('firstname', userDetailForApi.firstname);
      formData.append('lastname', userDetailForApi.lastname);
      formData.append('phone', userDetailForApi.phone);
      formData.append('email', userDetailForApi.email);
      formData.append('password', userDetailForApi.password);
      formData.append('RoleName', userDetailForApi.RoleName);

      const response = await axios.post('http://192.168.100.65:3000/api/v1/user', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Response from API:', response.data);

      setUserDetailForApi({
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        password: '',
        RoleName: '',
      });

      // Close the modal or perform other actions after a successful submission
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error scenarios here
    }
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetailForApi((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={onSubmitHandlerCreateForm}>
      {/* Your form fields */}
      <input
        type="text"
        name="firstname"
        value={userDetailForApi.firstname}
        onChange={onChangeHandler}
        // Other input attributes...
      />
      {/* Add other form fields similarly */}

      <button type="submit">Submit</button>
    </form>
  );
}

export default CreateUserForm;

// Assume you have the necessary useState and useEffect imported.

export default function UserTableRow({
  // ... (other props),
  userFormList,
  setUserFormList,
}) {
  // ... (other code)

  const onEditHandlerForApi = async (id, updatedData) => {
      try {
        const response = await axios.put(`http://192.168.100.65:3000/api/v1/users/${id}`, updatedData);
        console.log(response);
        
        if (response.status === 200) {
          // Find the item being updated in the userFormList and replace it with updatedData
          const updatedList = userFormList.map((item) => {
            if (item.id === id) {
              return { ...item, ...updatedData };
            }
            return item;
          });

          setUserFormList(updatedList);
          console.log('User updated successfully');
        } else {
          console.log('Failed to update user');
        }
      } catch (error) {
        console.error('Error from edit method:', error);
      }
  };

  // ... (other code)
}
