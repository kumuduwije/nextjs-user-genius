import { useContext, useEffect, useMemo, useState } from 'react';
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  // createRow,
  type MRT_ColumnDef,
  type MRT_Row,
  type MRT_TableOptions,
  useMaterialReactTable,
} from 'material-react-table';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
// import { type User, fakeData, usStates } from './makeData';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import {red} from '@mui/material/colors';
//Customer
import {  usStates } from './makeData';
import useCrud, {type Customer} from "./hooks/useCrud"
import axios from 'axios';
import AlertDialog from './AlertDialog';
import { useSession } from 'next-auth/react';
import { UserContext } from '@/app/contexts/UserContext';
import Link from 'next/link';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';


let apiData: Customer[];
//let handleCreateFunc: (newItem: Partial<Customer>) => void;
let handleDeleteFunc: (itemId: number) => void;
let handleUpdateFunc: (itemId: number, newData: Partial<Customer>) => void;
//let fetchDataFunc: () => void;

const BASE_URL = "http://localhost:3001"


const TableView = () => {

  const { data: session } = useSession()

  const authUser = useContext(UserContext)
  console.log("auth user id from Ts.tsx", authUser?.id)

const [custData, setCustData] = useState<Customer[]>([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteRow, setDeleteRow] = useState({} as MRT_Row<Customer>); 
  
  const { data, error, fetchData, handleDelete, handleUpdate, handleCreate } = useCrud(`${BASE_URL}/api/users/${authUser?.id}/customers`);


  //apiData=data;
  apiData = custData

  //handleCreateFunc=handleCreate;
  handleDeleteFunc=handleDelete;
  handleUpdateFunc = handleUpdate
  //console.log("data from api", apiData.length)


  useEffect(()=>{
    const fetchData = async () => {
      try {
      
        const response = await axios.get<Customer[]>(`${BASE_URL}/api/users/${authUser?.id}/customers`);
        setCustData(response.data);
      } catch (error : any) {
        //setError(error.message);
      }
    };


    fetchData()
  },[authUser?.id])

  


  // setTimeout(()=>{
  //   useEffect(() => {
  //     fetchData();
     
  //   }, []);

  //   console.log("data retried", data)
  // },2000)

  if (error) {
    return <p>Error: {error}</p>;
  }

  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});

  

  const columns = useMemo<MRT_ColumnDef<Customer>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'Id',
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: 'firstname',
        header: 'First Name',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.firstname,
          helperText: validationErrors?.firstname,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              firstName: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },
      
      {
        accessorKey: 'lastname',
        header: 'Last Name',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.lastname,
          helperText: validationErrors?.lastname,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              lastName: undefined,
            }),
        },
      },
      {
        accessorKey: 'occupation',
        header: 'Occupation',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.occupation,
          helperText: validationErrors?.occupation,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              lastName: undefined,
            }),
        },
      },
      {
        accessorKey: 'email',
        header: 'Email',
        muiEditTextFieldProps: {
          type: 'email',
          required: true,
          error: !!validationErrors?.email,
          helperText: validationErrors?.email,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              email: undefined,
            }),
        },
      },
      {
        accessorKey: 'city',
        header: 'City',
        editVariant: 'select',
        editSelectOptions: usStates,
        muiEditTextFieldProps: {
          select: true,
          error: !!validationErrors?.city,
          helperText: validationErrors?.city,
        },
      },
    ],
    [validationErrors],

    

    
  );



  //call CREATE hook
  const { mutateAsync: createUser, isPending: isCreatingUser } =
    useCreateUser();
  //call READ hook
  const {
    data: fetchedUsers = [],
    isError: isLoadingUsersError,
    isFetching: isFetchingUsers,
    isLoading: isLoadingUsers,
  } = useGetUsers();
  //call UPDATE hook
  const { mutateAsync: updateUser, isPending: isUpdatingUser } =
    useUpdateUser();
  //call DELETE hook
  const { mutateAsync: deleteUser, isPending: isDeletingUser } =
    useDeleteUser();

  //CREATE action
  const handleCreateUser: MRT_TableOptions<Customer>['onCreatingRowSave'] = async ({
    values,
    table,
  }) => {
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await createUser(values);
    table.setCreatingRow(null); //exit creating mode
  };

  //UPDATE action
  const handleSaveUser: MRT_TableOptions<Customer>['onEditingRowSave'] = async ({
    values,
    table,
  }) => {
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await updateUser(values);
    table.setEditingRow(null); //exit editing mode
  };

  //DELETE action
  //const openDeleteConfirmModal = (row: MRT_Row<Customer>) => {

    // <AlertDialog />
    
    //deleteUser(String(row.original.id));

    //setDeleteRow(row);
    
    // if (window.confirm('Are you sure you want to delete this user?')) {
    //   deleteUser(String(row.original.id));
    // }
  //};

  const table = useMaterialReactTable({
    
    columns,
    data: fetchedUsers,
    createDisplayMode: 'modal', //default ('row', and 'custom' are also available)
    editDisplayMode: 'modal', //default ('row', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    getRowId: (row) => String(row.id),
    muiToolbarAlertBannerProps: isLoadingUsersError
      ? {
          color: 'error',
          children: 'Error loading data',
        }
      : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: '500px',
      },
    },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateUser,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveUser,
    //optionally customize modal content
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle color={"#388e3c"} variant="h4">Create New User</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          {internalEditComponents} {/* or render custom edit components here */}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    //optionally customize modal content
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle color={"#f57c00"} variant="h5">Edit User</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          {internalEditComponents} {/* or render custom edit components here */}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          {/* <IconButton sx={{color:red[400]}} onClick={() => openDeleteConfirmModal(row)}> */}
          <IconButton sx={{color:red[400]}} onClick={() => {setOpenDeleteModal(true); setDeleteRow(row)}}>
            <DeleteIcon />
           
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => {
          table.setCreatingRow(true); //simplest way to open the create row modal with no default values
          //or you can pass in a row object to set default values with the `createRow` helper function
          // table.setCreatingRow(
          //   createRow(table, {
          //     //optionally pass in default values for the new row, useful for nested data or other complex scenarios
          //   }),
          // );
        }}
      >
        Create New User
      </Button>
    ),
    state: {
      isLoading: isLoadingUsers,
      isSaving: isCreatingUser || isUpdatingUser || isDeletingUser,
      showAlertBanner: isLoadingUsersError,
      showProgressBars: isFetchingUsers,
    },
  }); 


  
  return(<> 
   <MaterialReactTable table={table} /> 


    <AlertDialog row={deleteRow} open={openDeleteModal} setOpen={setOpenDeleteModal} useDeleteUser={useDeleteUser}/> 

    
    <Box sx={{ display:'flex',justifyContent:'right',pt:3, pr:3}}>
      <Link href="/">
      <Button startIcon={<ArrowBackOutlinedIcon/>} variant='text' sx={{textTransform:"uppercase"}} > Go to home page</Button>
      </Link>
    </Box>


  </>) ;


  
};

//READ hook (get users from api)
function useGetUsers() {
  return useQuery<Customer[]>({
    queryKey: ['users'],
    queryFn: async () => {
      //send api request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve(apiData);
    },
    refetchOnWindowFocus: false,
  });
} 

  // Function to capitalize a string
  const capitalize = (str:string) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  //CREATE hook (post new user to api) ----> OLD
// function useCreateUser() {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: async (user: Customer) => {
//       //send api update request here
//       //console.log("Created user", user);
//       await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call

//       //saving without id propery because server generates it
      
//       const  {id, ...restUser} =  user
//       console.log("Created user", restUser);
//       return Promise.resolve( handleCreateFunc(restUser));
//     },
//     //client side optimistic update
//     // Real time update to the table happens here
//     onMutate: (newUserInfo: Customer) => {
//       queryClient.setQueryData(
//         ['users'],
//         (prevUsers: any) =>
//           [
//             ...prevUsers,
//             {
//               ...newUserInfo,
//               // id: (Math.random() + 1).toString(36).substring(7),
//             },
//           ] as Customer[],
//       );
//     },
   
//     // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
//   });

// }

//CREATE hook (post new user to api)
function useCreateUser() {
  const authUser = useContext(UserContext)
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user: Customer) => {
      try {

        // Capitalize the firstname, lastname, and occupation fields before making post request
        const userWithCapitalizedFields = {
          ...user,
          firstname: capitalize(user.firstname),
          lastname: capitalize(user.lastname),
          occupation: capitalize(user.occupation)
        };
        //const { id, ...userWithoutId } = user;
        // Create a new object without the id property
        const { id, ...userWithoutId } = userWithCapitalizedFields;

        // Send a POST request to the server with the user data without the id property
        const response = await axios.post(`${BASE_URL}/api/users/${authUser?.id}/customers`, userWithoutId);
        const newUser = response.data;

        await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call for waiting animation
        
        // Update the local data after successful creation
        queryClient.setQueryData<Customer[]>(['users'], (prevUsers) => {
          if (!prevUsers) return [newUser];
          return [...prevUsers, newUser];
        });

        return newUser;
      } catch (error:any) {
        throw new Error(error.response?.data?.message || 'Failed to create user');
      }
    },
    onError: (error: any) => {
      console.error('Error creating user:', error);
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), // refetch users after mutation, disabled for demo
  });
}






//UPDATE hook (put user in api)
function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user: Customer) => {
      //send api update request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve(handleUpdateFunc(user.id as number,user));
    },
    //client side optimistic update
    onMutate: (newUserInfo: Customer) => {
      queryClient.setQueryData(['users'], (prevUsers: any) =>
        prevUsers?.map((prevUser: Customer) =>
          prevUser.id === newUserInfo.id ? newUserInfo : prevUser,
        ),
      );
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
  });
}

//DELETE hook (delete user in api)
function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId: string) => {
      //send api update request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      console.log("delete user id: ", userId)
      return Promise.resolve(handleDeleteFunc(Number(userId)));
    },
    
    //client side optimistic update
    onMutate: (userId:string) => {
      queryClient.setQueryData(['users'], (prevUsers: any) =>
  
        prevUsers?.filter((user: Customer) => String(user.id) !== userId),
    
      );
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
  });
}

const queryClient = new QueryClient();

const ExampleWithProviders = () => (
  //Put this with your other react-query providers near root of your app
  <QueryClientProvider client={queryClient}>
    <TableView />
  </QueryClientProvider>
);

export default ExampleWithProviders;

const validateRequired = (value: string) => !!value.length;
const validateEmail = (email: string) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );

function validateUser(user: Customer) {
  return {
    firstName: !validateRequired(user.firstname)
      ? 'First Name is Required'
      : '',
    lastName: !validateRequired(user.lastname) ? 'Last Name is Required' : '',
    email: !validateEmail(user.email) ? 'Incorrect Email Format' : '',
  };
}
