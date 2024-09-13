<template>
  <div class="right_main_under">
    <div class="button-container">
      <el-button type="primary" @click="getData">查询</el-button>
      <el-button class="blue" @click="exportCurrentPage">一键导出</el-button>
      <el-button class="weiding" @click="clearup">清空</el-button>
    </div>
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
        prop="ip"
        label="IP"
        show-overflow-tooltip
        min-width="8%"
      >
      </el-table-column>

      <el-table-column
        prop="rank"
        label="排名"
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
      mypageable: {
        pageSize: 50,
        pageNum: 1,
      },
      total: 0,
      // totalPages: 1,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.total / this.mypageable.pageSize);
    },
  },
  methods: {
    getData() {
      this.loading = true;
      axios
        .get("/dataaudit/res/list", {
          params: {
            page: this.mypageable.pageNum,
            per_page: this.mypageable.pageSize,
          },
        })
        .then((response) => {
          const res = response.data;
          // this.tableData = res.datas;
          // this.total = res.total;
          // this.totalPages = res.total_page;
          // this.loading = false;
          if (res.code === 200) {
            // 显示数据
            this.tableData = res.datas;
            this.total = res.total;
            this.loading = false;
          } else if (res.code === 204) {
            // 数据为 0 页 0 条
            this.tableData = [];
            this.total = 0;
            this.loading = false;
          }
        })
        .catch(() => {
          this.loading = false;
        });
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
      this.getData();
    },
  },
  /* mounted() {
    this.getData();
  }, */
};
</script>

<style scoped lang='less'>
.right_main_under {
  margin: 15px 0 10px 0;
  box-sizing: border-box;
  position: relative;
}
/* 按钮容器 */
.button-container {
  display: flex;
  gap: 10px;
  justify-content: flex-end; /* 按钮居右对齐 */
  margin-right: 20px; /* 与表单右边的距离 */
  margin-bottom: 10px;
}
// .el-col {
//   border-radius: 4px;
// }
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
  cursor: pointer;
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