"use client";

import { useTranslations } from "next-intl";

import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

export function ThemeToggle() {
  const t = useTranslations("common");
  return (
    <AnimatedThemeToggler
      aria-label={t("settings")}
      title={t("settings")}
      variant="circle"
      className="inline-flex size-8 shrink-0 items-center justify-center text-stone-500 transition hover:text-stone-900 dark:text-stone-300 dark:hover:text-white [&_svg]:size-4"
    />
  );
}
