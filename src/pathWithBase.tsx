export const pathWithBase = (path: string): string => {
  if (import.meta.env.PROD) {
    return `/statstash/${path}`
  }

  return path
}
