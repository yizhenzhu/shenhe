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
          </div>
          <!-- 文件上传弹出框 -->
          <el-dialog
            :visible.sync="uploadDialogVisible"
            title="文件上传"
            width="500px"
          >
            <div class="button-group-vertical">
              <el-form-item label="类型">
                <el-select
                  v-model="form.source"
                  placeholder="请选择类型"
                  @change="handleSourceChange"
                  clearable
                >
                  <el-option
                    v-for="item in sourceList"
                    :key="item.id"
                    :label="item.content"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-upload
                ref="upload"
                class="upload-demo"
                accept=".xlsx,.csv,.text"
                action="/upload-placeholder"
                :http-request="dummyRequest"
                :before-remove="beforeRemove"
                :on-exceed="handleExceed"
                multiple
                :limit="3"
              >
                <el-button size="mini" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">上传文件</div>
              </el-upload>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="confirmUpload" size="mini"
                >确 定</el-button
              >
              <el-button @click="cancelUpload" size="mini">取 消</el-button>
            </span>
          </el-dialog>
          <!-- 接口上传弹出框 -->
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
    >
      <el-table-column
        prop="src_url"
        label="原始URL"
        show-overflow-tooltip
        min-width="8%"
      >
      </el-table-column>
      <el-table-column
        prop="reg_url"
        label="规范化URL"
        show-overflow-tooltip
        min-width="8%"
      ></el-table-column>

      <el-table-column
        prop="upload_person"
        label="上传人"
        min-width="8%"
      ></el-table-column>

      <el-table-column prop="upload_method" label="上传方式" min-width="8%">
        <template slot-scope="scope">
          {{ scope.row.upload_method === 1 ? "文件上传" : "接口上传" }}
        </template>
      </el-table-column>

      <el-table-column
        prop="upload_time"
        label="上传时间"
        sortable
        min-width="8%"
      >
      </el-table-column>
    </el-table>

    <!-- 页面页数 -->
    <el-col :span="24">
      <div class="pagination-container">
        <div class="pagination-left">
          共 {{ totalPages }} 页 / {{ total }} 条数据
        </div>
        <div class="pagination-center">
          <el-pagination
            background
            layout="prev, pager, next,jumper"
            :total="total"
            :page-size="mypageable.pageSize"
            :current-page.sync="mypageable.pageNum"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </div>
      </div>
    </el-col>
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
        selectURL: null,
        datetime: [
          dayjs().subtract(1, "week").format("YYYY-MM-DD"),
          dayjs(new Date()).format("YYYY-MM-DD"),
        ],
        source: null, // 添加来源类型
      },
      whiteSearchList: {
        startCreateTime: dayjs().subtract(1, "week").format("YYYY-MM-DD"),
        endCreateTime: dayjs(new Date()).format("YYYY-MM-DD"),
      },
      tableData: [],
      mypageable: {
        pageNum: 1, //当前页码
        pageSize: 50, //每页显示的条目数
      },
      total: 0, //总条目数
      //文件上传
      sourceList: [], // 保存类型查询的数据
      uploadDialogVisible: false,
      loadingbut: false,
    };
  },
  /*   mounted() {
    this.techlist(); // 确保组件挂载后获取数据
  },
 */

  created() {
    this.techlist();
    this.fetchSourceList(); // 获取类型查询的下拉数据
  },
  computed: {
    totalPages() {
      return Math.ceil(this.total / this.mypageable.pageSize);
    },
  },
  methods: {
    async techlist() {
      this.loading = true;
      let list = {
        start: this.form.datetime[0],
        end: this.form.datetime[1],
        url: this.form.url.trim(),
        page: this.mypageable.pageNum,
        page_size: this.mypageable.pageSize,
      };
      const { data: res } = await this.$http.get("/dataaudit/upload/list", {
        params: list,
      });
      if (res.code == 200) {
        this.tableData = res.datas;
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
    dummyRequest() {
      // 空函数，阻止自动上传
    },
    // 获取类型查询下拉框数据
    async fetchSourceList() {
      try {
        const { data: res } = await axios.get("/dataaudit/source/list");
        if (res.code === 200) {
          this.sourceList = res.datas;
        }
      } catch (error) {
        console.error("获取类型列表失败", error);
      }
    },
    // 确定按钮上传
    async confirmUpload() {
      const uploadFiles = this.$refs.upload.uploadFiles; // 获取上传的文件
      if (uploadFiles.length === 0 || !this.form.source) {
        this.$message.warning("请选择文件和来源类型");
        return;
      }
      const formData = new FormData();
      uploadFiles.forEach((file) => {
        formData.append("file", file.raw); // 添加文件到formData
      });
      formData.append("source", this.form.source); // 添加来源类型

      try {
        const { data: res } = await axios.post(
          "/dataaudit/upload/file",
          formData
        );
        if (res.code === 200) {
          this.$message.success("上传成功");
          this.clearUploadData(); // 清空内容
          this.uploadDialogVisible = false; // 关闭弹窗
        } else {
          this.$message.error(res.message);
        }
      } catch (error) {
        console.error("上传失败", error);
      }
    },
    // 取消按钮逻辑
    cancelUpload() {
      this.clearUploadData(); // 清空内容
      this.uploadDialogVisible = false; // 关闭弹窗
    },

    // 清空上传文件和选择的来源
    clearUploadData() {
      this.$refs.upload.clearFiles(); // 清空上传文件
      this.form.source = null; // 清空选择的来源
    },

    // 处理来源类型变化
    handleSourceChange(value) {
      this.form.source = value;
    },

    mounted() {
      this.techlist(); // 组件挂载时获取初始数据
    },
    chaxun() {
      this.mypageable.pageNum = 1;
      this.techlist();
      // this.form.url = ""; // 查询结束后清空输入框内容
    },
    chongzhi() {
      // 清空 url 输入框
      this.form.url = "";

      // 恢复原来的时间区间
      this.form.datetime = [
        dayjs().subtract(1, "week").format("YYYY-MM-DD"),
        dayjs(new Date()).format("YYYY-MM-DD"),
      ];

      // 重新加载数据
      this.techlist();
    },
    //文件上传
    showUploadDialog() {
      this.uploadDialogVisible = true;
    },

    //文件上传关闭
    shangchuanclose() {
      this.shangchuan = false;
      this.techlist();
    },
    //删除
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
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
.pagination-center {
  flex: 2;
  // text-align: center;
  margin-right: 100px;
}
.pagination-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
}
.pagination-left {
  flex: 2;
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
//模板下载和点击上传
.button-group-vertical .el-form-item {
  height: 45px;
  margin-bottom: 20px;
  display: flex;
}
.button-group-vertical {
  display: flex;
  flex-direction: column;
  margin-left: 30px;
}
.upload-demo {
  align-items: center;
  margin-left: 35px;
}
</style>
<!-- 两个按钮上下布局距离调整 -->