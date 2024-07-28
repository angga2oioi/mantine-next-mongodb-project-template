import "./globals.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/core/styles.layer.css";
import "mantine-contextmenu/styles.layer.css";
import App from "./../client/views/_app";
import { headers } from "next/headers";
 
export default function RootLayout({ children }) {
  const nonce = headers().get("x-nonce");
  return (
    <html lang="en">
      <body className="m-0">
        <App nonce={nonce}>
          <div className="h-screen w-screen overflow-auto">
            {children}
          </div>
        </App>
      </body>
    </html>
  );
}