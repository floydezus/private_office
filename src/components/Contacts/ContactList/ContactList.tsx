import React, {FC, memo, useCallback} from 'react';
import './ContactList.css';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../slices/rootReducer";
import ContactCard from "../ContactCard/ContactCard";
import {NonIdealState} from "@blueprintjs/core";
import {IconNames} from "@blueprintjs/icons";
import {actions as contactsActions} from "../../../slices/contactsSlice";
import {ContactDto} from "../../../common/types";

type IProps = {
  query?: string
}

const ContactList: FC<IProps> = ({query}) => {

  const { contacts } = useSelector((state: RootState) => state.contacts);
  const dispatch = useDispatch();
  const clickOnContact = useCallback((contact: ContactDto) => {
    dispatch(contactsActions.setDialogOpening({isOpen: true, selectedContact: contact}))
  }, []);

  const clickOnDelete = useCallback((contact: ContactDto) => {
    dispatch(contactsActions.setDialogDeleting({isOpen: true, selectedContact: contact }))
  }, []);

  const soughtContacts = contacts.filter((contact) => {
    if (!query) {
      return true;
    }
    const regexp = new RegExp(query, 'gi');
    return contact.firstName.match(regexp)
        || contact.lastName.match(regexp)
        || contact.email.match(regexp)
        || contact.phone.match(regexp);
  });

  return (
      soughtContacts.length > 0 ?
      <div className={'contact-list'}>
        {soughtContacts
            .map((contact) =>
                <ContactCard
                  key={contact.id}
                  contact={contact}
                  clickOnContact={clickOnContact}
                  clickOnDelete={clickOnDelete}
                />)}
      </div>
        :
      <NonIdealState icon={IconNames.SEARCH} description={'Not contacts yet!'}/>

  );
}

export default memo(ContactList);