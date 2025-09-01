import "./globals.css";

export const metadata = {
  title: "Fisheye",
  description: "Plateforme de photographes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
