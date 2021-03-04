<script>
/*
@author        qiang
@name          SideBar
@desc          左侧菜单栏
@props
@emit
*/
import { companyName } from "@/config";
import { asyncRoutes } from "@/router";

export default {
  name: "SideBar",
  data() {
    return {
      companyName,
    };
  },
  computed: {
    menus() {
      return this.mapSort(asyncRoutes);
    },
    activeRouter() {
      let routerpath = this.$route.path.split("/").filter((item) => item);
      return this.findActiveRouter(this.menus, 0, routerpath);
    },
  },
  methods: {
    //activeRouter递归
    findActiveRouter(menu, index, routerpaths) {
      let fildindex = "";
      for (let i = 0; i < menu.length; i++) {
        const element = menu[i];
        if (
          element.path == routerpaths[index] ||
          element.path == "/" + routerpaths[index]
        ) {
          fildindex = i.toString();
        }
      }
      let link = index === 0 ? "" : "-";
      if (fildindex !== "") {
        if (menu[fildindex].children && menu[fildindex].children.length) {
          return (
            fildindex +
            link +
            this.findActiveRouter(
              menu[fildindex].children,
              index + 1,
              routerpaths
            )
          );
        } else {
          return link + fildindex;
        }
      } else {
        return "";
      }
    },
    mapSort(menus) {
      //排序递归
      const _menus = menus
        .sort((a, b) => {
          return a.meta.sort - b.meta.sort;
        })
        .filter((item) => !item.meta.hideMenu);

      _menus.forEach((element) => {
        if (element.children && element.children.length) {
          element.children = element.children.filter(
            (item) => !item.meta.hideMenu
          );
          if (element.children.length) {
            element.children = this.mapSort(element.children);
          } else {
            delete element.children;
          }
        }
      });
      return _menus;
    },
    routeTo(indexs) {
      let path = "";
      let route = this.menus;
      indexs = indexs.split("-");
      indexs.forEach((index) => {
        route = route[index] || route.children[index];
        if (/^\//.test(route.path)) {
          path = path + route.path;
        } else {
          path = path + "/" + route.path;
        }
      });
      this.$router.push(path);
    },
    renderMenus(menus, propIndex = "") {
      return menus.map((item, index) => {
        return item.children ? (
          <el-submenu index={propIndex + index} key={propIndex + index}>
            <template slot="title">
              <span slot="title">{item.meta.title}</span>
            </template>
            {item.children
              ? this.renderMenus(item.children, propIndex + index + "-")
              : null}
          </el-submenu>
        ) : (
          <el-menu-item
            key={propIndex + index}
            index={String(propIndex + index)}
            onClick={() => this.routeTo(String(propIndex + index))}
          >
            <template slot="title">
              <span slot="title">{item.meta.title}</span>
            </template>
          </el-menu-item>
        );
      });
    },
  },
  render() {
    const menus = this.menus;
    return (
      <div class="side-bar">
        <div class="side-bar-body">
          <el-menu isCollapse={true} default-active={this.activeRouter}>
            {this.renderMenus(menus)}
          </el-menu>
        </div>
      </div>
    );
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/variables.scss";

.side-bar {
  width: 155px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 38px 0;
  height: 100%;
  overflow-y: auto;

  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
  ::-webkit-scrollbar {
    display: none;
  }
}
.side-bar-body {
  flex: 1;
  overflow: auto;
  // margin-top: 20px;
  &::v-deep {
    .el-menu {
      background-color: rgba(0, 0, 0, 0);
      border: none;
    }
    .el-menu-item {
      transition: all 0.5s;
      color: #fff;
      background: url("~@/assets/img/nav.png");
      background-size: 100% 100%;
      height: 48px;
      line-height: 48px;
      font-size: 16px;
      margin-bottom: 10px;
      span {
        display: block;
        line-height: 48px;
      }
    }
    .el-menu-item.is-active {
      background: url("~@/assets/img/nav-active.png");
      background-size: 100% 100%;
    }
    .el-submenu {
      margin-bottom: 10px;
      height: auto;
    }

    .el-menu-item:hover {
      background: url("~@/assets/img/nav-hover.png");
      background-size: 100% 100%;
    }

    .el-menu-item.is-active,
    .el-submenu {
      .el-submenu__title {
        background: url("~@/assets/img/nav.png");
        background-size: 100% 100%;
        transition: all 0.5s;
        height: 100%;
        font-size: 16px;
        line-height: 48px;
        padding-right: 30px;
        color: #fff;
        span {
          display: block;
          line-height: 48px;
        }
      }
      .el-submenu__title:hover {
        background: url("~@/assets/img/nav-hover.png");
        background-size: 100% 100%;
      }
      .el-menu-item {
        transition: all 0.5s;
        background: url("~@/assets/img/sec-nav.png");
        background-size: 100% 100%;
        width: 110px;
        min-width: 110px;
        margin-top: 5px !important;
        height: 30px;
        line-height: 30px;
        padding-left: 25px !important;
        box-sizing: border-box;
        font-size: 14px;
        margin: 0;
        span {
          display: block;
          line-height: 30px;
        }
      }
      .el-menu-item.is-active {
        background: url("~@/assets/img/sec-nav-active.png");
        background-size: 100% 100%;
        color: #0071e3;
      }
    }
    .el-submenu.is-active {
      .el-submenu__title {
        background: url("~@/assets/img/nav-active.png");
        background-size: 100% 100%;
      }
    }
    .el-submenu__icon-arrow.el-icon-arrow-down {
      right: 30px;
      margin-top: -10px;
    }
    .el-submenu.is-opened > .el-submenu__title .el-submenu__icon-arrow {
      right: 30px;
      margin-top: -10px;
      transform: none;
    }

    .el-icon-arrow-down::before {
      content: "+";
      font-size: 18px;
      color: #fff;
    }
    .el-submenu.is-opened > .el-submenu__title .el-submenu__icon-arrow::before {
      content: "-";
      font-size: 24px;
      color: #fff;
    }

    // .el-menu {
    //   border: none;
    // }
    // .el-submenu .el-menu {
    //   background: #f7f7f7;
    // }
    // .el-menu-item.is-active {
    //   background: #def7f9;
    // }
  }
}
</style>
