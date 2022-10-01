import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ContactDto, CallbackResult} from "../common/types";
import {uniqueId} from "@blueprintjs/core/lib/esnext/common/utils";

export interface IStoreContacts {
  isCreateOpen: boolean;
  isDeleteOpen: boolean;
  contacts: ContactDto[];
  selectedContact?: ContactDto;
}

const initialState: IStoreContacts = { isCreateOpen: false, isDeleteOpen: false, contacts: [
    {
      id: uniqueId('contact'),
      email: 'example@mail.ru',
      firstName: 'Ivan',
      lastName: 'Sidorov',
      phone: '',
    },
    {
      id: uniqueId('contact'),
      email: 'example@yandex.ru',
      firstName: 'Maria',
      lastName: 'Vinogradova',
      phone: '+9603195239',
    },
  ] };


const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setDialogOpening(state, action: PayloadAction<{isOpen: boolean, selectedContact?: ContactDto}>) {
      state.isCreateOpen = action.payload.isOpen;
      state.selectedContact = action.payload.selectedContact;
    },
    setDialogDeleting(state, action: PayloadAction<{isOpen: boolean, selectedContact?: ContactDto }>) {
      state.isDeleteOpen = action.payload.isOpen;
      state.selectedContact = action.payload.selectedContact;
    },
    addContact(state, action: PayloadAction<ContactDto & CallbackResult>) {
      state.contacts.unshift({
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        phone: action.payload.phone,
        id: uniqueId('contact')});
      action.payload.callback();
    },
    deleteContact(state, action: PayloadAction<{id: string } & CallbackResult>) {
      state.contacts = state.contacts.filter((contact) => !(contact.id === action.payload.id));
      action.payload.callback();
    },
    editContact(state, action: PayloadAction<ContactDto & CallbackResult>) {
      const editedContactIndex = state.contacts.findIndex((contact) => contact.id === action.payload.id);
      if (editedContactIndex !== -1 ) {
        state.contacts[editedContactIndex] = {
          id: action.payload.id,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          email: action.payload.email,
          phone: action.payload.phone
        };
        action.payload.callback();
      }
    },
  }
});


export const { actions } = contactsSlice;

export default contactsSlice.reducer;