import { cx as clsx } from 'class-variance-authority';
import type { ClassValue } from 'class-variance-authority/types';
import { twMerge } from 'tailwind-merge';

export function cx(...args: ClassValue[]) {
  return twMerge(clsx(...args));
}
