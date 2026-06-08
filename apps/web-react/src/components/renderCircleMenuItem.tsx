import type { ReactElement, ReactNode } from "react";
import { CircleMenuItem } from "react-circular-menu";

type SetHoveredItem = (value: number | null) => void;

export function renderCircleMenuItem(
  itemId: number,
  icon: ReactElement,
  setHoveredItem: SetHoveredItem,
  href?: string
) {
  const MenuItem = CircleMenuItem as unknown as React.ComponentType<{
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    children: ReactNode;
  }>;

  return (
    <MenuItem
      onMouseEnter={() => setHoveredItem(itemId)}
      onMouseLeave={() => setHoveredItem(null)}
    >
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" style={{ display: "flex" }}>
          {icon}
        </a>
      ) : (
        icon
      )}
    </MenuItem>
  );
}