import { createContext, useState, useMemo } from 'react';
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material';

export const ColorModeContext = createContext({ 
  mode: 'light',
  toggleColorMode: () => {},
});

export const ColorModeProvider = ({ children }) => {
  const [mode, setMode] = useState('light');

  const colorMode = useMemo(
    () => ({
      mode,
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [mode]
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light' 
            ? {
                background: {
                  default: '#F3F4F6',
                  paper: '#FFFFFF'
                },
                text: {
                  primary: '#111827',
                  secondary: '#6B7280'
                }
              }
            : {
                background: {
                  default: '#111827',
                  paper: '#1F2937'
                },
                text: {
                  primary: '#F9FAFB',
                  secondary: '#D1D5DB'
                }
              })
        }
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <MUIThemeProvider theme={theme}>
        {children}
      </MUIThemeProvider>
    </ColorModeContext.Provider>
  );
}; 