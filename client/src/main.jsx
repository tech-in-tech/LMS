import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { appStore } from './app/store.js'
import { Toaster } from "./components/ui/sonner.jsx"
import { useLoadUserQuery } from './features/api/authApi.js'

const Custom = ({ children }) => {
  const { isLoading } = useLoadUserQuery();
// 5:53 time
  return (
    <>
      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-screen bg-white text-gray-700">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid mb-4"></div>
          <h1 className="text-xl font-semibold">Loading, please wait...</h1>
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <Provider store={appStore}>
      <Custom>
        <App />
        <Toaster />
      </Custom>
    </Provider>
  </StrictMode>,
)


