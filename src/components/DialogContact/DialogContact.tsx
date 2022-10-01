import React, {FC, useEffect, useState} from 'react';
import './DialogContact.css';
import {ContactDto} from "../../common/types";
import {Button, Classes, Dialog, FormGroup, InputGroup, Intent} from "@blueprintjs/core";
import {useDispatch} from "react-redux";
import {actions as contactsActions } from "../../slices/contactsSlice";
import {IconNames} from "@blueprintjs/icons";
import {AppToaster} from "../Common/CommonToaster";

type DialogProps = {
  isOpen: boolean;
  contact?: ContactDto;
}

const initialData: ContactDto = {
  firstName: '',
  lastName: '',
  email: '',
  phone: ''
}


const DialogContact: FC<DialogProps> = (props) => {

  const dispatch = useDispatch();

  const [data, setData] = useState<ContactDto>(props.contact ?? initialData);

  useEffect(() => {
    setData(props.contact ?? initialData)
  }, [props.contact])


  const handleClose = () => {
    dispatch(contactsActions.setDialogOpening({isOpen: false, selectedContact: undefined }));
  }

  const handleChange = (e: any) => {
    setData({...data, [e.currentTarget.name]: e.currentTarget.value});
  }

  const handleSubmit = () => {
    if (props.contact) {
      dispatch(contactsActions.editContact(
          {... data,
          callback: () => AppToaster.show({message: 'Contact successful edited!', intent: Intent.SUCCESS })
          }

          ))
    } else {
      dispatch(contactsActions.addContact(
          { ...data,
          callback: () => AppToaster.show({message: 'Contact successful added!', intent: Intent.SUCCESS })
          }
          ))
    }
    dispatch(contactsActions.setDialogOpening({isOpen: false}));

  }

  return (
      <Dialog
          icon={IconNames.USER}
          isOpen={props.isOpen}
          title={props.contact ? 'Update contact' : 'Create contact'}
          onClose={handleClose}
      >
        <div className={[Classes.DIALOG_BODY, 'section-dialog'].join(' ')}>
          <FormGroup label={'First name'} labelInfo={'(required)'}>
              <InputGroup
                  large fill autoFocus required type={'text'} name={'firstName'}
                  value={data.firstName} onChange={handleChange}
              />
          </FormGroup>
          <FormGroup label={'Last name'} labelInfo={'(required)'}>
            <InputGroup large fill required type={'text'} name={'lastName'}
                        value={data.lastName} onChange={handleChange}
            />
          </FormGroup>
           <FormGroup label={'Phone'}>
             <InputGroup  large fill  leftIcon={IconNames.PHONE}
                          type={'tel'} name={'phone'} value={data.phone} onChange={handleChange} />
           </FormGroup>
          <FormGroup label={'E-mail:'}>
              <InputGroup large fill leftIcon={IconNames.ENVELOPE}
                          type={'email'} name={'email'} value={data.email} onChange={handleChange} />
          </FormGroup>
        </div>
        <div className={[Classes.DIALOG_FOOTER_ACTIONS, Classes.DIALOG_FOOTER].join(' ')}>
          <Button
              large
              onClick={handleClose}
              title="Cancel"
              text="Cancel"
          />
          <Button
              onClick={handleSubmit}
              large
              disabled={!data.firstName || !data.lastName}
              intent={Intent.PRIMARY}
              title={props.contact ? 'Update' : 'Create'}
              text={props.contact ? 'Update' : 'Create'}
          />
        </div>

      </Dialog>

  );
}

export default DialogContact;