import { Component } from "react";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.log('ErrorBoundary caught an error', error, errorInfo);
  }


  render() {
    if (this.state.hasError) {
      return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h1>Oops!</h1>
          <p>Lo sentimos, ha ocurrido un error inesperado.</p>
          <p>
            <i>{this.error || this.errorInfo}</i>
          </p>
          <a href="/" style={{ color: '#22C77A', textDecoration: 'none' }}>Volver a la página de inicio</a>
        </div>
      );
    }
    return this.props.children;
  }
}