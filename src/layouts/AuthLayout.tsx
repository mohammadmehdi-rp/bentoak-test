import MainLayout from "./MainLayout";
import "./styles.css";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <MainLayout>
      <div className="container">{children}</div>
    </MainLayout>
  );
}

export default AuthLayout;
