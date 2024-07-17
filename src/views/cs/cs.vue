<template>
  <div class="right_main_under">
    <el-form size="mini" label-width="80px" :inline="true">
      <el-row :gutter="24">
        <el-col :span="18">
          <div class="grid-content bg-purple">
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
              <el-select v-model="form.laiyuan" placeholder="来源" clearable
                ><!-- @clear="chushen_clearFun(form.laiyuan)" -->
                <el-option
                  v-for="item in selectData.laiyuan"
                  :key="item.id"
                  :label="`${item.name} ${item.count || 0}`"
                  :value="item.id"
                  ><!-- :label="item.name" -->
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <!-- 流程记录页面头部模块——button -->
            <el-button
              size="mini"
              type="primary"
              plain
              @click="chaxun"
              class="custom-button"
              >查询
            </el-button>
          </div>
        </el-col>
        <!-- 八个小盒子 -->
        <el-col :span="24"  v-if="!loading && form.boxes.length">
          <div class="grid-content boxes-container">
            <el-row :gutter="20">
              <el-col v-for="(box, index) in form.boxes" :key="index" :span="5">
                <div class="box">
                  <div class="box-item">
                    <span class="box-label">URL</span>
                    <el-input v-model="box.url" placeholder="URL" :disabled="true"></el-input>
                  </div>
                  <div class="box-item">
                    <span class="box-label">类型</span
                    ><!--:disabled="true"  -->
                    <el-input v-model="box.label" placeholder="类型" :disabled="true"></el-input>
                  </div>
                  <div class="box-item images">
                    <el-image
                    :src="box.minio_url"
                    :preview-src-list="[box.minio_url]"
                    class="img1"
                    title="图片"
                    >
                      <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline" style="margin: 30%">无图片</i>
                      </div>
                    </el-image>
                  </div>
                  <div class="box-item">
                    <span class="box-label">判定</span>
                    <el-select v-model="box.judgement" placeholder="类型">
                      <el-option
                        v-for="option in selectData.judgementOptions"
                        :key="option"
                        :label="option"
                        :value="option"
                      ></el-option>
                    </el-select>
                  </div>

                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
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
            <div class="pagination-right">
              <el-button @click="submitResults" type="primary" class="jump-button"
                >提交</el-button
              >
            </div>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
  
  <script>
import axios from "axios";
import dayjs from "dayjs";
export default {
  data() {
    return {
      loading: true,
      form: {
        laiyuan: null, // laiyuan
        datetime: [
          dayjs().subtract(1, "week").format("YYYY-MM-DD"),
          dayjs(new Date()).format("YYYY-MM-DD"),
        ],
        boxes: Array(8)
          .fill()
          .map(() => ({
            url: "",
            label: "",
            minio_url: "",
            judgement: "",
          })),
      },
      whiteSearchList: {
        startCreateTime: dayjs().subtract(1, "week").format("YYYY-MM-DD"),
        endCreateTime: dayjs(new Date()).format("YYYY-MM-DD"),
      },
      tableData: [],
      mypageable: {
        pageNum: 1,
        pageSize: 8,
      },
      total: 0,
      selectData: {
        laiyuan: [
          {
            id: "深圳",
            name: "深圳",
          },
        ],
        judgementOptions: [],
      },
      jumpPage: 1,
    };
  },

  created() {
    // redirect('audit');
    this.suoshudi2();
    this.getLaiyuanCount();
    this.getJudgementOptions();
    console.log('cs');
  },
  computed: {
    totalPages() {
      return Math.ceil(this.total / this.mypageable.pageSize);
    },
  },
  methods: {
    // 获取来源数量并更新来源数据
    async getLaiyuanCount() {
      try {
        const { data: res } = await axios.get("/audit/first/count");
        if (res.code === 200) {
          this.selectData.laiyuan = res.datas.map((item) => ({
            id: item.source,
            name: item.source,
            count: item.count,
            start: this.form.datetime[0],
            end: this.form.datetime[1],
            page: this.mypageable.pageNum,
            page_size: this.mypageable.pageSize,
          }));
        }
      } catch (error) {
        console.error("Error fetching count data:", error);
      }
    },
    //来源下拉框
    async suoshudi2() {
      this.loading = true;
      const { data: res } = await axios.get("/audit/first"); // 请根据实际 API 替换 promise1
      if (res.code === 200) {
        this.selectData.laiyuan = res.data;
      }
      this.getLaiyuanCount(); // 获取数量
      this.techlist();
    },
    // 获取判定选项数据
    async getJudgementOptions() {
      try {
        const { data: res } = await axios.get("/audit/type");
        if (res.code === 200) {
          this.selectData.judgementOptions = res.datas;
        }
      } catch (error) {
        console.error("Error fetching judgement options:", error);
      }
    },
    async techlist() {
      this.loading = true;
      let params = {
        start: this.form.datetime[0],
        end: this.form.datetime[1],
        page: this.mypageable.pageNum,
        page_size: this.mypageable.pageSize,
        source: this.form.laiyuan,
      };
      console.log('first');
      try {
        const { data: res } = await this.$http.get("/audit/first", { params });
        // console.log("后端返回的数据：", res); // 输出后端返回的全部数据
        if (res.code === 200) {
          this.form.boxes = res.datas.map((item) => ({
            url: item.url,
            label: item.label,
            minio_url: item.minio_url,
            judgement: "",
          }));
          this.total = res.total;
          // console.log("图片数据：", this.form.boxes); // 输出图片数据
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        this.loading = false;
      };
      // this.total = res.total;
    },
    // console.log("...params", list);
    chaxun() {
      this.mypageable.pageNum = 1;
      this.techlist();
    },
    getIndex($index) {
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
        this.whiteSearchList.startCreateTime = val[0];
        this.whiteSearchList.endCreateTime = val[1];
        this.techlist(); // 调用获取数据的方法
      }
    },
    async submitResults() {
      try {
        const results = this.form.boxes.map(box => ({
          url: box.url,
          // box.minio_url,
          confirmed_label: box.judgement,
        }));
        
        const { data: res } = await axios.post("/audit/first/result", results);
        /* {
          params: results
        } */
        if (res.code === 200) {
          this.$message.success("提交成功");
            // 清除当前表单数据
          // this.form.boxes = this.form.boxes.map(() => ({
          //   url: "",
          //   label: "",
          //   minio_url: "",
          //   judgement: "",
          // }));

        // 重新加载数据
        this.techlist();
        } else {
          this.$message.error("提交失败");
        }
      } catch (error) {
        console.error("Error submitting results:", error);
        this.$message.error("提交失败");
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
.img1 {
  width: 130px; /* 设置图片最大宽度 */
 height: 130px; /* 设置图片最大高度 */
  display: block; /* 设置为块级元素，使其可以水平居中 */
  margin: 0 auto; /* 设置左右边距为 auto，实现水平居中 */
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
/* 盒子上传格式 */
.box {
  width: 300px;
  height:300px;
  padding: 10px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  box-sizing: border-box;
  margin-top: 10px;
}

.box-item {
  display: flex;
  align-items: center;
  // color: #000000;
  margin-bottom: 10px;
}

.box-label {
  width: 60px;
  text-align: right;
  // background-color: #000;
  margin-right: 10px;
}

.box-item-image {
  width: 100px;
  height: 50px;
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
.pagination-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
}

.pagination-left {
  flex: 1;
}

.pagination-center {
  flex: 2;
  text-align: center;
}

.pagination-right {
  flex: 1;
  text-align: center;
}

.jump-input {
  width: 80px;
}

.jump-button {
  margin-left: 5px;
  // padding:3%
}
</style>