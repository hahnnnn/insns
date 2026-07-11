import Link from "next/link";

function CustomLink({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (href?.startsWith("/")) {
    return (
      <Link href={href} className="underline-animate text-foreground hover:text-muted transition-colors duration-300">
        {children}
      </Link>
    );
  }
  if (href?.startsWith("#")) {
    return <a href={href} className="text-foreground underline decoration-border hover:decoration-foreground transition-colors duration-300" {...props}>{children}</a>;
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-foreground underline decoration-border hover:decoration-foreground transition-colors duration-300"
      {...props}
    >
      {children}
    </a>
  );
}

export function useMDXComponents(): Record<string, React.ComponentType<Record<string, unknown>>> {
  return {
    h1: (props: Record<string, unknown>) => (
      <h1 className="heading-xl mt-16 mb-8" {...props}>
        {props.children as React.ReactNode}
      </h1>
    ),
    h2: (props: Record<string, unknown>) => (
      <h2 className="heading-lg mt-12 mb-6" {...props}>
        {props.children as React.ReactNode}
      </h2>
    ),
    h3: (props: Record<string, unknown>) => (
      <h3 className="heading-md mt-8 mb-4" {...props}>
        {props.children as React.ReactNode}
      </h3>
    ),
    h4: (props: Record<string, unknown>) => (
      <h4 className="heading-sm mt-6 mb-3" {...props}>
        {props.children as React.ReactNode}
      </h4>
    ),
    p: (props: Record<string, unknown>) => (
      <p className="body-text mb-4" {...props}>
        {props.children as React.ReactNode}
      </p>
    ),
    a: (props: Record<string, unknown>) => (
      <CustomLink
        href={props.href as string | undefined}
        children={props.children as React.ReactNode}
        {...props}
      />
    ),
    ul: (props: Record<string, unknown>) => (
      <ul className="body-text mb-4 pl-6 space-y-1 list-disc" {...props}>
        {props.children as React.ReactNode}
      </ul>
    ),
    ol: (props: Record<string, unknown>) => (
      <ol className="body-text mb-4 pl-6 space-y-1 list-decimal" {...props}>
        {props.children as React.ReactNode}
      </ol>
    ),
    li: (props: Record<string, unknown>) => <li {...props}>{props.children as React.ReactNode}</li>,
    blockquote: (props: Record<string, unknown>) => (
      <blockquote
        className="border-l-2 border-foreground pl-6 my-8 italic text-muted body-text"
        {...props}
      >
        {props.children as React.ReactNode}
      </blockquote>
    ),
    hr: (props: Record<string, unknown>) => <hr className="section-divider" {...props} />,
    code: (props: Record<string, unknown>) => (
      <code
        className="font-mono text-sm bg-surface-muted px-1.5 py-0.5 rounded-sm"
        {...props}
      >
        {props.children as React.ReactNode}
      </code>
    ),
    pre: (props: Record<string, unknown>) => (
      <pre className="bg-surface-muted p-4 overflow-x-auto text-sm font-mono mb-6 rounded-sm border border-border" {...props}>
        {props.children as React.ReactNode}
      </pre>
    ),
    img: (props: Record<string, unknown>) => (
      <figure className="my-8">
        <img
          src={props.src as string | undefined}
          alt={(props.alt as string) || ""}
          className="w-full h-auto border border-border"
        />
        {props.alt ? <figcaption className="caption mt-2 text-center">{props.alt as string}</figcaption> : null}
      </figure>
    ),
    table: (props: Record<string, unknown>) => (
      <div className="overflow-x-auto my-8">
        <table className="w-full text-sm border-collapse" {...props}>
          {props.children as React.ReactNode}
        </table>
      </div>
    ),
    th: (props: Record<string, unknown>) => (
      <th className="border-b border-border py-2 px-3 text-left font-medium" {...props}>
        {props.children as React.ReactNode}
      </th>
    ),
    td: (props: Record<string, unknown>) => (
      <td className="border-b border-border py-2 px-3" {...props}>
        {props.children as React.ReactNode}
      </td>
    ),
    strong: (props: Record<string, unknown>) => (
      <strong className="font-medium" {...props}>
        {props.children as React.ReactNode}
      </strong>
    ),
    em: (props: Record<string, unknown>) => (
      <em className="italic" {...props}>
        {props.children as React.ReactNode}
      </em>
    ),
  };
}
