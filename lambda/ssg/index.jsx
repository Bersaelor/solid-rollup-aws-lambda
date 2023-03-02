import { renderToStringAsync } from "solid-js/web";
import App from "../site-js/src/App";

// entry point for server render
export default async req => {
  return await renderToStringAsync(() => <App id={req.id} />);
};