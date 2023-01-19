import React, {Fragment} from 'react';
import './App.css';
import {
  Routes,
  Route,
} from "react-router-dom";
import ProtectedRoute from '../Common/ProtectedRoute';
import Contacts from "../Contacts/Contacts";
import DialogContact from "../DialogContact/DialogContact";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../slices/rootReducer";
import CommonDialog from "../Common/CommonDialog";
import {IconNames} from "@blueprintjs/icons";
import {Intent} from "@blueprintjs/core";
import {actions as contactsActions, deleteContact} from "../../slices/contactsSlice";
import {AppDispatch} from "../../slices/store";
import Login from "../Login/Login";


function App() {

  const { isCreateOpen, selectedContact, isDeleteOpen } = useSelector((state: RootState) => state.contacts);
  const dispatch: AppDispatch = useDispatch();

  return (
      <Fragment>
        <Routes>
          <Route path={'/login'}
                 element={<Login />}
          />
          <Route path={'/'}
                 element={<Contacts />}
          />
          <Route path={'/contacts'}
                 element={
                   <ProtectedRoute isAuth={true}>
                     <Contacts />
                   </ProtectedRoute>}
          />
        </Routes>
        <DialogContact isOpen={isCreateOpen} contact={selectedContact} />
        {selectedContact && selectedContact.id &&
        <CommonDialog
            isOpen={isDeleteOpen} icon={IconNames.TRASH}
            dialogTitle={'Delete contact'}
            dialogText={'Are you sure?'}
            intent={Intent.DANGER}
            confirmFunction={() => dispatch(deleteContact({id: selectedContact.id!}))}
            dismissFunction={() => dispatch(contactsActions.setDialogDeleting({isOpen: false }))}
        />
        }
      </Fragment>


  );
}

export default App;
