/* eslint-disable react/prop-types */
import { Component } from "react";

/**
 * Catches failures from the lazily loaded routes, above all a page chunk that
 * never downloads. Without this, that rejection unmounts the whole React tree
 * and leaves a blank page. The boundary reports it instead, so the app can
 * offer a way back.
 *
 * It renders nothing itself: the recovery screen is shown by ScreenLoader,
 * which already sits above the rest of the page.
 */
export default class RouteErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    this.props.onError?.(error);
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}
