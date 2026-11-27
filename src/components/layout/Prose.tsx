export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="container-x">
      <div className="max-w-3xl space-y-5 text-[16px] leading-relaxed text-fg/80 [&_a]:text-accent [&_a]:underline-offset-4 hover:[&_a]:underline [&_h2]:mt-14 [&_h2]:text-[1.75rem] [&_h2]:font-medium [&_h2]:tracking-[-0.03em] [&_h2]:leading-tight [&_h2]:text-fg [&_li]:ml-5 [&_li]:list-disc [&_strong]:text-fg">
        {children}
      </div>
    </div>
  );
}
