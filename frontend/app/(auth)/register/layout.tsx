export const metadata = {
  title: 'Register Page',
  description: 'User Login Page',
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