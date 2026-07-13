"use client";

import { useTranslations } from 'next-intl';

export function SettingsHeader() {
  const t = useTranslations('settings');
  return (
    <section className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <div className="space-y-1">
        <div className="text-xs font-semibold tracking-[0.18em] text-stone-500 uppercase">{t('subtitle')}</div>
        <h1 className="text-2xl font-semibold tracking-tight">{t('title')}</h1>
      </div>
    </section>
  );
}
