// pagination
export function buildResponse(item: any) {
  const { current_page, per_page, total, data } = item;
  return {
    data: data,
    meta: {
      current_page,
      per_page,
      total,
    },
  };
}

export function buildPagination(data: any) {
  const { current_page, per_page, total } = data;
  return { current_page, per_page, total };
}
