import PayloadDocument from "@@/api/schema/v4/payloadDocument";
import BaseService  from "../baseService";

export type Payload = PayloadDocument & {
  id: string;
  type: string;
}

export const mapPayloadType = (document: PayloadDocument): Payload => {
  return {
    id: document.id,
    type: document.type,
    ...document
  };
};

export default {
  all: async () => {
    const resp = await BaseService.all<PayloadDocument>('payloads', 'v4');
    if (resp.length) {
      return resp.map((doc) => mapPayloadType(doc));
    }
  },
  mapPayloadType,
};
