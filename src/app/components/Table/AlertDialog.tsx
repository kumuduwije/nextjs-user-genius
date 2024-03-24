
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { MRT_Row } from 'material-react-table';
import { Customer } from './hooks/useCrud';
import { UseMutationResult } from '@tanstack/react-query';
import { Typography } from '@mui/material';

interface AlertDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  row?: MRT_Row<Customer>,
  useDeleteUser(): UseMutationResult<void, Error, string, void>
  //handleClose: () => void;
  //handleDelete: (userId: string) => void;
  //userId: string;
}

const AlertDialog: React.FC<AlertDialogProps> = ({ open, setOpen, row,useDeleteUser }) => {
  //const [open, setOpen] = useState(false);


 //call DELETE hook as a prop useDeleteUser from Ts.tsx
 const { mutateAsync: deleteUser} = useDeleteUser();

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    if (row && row.original) {

      deleteUser(String(row.original.id))
      setOpen(false) // close dialog after delete a user.
      //console.log(row.original.firstname);

    }
    
  };

  return (

    <>
    {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}

    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle sx={{color:"gray", fontSize:18}} id="alert-dialog-title"> Are you sure you want to delete  
      
      <Typography  sx={{display:'inline', fontWeight:'bold',color:'#222831',fontSize:18}}> {row && row.original ? row.original.firstname : ''} ? </Typography> 
      </DialogTitle>
      <DialogContent>
        <DialogContentText  sx={{color:'#61677A', fontWeight:'normal', fontSize:14}} id="alert-dialog-description">
          This will permanently delete the customer.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button sx={{textTransform:"capitalize"}} onClick={handleClose}>Cancel</Button>
        <Button sx={{textTransform:"capitalize"}}  onClick={handleDelete} color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>

    </>
  );
}

export default AlertDialog;
