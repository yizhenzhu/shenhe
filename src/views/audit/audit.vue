<template>
    <div class="right_main_under">
      <el-form size="mini" label-width="80px" :inline="true">
        <el-row :gutter="20">
            <el-col :span="18">
                <div class="grid-content bg-purple">
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
                </el-form-item>
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
        loading: false,
        form: {
          url: "", // url
          domain: null,
          laiyuan: null, // laiyuan
          selectURL: null,
          datetime: [
            dayjs().subtract(1, "week").format("YYYY-MM-DD"),
            dayjs(new Date()).format("YYYY-MM-DD"),
          ],
          username: null,
        },
        whiteSearchList: {
          startCreateTime: dayjs().subtract(1, "week").format("YYYY-MM-DD"),
          endCreateTime: dayjs(new Date()).format("YYYY-MM-DD"),
        },
        tableData: [],
        mypageable: {
          pageNum: 1,
          pageSize: 50,
        },
        total: 1,
        totalPages: "",
        selectData: {
          type: [],
          selectURL: [],
          laiyuan: [
            {
              id: "深圳",
              name: "深圳",
            },
          ],  
        },
      };
    },
  
    created() {
      this.suoshudi2();
    },
    methods: {
      //来源下拉框
      async suoshudi2() {
        this.loading = true;
        const { data: res } = await promise1;
        if (res.code === 200) {
          this.selectData.laiyuan = res.data;
        }
        this.techlist();
      },
      
      async techlist() {
        this.loading = true;
        let list = {
          url: this.form.url,
          label: this.form.label,
          // source: this.form.selectURL,
          source: this.form.laiyuan,
          upload_method:this.form.schuan,
  
          // treatStatus: this.form.chuzhi,
        };
        // console.log("...params", list);
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
        this.mypageable.pageSize = val;
        this.techlist();
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
      status(val) {
        if (val == "1") {
          return "是";
        } else if (val == "2") {
          return "否";
        } else if (val == "3") {
          return "不确定";
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

  </style>