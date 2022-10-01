import { Button, ButtonGroup, Classes, Dialog, Intent } from '@blueprintjs/core'
import { BlueprintIcons_16Id } from '@blueprintjs/icons/lib/esm/generated/16px/blueprint-icons-16'
import { useCallback } from 'react'


type CommonDialogProps = {
  isOpen: boolean
  icon: BlueprintIcons_16Id
  dialogTitle: string
  dialogText: string
  confirmFunction: () => void
  dismissFunction: () => void
  intent?: Intent
}

export default function CommonDialog(props: CommonDialogProps) {

  const handleClickOnConfirmButton = useCallback(() => {
    props.confirmFunction()
    props.dismissFunction()
  }, [props])


  return (
      <Dialog
          autoFocus
          title={props.dialogTitle}
          icon={props.icon}
          isOpen={props.isOpen}
          onClose={props.dismissFunction}>
        <p className={Classes.DIALOG_BODY}>{props.dialogText}</p>
        <div className={Classes.DIALOG_FOOTER}>
          <ButtonGroup className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button text={'Cancel'} onClick={props.dismissFunction} />
            <Button onClick={handleClickOnConfirmButton} intent={props.intent} text={'Confirm'} />
          </ButtonGroup>
        </div>
      </Dialog>
  )
}
