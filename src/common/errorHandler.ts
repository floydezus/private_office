import axios from "axios";
import {AppToaster} from "../components/Common/CommonToaster";
import {Intent} from "@blueprintjs/core";

export const apiErrorHandler = (msg: string) => {
  return (err: any) => {
    if (axios.isCancel(err)) {
      return;
    }

    const msg1: string|undefined = err && err.response && err.response.data &&
    err.response.data.message ? err.response.data.message : undefined;

    const msg2: string|undefined = err && err.response && err.response.data &&
    err.response.data.error_description ? err.response.data.error_description : undefined;

    const apiErrMsg: string = msg1 || msg2 || err.message;

    AppToaster.show({
      intent: Intent.DANGER,
      message: `${msg}: ${apiErrMsg}`
    });
  };
};