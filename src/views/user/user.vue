<template>
  <div class="right_main_under">
    <!-- 用户管理页面模块——列表 -->
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple">
          <el-button
            type="primary"
            size="mini"
            plain
            class="custom-button"
            @click="add"
            >添加</el-button
          >
        </div>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px">
      <el-col :span="24">
        <el-table
          border
          ref="multipleTable"
          :data="tableData"
          style="width: 100%"
          v-loading="loading"
          max-height="550px"
          size="mini"
          class="tableStyle"
          empty-text="暂无数据"
        >
          <el-table-column prop="id" label="ID" min-width="8%">
          </el-table-column>
          <el-table-column prop="username" label="用户名" min-width="8%">
          </el-table-column>
          <el-table-column
            prop="source"
            label="来源"
            min-width="8%"
          ></el-table-column>
          <el-table-column prop="role" label="角色" min-width="10%">
          </el-table-column>
          <el-table-column prop="status" label="状态" min-width="8%">
          </el-table-column>
          <el-table-column
            prop="permissions"
            label="模块权限"
            min-width="8%"
          ></el-table-column>
          <el-table-column
            prop="create_time"
            label="创建时间"
            sortable
            show-overflow-tooltip
            min-width="10%"
          ></el-table-column>
          <el-table-column
            prop="update_time"
            label="更新时间"
            sortable
            show-overflow-tooltip
            min-width="10%"
          ></el-table-column>
        </el-table>
        <div class="bottom">
          <div class="ss">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="mypageable.pageNum"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="mypageable.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              class="pagePagination pageRight"
            >
            </el-pagination>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- 新增 -->
    <el-dialog
      title="新增"
      :visible.sync="dialogVisible"
      width="400px"
      :before-close="handleClose"
      :close-on-click-modal="true"
    >
      <el-form
        ref="newdomainSimpleVo"
        label-width="80px"
        :inline="true"
        :model="newdomainSimpleVo"
        size="mini"
      >
        <!-- 用户名 -->
        <el-form-item label="用户名：" prop="user">
          <el-input
            v-model="newdomainSimpleVo.user"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码：" prop="pwd">
          <el-input
            v-model="newdomainSimpleVo.pwd"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色:">
          <el-select v-model="newdomainSimpleVo.role" placeholder="请选择角色">
            <el-option
              v-for="role in roles"
              :key="role.id"
              :value="role.name"
              :label="role.description"
            >
              {{ role.description }}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio v-model="newdomainSimpleVo.radio" label="1">激活</el-radio>
          <el-radio v-model="newdomainSimpleVo.radio" label="0"
            >未激活</el-radio
          >
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="queding" plain
          >确 定</el-button
        >
        <el-button @click="quxiao" size="mini" plain>取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      tableData: [],
      modules: [],
      role: "",
      roles: [], //存储用户角色
      newdomainSimpleVoxiugai: {
        userxiugai: "",
        pwdxiugai: "",
        rolexiugai: null,
        radioxiugai: "1",
      },
      newdomainSimpleVo: {
        user: "",
        pwd: "",
        role: null, // 选择的角色
      },
      dialogVisible: false,
      dialogVisible1: false,
      permissions: [],
      loading: false,
      mypageable: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
    };
  },
  mounted() {
    this.fetchData();
    this.fetchPermissions();
    this.fetchModules();
    this.fetchRoles();
  },
  computed: {
    isSuperAdmin() {
      return this.role === "SuperAdmin";
    },
    isAdmin() {
      return this.role === "Admin";
    },
    isUser() {
      return this.role === "User";
    },
    visibleModules() {
      if (this.isUser) {
        return this.modules.filter((module) =>
          this.permissions.includes(module.id)
        );
      }
      return this.modules;
    },
  },
  methods: {
    // 取消清空内容
    resetForm() {
      this.newdomainSimpleVo = {
        user: "",
        pwd: "",
        role: null,
        radio: "",
      };
    },
    add() {
      this.dialogVisible = true; // 显示新增用户弹窗
    },
    quxiao() {
      this.dialogVisible = false; // 关闭弹窗
      this.resetForm(); // 重置表单
    },
    // 获取模块权限
    handleClose1() {
      this.dialogVisible1 = false; // 关闭弹窗
    },
    handleClose() {
      this.dialogVisible = false; // 关闭弹窗
    },
    fetchModules() {
      axios
        .get("/user/pages")
        .then((response) => {
          if (response.data.code === 200) {
            this.modules = response.data.datas; // 保存模块数据
          }
        })
        .catch((error) => {
          console.error("获取模块权限失败:", error);
        });
    },
    // 获取用户角色
    fetchRoles() {
      axios
        .get("/user/roles")
        .then((response) => {
          if (response.data.code === 200) {
            this.roles = response.data.datas; // 保存用户角色数据
          }
        })
        .catch((error) => {
          console.error("获取用户角色失败:", error);
        });
    },
    fetchData() {
      this.loading = true;
      axios
        .get("/user/list", {
          params: {
            page: this.mypageable.pageNum,
            page_size: this.mypageable.pageSize,
          },
        })
        .then((response) => {
          if (response.data.code === 200) {
            this.tableData = response.data.datas;
            this.total = response.data.total;
          }
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    handleSizeChange(val) {
      this.mypageable.pageSize = val;
      this.fetchData();
    },
    handleCurrentChange(val) {
      this.mypageable.pageNum = val;
      this.fetchData();
    },
    fetchPermissions() {
      axios.get("/user/permissions").then((response) => {
        if (response.data.code === 200) {
          this.role = response.data.role;
          this.permissions = response.data.permissions;
        }
      });
    },
    queding() {
      const payload = {
        username: this.newdomainSimpleVo.user,
        password: this.newdomainSimpleVo.pwd,
        role: this.newdomainSimpleVo.role,
        permissions: this.getRolePermissions(this.newdomainSimpleVo.role),
        active: this.newdomainSimpleVo.radio === "1",
      };

      axios.post("/user/add", payload).then((response) => {
        if (response.data.code === 200) {
          this.dialogVisible = false;
          this.fetchData();
        }
      });
    },
    getRolePermissions(roleId) {
      // 根据roleId返回相应权限
      const role = this.roles.find((r) => r.id === roleId);
      return role ? role.permissions : [];
    },
  },
};
</script>

<style scoped lang='less'>
.right_main_under {
  margin: 15px 0 10px 0;
  box-sizing: border-box;
}
.custom-button {
  font-size: 16px;
  padding: 10px 10px;
}
.bottom {
  width: 100%;
  height: 3.75rem /* 60/16 */ /* 40/16 */;

  .ss {
    float: right;
  }
}
</style>