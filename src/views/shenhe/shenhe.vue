<template>
  <div class="right_main_under">
    <el-form size="mini" label-width="80px" :inline="true">
      <el-row :gutter="24">
        <el-col :span="24" v-if="!loading && form.boxes.length">
          <div class="grid-content boxes-container">
            <el-row :gutter="20">
              <el-col
                v-for="(box, index) in form.boxes"
                :key="index"
                class="box.wrapper"
                :span="4.8"
              >
                <div class="box">
                  <div class="box-item">
                    <span class="box-label">URL</span>
                    <el-input
                      v-model="box.url"
                      placeholder="URL"
                      :disabled="true"
                    ></el-input>
                  </div>
                  <div class="box-item images">
                    <el-image
                      :src="box.minio_url"
                      :preview-src-list="[box.minio_url]"
                      class="img1"
                      title="图片"
                    >
                      <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline" style="margin: 30%"
                          >无图片</i
                        >
                      </div>
                    </el-image>
                  </div>
                  <div class="box-item">
                    <span class="box-label">标题</span>
                    <el-input
                      v-model="box.title"
                      placeholder="title"
                      :disabled="true"
                    ></el-input>
                  </div>

                  <!-- <div class="box-item">
                    <span class="box-label">判定</span>
                    <el-select v-model="box.judgement" placeholder="类型">
                      <el-option label="是" value="是"></el-option>
                      <el-option label="否" value="否"></el-option>
                    </el-select>
                  </div> -->
                  <div class="box-item">
                    <span class="box-label">判定</span>
                    <el-radio-group
                      v-model="box.judgement"
                      style="display: flex; align-items: center"
                    >
                      <el-radio label="是">是</el-radio>
                      <el-radio label="否">否</el-radio>
                    </el-radio-group>
                    <el-input
                      v-model="box.new_title"
                      placeholder="输入新标题"
                      :disabled="box.judgement !== '是'"
                      style="width: 135px; margin-left: 5px"
                    ></el-input>
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
              <el-button
                @click="setAllToYes"
                type="batchAction"
                class="jump-button"
                >全部是</el-button
              >
              <el-button
                @click="setAllToNo"
                type="batchAction"
                class="jump-button"
                >全部否</el-button
              >
              <el-button
                @click="submitResults"
                type="primary"
                class="jump-button"
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
export default {
  data() {
    return {
      loading: true,
      form: {
        boxes: [],
      },
      mypageable: {
        pageNum: 1,
        pageSize: 30,
      },
      total: 0,
      jumpPage: 1,
      batchAction: null,
    };
  },

  created() {
    this.techlist();
  },
  computed: {
    totalPages() {
      return Math.ceil(this.total / this.mypageable.pageSize);
    },
  },
  methods: {
    async techlist() {
      this.loading = true;
      let params = {
        page: this.mypageable.pageNum,
        page_size: this.mypageable.pageSize,
      };
      try {
        //
        const { data: res } = await this.$http.get("/diaoyu/audit", { params });
        console.log("后端返回的数据：", res.datas); // 输出后端返回的全部数据
        if (res.code === 200) {
          this.form.boxes = res.datas.map((item) => ({
            url: item.url,
            minio_url: item.minio_url,
            judgement: "",
            title: item.title,
          }));
          this.total = res.total;
          // console.log("图片数据：", this.form.boxes); // 输出图片数据
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        this.loading = false;
      }
      // this.total = res.total;
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
    setAllToYes() {
      this.isAllYes = !this.isAllYes; // 切换状态
      this.isAllNo = false; // 点击“全部是”时，取消“全部否”状态
      if (this.isAllYes) {
        // 如果当前为“全部是”模式，设置所有项的判定为“是”
        this.form.boxes.forEach((box) => {
          box.judgement = "是";
        });
      } else {
        // 否则，清空所有项的判定
        this.form.boxes.forEach((box) => {
          box.judgement = "";
        });
      }
    },
    setAllToNo() {
      this.isAllNo = !this.isAllNo; // 切换状态
      this.isAllYes = false; // 点击“全部否”时，取消“全部是”状态
      if (this.isAllNo) {
        // 如果当前为“全部否”模式，设置所有项的判定为“否”
        this.form.boxes.forEach((box) => {
          box.judgement = "否";
        });
      } else {
        // 否则，清空所有项的判定
        this.form.boxes.forEach((box) => {
          box.judgement = "";
        });
      }
    },
    /* setAllToNo() {
      // this.form.boxes.forEach((box) => {
      //   box.judgement = "否";
      // });
      const allAreNo = this.form.boxes.every((box) => box.judgement === "否");

      if (allAreNo) {
        // 如果所有项已经是“否”，则清空所有判定
        this.form.boxes.forEach((box) => {
          box.judgement = "";
        });
      } else {
        // 否则，将所有项的判定设置为“否”
        this.form.boxes.forEach((box) => {
          box.judgement = "否";
        });
      }
    },
 */
    async submitResults() {
      /* try {
        const results = this.form.boxes.map((box) => ({
          url: box.url,
          res: box.judgement === "是" ? 1 : 0,
        }));
 */
      try {
        // 仅提交已作出判定的项
        const results = this.form.boxes
          .filter((box) => box.judgement !== "") // 仅筛选出已作出判定的项
          .map((box) => ({
            url: box.url,
            res: box.judgement === "是" ? 1 : 0, // 判定值为“是”时，res为1，否则为0
            title: box.title,
            new_title: box.new_title,
          }));
        const { data: res } = await axios.post("/diaoyu/audit/submit", results);
        if (res.code === 200) {
          this.$message.success("提交成功");
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
/* 盒子上传格式 */
.box {
  width: 300px;
  height: 300px;
  padding: 5px;
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
  // padding: 5px 5px;
  margin-right: 10px;
}

.box-item-image {
  width: 100px;
  height: 50px;
}
.box-wrapper {
  width: 20%;
  padding: 10px;
  box-sizing: border-box;
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