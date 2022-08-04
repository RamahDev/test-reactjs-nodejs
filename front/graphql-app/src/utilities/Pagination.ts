export const paginate = (
  array: Array<any>,
  page_size: string,
  page_number: number
) => {
  // human-readable page numbers usually start with 1, so we reduce 1 in the first argument*
  const page_size_number: number = +page_size;
  const result = array.slice(
    (page_number - 1) * page_size_number,
    page_number * page_size_number
  );
  return result;
};
