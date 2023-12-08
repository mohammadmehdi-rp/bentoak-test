import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider
      contextSharing={true}
      client={queryClient}
    ></QueryClientProvider>
  );
}

export default App;
