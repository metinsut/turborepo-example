export type QueryParamPair = {
  key: string;
  value: string;
  deleteIfNotExist?: boolean;
};

const addOrReplaceQueryParams = (query: URLSearchParams, params: QueryParamPair[]) => {
  params.forEach((p) => {
    if (p.value) {
      if (query.has(p.key)) {
        query.set(p.key, p.value);
      } else {
        query.append(p.key, p.value);
      }
    } else if (query.has(p.key) && p.deleteIfNotExist) {
      query.delete(p.key);
    }
  });

  return `?${query.toString()}`;
};

const deleteQueryParams = (query: URLSearchParams, paramKeys: string[]) => {
  paramKeys.forEach((key) => {
    query.delete(key);
  });

  return `?${query.toString()}`;
};

export { addOrReplaceQueryParams, deleteQueryParams };
