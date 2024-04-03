import Header from './header';

export default function Content({children}: {children: React.ReactNode}) {
  return (
    <div className="drawer-content flex flex-col overflow-hidden">
      <Header />
      <main className="flex-1 overflow-y-auto bg-base-200 px-6 pt-8">
        {children}
        <div className="h-16"></div>
      </main>
    </div>
  );
}
