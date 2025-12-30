type Props = {
  title: string;
  children: React.ReactNode;
};

const Layout = ({ title, children }: Props) => {
  return (
    <div className="min-h-screen">
      <header className="bg-white shadow p-4 flex justify-between">
        <h1 className="text-xl font-bold">{title}</h1>
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
          className="text-red-600 font-semibold"
        >
          Logout
        </button>
      </header>

      <main className="p-6">{children}</main>
    </div>
  );
};

export default Layout;
