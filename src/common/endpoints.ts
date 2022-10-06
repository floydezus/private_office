import {SERVER_HOST} from "./constants";

const endpoints = {

  getContactsPath: () =>`${SERVER_HOST}/contacts`,
  getContactsPathById: (id: string) =>`${SERVER_HOST}/contacts/${id}`,

}

export default endpoints;