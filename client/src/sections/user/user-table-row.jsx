import axios from 'axios';
import { useState } from 'react';
import PropTypes from 'prop-types';

import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

import UserModalEdit from './userEditModal'

// ----------------------------------------------------------------------

export default function UserTableRow({
  userId,
  userDetails,
  setUserDetails,
  userFormList,
  setUserFormList,
  selected,
  name, 
  avatarUrl,
  company,
  role,
  isVerified,
  status,
  handleClick,
  fetchData,
  image,
  
}) {
  const [open, setOpen] = useState(null);

  const [openModalForUser, setOpenModalForUser] = useState(false);
  const handleClose = () => setOpenModalForUser(false);
  const [data, setData] = useState({})

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  // const onDeleteHandler = (userIds) => {
  //   console.log(userIds);
  //   const updatedFromlist = userFormList.filter((user) => user.id !== userIds);
  //   setUserFormList(updatedFromlist);
  // };

  const onDeleteHandlerForApi = async (userIds) => {
    console.log(userFormList)
    // console.log(userId)
    try {
      const response = await axios.delete(`http://192.168.100.65:3000/api/v1/users/${userIds}`,{
        headers: {
          'x-access-token': localStorage.getItem('token')
        }
      });
      console.log(response)
      if (response.status === 201) {
        const updatedFromlist = userFormList.filter((user)=> user.id !== userIds)
        setUserFormList(updatedFromlist)
        fetchData()
      } else {
        console.log("failed to delete user")
      }
    } catch (error) {
      console.error("error from delete method", error)
    }
  }

  const onEditHandler = (id) => {
    const newEditedItem = userFormList.find((user) => user.id === id);
    setData(newEditedItem);
    console.log(newEditedItem);
    setOpenModalForUser(true);
  }
  console.log(data)
  
  // console.log(userFormList)

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={name} src={image} />
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{company}</TableCell>

        <TableCell>{role}</TableCell>

        <TableCell align="center">{isVerified ? 'Yes' : 'No'}</TableCell>

        <TableCell>
          <Label color={(status === 'banned' && 'error') || 'success'}>{status}</Label>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          <Button onClick={() => onEditHandler(userId)}>Edit</Button>
        </MenuItem>
        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          <Button onClick={() => onDeleteHandlerForApi(userId)}>Delete</Button>
        </MenuItem>
      </Popover>
      <UserModalEdit
        fetchData={fetchData}
        openModalForUser={openModalForUser}
        data={data}
        handleClose={handleClose}
        userDetails={userDetails}
        setUserDetails={setUserDetails}
        userFormList={userFormList}
        setUserFormList={setUserFormList}
      />
    </>
  );
}

UserTableRow.propTypes = {
  userId: PropTypes.any,
  avatarUrl: PropTypes.any,
  company: PropTypes.any,
  handleClick: PropTypes.func,
  isVerified: PropTypes.any,
  name: PropTypes.any,
  role: PropTypes.any,
  selected: PropTypes.any,
  status: PropTypes.string,
  image: PropTypes.any,
  userFormList: PropTypes.array,
  setUserFormList: PropTypes.func,
  userDetails: PropTypes.object,
  setUserDetails: PropTypes.any,
  fetchData: PropTypes.func,
};
