import React from "react";
import ReactDOM from "react-dom/client";
import {Provider} from "react-redux";

import JobsStore from "./redux/store/jobsStore";
import JobsSection from "./pages/JobsSection";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={JobsStore}>
            <JobsSection />
        </Provider>
    </React.StrictMode>
);
