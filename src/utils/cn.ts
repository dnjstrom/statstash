export const cn = (...classnames: unknown[]): string =>
  classnames.filter(Boolean).join(" ")
