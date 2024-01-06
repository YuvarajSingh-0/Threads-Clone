import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isBase64Image(src: string) {
  const base64regex= /^data:image\/(png|jpg|jpeg|gif|webp|svg\+xml);base64,/;
  return base64regex.test(src);
}
