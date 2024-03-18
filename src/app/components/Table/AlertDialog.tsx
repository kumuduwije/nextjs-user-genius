
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { MRT_Row } from 'material-react-table';
import { Customer } from './hooks/useCrud';
import { UseMutationResult } from '@tanstack/react-query';

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
      <DialogTitle id="alert-dialog-title"> Are you sure you want to delete {row && row.original ? row.original.firstname : ''} ?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          This will permanently delete the customer.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleDelete} color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>

    </>
  );
}

export default AlertDialog;
