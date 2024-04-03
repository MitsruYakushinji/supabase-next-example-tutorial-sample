import clsx from 'clsx';

export default function Subtitle({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={clsx('text-xl font-semibold', className)}>{children}</div>
  );
}
