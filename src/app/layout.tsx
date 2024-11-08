"use client";
import "./lib/i18n"; 
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Container, Box } from "@mui/material";
import Sidebar from "./components/shared/Sidebar";
import theme from "./styles/theme";
import { useTranslation } from "react-i18next";
import i18n from "./lib/i18n";
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const { t } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng); 
  };

  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box sx={{ display: "flex" }}>
            {/* Sidebar visible en todas las páginas */}
            <Sidebar />

            {/* Contenido principal de cada página */}
            <Container
              maxWidth="lg"
              sx={{
                marginLeft: 30, // Ajusta esto al ancho de la Sidebar
                padding: 3,
                flexGrow: 1,
              }}
            >
              {children}
            </Container>
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
}
