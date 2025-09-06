import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Tailwind CSSのクラス名を結合するユーティリティ関数
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 
