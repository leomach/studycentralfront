// Layout dedicado da sessão (§6.2): sem navegação, ocupa a tela inteira.
export default function EstudarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="fixed inset-0 bg-paper flex flex-col">{children}</div>;
}
