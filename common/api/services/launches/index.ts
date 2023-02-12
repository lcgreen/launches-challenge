import PayloadDocument from "@@/api/schema/v4/payloadDocument";
import LaunchDocument from "@@/api/schema/v5/launchDocument";
import { PayloadService } from "..";
import BaseService from "../baseService";
import { Payload } from "../payloads";

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
  payload?: Payload
}

const mapLaunchType = (document: LaunchDocument, payloads: PayloadDocument[]): Launch => {
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
    payload: payloads.find((payload) => payload.id === document?.payloads?.[0]) ?? null,
  };
};

export default { 
  all: async () => {
    const resp = await BaseService.all<LaunchDocument>('launches', 'v5');
    const payloads = await PayloadService.all();
    if (resp.length) {
      const sortedLaunches = resp.sort((a, b) => a.flight_number - b.flight_number).slice(0, 10);
      return sortedLaunches.map((doc) => mapLaunchType(doc, payloads));
    }
  },
  mapLaunchType,
}