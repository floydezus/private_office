import React, {Fragment, useState} from 'react';
import './Contacts.css';
import {Alignment, Button, InputGroup, Intent, Navbar} from "@blueprintjs/core";
import {IconNames} from "@blueprintjs/icons";
import ContactList from "./ContactList/ContactList";
import {actions as contactsActions } from "../../slices/contactsSlice";
import {useDispatch} from "react-redux";

function Contacts() {

  const dispatch = useDispatch();
  const [queryString, setQueryString] = useState<string>('');

  const handleOpenDialog = () => {
    dispatch(contactsActions.setDialogOpening({ isOpen: true }))
  }

  const handleChangeQuery = (event: React.FormEvent<HTMLInputElement>) => setQueryString(event.currentTarget.value);


  return (
      <Fragment>
        <Navbar fixedToTop>
          <Navbar.Group align={Alignment.LEFT}>
            <Navbar.Heading>My App</Navbar.Heading>
            <InputGroup placeholder="Start type..." type="search"
                        leftIcon={IconNames.SEARCH}
                        value={queryString}
                        onChange={handleChangeQuery}
            />
            <Navbar.Divider />
            <Button
                rightIcon={IconNames.PLUS}
                intent={Intent.PRIMARY}
                text="Add contact"
                title="Add contact"
                onClick={handleOpenDialog}
            />
          </Navbar.Group>
        </Navbar>
        <section className="section-main">
          <div className="container">
            <ContactList query={queryString}/>
          </div>
        </section>
      </Fragment>

  );
}

export default Contacts;