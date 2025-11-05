export const routes = {
  home: "/",
  about: "/about",
  templates: "/templates",
  plans: "/plans",
  editor: (id: string) => "/dashboard/editor/" + id,
  dashboard: {
    root: "/dashboard/projects",
    plans: "/dashboard/plans",
    templates: "/dashboard/templates",
    editor: (id: string) => "/dashboard/editor/" + id,
    settings: "/dashboard/settings",
  },
  auth: {
    login: "/login",
    signup: "/signup",
  },
};
