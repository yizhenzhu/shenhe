<template>
  <div class="right_main_under">
    <el-form size="mini" label-width="80px" :inline="true">
      <el-row :gutter="20">
        <el-col :span="18">
          <div class="grid-content bg-purple">
            <!-- 流程记录页面头部模块——域名 -->
            <el-form-item>
              <el-input v-model="form.url" placeholder="url"></el-input>
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
            <!-- 上传下拉菜单 -->
            <el-form-item>
              <el-select
                v-model="form.schuan"
                placeholder="上传"
                clearable
                @clear="chushen_clearFun(form.schuan)"
              >
                <el-option
                  v-for="item in selectData.schuan"
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
            </el-form-item></div
        ></el-col>
        <el-col :span="6"
          ><div class="grid-content bg-purple" style="float: right">
            <!-- 流程记录页面头部模块——button -->
            <el-button
              size="mini"
              type="primary"
              plain
              @click="chaxun"
              class="custom-button"
              >查询</el-button
            >
            <el-button
              size="mini"
              type="success"
              plain
              @click="showUploadDialog"
              class="custom-button"
              >文件上传</el-button
            >
            <el-button
              size="mini"
              type="success"
              plain
              @click="uploadjk"
              class="custom-button"
              >接口上传</el-button
            >
          </div>
          <!-- 文件上传弹出框 -->
          <el-dialog :visible.sync="uploadDialogVisible" title="文件上传">
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
              <el-button size="mini" type="primary" @click="downloadTemplate"
                >模板下载</el-button
              >
              <el-button size="mini" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">上传文件</div>
            </el-upload>
            <span slot="footer" class="dialog-footer">
              <el-button
                type="primary"
                @click="uploadDialogVisible = false"
                size="mini"
                >取 消</el-button
              >
            </span>
          </el-dialog>
          <!-- 接口上传弹出框 -->
          <el-dialog
            title="接口上传"
            :visible.sync="dialogVisible"
            width="50%"
            height="60%"
          >
            <div style="display: flex">
              <!-- 左侧选择框 -->
              <div style="margin-right: 20px">
                <el-radio-group
                  v-model="selectedType"
                  @change="fetchCode"
                  style="display: flex; flex-direction: column"
                >
                  <el-radio-button label="python" style="margin-bottom: 10px"
                    >Python接口</el-radio-button
                  >
                  <!-- java接口代码 -->
                  <!-- <el-radio-button label="java">Java代码</el-radio-button> -->
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
          </el-dialog>
        </el-col>
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
      <el-table-column
        prop="url"
        label="URL"
        show-overflow-tooltip
        min-width="12%"
      >
      </el-table-column>
      <el-table-column
        prop="label"
        label="类型"
        min-width="8%"
      ></el-table-column>

      <el-table-column
        prop="source"
        label="来源"
        min-width="8%"
      ></el-table-column>

      <el-table-column
        prop="create_person"
        label="上传人"
        min-width="8%"
      ></el-table-column>

      <el-table-column prop="create_method" label="上传方式" min-width="8%">
      </el-table-column>
      <el-table-column prop="create_time" label="上传时间" min-width="8%">
      </el-table-column>
      <el-table-column prop="remark" label="备注" min-width="5%">
      </el-table-column>

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
          <el-button size="mini" type="primary">模板下载</el-button>
          <el-button size="mini" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">上传文件</div>
        </el-upload>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="shangchuan = false" size="mini"
          >取 消</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";
export default {
  data() {
    return {
      loading: false,
      form: {
        url: "", // url
        domain: null,
        laiyuan: null, // laiyuan
        shangchuan:null,
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
        
        ],
        schuan:[
        {
            id: 1,
            name: "文件上传",
        },
        {
            id: 2,
            name: "接口上传",
        },
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

      //文件上传
      uploadDialogVisible: false,
      loadingbut: false,
      loadingbuttext: "模板下载",

      //接口上传
      dialogVisible: false,
      selectedType: "",
      code: "",
    };
  },

  created() {
    this.suoshudi();
    this.suoshudi2();
  },
  methods: {
    // 城市下拉框数据
    async suoshudi() {
      this.loading = true;
      const promise1 = this.$http.get("/cases");
      const { data: res } = await promise1;
      if (res.code === 200) {
        this.selectData.selectURL = res.data;
      }
      this.techlist();
    },
    //来源下拉框
    async suoshudi2() {
      this.loading = true;
      const { data: res } = await promise1;
      if (res.code === 200) {
        this.selectData.laiyuan = res.data;
      }
      this.techlist();
    },
    
    async techlist() {
      this.loading = true;
      // console.log(this.form);
      let list = {
        //url、source
        url: this.form.url,
        label: this.form.label,
        // source: this.form.selectURL,
        create_person: this.form.create_person,
        create_method: this.form.create_method,
        create_time: this.form.create_time,
        remark: this.form.remark,
        source: this.form.laiyuan,
        upload_method:this.form.schuan,

        // treatStatus: this.form.chuzhi,
      };
      // console.log("...params", list);
      //请求接口时---传递参数---payload
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
    //文件上传
    showUploadDialog() {
      this.uploadDialogVisible = true;
    },
    async downloadTemplate() {
      this.loadingbuttext = "...下载中";
      this.loadingbut = true;
      try {
        const res = await this.$http({
          method: "GET",
          url: "/cases/upload/sample",
          responseType: "blob",
        });
        let blob = res.data;
        if (blob.type === "application/json") {
          const reader = new FileReader();
          reader.onload = () => {
            this.$message("下载文件失败");
            this.loadingbuttext = "模板下载";
            this.loadingbut = false;
          };
          reader.readAsText(blob);
        } else {
          let title = dayjs().format("YYYYMMDD") + "模板.xlsx";
          let binaryData = [];
          binaryData.push(blob);
          let url = window.URL.createObjectURL(new Blob(binaryData), {
            type: "application/vnd.ms-excel",
          });
          const aLink = document.createElement("a");
          aLink.href = url;
          aLink.setAttribute("download", title);
          document.body.appendChild(aLink);
          aLink.click();
          this.loadingbuttext = "模板下载";
          this.loadingbut = false;
          document.body.removeChild(aLink);
          this.$message.success("模板下载成功！");
        }
      } catch (err) {
        this.$message.error("文件下载失败！", err);
        this.loadingbuttext = "模板下载";
        this.loadingbut = false;
      }
    },
    //接口文件
    uploadjk() {
      this.dialogVisible = true;
      this.selectedType = ""; // 清空之前的选择
      this.code = ""; // 清空之前的代码展示
    },

    async fetchCode() {
      const endpoints = {
        python: "/cases/upload/api/python",
        java: "/cases/upload/api/java",
      };

      try {
        const response = await axios.get(endpoints[this.selectedType]);
        this.code = response.data.content; // 只获取 content 字段的内容
      } catch (error) {
        this.$message.error("获取代码失败");
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
.right_main_under {
  //main部分的上 右 下 左距离
  margin: 15px 0 10px 0;
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
  overflow-y: auto;
  overflow-x: auto;
  border: 1px solid #ddd;
  padding: 10px;
  background-color: #f9f9f9;
  white-space: pre-wrap;
  word-break: break-all;
  word-wrap: break-word;
}

</style>