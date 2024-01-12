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

// import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

import PurchaseEditModal from './PurchaseEditModal';

// ----------------------------------------------------------------------

export default function PurchaseTableRow({
  userId,
  selected,
  itemName,
  avatarUrl,
  itemdescription,
  quantity,
  isVerified,
  totalAmount,
  handleClick,
  unitPrice,
  purchaseData,
  setPurchaseData,
}) {
  const [open, setOpen] = useState(null);

  const [openModalForUser, setOpenModalForUser] = useState(false);
  const handleClose = () => setOpenModalForUser(false);
  const [data, setData] = useState({});

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

  // const onDeleteHandlerForApi = async (userIds) => {
  //   console.log(userFormList)
  //   // console.log(userId)
  //   try {
  //     const response = await axios.delete(`http://192.168.100.65:3000/api/v1/users/${userIds}`);
  //     console.log(response)
  //     if (response.status === 200) {
  //       const updatedFromlist = userFormList.filter((user)=> user.id !== userIds)
  //       setUserFormList(updatedFromlist)
  //       console.log("user delete succesfully")
  //     } else {
  //       console.log("failed to delete user")
  //     }
  //     console.log(response)
  //   } catch (error) {
  //     console.error("error from delete method", error)
  //   }
  // }

  console.log(purchaseData)

  const onDeleteHandler = async (userIds) => {
    try {
      const responseData = await axios.delete(`http://192.168.100.65:3000/api/v1/purchase/${userIds}`,{
        headers: {
          'x-access-token': localStorage.getItem('token')
        }
      });
      console.log(responseData)
      if (responseData.status === 200) {
        const updatedFromlist = purchaseData.filter((user)=> user.id !== userIds)
        setPurchaseData(updatedFromlist)
        console.log("user delete succesfully")

      } else {
        console.log("failed to delete user")
      }
      console.log(responseData)
    } catch (error) {
      console.error("error from delete method", error)
    }
  };

  const onEditHandler = (id) => {
    const newEditedItem = purchaseData.find((user) => user.id === id);
    setData(newEditedItem);
    console.log(newEditedItem);
    setOpenModalForUser(true);
  };

  // console.log(userFormList)

  // 13-12-23 coding for deleting item from purchasedata

  // const onDeleteHandler = (purId) => {
  //   console.log(purId)
  //   const deletePurchaseItem = purchaseData.filter((user)=>  user.id !== purId)
  //   setPurchaseData(deletePurchaseItem)
  // }

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={itemName} src={avatarUrl} />
            <Typography variant="subtitle2" noWrap>
              {itemName}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{itemdescription}</TableCell>

        <TableCell>{quantity}</TableCell>

        {/* <TableCell align="center">{isVerified ? 'Yes' : 'No'}</TableCell> */}
        <TableCell>{unitPrice}</TableCell>

        <TableCell> {totalAmount}</TableCell>

        {/* <TableCell>
          <Label color={(status === 'banned' && 'error') || 'success'}>{status}</Label>
        </TableCell> */}

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
          <Button onClick={() => onDeleteHandler(userId)}>Delete</Button>
        </MenuItem>
      </Popover>
      <PurchaseEditModal
        openModalForUser={openModalForUser}
        data={data}
        handleClose={handleClose}
        purchaseData={purchaseData}
        setPurchaseData={setPurchaseData}
      />
    </>
  );
}

PurchaseTableRow.propTypes = {
  userId: PropTypes.any,
  avatarUrl: PropTypes.any,
  itemdescription: PropTypes.any,
  handleClick: PropTypes.func,
  isVerified: PropTypes.string,
  unitPrice: PropTypes.number,
  itemName: PropTypes.any,
  quantity: PropTypes.any,
  selected: PropTypes.any,
  totalAmount: PropTypes.number,
  purchaseData: PropTypes.array,
  setPurchaseData: PropTypes.func,
};
