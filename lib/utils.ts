import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isBase64Image(src: string) {
  const base64regex= /^data:image\/(png|jpg|jpeg|gif|webp|svg\+xml);base64,/;
  return base64regex.test(src);
}

export function formatDateString(dateString: string) {
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" }
  const date=new Date(dateString);
  const formattedDate = date.toLocaleDateString(undefined, options)
  const time=date.toLocaleTimeString([],{
    hour:"numeric",
    minute:"2-digit"
  })
  return `${time} - ${formattedDate}`;
}