import React from "react";
import ReactDOM from "react-dom/client";
import {Provider} from "react-redux";

import JobsStore from "./redux/store/jobsStore";
import JobsListingPage from "./pages/JobsListingPage";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={JobsStore}>
            <JobsListingPage />
        </Provider>
    </React.StrictMode>
);
