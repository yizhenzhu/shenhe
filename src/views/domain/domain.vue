<template>
  <div class="right_main_under">
    <el-form size="mini" label-width="80px" :inline="true">
      <el-row :gutter="20">
        <el-col :span="18"
          >
          <div class="grid-content bg-purple">
            <!-- 流程记录页面头部模块——域名 -->
            <el-form-item>
              <el-input v-model="form.url" placeholder="url"></el-input>
              <!-- <el-select
                v-model="form.selectURL"

                placeholder="URL"
                clearable
                @clear="selectURL_clearFun(form.selectURL)"
              >
                <el-option
                  v-for="item in selectData.selectURL"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select> -->
            </el-form-item>
            <!-- 流程记录页面头部模块——初审 -->
            <el-form-item>
              <el-select
                v-model="form.laiyuan"
                placeholder="来源"
                clearable
                @clear="chushen_clearFun(form.laiyuan)"
              >
                <el-option
                  v-for="item in selectData.laiyuan"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-date-picker
                v-model="form.datetime"
                type="daterange"
                :change="dataCreate_change(form.datetime)"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                :clearable="false"
              >
              </el-date-picker>
            </el-form-item>
            </div
        ></el-col>
        <el-col :span="6"
          ><div class="grid-content bg-purple" style="float: right">
            <!-- 流程记录页面头部模块——button -->
            <el-button size="mini" type="primary" plain @click="chaxun"   class="custom-button">查询</el-button>
            <el-button size="mini" type="success" plain @click="uploadwj" class="custom-button">文件上传</el-button>
            <el-button size="mini" type="success" plain @click="uploadjk" class="custom-button">接口上传</el-button>
          </div>
          <!-- 弹出框 -->
          <el-dialog title="接口上传" :visible.sync="dialogVisible" width="70%" height="70%">
            <div style="display: flex;">
              <!-- 左侧选择框 -->
              <div style="margin-right: 20px;">
                <el-radio-group v-model="selectedType" @change="fetchCode" style="display: flex; flex-direction: column;">
                  <el-radio-button label="python" style="margin-bottom: 10px;">Python接口</el-radio-button>
                  <el-radio-button label="java">Java代码</el-radio-button>
                </el-radio-group>
              </div>
              <!-- 右侧代码展示区域 超过最大高度400px时候就会出现---overflow-y: auto--支持滚动条-->
              <!-- 右侧代码展示区域 -->
              <div v-if="code" class="code-display">
                <pre>{{ code }}</pre>
              </div>
              </div>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
              </span>
              <!-- <div v-if="code" style="flex: 1; max-height: 400px; overflow-y: auto; border: 1px solid #ddd; padding: 10px; background-color: #f9f9f9;">
                <pre>{{ code }}</pre>
              </div>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取消</el-button>
            </span> -->
          </el-dialog>

          </el-col
        >
      </el-row>
    </el-form>

    <!-- 流程记录页面模块——列表 -->
    <el-table
      border
      ref="multipleTable"
      :data="tableData"
      style="width: 100%"
      max-height="550px"
      size="mini"
      class="tableStyle"
      empty-text="暂无数据"
      v-loading="loading"
    >
      <!--  <el-table-column prop="id" label="序号" type="index" min-width="5%">
        <template slot-scope="scope"
          ><span v-text="getIndex(scope.$index)"></span
        ></template>
      </el-table-column>
      <el-table-column prop="createTime" label="入库时间" show-overflow-tooltip sortable min-width="15%">
        <template slot-scope="scope">
          {{ time(scope.row.createTime) }}
        </template>
      </el-table-column> -->
      <el-table-column
        prop="url"
        label="URL"
        show-overflow-tooltip
        min-width="12%"
       >
      </el-table-column>
      <el-table-column prop="label" label="类型" min-width="8%"></el-table-column>
      <el-table-column prop="source" label="来源" min-width="8%"></el-table-column>
      <el-table-column prop="create_person" label="上传人" min-width="8%" ></el-table-column>
      <el-table-column  prop="create_method" label="上传方式" min-width="8%" >
      </el-table-column>
      <el-table-column prop="create_time" label="上传时间" min-width="8%">
      </el-table-column>
      <el-table-column  prop="remark" label="备注" min-width="5%">
      </el-table-column>

      <!-- <el-table-column prop="auditStatusName" label="审核状态" min-width="8%">
        <template slot-scope="scope">
          {{ scope.row.auditStatusName }}
        </template>
      </el-table-column>
      <el-table-column prop="treatStatusName" label="处置状态" min-width="5%">
        <template slot-scope="scope">
          {{ scope.row.treatStatusName }}
        </template>
      </el-table-column>
      <el-table-column prop="reason" label="原因" min-width="15%">
        <template slot-scope="scope">
          {{ scope.row.reason }}
        </template>
      </el-table-column>
      <el-table-column prop="auditResultName" label="审核结果" min-width="15%">
        <template slot-scope="scope">
          {{ scope.row.auditResultName }}
        </template>
      </el-table-column> -->
      <!-- <el-table-column prop="url9" label="备注"> </el-table-column> -->
    </el-table>

    <!-- 页面页数 -->
    <div class="bottom">
      <div class="ss">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="mypageable.pageNum"
          :page-sizes="[10, 20, 30, 40, 50]"
          :page-size="mypageable.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          class="pagePagination pageRight"
        >
        </el-pagination>
      </div>
    </div>

    <!-- 上传 -->
    <el-dialog
      :close-on-click-modal="false"
      title="文件上传"
      :visible.sync="shangchuan"
      height="40%"
      :before-close="shangchuanclose"
      class="dialogInfo"
    >
      <div style="width: 100%">
        <el-upload
          ref="upload"
          class="upload-demo"
          accept=".xlsx,.csv,.text"
          action="/cases/upload"
          :before-remove="beforeRemove"
          :on-success="successSendFile"
          :on-exceed="handleExceed"
          multiple
          :limit="3"
        >
        <el-button size="mini" type="primary">模板上传</el-button>
          <el-button size="mini" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">上传文件</div>
        </el-upload>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="shangchuan = false" size="mini"
          >取 消</el-button
        >
        <!-- <el-button type="primary" @click="wenjianshangchaun" size="mini"
          >确 定</el-button
        > -->
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import dayjs from "dayjs";
export default {
  data() {
    return {
      loading: false,
      form: {
        url: "", // url
        domain: null,
        laiyuan: null, // laiyuan
        chuzhi: null,
        selectURL: null,
        datetime: [
          dayjs().subtract(1, "week").format("YYYY-MM-DD"),
          dayjs(new Date()).format("YYYY-MM-DD"),
        ],
        username: null,
      },
      whiteSearchList: {
        startCreateTime: dayjs().subtract(1, "week").format("YYYY-MM-DD"),
        endCreateTime: dayjs(new Date()).format("YYYY-MM-DD"),
      },
      tableData: [],
      mypageable: {
        pageNum: 1,
        pageSize: 50,
      },
      total: 1,
      totalPages: "",
      selectData: {
        type: [],
        selectURL: [],
        laiyuan: [
          {
            id: "深圳",
            name: "深圳",
          },
          // {
          //   value: '0',
          //   label: "待审核",
          // },
          // {
          //   value: '1',
          //   label: "审核中",
          // },
          // {
          //   value: '2',
          //   label: "已审核",
          // },
        ],
        chuzhi: [
          {
            value: "0",
            label: "否",
          },
          {
            value: "1",
            label: "是",
          },
        ],
      },
      loadingbuttext: "导出",
      loadingbut: false,
      shangchuan: false,
      
      //接口上传
      dialogVisible: false,
      selectedType: '',
      code: '',
    };
  },

  created() {
    //   this.form.username=JSON.parse(window.sessionStorage.getItem('one'))
    //   this.techlist();
    this.suoshudi();
    this.suoshudi2();
  },
  methods: {
    // 城市下拉框数据
    async suoshudi() {
      this.loading = true;
      // const promise1 =  this.$http.get("/dictionary/datasource");
      const promise1 = this.$http.get("/cases");
      // const promise2 =  this.$http.get("dictionary/fraudType",{isBig:true})
      // const [data1,data2] = await Promise.all([promise1,promise2])
      const { data: res } = await promise1;
      if (res.code === 200) {
        this.selectData.selectURL = res.data;
      }
      // if(data1.data.code === 200 && data2.data.code === 200){
      //   this.selectData.fushen = data1.data.data
      //   this.selectData.shezha = data2.data.data
      //   for(let i in data1.data.data){
      //     if(data1.data.data[i].name==="上海"){
      //       this.newdomainSimpleVo.guishud = data1.data.data[i]
      //       break
      //     }else{
      //       this.newdomainSimpleVo.guishud = null
      //     }
      //   }

      // }
      this.techlist();
    },
    //来源下拉框
    async suoshudi2() {
      this.loading = true;
      // const promise1 =  this.$http.get("/dictionary/datasource");
      // const promise1 =  this.$http.get("/cases");
      const { data: res } = await promise1;
      if (res.code === 200) {
        this.selectData.laiyuan = res.data;
      }
      this.techlist();
    },
    //初始化列表
    async techlist() {
      this.loading = true;
      // console.log(this.form);
      let list = {
        url: this.form.url,
        label: this.form.label,
        // source: this.form.selectURL,
        create_person: this.form.create_person,
        create_method: this.form.create_method,
        create_time: this.form.create_time,
        remark: this.form.remark,
        source: this.form.laiyuan,
        treatStatus: this.form.chuzhi,
      };
      // console.log("...params", list);
      //请求接口时---传递参数
      const { data: res } = await this.$http.get("/cases", { params: list });
      // console.log('...res',res)
      if (res.code == 200) {
        // console.log(res.data);
        this.tableData = res.datas;
        // console.log(this.tableData)

        //映射关系 const map---对象   datas.map---遍历方法用于数组---类似于v-for
        const obj = {
          1: "文件上传",
          2: "接口上传",
        };
        // { ...item } === item
        this.tableData = res.datas.map((item) => {
          return {
            ...item,
            create_method: obj[item["create_method"]],
          };
        });
        // console.log('ooores',res.datas)
        this.total = res.total;
        this.loading = false;
      } else {
        this.$message(res.message);
        this.loading = false;
      }
    },
    chaxun() {
      this.mypageable.pageNum = 1;
      this.techlist();
    },
    chongzhi() {
      this.form.url = null;
      this.form.label = null;
      this.form.username = null;
      this.form.selectURL = null;
      this.form.domain = null;
      this.whiteSearchList.startCreateTime = dayjs()
        .subtract(1, "week")
        .format("YYYY-MM-DD");
      this.whiteSearchList.endCreateTime = dayjs(new Date()).format(
        "YYYY-MM-DD"
      );
      (this.form.datetime = [
        dayjs().subtract(1, "week").format("YYYY-MM-DD"),
        dayjs(new Date()).format("YYYY-MM-DD"),
      ]),
        (this.form.username = JSON.parse(window.sessionStorage.getItem("one")));
      this.techlist();
    },
    uploadwj() {
      // this.listTemplate.moban = null;
      this.file = [];
      this.shangchuan = true;
    },
    //接口文件
    uploadjk() {
      this.dialogVisible = true;
      this.selectedType = '';  // 清空之前的选择
      this.code = '';          // 清空之前的代码展示
    },
    //
    async fetchCode() {
      const endpoints = {
        python: '/cases/upload/api/python',
        java: '/cases/upload/api/java'
      };

      try {
        const response = await axios.get(endpoints[this.selectedType]);
        this.code = response.data;
      } catch (error) {
        this.$message.error('获取代码失败');
        console.error(error);
      }
    },
    /* fetchCode() {
      // 模拟后端获取代码
      const codeData = {
        python: '/cases/upload/api/python',
        java: ''
        // python: 'def example_function():\n    print("Hello, Python!")',
        // java: 'public class Example {\n    public static void main(String[] args) {\n        System.out.println("Hello, Java!");\n    }\n}',
      };
      
      this.code = codeData[this.selectedType];
    }, */

    //文件上传关闭
    shangchuanclose() {
      this.shangchuan = false;
      this.techlist();
    },
    //删除
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 文件上传
    successSendFile(res) {
      // this.loading=true
      if (res.code == 200) {
        // setTimeout(() => {
        this.$message.success("上传成功");
        this.getTabData();
        this.$refs.upload.clearFiles();
        // }, 1000)
      } else {
        this.$message(res.message);
      }
    },
    //上传
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    //精确导出

    async put() {
      this.loadingbuttext = "...加载中";
      this.loadingbut = true;
      let list = {
        url: this.form.domain,
        start: this.whiteSearchList.startCreateTime,
        end: this.whiteSearchList.endCreateTime,
        source: this.form.selectURL,
        auditStatus: this.form.laiyuan,
        treatStatus: this.form.chuzhi,
      };
      if (this.tableData.length == 0) {
        this.$message("当前数据为空，无法导出！");
        this.loadingbuttext = "导出";
        this.loadingbut = false;
        return false;
      }
      const res = await this.$http({
        methods: "get",
        // url:"/originDomain/export",
        url: "/cases",
        responseType: "blob",
        params: list,
      });
      if (res) {
        this.loadingbuttext = "导出";
        this.loadingbut = false;
        // console.log(res.data);
        let binaryData = [];
        binaryData.push(res.data);
        var _url = window.URL.createObjectURL(
          new Blob(binaryData, { type: "application/vnd.ms-excel" })
        );
        const a = document.createElement("a");
        // a.download = name;
        a.href = _url;
        a.setAttribute(
          "download",
          decodeURI(res.headers["content-disposition"].split("=")[1])
        );
        document.body.appendChild(a);
        a.click();
        a.remove();
        this.$message("导出成功");
      } else {
        this.$message("导出失败");
      }
    },

    getIndex($index) {
      //$index为数据下标,对英序号要加一
      // console.log($index)
      return (
        (this.mypageable.pageNum - 1) * this.mypageable.pageSize + $index + 1
      );
    },
    type_clearFun(val) {
      if (val == "") {
        this.form.username = null;
      }
    },
    chushen_clearFun(val) {
      if (val == "") {
        this.form.laiyuan = null;
      }
    },
    fushen_clearFun(val) {
      if (val == "") {
        this.form.chuzhi = null;
      }
    },
    handleSizeChange(val) {
      this.mypageable.pageSize = val;
      this.techlist();
    },
    handleCurrentChange(val) {
      this.mypageable.pageNum = val;
      this.techlist();
    },
    time(val) {
      if (val == null) {
        return "无";
      } else {
        return dayjs(val).format("YYYY-MM-DD  HH:mm:ss");
      }
    },
    status(val) {
      if (val == "1") {
        return "是";
      } else if (val == "2") {
        return "否";
      } else if (val == "3") {
        return "不确定";
      }
    },
    dataCreate_change(val) {
      if (val && val != "") {
        this.whiteSearchList.startCreateTime = val[0];
        this.whiteSearchList.endCreateTime = val[1];
      } else {
        this.whiteSearchList.startCreateTime = null;
        this.whiteSearchList.endCreateTime = null;
      }
    },
  },
};
</script>

<style scoped lang='less'>
.right_main_under {//main部分的上 右 下 左距离
   margin: 15px 15px 10px 10px;
   box-sizing: border-box;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 24px;


}
::v-deep .el-input--mini .el-input__inner {
  width: 210px;
}
::v-deep .el-form-item:first-child {
  // width: 300px;
  .el-form-item__content {
    width: 100%;
    
    .el-input__inner {
      width: 100%;
    }
  }
}
.bottom {
  width: 100%;
  height: 3.75rem /* 60/16 */ /* 40/16 */;
  .ss {
    float: right;
  }
}
.custom-button {
    font-size: 16px; /* 调整文字大小 */
    padding: 10px 20px; /* 调整按钮大小 */
}
//接口上传样式
.custom-button {
  margin-right: 10px;
}

.code-display {
  flex: 1;
  max-height: 400px;
  overflow-y: auto; /* Enable vertical scrolling */
  overflow-x: auto; /* Disable horizontal scrolling */
  border: 1px solid #ddd;
  padding: 10px;
  background-color: #f9f9f9;
  white-space: pre-wrap; /* Preserve whitespace and enable word wrap */
  word-break: break-all; /* Break words to ensure wrapping */
  word-wrap: break-word; /* Wrap long words */
}

// .custom-center .cell {
//   text-align: center !important;
// }
// .aligned-column .cell {
//   display: flex;
//   align-items: center;
// }

// .aligned-column .cell:before {
//   content: '';
//   display: inline-block;
//   width: 10px; /* 调整 ::before 元素的宽度，使其与内容对齐 */
// }

</style>