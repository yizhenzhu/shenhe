<template>
  <div class="right_main_under">
    <el-form size="mini" label-width="80px" :inline="true">
      <el-row :gutter="20" class="form-inline">
        <el-col :span="24">
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
            </el-form-item>
            <el-form-item>
              <!-- 机审状态下拉框 -->
              <el-select
                v-model="form.machine_audit_status"
                placeholder="机审状态"
                clearable
              >
                <el-option
                  v-for="item in selectData.machine_audit_status"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <!-- 初审状态下拉框 -->
            <el-form-item>
              <el-select
                v-model="form.first_audit_status"
                placeholder="初审状态"
                clearable
              >
                <el-option
                  v-for="item in selectData.first_audit_status"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <!-- 复审状态下拉框 -->
            <el-form-item>
              <el-select
                v-model="form.second_audit_status"
                placeholder="复审状态"
                clearable
              >
                <el-option
                  v-for="item in selectData.second_audit_status"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
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
            </el-form-item>
          </div></el-col
        >
      </el-row>
    </el-form>

    <!-- 流程记录页面模块——列表 -->
    <el-table
      border
      ref="multipleTable"
      :data="tableData"
      max-height="550px"
      size="mini"
      class="tableStyle"
      empty-text="暂无数据"
      v-loading="loading"
    >
      <el-table-column
        prop="url"
        label="URL"
        width="150px"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="source"
        label="来源"
        width="50px"
        show-overflow-tooltip
      ></el-table-column>

      <el-table-column
        prop="label"
        label="类型"
        width="100px"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="create_time"
        label="创建时间"
        sortable
        show-overflow-tooltip
        width="135px"
      ></el-table-column>
      <el-table-column
        prop="machine_audit_status"
        label="机审状态"
        show-overflow-tooltip
        width="90px"
      ></el-table-column>

      <el-table-column
        prop="machine_audit_time"
        label="机审时间"
        sortable
        show-overflow-tooltip
        width="135px"
      >
      </el-table-column>
      <el-table-column
        prop="machine_audit_reason"
        label="机审未通过原因"
        show-overflow-tooltip
        width="110px"
      >
      </el-table-column>
      <el-table-column
        prop="machine_audit_label"
        label="模型命中类型"
        show-overflow-tooltip
        width="100px"
      >
      </el-table-column>
      <el-table-column
        prop="machine_audit_num"
        label="模型命中编号"
        show-overflow-tooltip
        width="100px"
      ></el-table-column>

      <el-table-column
        prop="first_audit_status"
        label="初审状态"
        show-overflow-tooltip
        width="70px"
      ></el-table-column>

      <el-table-column
        prop="first_audit_person"
        label="初审人"
        show-overflow-tooltip
        width="70px"
      >
      </el-table-column>
      <el-table-column
        prop="first_audit_time"
        label="初审时间"
        sortable
        show-overflow-tooltip
        width="100px"
      >
      </el-table-column>
      <el-table-column
        prop="first_audit_label"
        label="初审类型"
        show-overflow-tooltip
        width="70px"
      >
      </el-table-column>
      <el-table-column
        prop="first_audit_num"
        label="初审编号"
        show-overflow-tooltip
        width="70px"
      >
      </el-table-column>
      <el-table-column
        prop="first_audit_reason"
        label="初审未通过编号"
        show-overflow-tooltip
        width="110px"
      >
      </el-table-column>
      <el-table-column
        prop="second_audit_status"
        label="复审状态"
        show-overflow-tooltip
        width="70px"
      ></el-table-column>

      <el-table-column
        prop="second_audit_person"
        label="复审人"
        show-overflow-tooltip
        width="70px"
      ></el-table-column>

      <el-table-column
        prop="second_audit_time"
        label="复审时间"
        sortable
        show-overflow-tooltip
        width="70px"
      >
      </el-table-column>
      <el-table-column
        prop="second_audit_label"
        label="复审类型"
        show-overflow-tooltip
        width="70px"
      >
      </el-table-column>
      <el-table-column
        prop="second_audit_num"
        label="复审编号"
        show-overflow-tooltip
        width="70px"
      >
      </el-table-column>
    </el-table>

    <!-- 页面页数 -->
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
        datetime: [
          dayjs().subtract(6, "day").format("YYYY-MM-DD"),
          dayjs(new Date()).format("YYYY-MM-DD"),
        ],
        // username: null,
      },
      tableData: [],
      mypageable: {
        pageNum: 1, //当前页码
        pageSize: 50, //每页显示的条目数
      },
      total: 0, //总条目数
      selectData: {
        type: [],
        selectURL: [],
        laiyuan: "",
        machine_audit_status: null, // 机审状态
        first_audit_status: null, // 初审状态
        second_audit_status: null, // 复审状态
      },
    };
  },

  created() {
    this.getStatusOptions(); // 获取审核状态选项
    this.suoshudi2();
    this.techlist();
    console.log("jqsc");
  },

  computed: {
    totalPages() {
      return Math.ceil(this.total / this.mypageable.pageSize);
    },
  },
  methods: {
    async suoshudi2() {
      // this.loading = true;
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
    // 获取审核状态选项
    async getStatusOptions() {
      try {
        const { data: res } = await this.$http.get("/audit/status");
        console.log("API响应数据：", res); // 打印API响应数据，帮助调试

        // 确认res和res.datas是否存在，然后再分配数据
        if (res && res.code === 200 && Array.isArray(res.datas)) {
          // 将数据转换为需要的格式
          const formattedOptions = res.datas.map((item) => ({
            id: item.id,
            name: item.content,
          }));

          this.selectData.machine_audit_status = formattedOptions;
          this.selectData.first_audit_status = formattedOptions;
          this.selectData.second_audit_status = formattedOptions;
        } else {
          this.$message.error("获取审核状态选项失败：响应数据无效");
          console.error("无效的响应数据:", res); // 打印无效的响应数据
        }
      } catch (error) {
        this.$message.error("获取审核状态选项失败");
        console.error("请求失败:", error); // 打印请求失败的错误信息
      }
    },

    async techlist() {
      this.loading = true;
      let list = {
        start: this.form.datetime[0],
        end: this.form.datetime[1],
        source: this.form.laiyuan,
        url: this.form.url.trim(),
        machine_audit_status: this.form.machine_audit_status, // 机审状态
        first_audit_status: this.form.first_audit_status, // 初审状态
        second_audit_status: this.form.second_audit_status, // 复审状态
        page: this.mypageable.pageNum,
        page_size: this.mypageable.pageSize,
      };
      console.log("okk");
      const { data: res } = await this.$http.get("/audit/log", {
        params: list,
      });
      if (res.code == 200) {
        this.total = res.total;
        this.tableData = res.datas;
        this.loading = false;
      } else if (res.code === 204) {
        this.selectData = [];
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
      // 清空 url 输入框
      this.form.url = "";

      // 清空 来源 下拉框
      this.form.laiyuan = null;

      // 恢复原来的时间区间
      this.form.datetime = [
        dayjs().subtract(6, "day").format("YYYY-MM-DD"),
        dayjs(new Date()).format("YYYY-MM-DD"),
      ];

      (this.form.machine_audit_status = null),
        (this.form.first_audit_status = null),
        (this.form.second_audit_status = null),
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
    dataCreate_change(val) {
      if (val && val.length === 2) {
        this.form.start_time = val[0];
        this.form.end_time = val[1];
        this.techlist(); // 调用获取数据的方法
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
.form-inline {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.form-inline .el-form-item {
  margin-right: 10px;
  margin-bottom: 10px;
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
.custom-button {
  font-size: 16px; /* 调整文字大小 */
  padding: 10px 20px; /* 调整按钮大小 */
}
.pagination-container {
  display: flex;
  justify-content: center; /* 居中对齐内容 */
  align-items: center;
  padding: 20px 0;
}

.pagination-left {
  flex: 1;
}

.pagination-center {
  flex: 2;
  // text-align: center;
  margin-right: 100px;
}
.pagination-right {
  flex: 1;
  text-align: center;
}
.bottom-margin {
  margin-bottom: 10px; /* Adjust the margin as needed */
}
</style>
<!-- 两个按钮上下布局距离调整 -->