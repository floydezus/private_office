import {SERVER_HOST} from "./constants";

/**
 * Это мои эндпоинты
 * @param string тут никаких парам
 */
const endpoints = {

  getContactsPath: () =>`${SERVER_HOST}/contacts`,
  getContactsPathById: (id: string) =>`${SERVER_HOST}/contacts/${id}`,

}

export default endpoints;
