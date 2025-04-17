export const metadata = {
  title: 'Login Page',
  description: 'Login Page',
};

export default async function LoginPageLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {children}
    </div>
  )
}