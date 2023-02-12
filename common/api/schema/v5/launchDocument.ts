type LaunchDocument = {
  payload_id: string;
  fairings: {
    reused: boolean;
    recovery_attempt: boolean;
    recovered: boolean;
    ships: unknown[];
  };
  links: {
    patch: {
      small: string;
      large: string;
    };
    reddit: {
      campaign: null | string;
      launch: null | string;
      media: null | string;
      recovery: null | string;
    };
    flickr: {
      small: unknown[];
      original: unknown[];
    };
    presskit: null | string;
    webcast: string;
    youtube_id: string;
    article: string;
    wikipedia: string;
  };
  static_fire_date_utc: string;
  static_fire_date_unix: number;
  net: boolean;
  window: number;
  rocket: string;
  success: boolean;
  failures: {
    time: number;
    altitude: number | null;
    reason: string;
  }[];
  details: string;
  crew: unknown[];
  ships: unknown[];
  capsules: unknown[];
  payloads: string[];
  launchpad: string;
  flight_number: number;
  name: string;
  date_utc: string;
  date_unix: number;
  date_local: string;
  date_precision: string;
  upcoming: boolean;
  cores: {
    core: string;
    flight: number;
    gridfins: boolean;
    legs: boolean;
    reused: boolean;
    landing_attempt: boolean;
    landing_success: boolean | null;
    landing_type: unknown;
    landpad: unknown;
  }[];
  auto_update: boolean;
  tbd: boolean;
  launch_library_id: string | null;
  id: string;
};

export default LaunchDocument;
