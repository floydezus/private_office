import React, { FC } from 'react';
import './ContactCard.css';
import {ContactDto} from "../../../common/types";
import {Button, Card, Classes, Elevation, FormGroup, InputGroup, Label} from "@blueprintjs/core";
import {IconNames} from "@blueprintjs/icons";

type ContactProps = {
  contact: ContactDto;
  clickOnContact: (contact: ContactDto) => void;
  clickOnDelete: (contact: ContactDto) => void;
}

const ContactCard:FC<ContactProps> = ({clickOnContact, clickOnDelete, contact}) => {

  const handleClick = () => {
    if (contact.id) {
      clickOnContact(contact);
    }
  }

  const handleDelete = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    clickOnDelete(contact);
  }

  const labelClasses =  [Classes.TEXT_SMALL, 'contact__subtitle'].join(' ');

  return (
      <Card className={'contact'} interactive elevation={Elevation.TWO} onClick={handleClick}>
        <FormGroup className="column contact__section">
          <Label className={labelClasses}>
            First name:
            <InputGroup value={contact.firstName} readOnly />
          </Label>
          <Label className={labelClasses}>
            Last name:
            <InputGroup value={contact.lastName} readOnly />
          </Label>
        </FormGroup>
        <FormGroup className="column contact__section">
          <Label className={labelClasses}>
            Phone:
            <InputGroup type={'tel'} leftIcon={IconNames.PHONE} value={contact.phone} readOnly />
          </Label>
          <Label className={labelClasses}>
            Email:
            <InputGroup type={'email'} leftIcon={IconNames.ENVELOPE} value={contact.email} readOnly />
          </Label>
        </FormGroup>
        <Button className={'close'} minimal icon={IconNames.CROSS} onClick={handleDelete} />
      </Card>

  );
}

export default ContactCard;