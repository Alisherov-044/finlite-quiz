import "@/i18n";
import "@/styles/index.css";
import "react-circular-progressbar/dist/styles.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import ReactDOM from "react-dom/client";
import { App } from "./app";
import { store, persister } from "@/redux";
import { ConfigProvider } from "antd";
import { Loading } from "@/components";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "react-query";

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={client}>
        <ConfigProvider theme={{ hashed: false }} wave={{ disabled: true }}>
            <BrowserRouter>
                <Provider store={store}>
                    <PersistGate loading={<Loading />} persistor={persister}>
                        <App />
                    </PersistGate>
                </Provider>
            </BrowserRouter>
        </ConfigProvider>
    </QueryClientProvider>
);
