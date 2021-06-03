export interface SidebarItem {
  text: React.ReactNode;
  link?: string;
  items?: SidebarItem[];
}
