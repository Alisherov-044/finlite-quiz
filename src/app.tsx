import { Suspense } from "react";
import { routes } from "@/routes";
import { Route, Routes } from "react-router-dom";
import { Layout, Loading, RequireAuth } from "@/components";

export function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {routes.private.map(({ id, path, element, roles }) => (
                    <Route key={id} element={<RequireAuth roles={roles} />}>
                        <Route
                            path={path}
                            element={
                                <Suspense fallback={<Loading />}>
                                    {element}
                                </Suspense>
                            }
                        />
                    </Route>
                ))}
                {routes.public.map(({ id, path, element }) => (
                    <Route
                        key={id}
                        path={path}
                        element={
                            <Suspense fallback={<Loading />}>
                                {element}
                            </Suspense>
                        }
                    />
                ))}
            </Route>
        </Routes>
    );
}
