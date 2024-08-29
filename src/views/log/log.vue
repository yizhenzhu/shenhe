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
        selectURL: null,
        datetime: [
          dayjs().subtract(1, "week").format("YYYY-MM-DD"),
          dayjs(new Date()).format("YYYY-MM-DD"),
        ],
        // username: null,
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
      total: 1, //总条目数
      totalPages: "",
      selectData: {
        type: [],
        selectURL: [],
        laiyuan: "",
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
    //来源下拉框
    /*  async suoshudi2() {
      this.loading = true;
      const { data: res } = await promise1;
      if (res.code === 200) {
        this.selectData.laiyuan = res.data;
      }
      this.techlist();
    }, */
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

    async techlist() {
      this.loading = true;
      let list = {
        page: this.mypageable.pageNum,
        page_size: this.mypageable.pageSize,
        url: this.form.url,
        source: this.form.laiyuan,
        start: this.form.datetime[0],
        end: this.form.datetime[1],
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
      } else {
        this.$message(res.message);
        this.loading = false;
      }
    },
    mounted() {
      this.techlist(); // 组件挂载时获取初始数据
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
.bottom {
  width: 100%;
  height: 3.75rem /* 60/16 */ /* 40/16 */;
  .ss {
    float: right;
  }
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