import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const WHATSAPP_NUMBER = "919840020875";

export function whatsappLink(message?: string) {
  if (!message) return `https://wa.me/${WHATSAPP_NUMBER}`;
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}
