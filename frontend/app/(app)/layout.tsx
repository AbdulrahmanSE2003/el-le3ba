// Layout page for team app, will be customized especially different from the app

import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return <section>{children}</section>;
};

export default layout;
