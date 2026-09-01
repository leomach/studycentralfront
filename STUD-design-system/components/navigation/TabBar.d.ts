import type { HTMLAttributes } from "react";

/**
 * Bottom navigation for the app's five destinations.
 * @startingPoint section="Navigation" subtitle="Bottom tab bar" viewport="440x120"
 */
export interface TabBarProps extends HTMLAttributes<HTMLElement> {
  items: { href: string; label: string }[];
  active: string;
  onNavigate?: (href: string) => void;
}

export function TabBar(props: TabBarProps): JSX.Element;
