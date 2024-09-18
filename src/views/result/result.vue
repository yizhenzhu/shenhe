<template>
  <div class="right_main_under">
    <el-form size="mini" label-width="80px" :inline="true">
      <el-row :gutter="20">
        <el-col :span="18">
          <div class="grid-content bg-purple">
            <el-form-item>
              <el-select
                v-model="form.laiyuan"
                placeholder="来源"
                clearable
                @clear="chushen_clearFun(form.laiyuan)"
              >
                <el-option
                  v-for="item in laiyuan"
                  :key="item.id"
                  :label="item.content"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-select
                v-model="form.audit_method"
                placeholder="处置方式"
                clearable
              >
                <el-option
                  v-for="item in audit_method"
                  :key="item.id"
                  :label="item.content"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-date-picker
                v-model="form.datetime"
                type="daterange"
                :change="dataCreate_change"
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
            <el-button
              size="mini"
              type="primary"
              class="custom-button"
              @click="chaxun"
              >查询</el-button
            >
            <el-button size="mini" class="blue" @click="exportCurrentPage"
              >一键导出</el-button
            >
            <el-button size="mini" class="weiding" @click="clearup"
              >清空</el-button
            >
          </div>
        </el-col>
      </el-row>
    </el-form>
    <!-- 列表 -->
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
        prop="src_url"
        label="原始URL"
        show-overflow-tooltip
        min-width="12%"
      >
      </el-table-column>
      <el-table-column
        prop="block_url"
        label="处置URL"
        show-overflow-tooltip
        min-width="8%"
      ></el-table-column>

      <el-table-column
        prop="create_time"
        label="创建时间"
        show-overflow-tooltip
        min-width="8%"
      ></el-table-column>

      <el-table-column
        prop="title"
        label="标题"
        show-overflow-tooltip
        min-width="8%"
      ></el-table-column>

      <el-table-column
        prop="label"
        label="类型"
        show-overflow-tooltip
        min-width="8%"
      >
      </el-table-column>

      <el-table-column
        prop="block_time"
        label="处置时间"
        show-overflow-tooltip
        min-width="8%"
      >
      </el-table-column>
      <el-table-column
        prop="block_method"
        label="处置方式"
        show-overflow-tooltip
        min-width="8%"
      >
      </el-table-column>
    </el-table>
    <el-col :span="24">
      <div class="pagination-container">
        <div class="pagination-left">
          共 {{ totalPages }} 页 / {{ total }} 条数据
        </div>
        <div class="pagination-center">
          <el-pagination
            background
            layout="prev, pager, next, jumper"
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
      tableData: [],
      form: {
        laiyuan: null, // laiyuan
        audit_method: null,
        datetime: [
          dayjs().subtract(6, "day").format("YYYY-MM-DD"),
          dayjs().format("YYYY-MM-DD"),
        ],
      },
      whiteSearchList: {
        startCreateTime: dayjs().subtract(6, "day").format("YYYY-MM-DD"),
        endCreateTime: dayjs().format("YYYY-MM-DD"),
      },
      mypageable: {
        pageSize: 50,
        pageNum: 1,
      },
      total: 0,
      laiyuan: [], // 初始化为空数组
      audit_method: [], // 初始化为空数组
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.total / this.mypageable.pageSize);
    },
  },
  created() {
    this.fetchSourceData();
    this.fetchAuditMethodData();
    this.techlist();
  },
  methods: {
    async techlist() {
      this.loading = true;
      let list = {
        start: this.form.datetime[0],
        end: this.form.datetime[1],
        page: this.mypageable.pageNum,
        page_size: this.mypageable.pageSize,
      };
      console.log(this.form);
      const { data: res } = await this.$http.get("/dataaudit/res/list", {
        params: list,
      });
      if (res.code == 200) {
        this.total = res.total;
        this.tableData = res.datas;
        this.loading = false;
      } else if (res.code === 204) {
        this.tableData = [];
        this.loading = false;
      } else {
        this.$message(res.message);
        this.loading = false;
      }
    },
    async fetchSourceData() {
      try {
        const { data: res } = await axios.get("/dataaudit/source/list");
        if (res.code === 200) {
          console.log("list data res:", res.data); // 调试来源数据

          this.laiyuan = res.datas.map((item) => ({
            id: item.id,
            content: item.content,
          }));
          console.log("list处理结果:", this.laiyuan); // 调试处理后的来源数据
        }
      } catch (error) {
        console.error("获取来源数据失败:", error);
      }
    },
    // 获取处置方式数据
    async fetchAuditMethodData() {
      try {
        const { data: res } = await axios.get("/dataaudit/res/method");
        if (res.code === 200) {
          this.audit_method = res.datas.map((item) => ({
            id: item.id,
            content: item.content,
          }));
          console.log("method处理结果", this.audit_method); // 调试处理后的处置方式数据
        }
      } catch (error) {
        console.error("获取处置方式数据失败:", error);
      }
    },
    dataCreate_change(val) {
      if (val && val.length === 2) {
        this.form.datetime = val;
        this.techlist(); // 调用获取数据的方法
      }
    },
    chaxun() {
      this.mypageable.pageNum = 1;
      this.techlist();
    },
    exportCurrentPage() {
      axios
        .get("/dataaudit/res/download", {
          params: {
            page: this.mypageable.pageNum,
            per_page: this.mypageable.pageSize,
          },
        })
        .then(() => {
          // 导出当前页的处理逻辑
        });
    },
    clearup() {
      axios.get("/dataaudit/res/clear").then(() => {
        this.tableData = [];
        this.total = 0;
        this.totalPages = 0;
      });
    },
    handleCurrentChange(newPage) {
      this.mypageable.pageNum = newPage;
      this.techlist();
    },
  },
};
</script>

<style scoped lang='less'>
.right_main_under {
  margin: 15px 0 10px 0;
  box-sizing: border-box;
  // position: relative;
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
  .el-form-item__content {
    width: 100%;

    .el-input__inner {
      width: 100%;
    }
  }
}
.custom-button {
  font-size: 14px;
  padding: 10px 20px;
}
/* 一键导出按钮 */
.blue {
  width: 100px;
  font-size: 14px;
  background-color: #35d78b;
  border: 0px;
  color: #fff;
  height: 36px;
  border-radius: 5px;
  text-align: center;
}

/* 清空按钮 */
.weiding {
  width: 70px;
  font-size: 14px;
  background-color: #fc1e0e;
  border: 0px;
  color: #fff;
  height: 36px;
  border-radius: 5px;
  // cursor: pointer;
  text-align: center;
}

/* 分页器容器 */
.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination-left {
  margin-right: 20px;
}
</style>