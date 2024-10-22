import './globals.css'; // O cualquier archivo CSS global

export default function RootLayout({ children }) {
    return (
      <html lang="es">
        <body>
          {children}
        </body>
      </html>
    );
}
