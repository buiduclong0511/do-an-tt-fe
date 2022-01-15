import React from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
            <ToastContainer />
        </div>
    );
}

export default App;
