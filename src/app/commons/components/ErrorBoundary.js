import React from 'react'

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error(error)
        console.error(errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return <div className="container text-center">
                <h1><i className="fas fa-exclamation-circle" /></h1>
                <h2 className="lighter">Algo ha fallado...</h2>
                <button className="btn btn-primary" onClick={() => window.location.reload()}>
                    <i className="fas fa-redo" /> Volver a intentarlo
                </button>
            </div>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary