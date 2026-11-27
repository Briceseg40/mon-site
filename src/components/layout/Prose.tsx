export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="container-x">
      <div className="max-w-3xl space-y-5 text-[16px] leading-relaxed text-paper/80 [&_a]:text-accent [&_a]:underline-offset-4 hover:[&_a]:underline [&_h2]:mt-14 [&_h2]:font-serif [&_h2]:text-[2rem] [&_h2]:leading-tight [&_h2]:text-paper [&_li]:ml-5 [&_li]:list-disc [&_strong]:text-paper">
        {children}
      </div>
    </div>
  );
}
