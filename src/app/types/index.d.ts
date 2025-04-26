interface ActiveLinkProps {
  url: string;
  children: React.ReactNode;
}

interface MenuItems {
  url: string;
  title: string;
  icon: React.ReactNode;
}

export { ActiveLinkProps, MenuItems };
