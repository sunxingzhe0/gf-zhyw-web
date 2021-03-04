import Vue from "vue";
import VueRouter from "vue-router";
import Meta from "./meta.json";

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(() => {});
};

Vue.use(VueRouter);

const loadView = (path) => {
  path = path.replace("./", "").replace(".vue", "");
  return (resolve) => require([`@/views/${path}.vue`], resolve);
};

const recursion = function(paths, root, requireContext) {
  const dirs = paths.map((item) => item.split("/")[0]);
  const sets = Array.from(new Set(dirs));
  const router = sets.map((it) => {
    const reg = new RegExp("^" + it + "/");
    const _paths = paths
      .filter((item) => item !== it)
      .filter((item) => reg.test(item))
      .map((item) => item.substring(it.length + 1));
    const metaKey = (root + it + "/index.vue").replace("./", "@/views/");
    const children = recursion(_paths, root + it + "/", requireContext);
    const routerItem = {
      path: it,
      children,
      name: Meta[metaKey].name || it,
      meta: Meta[metaKey].meta || {},
      redirect: Meta[metaKey].meta?.redirect,
      component: loadView(root + it + "/index.vue"),
    };
    if (!routerItem.children.length) delete routerItem.children;
    if (!routerItem.redirect === undefined) delete routerItem.redirect;
    return routerItem;
  });
  return router;
};

const genRouter = function(requireContext) {
  // 不读取components文件夹下的文件
  const paths = requireContext
    .keys()
    .map((item) => item.slice(2, -10))
    .filter((item) => !/components/.test(item));
  const router = recursion(paths, "./", requireContext).map((item) => ({
    ...item,
    path: "/" + item.path,
  }));
  return router;
};

const routes = [
  {
    path: "",
    redirect: "/operations/workbench",
  },
];

const requireContext = require.context(
  "@/views/",
  true,
  /^\.\/.*\/index\.vue$/
);

const asyncRoutes = genRouter(requireContext);

const router = new VueRouter({
  routes: routes,
  mode: "history",
  base: process.env.BASE_URL,
});

router.addRoutes(asyncRoutes);

export default router;
export { asyncRoutes };
