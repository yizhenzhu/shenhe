<template>
  <div class="right_main_under">
    <el-form size="mini" label-width="80px" :inline="true">
      <el-row :gutter="20">
        <el-col :span="18">
          <div class="grid-content bg-purple">
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
              <el-input v-model="form.url" placeholder="url"></el-input>
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
        prop="src_audit_status"
        label="原始URL审核状态"
        min-width="5%"
      ></el-table-column>

      <el-table-column
        prop="src_audit_reason"
        label="原始URL未通过原因"
        min-width="5%"
      ></el-table-column>

      <el-table-column prop="redirect" label="是否有跳转" min-width="5%">
      </el-table-column>
      <el-table-column prop="redirect_method" label="跳转方式" min-width="5%">
      </el-table-column>

      <el-table-column
        prop="redirect_url"
        label="跳转URL"
        show-overflow-tooltip
        min-width="8%"
      >
      </el-table-column>
      <el-table-column prop="wild" label="是否是泛域名" min-width="5%">
      </el-table-column>
      <el-table-column prop="domain" label="域名" min-width="5%">
      </el-table-column>
      <el-table-column prop="audit_status" label="审核状态" min-width="5%">
      </el-table-column>
      <el-table-column prop="audit_reason" label="未通过原因" min-width="5%">
      </el-table-column>
      <el-table-column prop="block_method" label="处置方式" min-width="5%">
      </el-table-column>
      <el-table-column prop="block_url" label="处置URL" min-width="5%">
      </el-table-column>
      <el-table-column prop="block_res" label="未处置原因" min-width="5%">
      </el-table-column>

      <el-table-column prop="unblock_reason" label="未处置原因" min-width="5%">
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
        url: "",
        datetime: [
          dayjs().format("YYYY-MM-DD"), // 默认起始日期为今天
          dayjs().format("YYYY-MM-DD"), // 默认结束日期为今天
        ],
      },
      whiteSearchList: {
        startCreateTime: dayjs().format("YYYY-MM-DD"),
        endCreateTime: dayjs().format("YYYY-MM-DD"),
      },
      tableData: [],
      mypageable: {
        pageNum: 1, //当前页码
        pageSize: 50, //每页显示的条目数
      },
      total: 0, //总条目数
    };
  },
  created() {
    this.techlist();
    console.log("liebiao");
    this.loading = false;
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
        page: this.mypageable.pageNum,
        page_size: this.mypageable.pageSize,
        url: this.form.url,
        start: this.form.datetime[0],
        end: this.form.datetime[1],
      };
      //try {
      const { data: res } = await this.$http.get("/dataaudit/audit/log", {
        params: list,
      });
      if (res.code == 200) {
        this.tableData = res.datas;
        //this.mypageable.pageNum = res.page;
        //this.mypageable.pageSize = res.per_page;
        this.total = res.total;
        this.loading = false;
      } else {
        // this.$message(res.message);
        this.loading = false;
      }
      /* } catch (error) {
        this.$message.error("请求失败，请重试");
      } finally {
        this.loading = false;
      } */
    },
    // mounted() {
    // 确保元素存在
    /*  const element = this.$refs.myElement;
      if (element) {
        element.addEventListener("touchmove", this.handleTouchMove, {
          passive: true,
        });
      } */
    /*   this.techlist(); // 组件挂载时获取初始数据
    }, */
    handleDateChange(val) {
      if (val && val.length === 2) {
        this.whiteSearchList.startCreateTime = val[0];
        this.whiteSearchList.endCreateTime = val[1];
        // this.techlist(); // 调用获取数据的方法
      }
      /* if (val && val.length === 2) {
        if (val[0] === val[1]) {
          // 如果起始时间和结束时间相等，则都设置为今天的日期
          const today = dayjs().format("YYYY-MM-DD");
          this.form.datetime = [today, today];
        } else {
          this.whiteSearchList.startCreateTime = val[0];
          this.whiteSearchList.endCreateTime = val[1];
        }
      } */
    },
    chaxun() {
      this.mypageable.pageNum = 1;
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
  margin-right: 200px;
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