import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import rooter from "@mobile/router";
import { Provider } from 'react-redux';
import store from "@common/store";

const root = createRoot(document.getElementById('app'));
root.render(
    <Provider store={store}>
        <RouterProvider router={rooter} />
    </Provider>
);