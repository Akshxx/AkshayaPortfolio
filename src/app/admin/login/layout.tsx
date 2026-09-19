// The login page is public — no auth wrapper needed.
// This layout renders children directly, bypassing the parent AdminLayout's
// auth check (which would return null and hide the login form).
export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
