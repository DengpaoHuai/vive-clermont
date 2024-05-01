import Link from "next/link";

const Layout = ({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal?: React.ReactNode;
}) => {
  return (
    <div>
      <Link href="/fromages/update">UpdateFromages</Link>
      {children}
      {modal}
    </div>
  );
};

export default Layout;
