import Link from "next/link";

interface RedirectLinkProps {
  text: string;
  link: string;
  linkTitle: string;
}

export default function RedirectLink({
  text,
  link,
  linkTitle,
}: RedirectLinkProps) {
  return (
    <div className="text-center text-mid mt-4">
      {text}{" "}
      <Link
        href={link}
        className="text-primary font-bold hover:text-primary-mid hover:underline transition-colors"
      >
        {linkTitle}
      </Link>
    </div>
  );
}
