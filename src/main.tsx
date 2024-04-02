import "@/i18n";
import "@/styles/index.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import ReactDOM from "react-dom/client";
import { App } from "./app";
import { store } from "@/redux";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={client}>
        <ConfigProvider theme={{ hashed: false }} wave={{ disabled: true }}>
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        </ConfigProvider>
    </QueryClientProvider>
);
