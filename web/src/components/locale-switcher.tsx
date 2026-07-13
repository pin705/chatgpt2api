"use client";

import { Languages } from "lucide-react";

import { useLocale } from "@/components/i18n-provider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const locales = [
  { value: "zh-CN", label: "中文" },
  { value: "en", label: "English" },
  { value: "vi", label: "Tiếng Việt" },
] as const;

export function LocaleSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <Select value={locale} onValueChange={(value) => setLocale(value as any)}>
      <SelectTrigger className="h-8 w-[100px] rounded-lg border-stone-200 bg-white/80 text-xs text-stone-600 dark:border-white/10 dark:bg-white/5 dark:text-stone-300">
        <Languages className="mr-1 size-3.5 shrink-0" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {locales.map((loc) => (
          <SelectItem key={loc.value} value={loc.value}>
            {loc.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
