<template>
  <div class="right_main_under">
    <el-form size="mini" label-width="80px" :inline="true">
      <el-row :gutter="20">
        <el-col :span="18">
          <div class="grid-content bg-purple">
            <el-form-item>
              <el-input v-model="form.url" placeholder="url"></el-input>
            </el-form-item>
            <!-- 时间 -->
            <el-form-item>
              <el-date-picker
                v-model="form.datetime"
                type="daterange"
                @change="handleDateChange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                :clearable="false"
              >
              </el-date-picker>
            </el-form-item>

            <el-form-item>
              <el-select
                v-model="form.auditStatus"
                placeholder="审核状态"
                clearable
              >
                <el-option
                  v-for="item in selectData.auditStatus"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-select
                v-model="form.submitStatus"
                placeholder="提交状态"
                clearable
              >
                <el-option
                  v-for="item in selectData.submitStatus"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
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
          </div>
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
        min-width="8%"
      >
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        show-overflow-tooltip
        min-width="5%"
      ></el-table-column>

      <el-table-column
        prop="category"
        label="分类"
        show-overflow-tooltip
        min-width="5%"
      ></el-table-column>

      <el-table-column
        prop="audit_status"
        label="审核状态"
        show-overflow-tooltip
        min-width="8%"
      ></el-table-column>

      <el-table-column
        prop="audit_person"
        label="审核人"
        show-overflow-tooltip
        min-width="8%"
      >
      </el-table-column>
      <el-table-column
        prop="audit_time"
        label="审核时间"
        show-overflow-tooltip
        sortable
        min-width="8%"
      >
      </el-table-column>
      <el-table-column
        prop="submit_status"
        label="提交状态"
        show-overflow-tooltip
        min-width="5%"
      >
      </el-table-column>

      <el-table-column
        prop="submit_time"
        label="提交时间"
        sortable
        show-overflow-tooltip
        min-width="10%"
      >
      </el-table-column>
      <el-table-column
        prop="submit_reason"
        label="未提交原因"
        show-overflow-tooltip
        min-width="5%"
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
import { data } from "jquery";
export default {
  data() {
    return {
      loading: false,
      form: {
        datetime: [
          /* dayjs().format("YYYY-MM-DD"), // 默认起始日期为今天
          dayjs().format("YYYY-MM-DD"), // 默认结束日期为今天 */
          dayjs().subtract(1, "week").format("YYYY-MM-DD"),
          dayjs(new Date()).format("YYYY-MM-DD"),
        ],
        url: "",
        auditStatus: "",
        submitStatus: "",
      },
      auditStatusOptions: [],
      submitStatusOptions: [],
      whiteSearchList: {
        /* startCreateTime: dayjs().format("YYYY-MM-DD"),
        endCreateTime: dayjs().format("YYYY-MM-DD"), */
        startCreateTime: dayjs().subtract(1, "week").format("YYYY-MM-DD"),
        endCreateTime: dayjs(new Date()).format("YYYY-MM-DD"),
      },
      tableData: [],
      mypageable: {
        pageNum: 1, //当前页码
        pageSize: 50, //每页显示的条目数
      },
      total: 0, //总条目数
      selectData: {
        audit_status: null,
        submit_status: null,
      },
    };
  },
  created() {
    this.getStatusOptions();
    this.techlist();
    console.log("liebiao");
    this.loading = false;
  },
  computed: {
    totalPages() {
      return Math.ceil(this.total / this.mypageable.pageSize);
    },
  },
  /*   watch: {
    "form.url"(newValue) {
      console.log("URL changed to:", newValue);
    },
  }, */

  methods: {
    async techlist() {
      this.loading = true;
      console.log("---------", data);
      let list = {
        page: this.mypageable.pageNum,
        page_size: this.mypageable.pageSize,
        start: this.form.datetime[0],
        end: this.form.datetime[1],
        url: this.form.url.trim(),
        audit_status: this.form.auditStatus || undefined,
        submit_status: this.form.submitStatus || undefined,
      };
      console.log("Request Params:", list);
      const { data: res } = await this.$http.get("/diaoyu/list", {
        params: list,
        headers: {
          "Cache-Control": "no-cache",
        },
      });

      console.log("Response:", res);

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
    async getStatusOptions() {
      const { data: res } = await this.$http.get("/diaoyu/status/audit");
      if (res && res.code === 200 && Array.isArray(res.datas)) {
        // 假设接口返回的数据格式是 { id: ..., content: ... }
        this.selectData.auditStatus = res.datas.map((item) => ({
          value: item.id,
          label: item.content,
        }));
      } else {
        this.$message(res.message);
      }
      // 请求提交状态选项
      const { data: resSubmit } = await this.$http.get("/diaoyu/status/submit");
      if (resSubmit && resSubmit.code === 200) {
        // 处理提交状态选项数据
        const submitStatusOptions = Object.values(resSubmit.datas).map(
          (item) => ({
            value: item.id,
            label: item.content,
          })
        );
        this.selectData.submitStatus = submitStatusOptions;
      } else {
        this.$message(resSubmit.message);
      }
    },

    handleDateChange(val) {
      if (val && val.length === 2) {
        this.whiteSearchList.startCreateTime = val[0];
        this.whiteSearchList.endCreateTime = val[1];
      }
    },
    chaxun() {
      this.mypageable.pageNum = 1;
      this.whiteSearchList.startCreateTime = this.form.datetime[0];
      this.whiteSearchList.endCreateTime = this.form.datetime[1];
      this.whiteSearchList.url = this.form.url.trim(); // 使用最新的表单值
      this.techlist();
    },
    chongzhi() {
      // 清空 url 输入框
      this.form.url = "";

      this.form.auditStatus = null;
      this.form.submitStatus = null;
      // 恢复原来的时间区间
      this.form.datetime = [
        dayjs().subtract(1, "week").format("YYYY-MM-DD"),
        dayjs(new Date()).format("YYYY-MM-DD"),
      ];

      // 重新加载数据
      this.techlist();
    },
    getIndex($index) {
      //$index为数据下标,对英序号要加一
      // console.log($index)
      return (
        (this.mypageable.pageNum - 1) * this.mypageable.pageSize + $index + 1
      );
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
  },
};
</script>

<style scoped lang='less'>
.right_main_under {
  //main部分的上 右 下 左距离
  margin: 15px 0 10px 0;
  box-sizing: border-box;
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
.pagination-center {
  flex: 2;
  // text-align: center;
  margin-right: 100px;
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
//模板下载和点击上传
.button-group-vertical {
  // display: flex;
  flex-direction: column;
}

.bottom-margin {
  margin-bottom: 10px; /* Adjust the margin as needed */
}
</style>
<!-- 两个按钮上下布局距离调整 -->