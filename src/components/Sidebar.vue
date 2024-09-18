<template>
  <!-- <div class="sidebar" style="background-color: rgb(39 136 233);"> -->
  <div class="sidebar" style="background-color: #f0ecce">
    <!-- 在每天下午4点显示弹窗 -->
    <el-dialog title="提醒" :visible="showPopup" @close="closePopup">
      <p>请您及时清空审核数据。</p>
    </el-dialog>
    <!-- background-color="#f0ecce" -->
    <el-menu
      router
      :default-active="$route.path"
      class="sidebar-el-menu"
      background-color="#f0ecce"
      text-color="#black"
      active-text-color="rgb(69 125 187)"
      active-background-color="#cf430c"
    >
      <NavItem
        v-for="(v, index) in items2"
        :key="index"
        :item="v"
        :path="v.name"
      />
    </el-menu>
  </div>
</template>

<script>
import NavItem from "./NavItem";
import dayjs from "dayjs";
export default {
  data() {
    return {
      showPopup: false,
      pid: [],
      Newname: [],
      Newname1: [],
      items: [],
      items2: [
        {
          menuName: "警情",
          menuUrl: "/jingqing",
          name: "jingqing",
          menuType: 0,
          children: [
            {
              menuName: "警情上传",
              menuUrl: "/cases",
              name: "cases",
              menuType: 1,
              //menuType:0
            },
          ],
        },
        {
          menuName: "审核",
          menuUrl: "/shenhe",
          name: "shenhe",
          menuType: 0,
          children: [
            {
              menuName: "初审",
              menuUrl: "/audit",
              name: "audit",
              menuType: 1,
              //menuType:0
            },
            {
              menuName: "复审",
              menuUrl: "/fushen",
              name: "fushen",
              menuType: 1,
            },
            {
              menuName: "审核日志",
              menuUrl: "/log",
              name: "log",
              menuType: 1,
            },
          ],
        },
        {
          menuName: "url任务",
          menuUrl: "/urlrenwu",
          name: "urlrenwu",
          menuType: 0,
          children: [
            {
              menuName: "任务",
              menuUrl: "/renwu",
              name: "renwu",
              menuType: 1,
              //menuType:0
            },
          ],
        },
        {
          menuName: "钓鱼网站",
          menuUrl: "/diaoyuweb",
          name: "diaoyuweb",
          menuType: 0,
          children: [
            {
              menuName: "审核",
              menuUrl: "/shenhe",
              name: "shenhe",
              menuType: 1,
              //menuType:0
            },
            {
              menuName: "审核日志",
              menuUrl: "/jieguo",
              name: "jieguo",
              menuType: 1,
              //menuType:0
            },
          ],
        },
        {
          menuName: "数据审核",
          menuUrl: "/data",
          name: "data",
          menuType: 0,
          children: [
            {
              menuName: "数据上传",
              menuUrl: "/dataaudit",
              name: "dataaudit",
              menuType: 1,
              //menuType:0
            },
            {
              menuName: "审核",
              menuUrl: "/datashenhe",
              name: "datashenhe",
              menuType: 1,
              //menuType:0
            },
            {
              menuName: "审核日志",
              menuUrl: "/repository",
              name: "repository",
              menuType: 1,
            },
            {
              menuName: "处置库",
              menuUrl: "/result",
              name: "result",
              menuType: 1,
            },
          ],
        },
        {
          menuName: "系统管理",
          menuUrl: "/management",
          name: "management",
          menuType: 0,
        },
      ],
    };
  },
  components: {
    NavItem,
  },
  mounted() {},
  watch: {
    $route: "getPath",
  },
  methods: {
    closePopup() {
      this.showPopup = false;
    },
    getPath() {
      this.defaultUrl = this.$route.path;
    },

    getSetArr(arr) {
      return [...new Set(arr)];
    },
    //
    menuFir(data) {
      if (data.menuType != 1) {
        // data["isShow"] = true;
        if (data.children) {
          data.children.forEach((item) => {
            this.menuFir(item);
          });
        }
      } else {
        // data["isShow"] = false;
        this.pid.push(data.pid);
        this.Newname.push(data.name);
        this.Newname1 = this.Newname;
      }
    },

    menuSec(data) {
      var flag = false;
      for (var item in this.pid) {
        // console.log(item);
        // console.log(data.id,this.pid[item]);
        if (data.id != this.pid[item]) {
          flag++;
          continue;
        } else {
          data.menuType = 1;
          break;
        }
      }
      if (data.children) {
        data.children.forEach((item) => {
          this.menuSec(item);
        });
      } else {
        data.menuType = 1;
      }
    },
  },
  computed: {},
};
</script>

<style scoped lang="less">
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 50px;
  bottom: 0;

  // height: 100%;
  overflow-y: scroll;
  // ---垂直方向上的滚动条（控制元素在垂直方向上的溢出内容的显示方式）
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 8rem;
}
.sidebar > ul {
  height: 100%;
}
/deep/.el-menu-item,
/deep/.el-submenu__title {
  height: 67px;
  line-height: 70px;
}
.el-submenu /deep/ img {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
.el-menu-item /deep/ img {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
</style>
