import { renderToStringAsync } from "solid-js/web";
import App from "../site/src/App";

// entry point for server render
export default async (req: {id: string}) => {
  return await renderToStringAsync(() => <App id={req.id} />);
};