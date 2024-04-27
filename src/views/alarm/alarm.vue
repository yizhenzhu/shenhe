<template>
    <div class="right_main_under">
      <el-form size="mini" label-width="80px" :inline="true" >
        <el-row :gutter="20">
          <el-col :span="18"
            ><div class="grid-content bg-purple">   
              <el-form-item>
              <el-select
                v-model="form.username"
                placeholder="审核人员"
                clearable
                @clear="type_clearFun(form.username)"
              >
                <el-option
                  v-for="item in selectData.user"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>          
              <el-form-item>
                <el-date-picker
                    class="timerq"
                    v-model="datetime"
                    :clearable="false"
                    placeholder="请选择日期"
                    type="date"           
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-input v-model="form.name" placeholder="请输入域名"></el-input>
              </el-form-item>
              <!-- 流程记录页面头部模块——初审 -->
              <el-form-item>
                <el-select
                  v-model="form.shenhe"
                  placeholder="审核结果"
                  clearable
                  @clear="chushen_clearFun(form.shenhe)"
                >
                  <el-option
                    v-for="item in selectData.shenhe"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <!-- 流程记录页面头部模块——复审 -->
              </div
          ></el-col>
          <el-col :span="6"
            ><div class="grid-content bg-purple" style="float:right">
              <!-- 流程记录页面头部模块——button -->
              <el-button size="mini" type="primary" plain @click="chaxun"
                >查询</el-button
              >
              <!-- 导出 -->
              <el-button
                size="mini"
                type="success"
                plain
                @click="put"
                :loading="loadingbut"
                >{{ loadingbuttext }}</el-button
              >
            </div></el-col
          >
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
        <el-table-column prop="ID" label="序号" type="index" min-width="5%">
          <template slot-scope="scope"
            ><span v-text="getIndex(scope.$index)"></span
          ></template>
        </el-table-column>
        <el-table-column prop="CheckTime" label="审核日期" show-overflow-tooltip sortable min-width="15%">
          <template slot-scope="scope">
            {{ time(scope.row.CheckTime) }}
          </template>
        </el-table-column>
        <el-table-column prop="domainName" label="域名" show-overflow-tooltip min-width="15%">
        </el-table-column>
        <el-table-column prop="laiyuan" label="来源" min-width="8%"> 
          <template>
            <span>
              警情
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="city" label="城市" min-width="8%"> </el-table-column>
        <el-table-column prop="checkYesOrNo" label="处置状态" min-width="7%">
          <template slot-scope="scope">
            {{ time(scope.row.checkYesOrNo) }}
          </template>
        </el-table-column>
        <el-table-column prop="CheckResult" label="原因" min-width="15%">
          <template slot-scope="scope">
            {{ status(scope.row.CheckResult) }}
          </template>
        </el-table-column>
        <el-table-column prop="alarmTime" label="警情时间" show-overflow-tooltip sortable min-width="15%">
          <template slot-scope="scope">
            {{ time(scope.row.alarmTime) }}
          </template>
        </el-table-column>
        <!-- <el-table-column prop="url9" label="备注"> </el-table-column> -->
      </el-table>
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
  import dayjs from "dayjs";
  export default {
    data() {
      return {
        form: {
          name: null,
          shenhe: null,
          chuzhi: null,
          chengshi:null,
          datetime:[
            // dayjs(new Date()).format("YYYY-MM-DD") ,dayjs(new Date()).format("YYYY-MM-DD")
          ],
          username: null,
        },
        whiteSearchList: {
          startCreateTime:dayjs(new Date()).format("YYYY-MM-DD") ,
          endCreateTime: dayjs(new Date()).format("YYYY-MM-DD")
        },
        tableData: [
          // {
          //   url: "www.baid.com",
          //   url1: "发财网",
          //   url2: "诈骗",
          //   url3: "2021-11-11",
          //   url4: "xxx.xx.xx.xx",
          //   url5: "sd",
          //   url6: "境外",
          //   url7: "无",
          //   url8: "200",
          //   url9: "1",
          // },
        ],
        mypageable: {
          pageNum: 1,
          pageSize: 50,
        },
        total: 1,
        totalPages: "",
        selectData: {
          user: [],
          chengshi: [
            {
              value: "1",
              label: "城市1",
            },
            {
              value: "2",
              label: "城市2",
            },
            {
              value: "3",
              label: "城市3",
            },
          ],
          shenhe: [
            {
              value: "1",
              label: "待审核",
            },
            {
              value: "2",
              label: "审核中",
            },
            {
              value: "3",
              label: "已审核",
            },
          ],
          chuzhi: [
            {
              value: "1",
              label: "是",
            },
            {
              value: "2",
              label: "否",
            },
          ],
        },
        loadingbuttext: "导出",
        loadingbut: false,
      };
    },
    created() {
    //   this.form.username=JSON.parse(window.sessionStorage.getItem('one'))
    //   this.techlist();
    },
    methods: {
      //初始化列表
      async techlist() {
        let list = {
          againCheckResult: this.form.chuzhi,
          myPage: {
            pageNum: this.mypageable.pageNum,
            pageSize: this.mypageable.pageSize,
          },
          startCheckResult: this.form.shenhe,
          url: this.form.name,
          checkPerson: this.form.username,
          checkDateStart: this.whiteSearchList.startCreateTime,
          checkDateEnd: this.whiteSearchList.endCreateTime,
        };
        const { data: res } = await this.$http.post("/process/findAll", list);
        if (res.code == 200) {
          // console.log(res.data);
          this.tableData = res.data.list;
          this.total = res.data.total;
        }
      },
      chaxun() {
        this.techlist();
      },
      chongzhi() {
        this.form.chuzhi = null;
        this.mypageable.pageNum = 1;
        this.mypageable.pageSize = 50;
        this.form.shenhe = null;
        this.form.username = null;
        this.whiteSearchList.startCreateTime = dayjs(new Date()).format("YYYY-MM-DD");
        this.whiteSearchList.endCreateTime = dayjs(new Date()).format("YYYY-MM-DD");
        this.form.datetime=[
            dayjs(new Date()).format("YYYY-MM-DD") ,dayjs(new Date()).format("YYYY-MM-DD")
          ],
           this.form.username=JSON.parse(window.sessionStorage.getItem('one'))
        this.techlist();
      },
      //精确导出
  
      async put() {
        this.loadingbuttext = "...加载中";
        this.loadingbut = true;
        let list = {
          againCheckResult: this.form.chuzhi,
          myPage: {
            pageNum: this.mypageable.pageNum,
            pageSize: this.mypageable.pageSize,
          },
          startCheckResult: this.form.shenhe,
          url: this.form.name,
        };
  
        const { data: res } = await this.$http.post(
          "/process/exportCheckInfoList",
          list
        );
        if (res.code == 200) {
          this.loadingbuttext = "导出";
          this.loadingbut = false;
          // console.log(res.data);
          let newurl = res.data.url;
          let eleLink = document.createElement("a");
          eleLink.download = name;
          // const down = window.location.origin
          // eleLink.href = "http://172.31.1.61:8080" + newurl;
          // const down = window.location.origin
          eleLink.href = newurl;
          // console.log(eleLink);
          eleLink.click();
          eleLink.remove();
          this.$message(res.message);
        } else {
          this.$message(res.message);
        }
      },
  
      getIndex($index) {
        //$index为数据下标,对英序号要加一
        // console.log($index)
        return (
          (this.mypageable.pageNum - 1) * this.mypageable.pageSize + $index + 1
        );
      },
      type_clearFun(val) {
        if (val == "") {
          this.form.username = null;
        }
      },
      chushen_clearFun(val) {
        if (val == "") {
          this.form.shenhe = null;
        }
      },
      fushen_clearFun(val) {
        if (val == "") {
          this.form.chuzhi = null;
        }
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
    //  margin: 20px 0 0 20px;
    //  box-sizing: border-box;
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
    min-height: 36px;
  }
  /deep/ .el-input--mini .el-input__inner {
    width: 210px;
  }
  /deep/ .el-form-item:first-child {
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
  .timerq{
    width: 10%;
  }
  </style>