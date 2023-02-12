import PayloadDocument from "@@/api/schema/v4/payloadDocument";
import BaseService  from "../baseService";

export type Payload = {
  id: string;
  type: string;
}

const mapPayloadType = (document: PayloadDocument): Payload => {
  return {
    id: document.id,
    type: document.type,
  };
};

export default {
  all: async () => {
    const resp = await BaseService.all<PayloadDocument>('payloads', 'v4');
    if (resp.length) {
      return resp.map((doc) => mapPayloadType(doc));
    }
  },
};
