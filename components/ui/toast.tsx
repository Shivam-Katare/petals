import { Toaster } from 'react-hot-toast'

export function ToastProvider() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        className: 'bg-background text-foreground border border-border rounded-lg shadow-lg p-4',
        duration: 3000,
        style: {
          padding: '16px',
          borderRadius: '8px',
        },
        success: {
          style: {
            border: '1px solid #38a169',
          },
        },
        error: {
          style: {
            border: '1px solid #e53e3e',
          },
        },
      }}
    />
  )
} 