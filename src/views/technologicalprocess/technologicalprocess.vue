<template>
  <div class="right_main_under">
    <el-form size="mini" label-width="80px" :inline="true" >
      <el-row :gutter="20">
        <el-col :span="18"
          ><div class="grid-content bg-purple">
            <el-form-item>
              <el-select
                v-model="form.username"
                placeholder="请选择登录人"
                :clearable="false"
                @clear="type_clearFun(form.username)"
              >
                <el-option
                  v-for="item in selectData.type"
                  :key="item.id"
                  :label="item.username"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-date-picker
                v-model="form.datetime"
                type="daterange"
                :change="dataCreate_change(form.datetime)"
                :clearable="false"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
            <!-- 流程记录页面头部模块——域名 -->
            <el-form-item>
              <el-input v-model="form.name" placeholder="请输入域名"></el-input>
            </el-form-item>
            <el-form-item>
              <el-select
                v-model="form.chengshi"
                placeholder="城市"
                clearable
                @clear="chengshi_clearFun(form.chengshi)"
              >
                <el-option
                  v-for="item in selectData.chengshi"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <!-- 流程记录页面头部模块——初审 -->
            <el-form-item>
              <el-select
                v-model="form.chushen"
                placeholder="请选择初审结果"
                clearable
                @clear="chushen_clearFun(form.chushen)"
              >
                <el-option
                  v-for="item in selectData.chushen"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <!-- 流程记录页面头部模块——复审 -->
            <el-form-item>
              <el-select
                v-model="form.fushen"
                placeholder="请选择复审结果"
                clearable
                @clear="fushen_clearFun(form.fushen)"
              >
                <el-option
                  v-for="item in selectData.fushen"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <!-- 流程记录页面头部模块——终审 -->
            <el-form-item>
              <el-select
                v-model="form.zhongshen"
                placeholder="请选择终审结果"
                clearable
                @clear="zhongshen_clearFun(form.zhongshen)"
              >
                <el-option
                  v-for="item in selectData.zhongshen"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <!-- 新增城市框 -->
            </div
        ></el-col>
        <el-col :span="6"
          ><div class="grid-content bg-purple" style="float:right">
            <!-- 流程记录页面头部模块——button -->
            <el-button size="mini" type="primary" plain @click="chaxun"
              >查询</el-button
            >
            <el-button size="mini" type="success" plain @click="chongzhi"
              >重置</el-button
            >
            <!-- 导出 -->
            <el-button
              size="mini"
              type="info"
              plain
              @click="put"
              :loading="loadingbut"
              >{{ loadingbuttext }}</el-button
            >
          </div></el-col
        >
      </el-row>
    </el-form>
    <!-- <div style="max-width: 100%;overflow-y: auto;"> -->
      <!-- 流程记录页面模块——列表 -->
    <el-table
      border
      ref="multipleTable"
      :data="tableData"
      style="width: 100%"
      max-height="535px"
      size="mini"
      class="tableStyle"
      empty-text="暂无数据"
      v-loading = "loading"
    >
      <el-table-column prop="id" label="序号" type="index" min-width="5%">
        <template slot-scope="scope"
          ><span v-text="getIndex(scope.$index)"></span
        ></template>
      </el-table-column>
      <el-table-column prop="url" label="URL" show-overflow-tooltip min-width="15%">
      </el-table-column>
      <el-table-column prop="firstAuditUser" label="初审人" min-width="5%" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="firstAuditTime" label="初审时间" show-overflow-tooltip sortable min-width="15%">
        <template slot-scope="scope">
          {{ scope.row.firstAuditTime }}
        </template>
      </el-table-column>
      <el-table-column prop="firstAuditResult" label="初审结果" min-width="5%">
        <template slot-scope="scope">
          {{ scope.row.firstAuditResult }}
        </template>
      </el-table-column>
      <el-table-column prop="secondAuditUser" label="复审人" min-width="5%" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="secondAuditTime" label="复审时间" show-overflow-tooltip sortable min-width="15%">
        <template slot-scope="scope">
          {{ scope.row.secondAuditTime }}
        </template>
      </el-table-column>
      <el-table-column prop="secondAuditResult" label="复审结果" min-width="5%">
        <template slot-scope="scope">
          {{ scope.row.secondAuditResult }}
        </template>
      </el-table-column>

      <el-table-column prop="thirdAuditUser" label="终审人" min-width="5%" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="thirdAuditTime" label="终审时间" show-overflow-tooltip sortable min-width="15%">
        <template slot-scope="scope">
          {{ scope.row.thirdAuditTime }}
        </template>
      </el-table-column>
      <el-table-column prop="thirdAuditResult" label="终审结果" min-width="10%">
        <template slot-scope="scope">
          {{ scope.row.thirdAuditResult }}
        </template>
      </el-table-column>
      <!-- <el-table-column prop="url9" label="备注"> </el-table-column> -->
    </el-table>
    <!-- </div> -->
    
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
        loading:false,
        name: null,
        chushen: null,
        fushen: null,
        chengshi:null,
        zhongshen: null,
        // datetime: null,
        datetime:[
          dayjs(new Date()).format("YYYY-MM-DD") ,dayjs(new Date()).format("YYYY-MM-DD")
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
        type: [],
        chengshi: [],
        chushen: [
          {
            value: "1",
            label: "是",
          },
          {
            value: "2",
            label: "否",
          },
          {
            value: "3",
            label: "不确定",
          },
        ],
        fushen: [
          {
            value: "1",
            label: "是",
          },
          {
            value: "2",
            label: "否",
          },
          {
            value: "3",
            label: "不确定",
          },
        ],
        zhongshen: [
          {
            value: "1",
            label: "是",
          },
          {
            value: "2",
            label: "否",
          },
          {
            value: "3",
            label: "不确定",
          },
        ],
      },
      loadingbuttext: "导出",
      loadingbut: false,
      tempUser:null,
      tempCity:null
    };
  },
  created() {
    // this.form.username=JSON.parse(window.sessionStorage.getItem('one'))
    // this.techlist();
    // this.userlist();
    this.getUserAndCity()
  },
  methods: {
    async getUserAndCity() {
      this.loading = true
      const promise1 =  this.$http.get("/dictionary/datasource");
      const promise2 =  this.$http.get("/user/list")
      const [sourceData,userData] = await Promise.all([promise1,promise2])
      if(sourceData.data.code === 200 && userData.data.code === 200){
        // if(userData.data.data.length !== 0){
        //   this.newdomainSimpleVo.shezhaType = userData.data.data[0]
        // }
        // console.log(sourceData.data.data);
        // console.log(userData.data.dataList);
        this.selectData.chengshi = sourceData.data.data
        this.selectData.type = userData.data.dataList
        console.log(this.selectData.chengshi);
        for(let i in this.selectData.chengshi){
          if(this.selectData.chengshi[i].name==="上海"){
            this.form.chengshi = this.selectData.chengshi[i].id
            this.tempCity = this.selectData.chengshi[i].id
            break
          }else{
            this.form.chengshi = this.selectData.chengshi[0].id
            this.tempCity = this.selectData.chengshi[i].id
          }
        }
        const curUser = sessionStorage.getItem('one')
        // console.log(curUser);
        this.selectData.type.forEach(item => {
          // console.log(`"${item.username}"`);
          if(`"${item.username}"` == curUser){
            this.form.username = item.id
            this.tempUser = item.id
          }
        });
        // this.form.username = this.selectData.type[0].id
      }
      // this.xq()
      this.techlist()
    },
    async userlist() {
      const { data: res } = await this.$http.get("/user/findAllUserName");
      if (res.code == 200) {
   
        this.selectData.type = res.data.map((item) => {
          return {
            value: item,
            label: item,
          };
        });
        // console.log(   this.selectData.type);
      }
    },
    chooseType(val){
      if(val==1){
        return "YES"
      }else if(val==2){
        return "NO"
      }else if(val==3){
        return "NOT_SURE"
      }
    },
    //初始化列表
    async techlist() {
      // console.log(this.form.username);
      this.loading = true
      let list
      if(this.form.chengshi){
        list = {
          firstAuditResult:this.chooseType(this.form.chushen),
          secondAuditResult:this.chooseType(this.form.fushen),
          thirdAuditResult: this.chooseType(this.form.zhongshen),
          page: this.mypageable.pageNum,
          pageSize: this.mypageable.pageSize,        
          url: this.form.name,
          userId: this.form.username,
          source: this.form.chengshi,
          start: this.whiteSearchList.startCreateTime,
          end: this.whiteSearchList.endCreateTime,
        };
      }else{
        list = {
          firstAuditResult:this.chooseType(this.form.chushen),
          secondAuditResult:this.chooseType(this.form.fushen),
          thirdAuditResult: this.chooseType(this.form.zhongshen),
          page: this.mypageable.pageNum,
          pageSize: this.mypageable.pageSize,        
          url: this.form.name,
          userId: this.form.username,
          // source: this.form.chengshi.id ,
          start: this.whiteSearchList.startCreateTime,
          end: this.whiteSearchList.endCreateTime,
        };
      }
      
      const { data: res } = await this.$http.get("/auditLogs/list",{params:list} );
      if (res.code == 200) {
        // console.log(res.data);
        this.tableData = res.dataList;
        this.total = res.totalSum;
        this.loading = false
      }else{
        this.$message(res.message)
        this.loading = false
      }
    },
    chaxun() {
      this.mypageable.pageNum = 1;
      this.techlist();
    },
    chongzhi() {
      this.form.username = this.tempUser
      this.form.fushen = null;
      this.form.zhongshen = null;
      this.form.chengshi = this.tempCity
      this.form.name = null
      this.mypageable.pageNum = 1;
      this.mypageable.pageSize = 50;
      this.form.chushen = null;
      this.whiteSearchList.startCreateTime = dayjs(new Date()).format("YYYY-MM-DD");
      this.whiteSearchList.endCreateTime = dayjs(new Date()).format("YYYY-MM-DD");
      this.form.datetime=[
          dayjs(new Date()).format("YYYY-MM-DD") ,dayjs(new Date()).format("YYYY-MM-DD")
        ],
        //  this.form.username=JSON.parse(window.sessionStorage.getItem('one'))
      this.techlist();
    },
    //精确导出

    async put() {
      this.loadingbuttext = "...加载中";
      this.loadingbut = true;
      let list 
      if(this.form.chengshi){
        list = {
          firstAuditResult:this.chooseType(this.form.chushen),
          secondAuditResult:this.chooseType(this.form.fushen),
          thirdAuditResult: this.chooseType(this.form.zhongshen),
          page: this.mypageable.pageNum,
          pageSize: this.mypageable.pageSize,        
          url: this.form.name,
          userId: this.form.username,
          source: this.form.chengshi,
          start: this.whiteSearchList.startCreateTime,
          end: this.whiteSearchList.endCreateTime,
        };
      }else{
        list = {
          firstAuditResult:this.chooseType(this.form.chushen),
          secondAuditResult:this.chooseType(this.form.fushen),
          thirdAuditResult: this.chooseType(this.form.zhongshen),
          page: this.mypageable.pageNum,
          pageSize: this.mypageable.pageSize,        
          url: this.form.name,
          userId: this.form.username,
          // source: this.form.chengshi.id,
          start: this.whiteSearchList.startCreateTime,
          end: this.whiteSearchList.endCreateTime,
        };
      }
      if(this.tableData.length==0){
        this.$message("当前数据为空，无法导出！")
        this.loadingbuttext = "导出";
        this.loadingbut = false;
        return false
      }
      const res = await this.$http({
        methods:'get',
        url:'/auditLogs/export',
        responseType: "blob",
        params:list
      });
      if (res) {
        this.loadingbuttext = "导出";
        this.loadingbut = false;
        // // console.log(res.data);
        // let newurl = res.data.url;
        // let eleLink = document.createElement("a");
        // eleLink.download = name;
        // // const down = window.location.origin
        // // eleLink.href = "http://172.31.1.61:8080" + newurl;
        // // const down = window.location.origin
        // eleLink.href = newurl;
        // // console.log(eleLink);
        let binaryData = [];
        binaryData.push(res.data);
        var _url=window.URL.createObjectURL(new Blob(binaryData, {type: "application/vnd.ms-excel"}))
        const a = document.createElement("a");
        // a.download = name;
        a.href = _url
        a.setAttribute('download', decodeURI(res.headers['content-disposition'].split('=')[1]));
        document.body.appendChild(a);
        a.click()
        a.remove()
        this.$message('导出成功');
      } else {
        this.$message('导出失败');
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
    chengshi_clearFun(val){
      if (val == "") {
        this.form.chengshi = null;
      }
    },
    chushen_clearFun(val) {
      if (val == "") {
        this.form.chushen = null;
      }
    },
    fushen_clearFun(val) {
      if (val == "") {
        this.form.fushen = null;
      }
    },
    zhongshen_clearFun(val) {
      if (val == "") {
        this.form.zhongshen = null;
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
      console.log(val);
      // if (val == null||val=="Invalid Date"||val == " ") {
      //   return " ";
      // } else {
        return dayjs(val).format("YYYY-MM-DD  HH:mm:ss");
      // }
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
</style>