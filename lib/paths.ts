// lib/paths.ts
export const PATHS = {
  HOME: '/',
  STATUS: '/status',
  STATUS_INDEX: '/status/index',
  STATUS_CATEGORY: (category: string) => `/status/category/${category}`,
  STATUS_SITE: (id: string) => `/status/sites/${id}`,
} as const;