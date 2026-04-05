// @Function: for get positive number for parser  ---------------------

export const parsePositiveNumber = (value: unknown): number | undefined => {
  if (typeof value !== 'string') return undefined;

  const parsed = Number(value);

  if (!Number.isFinite(parsed) || parsed <= 0) return undefined;

  return parsed;
};
