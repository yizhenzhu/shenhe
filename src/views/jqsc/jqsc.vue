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
              type="warning"
              plain
              @click="chongzhi"
              class="custom-button"
              >重置</el-button
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
          <el-dialog
            :visible.sync="uploadDialogVisible"
            title="文件上传"
            width="500px"
          >
            <el-form label-width="80px" :inline="true">
              <el-form-item label="来源" style="margin-right: 50px">
                <el-select
                  v-model="form.laiyuan"
                  placeholder="请选择来源"
                  clearable
                  class="small-select"
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
            </el-form>
            <el-button
              size="mini"
              type="primary"
              @click="downloadTemplate"
              style="font-size: 14px; margin: 10px 40px"
              >模板下载</el-button
            >
            <el-upload
              ref="upload"
              class="upload-demo"
              accept=".xlsx,.csv,.text"
              :before-remove="beforeRemove"
              action="#"
              :on-success="successSendFile"
              :on-exceed="handleExceed"
              :on-change="handleFileChange"
              :before-upload="() => false"
              multiple
              :limit="3"
            >
              <el-button
                size="mini"
                type="primary"
                style="font-size: 14px; margin: 10px 40px"
                >点击上传</el-button
              >
              <div
                slot="tip"
                class="el-upload__tip"
                style="font-size: 12px; margin: 10px 40px"
              >
                只能上传 .xlsx, .csv, .text 文件
              </div>
            </el-upload>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="confirmUpload" size="mini"
                >确 定</el-button
              >
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
      <el-table-column
        prop="create_time"
        label="上传时间"
        sortable
        min-width="8%"
      >
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
        laiyuan: null, // laiyuan
        schuan: null,
        selectURL: null,
        datetime: [
          dayjs().subtract(6, "day").format("YYYY-MM-DD"),
          dayjs(new Date()).format("YYYY-MM-DD"),
        ],
        // username: null,
      },
      whiteSearchList: {
        startCreateTime: dayjs().subtract(6, "day").format("YYYY-MM-DD"),
        endCreateTime: dayjs(new Date()).format("YYYY-MM-DD"),
      },
      tableData: [],
      mypageable: {
        pageNum: 1, //当前页码
        pageSize: 50, //每页显示的条目数
      },
      total: 1, //总条目数
      totalPages: "",
      selectData: {
        type: [],
        selectURL: [],
        // laiyuan: [{ id: "深圳", name: "深圳" }],
        laiyuan: "",
        schuan: [
          { id: 1, name: "文件上传" },
          { id: 2, name: "接口上传" },
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
    /* this.suoshudi();
    this.suoshudi2(); */
    this.suoshudi2(); // 获取来源数据
    this.techlist();
    console.log("jqsc");
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
    async suoshudi2() {
      this.loading = true;
      try {
        const { data: res } = await this.$http.get("/cases/source");
        if (res.code === 200) {
          // 将数据转换为 { id: item, name: item } 的格式
          this.selectData.laiyuan = res.datas.map((item) => ({
            id: item, // 使用字符串作为 id
            name: item, // 使用字符串作为 name
          }));
        }
      } catch (error) {
        this.$message.error("获取来源数据失败");
      } finally {
        this.loading = false;
      }
    },
    handleFileChange(file, fileList) {
      this.uploadedFiles = fileList; // 保留上传的文件
    },
    // 确认上传按钮方法
    confirmUpload() {
      if (!this.form.laiyuan) {
        this.$message.error("来源不能为空");
        return;
      }
      if (this.uploadedFiles.length === 0) {
        this.$message.error("请上传文件");
        return;
      }

      const formData = new FormData();
      formData.append("source", this.form.laiyuan);
      this.uploadedFiles.forEach((file) => {
        formData.append("file", file.raw);
      });
      axios
        .post("/cases/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.data.code === 200) {
            this.$message.success("上传成功");
            this.uploadDialogVisible = false;
            // 清空来源和上传文件内容
            this.form.laiyuan = null;
            this.uploadedFiles.clearFiles();
          } else {
            this.$message.error(response.data.message);
          }
        });
    },

    async techlist() {
      this.loading = true;
      let list = {
        page: this.mypageable.pageNum,
        page_size: this.mypageable.pageSize,
        url: this.form.url.trim(),
        source: this.form.laiyuan,
        start: this.form.datetime[0],
        end: this.form.datetime[1],
        upload_method: this.form.schuan,
      };
      console.log("cases");
      const { data: res } = await this.$http.get("/cases", { params: list });
      if (res.code == 200) {
        // console.log(res.data);
        // this.tableData = res.datas;
        // console.log(this.tableData)

        //映射关系 const map---对象   datas.map---遍历方法用于数组---类似于v-for
        const obj = {
          1: "文件上传",
          2: "接口上传",
        };
        // { ...item } === item
        this.tableData = res.datas.map((item) => ({
          ...item,
          create_method: obj[item["create_method"]],
        }));
        // console.log('ooores',res.datas)
        this.total = res.total;
        this.loading = false;
      } else if (res.code == 204) {
        this.tableData = [];
        this.loading = false;
      } else {
        this.$message(res.message);
        this.loading = false;
      }
    },
    chongzhi() {
      // 清空 url 输入框
      this.form.url = "";

      // 清空 来源 下拉框
      this.form.laiyuan = null;

      // 清空 上传 下拉框
      this.form.schuan = null;

      // 恢复原来的时间区间
      this.form.datetime = [
        dayjs().subtract(6, "day").format("YYYY-MM-DD"),
        dayjs(new Date()).format("YYYY-MM-DD"),
      ];

      // 重新加载数据
      this.techlist();
    },

    mounted() {
      this.techlist(); // 组件挂载时获取初始数据
    },
    chaxun() {
      // 修剪输入框中的空格
      this.form.url = this.form.url.trim();
      this.mypageable.pageNum = 1;
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
          // 关闭文件上传弹出框
          this.uploadDialogVisible = false;
        }
      } catch (err) {
        this.$message.error("文件下载失败！", err);
        this.loadingbuttext = "模板下载";
        this.loadingbut = false;
        this.uploadDialogVisible = false;
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
        // java: 'public class Example {\n    public static void main(String[] args) 
        {\n        System.out.println("Hello, Java!");\n    }\n}',
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
    handleSizeChange(val) {
      this.mypageable.pageSize = val; // 更新每页显示的条目数
      this.mypageable.pageNum = 1; // 重置为第一页
      this.techlist();
    },
    handleCurrentChange(val) {
      // 当用户改变当前页码时触发
      this.mypageable.pageNum = val; // 更新当前页码
      this.techlist();
    },
    time(val) {
      if (val == null) {
        return "无";
      } else {
        return dayjs(val).format("YYYY-MM-DD  HH:mm:ss");
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
  margin-right: 10px;
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
.small-select {
  width: 200px;
  font-size: 10px;
  padding-left: 40px;
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
  padding: 10px 10px; /* 调整按钮大小 */
  margin-right: 10px;
}

.code-display {
  flex: 1;
  max-height: 400px;
  overflow-y: auto;
  overflow-x: auto;

  padding: 10px;
  background-color: #f9f9f9;
  white-space: pre-wrap;
  word-break: break-all;
  word-wrap: break-word;
}
</style>
<!-- 两个按钮上下布局距离调整 -->