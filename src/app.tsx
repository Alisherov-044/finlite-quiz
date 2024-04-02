import { Suspense } from "react";
import { routes } from "@/routes";
import { Route, Routes } from "react-router-dom";
import { Layout, Loading, RequireAuth } from "@/components";

export function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {routes.private.map(
                    ({ id, path, element, fallback, roles }) => (
                        <Route key={id} element={<RequireAuth roles={roles} />}>
                            <Route
                                path={path}
                                element={
                                    <Suspense
                                        fallback={
                                            <Loading fallback={fallback} />
                                        }
                                    >
                                        {element}
                                    </Suspense>
                                }
                            />
                        </Route>
                    )
                )}
                {routes.public.map(({ id, path, element, fallback }) => (
                    <Route
                        key={id}
                        path={path}
                        element={
                            <Suspense
                                fallback={<Loading fallback={fallback} />}
                            >
                                {element}
                            </Suspense>
                        }
                    />
                ))}
            </Route>
        </Routes>
    );
}
