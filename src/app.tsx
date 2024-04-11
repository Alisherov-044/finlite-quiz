import { Suspense, useEffect } from "react";
import { routes } from "@/routes";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Layout, Loading, RequireAuth } from "@/components";
import { useDispatch, useSelector } from "@/hooks";
import { setLeaving } from "@/redux/slices/quizSlice";
import { setPreviousLocation } from "@/redux/slices/routeSlice";

export function App() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.auth);
    const { isQuizEnded } = useSelector((state) => state.quiz);
    const { previousLocation } = useSelector((state) => state.route);

    useEffect(() => {
        if (isAuthenticated) {
            const isResultPage =
                location.pathname.startsWith("/practice/quiz/") &&
                location.pathname.endsWith("/result");

            const isQuizPage =
                previousLocation.startsWith("/practice/quiz/") &&
                !previousLocation.endsWith("/result");

            if (
                !isQuizEnded &&
                isQuizPage &&
                !isResultPage &&
                previousLocation !== location.pathname
            ) {
                navigate(previousLocation, {
                    state: { from: location },
                    replace: true,
                });
                dispatch(setLeaving(true));
            }

            dispatch(setPreviousLocation(location.pathname));
        }
    }, [location]);

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
