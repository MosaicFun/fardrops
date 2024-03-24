import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function extractUserFids(data: { user_fid: number }[]): number[] {
  return data.map(item => item.user_fid);
}