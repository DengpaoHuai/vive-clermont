import Link from "next/link";

type Href = {
  to: string;
  content: React.ReactNode;
  active: boolean;
};

const HeaderNavLink = ({ href }: { href: Href[] }) => {
  return (
    <>
      {href.map((link, index) => (
        <Link
          key={index}
          href={link.to}
          className="text-muted-foreground hover:text-foreground"
        >
          {link.content}
        </Link>
      ))}
    </>
  );
};

export default HeaderNavLink;
