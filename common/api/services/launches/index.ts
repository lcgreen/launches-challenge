import LaunchDocument from "@@/api/schema/v5/launchDocument";
import BaseService from "../baseService";

export type Launch = {
  id: string
  flight_number: number
  name: string
  date_utc: string
  serial: string
  payload_id: string
  image: string
  success: boolean
  failures?: {
    time: number
    altitude: number | null
    reason: string
  }[]
}

const mapDocumentType = (document: LaunchDocument): Launch => {
  return {
    id: document.id,
    name: document.name,
    date_utc: document.date_utc,
    serial: document.cores[0].core,
    image: document.links.patch.small,
    success: document.success,
    failures: document?.failures ?? [],
    payload_id: document?.payloads?.[0] ?? '',
    flight_number: document.flight_number,
  };
};

export default { 
  all: async () => {
    const resp = await BaseService.all<LaunchDocument>('launches', 'v5');
    if (resp.length) {
      return resp.map((doc) => mapDocumentType(doc));
    }
  },
}