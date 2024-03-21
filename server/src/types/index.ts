// Define types for query filters to ensure type safety and clarity.
type WhereFilterValue = string | boolean | null | undefined;
type WhereFilterProps = {
  [key: string]: WhereFilterValue;
};

export { WhereFilterValue, WhereFilterProps };