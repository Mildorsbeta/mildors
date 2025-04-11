import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function smoothScrollTo(elementId: string): void {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  window.scrollTo({
    top: element.offsetTop - 80,
    behavior: 'smooth'
  });
}
