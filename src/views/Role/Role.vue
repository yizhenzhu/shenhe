<template>
  <div class="right_main_under">
   
    <el-row >
      <el-col :span="24">
        <el-button type="primary" size="mini" plain class="left top" @click="add"
          >添加</el-button
        >
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24"
        ><div class="grid-content bg-purple-dark">
          <el-table
            :row-key="getRowKeys"
            ref="multipleTable"
            :data="tableData"
            style="width: 100%"
            max-height="600px"
            size="mini"
            class="tableStyle"
            @selection-change="handleSelectionChange"
          >
            <el-table-column label="序号" prop="id"> </el-table-column>
            <el-table-column label="角色名称">
              <template slot-scope="scope">
                {{ js(scope.row.roleName) }}
              </template>
            </el-table-column>
            <el-table-column label="角色标识" prop="remark"> </el-table-column>
            <el-table-column label="角色描述" prop="descr"> </el-table-column>
           
            <el-table-column label="创建时间" prop="createTime">
            </el-table-column>
            <el-table-column
              label="操作"
            
            >
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="mini"
                  @click="bj(scope.row)"
             
                  >编辑</el-button
                >
                <el-button
                  type="text"
                  size="mini"
                  @click="del(scope.row.id)"
              
                  >删除</el-button
                >
                <el-button
                  type="text"
                  size="mini"
                  @click="qx(scope.row.id)"
               
                  >权限</el-button
                >
              </template>
             
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
   
    <!-- ============================== -->
    <el-dialog
      title="编 辑"
      :visible.sync="dialogVisible"
      width="35%"
      :before-close="handleClose1"
      class="dialogInfo"
    >
      <el-form
        ref="domainSimpleVo1"
        label-width="80px"
        :inline="true"
        :model="domainSimpleVo1"
        class="demo-form-inline search_select_form"
        size="mini"
      >
        <el-form-item label="id:">
          <el-input v-model="domainSimpleVo1.id1" disabled></el-input>
        </el-form-item>
        <el-form-item label="角色名称:">
          <el-select
            v-model="domainSimpleVo1.jsmc1"
            placeholder="请选择角色名称"
          >
            <el-option label="超管" value="superAdmin"></el-option>
            <el-option label="操作员" value="operation"></el-option>
            <el-option label="管理员" value="admin"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色标识:">
          <el-select
            v-model="domainSimpleVo1.yhm1"
            placeholder="请选择角色名称"
          >
            <el-option label="SUPER_ADMIN" value="SUPER_ADMIN"></el-option>
            <el-option label="OPERATION" value="OPERATION"></el-option>
            <el-option label="ADMIN" value="ADMIN"></el-option>
          </el-select>
         
        </el-form-item>
        <el-form-item label="角色描述:">
          <el-input
            v-model="domainSimpleVo1.pass1"
            placeholder="请输入角色描述"
          ></el-input>
        </el-form-item>
      
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="xiugai" type="primary" plain size="mini">修 改</el-button>
        <el-button type="primary" @click="dialogVisible = false" plain size="mini"
          >取 消</el-button
        >
      </span>
    </el-dialog>
    <!-- ------------------- -->

    <el-dialog
      title="新 增"
      :visible.sync="dialog"
      width="35%"
      :before-close="handleClose"
      class="dialogInfo"
    >
      <el-form
        ref="newdomainSimpleVo"
        label-width="80px"
        :inline="true"
        :model="newdomainSimpleVo"
        class="demo-form-inline search_select_form"
        size="mini"
      >
        <el-form-item label="角色名称:">
          <el-select
            v-model="newdomainSimpleVo.jsmc"
            placeholder="请选择角色名称"
          >
            <el-option label="超管" value="superAdmin"></el-option>
            <el-option label="操作员" value="operation"></el-option>
            <el-option label="管理员" value="admin"></el-option>
          </el-select>
         
        </el-form-item>
        <el-form-item label="角色标识:">
          <el-select
            v-model="newdomainSimpleVo.yhm"
            placeholder="请选择角色标识"
          >
            <el-option label="SUPER_ADMIN" value="SUPER_ADMIN"></el-option>
            <el-option label="OPERATION" value="OPERATION"></el-option>
            <el-option label="ADMIN" value="ADMIN"></el-option>
          </el-select>
         
        </el-form-item>
        <el-form-item label="角色描述:">
          <el-input
            v-model="newdomainSimpleVo.pass"
            placeholder="请输入角色描述"
          ></el-input>
        </el-form-item>
        
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="tianjia" type="primary" plain size="mini">添 加</el-button>
        <el-button type="primary" @click="dialog = false" plain size="mini"
          >取 消</el-button
        >
      </span>
    </el-dialog>
    <!-- ===================== -->
    <el-dialog
      title="权限"
      :visible.sync="newdialog"
      width="30%"
      :before-close="handleClose2"
      class="dialogInfo"
    >
    
      <el-tree
        ref="tree"
        :data="newdata"
        show-checkbox
        highlight-current
        node-key="id"
        :expand-on-click-node="false"
        :props="defaultProps"
        @check-change="handleCheckChange"
      >
      </el-tree>
  
      <span slot="footer" class="dialog-footer">
        <el-button @click="genxin" type="primary" plain size="mini">更 新</el-button>
        <el-button type="primary" @click="newdialog = false" plain size="mini"
          >取 消</el-button
        >
      </span>
    </el-dialog>
    <!-- //分页 -->
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
  </div>
</template>

<script>

export default {
  name: "jiaose",
  data() {
    return {
      arr1: [],
      // form1:{
      //   permissions:[]
      // },
      newdata: [],
      defaultProps: {
        children: "children",
        label: "menuName",
      },
      newdialog: false,
      dialog: false,
      dialogVisible: false,
      form: {
        role: "",
        role1: "",
        role2: "",
      },
      domainSimpleVo: {
        jsmc1: "",
        jsbs1: "",
        jsms1: "",
        sjqx1: "",
      },
      tableData: [
        {
          earlyGrade: "12321",
        },
        {
          earlyGrade: "12321",
        },
        {
          earlyGrade: "12321",
        },
      ],
      newdomainSimpleVo: {
        jsmc: "",
        yhm: "",
        pass: "",
        ssbm: "",
      },
      domainSimpleVo1: {
        id1: "",
        jsmc1: "",
        yhm1: "",
        pass1: "",
        ssbm1: "",
      },
      mypageable: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 1,
      totalPages: "",
      quanxian: "",
      a: [],
      b: [],
    };
  },
  created() {
    this.getTabData();
  },
  methods: {
 
    //初始化列表
     getTabData() {
    
    },
    //添加
     tianjia() {
         this.dialog = false;
    },
    //修改
     xiugai() {
       this.dialogVisible = false;
    },
    //删除
     del(val) {
    
    },
    handleCheckChange() {
      // let res = this.$refs.tree.getCheckedNodes(); // 重点
      // // console.log(res)
      // let arr = [];
      // res.forEach((item) => {
      //   arr.push(item.id);
      // });
      // this.arr1 = arr.concat(
      //   this.$refs.tree.getHalfCheckedKeys() // 重点
      // );
      // console.log(this.arr1);
      // this.form1.permissions = arr;
      // console.log(this.form1.permissions);
    },

    //更新
     genxin(val) {
          this.newdialog = false;
    },

    //新增
    handleClose() {
      this.dialog = false;
    },
    //权限
     qx(val) {
          this.newdialog = true;
    },
    search() {},
    clear() {
      this.form.role = "";
      this.form.role1 = "";
      this.form.role2 = "";
    },
    clear1() {
      this.domainSimpleVo.id = "";
        this.domainSimpleVo.jsmc = "";
        this.domainSimpleVo.pass = "";
        this.domainSimpleVo.yhm = "";
    },
    handleSelectionChange() {},
    add() {
      this.newdomainSimpleVo = {
        user: "",
        pwd: "",
        bm: "",
        photo: "",
        role: "",
        jh: "",
        radio: "0",
      };
      this.dialog = true;
    },

    getRowKeys(row) {
      return row.id;
    },

    handleSizeChange(val) {
      // console.log(val);
      this.mypageable.pageSize = val;
      this.getTabData();
    },
    handleCurrentChange(val) {
      // console.log(val, 111);

      this.mypageable.pageNum = val;

      // console.log( this.mypageable.pageNum);
      this.getTabData();
    },
    // 编辑
    bj(val) {
      // console.log(val);
      this.dialogVisible = true;
      this.domainSimpleVo1.jsmc1 = val.roleName;
      this.domainSimpleVo1.yhm1 = val.remark;
      this.domainSimpleVo1.pass1 = val.descr;
      this.domainSimpleVo1.id1 = val.id;
    },

    handleClose1() {
      this.dialogVisible = false;
    },
    //权限
    handleClose2() {
      this.newdialog = false;
    },

    js(val) {
      if (val == "superAdmin") {
        return "超管";
      } else if (val == "operation") {
        return "操作员";
      } else if (val == "admin") {
        return "管理员";
      }
    },
  },
};
</script>

<style scoped lang='less'>
 .right_main_under{
//  margin: 20px 0 0 20px;
//  box-sizing: border-box;
}
.el-row {
  // margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
}
.left {
  float: left;
}
.bottom {
  width: 100%;
  height: 3.75rem;

}
.ss{
     float: right;
  margin-right: 4rem;
}

.right {
  float: right;
}
.el-table::before {
  height: 0px;
}
.top {
  margin-bottom: 10px;
}
.right_main_under /deep/ .el-table__body tr:hover > td {
  background-color: rgba(221, 226, 233, 0.349) !important;
}

.eright_main_under /deep/ .el-table__body tr.current-row > td {
  background-color: rgba(221, 226, 233, 0.349) !important;
}
/deep/ .right_main_under .dialogInfo .el-dialog__header{
  border: 0px;
  background-color: null;
}
</style>