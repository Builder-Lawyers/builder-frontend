export const routes = {
  home: "/",
  about: "/about",
  templates: "/templates",
  plans: "/plans",
  editor: (id: string) => "/dashboard/editor/" + id,
  dashboard: {
    root: "/dashboard",
    editor: (id: string) => "/dashboard/editor/" + id,
    settings: "/dashboard/settings",
  },
  auth: {
    login: "/login",
    signup: "/signup",
  },
};
