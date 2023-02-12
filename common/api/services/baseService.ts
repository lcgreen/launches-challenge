export type SchemaType = "launches" | "payloads";

export type ApiQueryParams = {
  options: {
    limit: number;
    page: number;
    sort?: Record<string,string>;
  };
};

export type BaseServiceResponse<Doc> = {
  totalDocs: number;
  offset: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: null | number;
  nextPage: null | number;
  docs: Doc[];
};


const buildUri = (path: SchemaType, version: string, type: string = '') => {
  return `${process.env.API_URL}/${version}/${path}/${type}`;
}

export default {
  /**
   * Queries the API
   * @param {string} path query path
   * @param {object} args query arguments
   * @returns {object} json data
   */
  query: async <Doc>(
    schema: SchemaType,
    version: 'v4' | 'v5',
    args: ApiQueryParams
  ): Promise<BaseServiceResponse<Doc>> => {
    const uri = buildUri(schema, version, 'query');
    const response = await fetch(uri, {
      method: 'POST',
      // body: {
      //   options: args.options,
      //   query: {
      //     upcoming: true
      //   }
      // }
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  },

  all: async <Doc>(
    schema: SchemaType,
    version: 'v4' | 'v5',
  ): Promise<Doc[]> => {
    const uri = buildUri(schema, version);
    const response = await fetch(uri, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  },
};
