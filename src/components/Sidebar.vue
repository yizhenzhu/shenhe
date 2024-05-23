<template>
  <div class="sidebar" style="background-color: rgb(39 136 233);">
    <!-- 在每天下午4点显示弹窗 -->
    <el-dialog title="提醒" :visible="showPopup" @close="closePopup">
      <p>请您及时清空审核数据。</p>
    </el-dialog>
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
import dayjs from 'dayjs';
export default {
  data() {
    return {
      // defaultUrl: "/reviewed",
      showPopup: false,
      pid: [],
      Newname: [],
      Newname1: [],
      items: [
        // {
        //   menuName: "待审核列表",
        //   menuUrl: "/reviewed",
        //   name: "reviewed",
        //   menuType: 1,
        // },
        // {
        //   menuName: "初审",
        //   menuUrl: "/Preliminaryexamination",
        //   name: "Preliminaryexamination",
        //   menuType: 1,
        // },
        // {
        //   menuName: "复审",
        //   menuUrl: "/reviewcase",
        //   name: "reviewcase",
        //   menuType: 1,
        // },
        // {
        //   menuName: "终审",
        //   menuUrl: "/finaljudgment",
        //   name: "finaljudgment",
        //   menuType: 1,
        // },
        // {
        //   menuName: "审核结果列表",
        //   menuUrl: "/reslist",
        //   name: "reslist",
        //   menuType: 1,
        // },
        // {
        //   menuName: "审核日志页面",
        //   menuUrl: "/technologicalprocess",
        //   name: "technologicalprocess",
        //   menuType: 1,
        // },
        // {
        //   menuName: "系统管理",
        //   menuUrl: "/xitong",
        //   name: "xitong",
        //   menuType: 0,
        //   children: [
        //      {
        //       menuName: "用户管理",
        //       menuUrl: "/user",
        //       name: "user",
        //       menuType: 1,
        //     },
        //     {
        //       menuName: "角色管理",
        //       menuUrl: "/Role",
        //       name: "Role",
        //       menuType: 1,
        //     },
        //       {
        //       menuName: "菜单管理",
        //       menuUrl: "/menu",
        //       name: "menu",
        //       menuType: 1,
        //     },
        //     {
        //       menuName: "人数配置页面",
        //       menuUrl: "/Numberallocation",
        //       name: "Numberallocation",
        //       menuType: 1,
        //     },
            
        //   ],
        // },
      ],
      // 新需求：测试
      items2: [
        /* {
          menuName: "首页",
          menuUrl: "/welcome",
          name: "welcome",
          menuType: 1,
        }, */
        {
          menuName: "警情",
          menuUrl: "/jingqing",
          name: "jingqing",
          menuType: 0,
          children:[
            {
              menuName: "警情上传",
              menuUrl: "/domain_decide",
              name: "domain_decide",
              menuType: 1,
              //menuType:0
            },
            {
              menuName: "警情审核",
              menuUrl: "/jingqingshenhe",
              name: "jingqingshenhe",
              menuType: 1,
            },
            {
              menuName: "警情处置",
              menuUrl: "/menu",
              name: "menu",
              menuType: 1,
            },
          ]
        },
        {
          menuName: "审核",
          menuUrl: "/shenhe",
          name: "shenhe",
          menuType: 0,
          children:[
          {
            menuName: "初审",
            menuUrl: "/chushen",
            name: "chushen",
            menuType: 1,
          },
          {
            menuName: "复审",
            menuUrl: "/reviewcase",//选中跳转！！！！了解
            name: "reviewcase",
            menuType: 1,
          },
          {
            menuName: "审核日志",
            menuUrl: "/technologicalprocess",
            name: "technologicalprocess",
            menuType: 1,
          },
          ]
        },
        {
          menuName: "用户管理",
          menuUrl: "/user",
          name: "user",
          menuType: 1,
        },
        /* {
          menuName: "复审",
          menuUrl: "/reviewcase",//选中跳转！！！！了解
          name: "reviewcase",
          menuType: 1,
        },
        {
          menuName: "终审",
          menuUrl: "/finaljudgment",
          name: "finaljudgment",
          menuType: 1,
        },
        {
          menuName: "审核结果列表",
          menuUrl: "/reslist",
          name: "reslist",
          menuType: 1,
        },
        {
          menuName: "审核日志",
          menuUrl: "/technologicalprocess",
          name: "technologicalprocess",
          menuType: 1,
        },
        {
          menuName: "系统管理",
          menuUrl: "/xitong",
          name: "xitong",
          menuType: 0,
          children: [
             {
              menuName: "用户管理",
              menuUrl: "/user",
              name: "user",
              menuType: 1,
            },
            {
              menuName: "角色管理",
              menuUrl: "/Role",
              name: "Role",
              menuType: 1,
            },
              {
              menuName: "菜单管理",
              menuUrl: "/menu",
              name: "menu",
              menuType: 1,
            },
            {
              menuName: "人数配置页面",
              menuUrl: "/Numberallocation",
              name: "Numberallocation",
              menuType: 1,
            },
            
          ],
        },
        {
          menuName: "域名判定查询",
          menuUrl: "/domain_decide",
          name: "domain_decide",
          menuType: 1,
        }, */
      ],
    };
  },
  components: {
    NavItem,
  },
  mounted() {
    // let href = window.location.href;
    // this.defaultUrl = href.split("/#")[1];
    this.qx();
    this.scheduleCheck();
  },
  watch: {
    $route: "getPath",
  },
  methods: {
    async scheduleCheck() {
      const { data: res } = await this.$http.get("/user/getInfo");
      if(res.data.role === 'THIRD'){
        console.log('true');
        setInterval(() => {
          const now = dayjs();
          const isAfternoonFour = now.hour() === 16 && now.minute() === 0;

          if (isAfternoonFour) {
            this.showPopup = true;
          }
        }, 60000); // 每分钟检查一次
      }
      
    },
    closePopup() {
      this.showPopup = false;
    },
    getPath() {
      this.defaultUrl = this.$route.path;
    },

    async qx() {
      const that = this;
      const { data: res } = await this.$http.get("/user/getInfo");
      // console.log(res);
      if (res.code == 200) {
        if(res.data.role === 'ADMIN'){
          this.items.push(
            {
              menuName:"首页",
              name:"welcome",
              menuType: 1,
            },
        {
          menuName: "初审",
          name: "Preliminaryexamination",
          menuType: 1,
        },
        {
          menuName: "复审",
          name: "reviewcase",
          menuType: 1,
        },
        {
          menuName: "终审",
          name: "finaljudgment",
          menuType: 1,
        },{
          menuName: "审核结果列表",
          name: "reslist",
          menuType: 1,
        },
        {
          menuName: "审核日志",
          name: "technologicalprocess",
          menuType: 1,
        },
        {
          menuName: "处置库",
          name: "treatment",
          menuType: 1,
        },
        {              
          menuName:"域名判定查询",
          name:"domain_decide",
          menuType: 1,
        },    
        {              
          menuName:"数据推送",
          name:"data_push",
          menuType: 1,
        },  
        {
          menuName: "系统管理",
          name: "xitong",
          menuType: 0,
          id:5,
          // pid:-1,
          children: [
             {
              menuName: "用户管理",
              name: "user",
              menuType: 1,
            },        
          ],
        },
            
        )
        }else if(res.data.role === 'FIRST'){
          this.items.push({
              menuName:"首页",
              name:"welcome"
            },
        {
          menuName: "初审",
          name: "Preliminaryexamination",
          menuType: 1,
        },{
          menuName: "审核日志",
          name: "technologicalprocess",
          menuType: 1,
        },)
        }else if(res.data.role === 'SECOND'){
          this.items.push({
              menuName:"首页",
              name:"welcome"
            },
            {
          menuName: "复审",
          name: "reviewcase",
          menuType: 1,
        },{
          menuName: "审核日志",
          name: "technologicalprocess",
          menuType: 1,
        },)
        }else if(res.data.role === 'THIRD'){
          this.items.push({
              menuName:"首页",
              name:"welcome"
            },
            {
          menuName: "终审",
          name: "finaljudgment",
          menuType: 1,
        },{
          menuName: "审核结果列表",
          name: "reslist",
          menuType: 1,
        },
        {
          menuName: "审核日志",
          name: "technologicalprocess",
          menuType: 1,
        },
        {
          menuName: "处置库",
          name: "treatment",
          menuType: 1,
        },
        {              
          menuName:"域名判定查询",
          name:"domain_decide",
          menuType: 1,
        },    
        // {              
        //   menuName:"数据推送",
        //   name:"data_push",
        //   menuType: 1,
        // }
        )
        }
        
        // this.items = res.data;
        // =========================
        this.items.forEach((item) => {
          that.menuFir(item);
        });
        this.pid = this.getSetArr(this.pid);
        //   if (!window.sessionStorage.getItem("btn")) {
        //   window.sessionStorage.setItem("btn", this.Newname1);
        // }
        // console.log(this.pid);
        this.items.forEach((item) => {
          that.menuSec(item);
        });
        // console.log(res.data);
      }else if(res.code == 403){
        this.$router.push("/")
      }

      // console.log(res.data);
      // this.items = res.data;
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
  computed: {
    // onRoutes() {
    //   return this.$route.path.replace("/", "");
    // },
    // collapse() {
    //   return this.$store.state.collapse;
    // },
  },
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
