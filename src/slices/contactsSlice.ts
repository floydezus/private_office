import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import { ContactDto } from "../common/types";
import axios, {AxiosResponse} from "axios";
import endpoints from "../common/endpoints";
import {apiErrorHandler} from "../common/errorHandler";

export interface IStoreContacts {
  isCreateOpen: boolean;
  isDeleteOpen: boolean;
  contacts: ContactDto[];
  selectedContact?: ContactDto;
  isLoading: boolean;
}


const initialState: IStoreContacts = { isCreateOpen: false, isDeleteOpen: false, contacts: [], isLoading: false };

export const fetchAllContacts = createAsyncThunk<ContactDto[]>(
    'contacts/fetchAllContacts',
    async () =>
            axios.get<ContactDto[]>(endpoints.getContactsPath())
            .then((res: AxiosResponse<ContactDto[]>) => res.data)

);

export const createContact = createAsyncThunk<any, {data: ContactDto}>(
    'contacts/createContact',
    async ({data}, thunkAPI) =>
        axios.post<any>(endpoints.getContactsPath(), data)
            .then((res: AxiosResponse) => {
              if (res.data) {
                thunkAPI.dispatch(fetchAllContacts())
              }
              return res.data;
            })

);

export const updateContact = createAsyncThunk<ContactDto, {data: ContactDto, callback: () => void}>(
    'contacts/updateContact',
    async ({data, callback}) =>
        axios.put<ContactDto>(endpoints.getContactsPathById(data.id!), data)
            .then((res: AxiosResponse<ContactDto>) => ({...res.data, callback}))
);

export const deleteContact = createAsyncThunk<any, {id: string}>(
    'contacts/deleteContact',
    async ({id}, thunkAPI) =>
        axios.delete<any>(endpoints.getContactsPathById(id))
            .then((res: AxiosResponse) => {
              if (res.data) {
                thunkAPI.dispatch(fetchAllContacts())
              }
              return res.data;
            })

);


const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setDialogOpening(state, action: PayloadAction<{ isOpen: boolean, selectedContact?: ContactDto }>) {
      state.isCreateOpen = action.payload.isOpen;
      state.selectedContact = action.payload.selectedContact;
    },
    setDialogDeleting(state, action: PayloadAction<{ isOpen: boolean, selectedContact?: ContactDto }>) {
      state.isDeleteOpen = action.payload.isOpen;
      state.selectedContact = action.payload.selectedContact;
    },


  },
  extraReducers: builder => {
    builder

        //Fetching
        .addCase(fetchAllContacts.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(fetchAllContacts.fulfilled,
            (state, action: PayloadAction<ContactDto[]>) => {
              state.contacts = action.payload;
              state.isLoading = false;
            })
        .addCase(fetchAllContacts.rejected, (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          apiErrorHandler(`Can't fetch contacts`)(action.payload);
        })
        //Create
        .addCase(createContact.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(createContact.fulfilled,
            (state, action: PayloadAction<any>) => {
              console.log(action.payload)
              state.isLoading = false;
            })
        .addCase(createContact.rejected, (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          apiErrorHandler(`Can't create contact`)(action.payload);
        })
        //Delete
        .addCase(deleteContact.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(deleteContact.fulfilled,
            (state, action: PayloadAction<any>) => {
              console.log('delete', action.payload)
              state.isLoading = false;
            })
        .addCase(deleteContact.rejected, (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          apiErrorHandler(`Can't delete contact`)(action.payload);
        })
        //Update
        .addCase(updateContact.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(updateContact.fulfilled,
            (state, action: PayloadAction<any>) => {
              state.isLoading = false;
              const editedContactIndex = state.contacts.findIndex((contact) => contact.id === action.payload.id);
              if (editedContactIndex !== -1) {
                state.contacts[editedContactIndex] = {
                  id: action.payload.id,
                  firstName: action.payload.firstName,
                  lastName: action.payload.lastName,
                  email: action.payload.email,
                  phone: action.payload.phone
                };
                action.payload.callback();
              }
            })
        .addCase(updateContact.rejected, (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          apiErrorHandler(`Can't update contact`)(action.payload);
        })
  }
});


export const { actions } = contactsSlice;

export default contactsSlice.reducer;