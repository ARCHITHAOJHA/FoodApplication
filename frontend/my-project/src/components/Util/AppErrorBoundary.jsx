import React from "react";

class AppErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, errorMessage: "" };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, errorMessage: error?.message || "Unknown runtime error" };
    }

    componentDidCatch(error, info) {
        console.error("App runtime error:", error, info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: 24, fontFamily: "sans-serif" }}>
                    <h2>Something went wrong while rendering the app.</h2>
                    <p>{this.state.errorMessage}</p>
                    <p>Open browser console for full stack trace.</p>
                </div>
            );
        }

        return this.props.children;
    }
}

export default AppErrorBoundary;
