import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routes } from './routes';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    {routes.map(({ path, component: Component, layout }, idx) => {
                        const Layout = layout ? layout : React.Fragment;

                        return (
                            <Route
                                path={path}
                                key={idx}
                                element={
                                    <Layout>
                                        <Component />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
