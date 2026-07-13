import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['zh-CN', 'vi', 'en'],
  defaultLocale: 'zh-CN',
  localePrefix: 'always',
});
