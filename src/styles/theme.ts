export const theme = {
  colors: {
    bgPrimary: '#0a0e27',
    bgSecondary: '#151934',
    bgCard: '#1a1f3a',
    textPrimary: '#e4e6eb',
    textSecondary: '#b0b3b8',
    accentPrimary: '#00d9ff',
    accentSecondary: '#7b2cbf',
    borderColor: '#2a2f4a',
  },
  gradients: {
    accent: 'linear-gradient(135deg, #00d9ff 0%, #7b2cbf 100%)',
  },
  shadows: {
    small: '0 4px 6px rgba(0, 0, 0, 0.3)',
    large: '0 10px 40px rgba(0, 0, 0, 0.4)',
    hover: '0 20px 60px rgba(0, 0, 0, 0.5)',
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1200px',
  },
};

export type Theme = typeof theme;
