const InitTableState = {
  data: null,
  total: 0,
  totalPages: 0,
  single: null,
  params: {
    page: 1,
    limit: 10,
    sort: null,
    dir: null,
    filters: null
  },
  loaded: false
};

export default InitTableState;
