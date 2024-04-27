<template>
  <div class="right_main_under">
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="date" label="菜单名字" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="name" label="路由" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="address" label="创建时间" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="address" label="修改时间" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="address" label="删除标记" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="address" label="类型" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="address" label="排序" show-overflow-tooltip> </el-table-column>
      <el-table-column label="操作">
        <el-button type="text" size="mini" @click="upload()">修改</el-button>
        <el-button size="mini" type="text">删除</el-button>
      </el-table-column>
    </el-table>

    <el-dialog
      title="修改"
      :visible.sync="dialog1"
      width="40%"
      :before-close="handleClose1"
      class="dialogInfo"
    >
      <el-form
        ref="domainSimpleVo"
        label-width="80px"
        :inline="true"
        :model="domainSimpleVo1"
        class="demo-form-inline search_select_form"
        size="mini"
      >
        <el-form-item label="菜单名称:">
          <el-input v-model="domainSimpleVo1.menuName11"></el-input>
        </el-form-item>
        <el-form-item label="路径:" v-if="hide">
          <el-input
            v-model="domainSimpleVo1.menuUrl11"
            placeholder="请输入新路径(如：/xxx/xxx)"
          ></el-input>
        </el-form-item>

        <el-form-item label="序号:">
          <el-input
            v-model="domainSimpleVo1.xuhao11"
            placeholder="请输入序号"
          ></el-input>
        </el-form-item>

        <el-form-item label="类型:">
          <el-select v-model="domainSimpleVo1.state11" placeholder="请选择">
            <el-option label="菜单" value="0"></el-option>
            <el-option label="按钮" value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="路由:">
          <el-input
            disabled
            v-model="domainSimpleVo1.name11"
            placeholder="请输入路由(如：/xxx)"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="err" type="primary" size="mini" plain
          >确定</el-button
        >
        <el-button type="primary" @click="dialog1 = false" size="mini" plain
          >取 消</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: 1,
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: 2,
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          id: 3,
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          children: [
            {
              id: 31,
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄",
            },
            {
              id: 32,
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄",
            },
          ],
        },
        {
          id: 4,
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      dialog1: false,
      domainSimpleVo1: {
        menuName11: "",
        menuUrl11: "",
        xuhao11: "",
        state11: "",
        name11: "",
        pid1: "",
        id1: "",
      },
      hide: false,
    };
  },
  methods: {
    upload() {
      this.dialog1 = true;
    },
    err() {
      this.dialog1 = false;
    },
    handleClose1() {
      this.dialog1 = false;
    },
  },
};
</script>

<style>
.right_main_under{
 /* margin: 20px 0 0 20px; */
 /* box-sizing: border-box; */
}
</style>