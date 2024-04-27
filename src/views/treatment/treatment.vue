<template>
  <div class="right_main_under">
    <el-form size="mini" label-width="80px" :inline="true">
      <el-row :gutter="20">
        <el-col :span="20"
          ><div class="grid-content bg-purple">
            <!-- 流程记录页面头部模块——域名 -->
            <el-form-item>
              <el-select
                v-model="form.name"
                placeholder="城市"
                  clearable
                @clear="fushencity_clearFun(form.name)"
              >
                <el-option
                  v-for="(item, index) in selectDatacity.fushen"
                  :label="item.name"
                  :value="item.id"
                  :key="index"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <!-- 涉诈类型 -->
            <el-form-item>
              <el-select
                v-model="form.shezhaType"
                placeholder="涉诈类型"
                
                clearable
                @clear="chushen_clearFun(form.shezhaType)"
              >
                <el-option
                  v-for="item in selectData.shezhaType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <!-- 城市 -->
            <!-- <el-form-item>
              <el-select
                v-model="form.fushen"
                placeholder="城市"
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
            </el-form-item> -->
            <el-form-item>
              <el-select
                v-model="form.http"
                placeholder="协议类型"
                clearable
                @clear="fushen_clearFun(form.http)"
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
            <!-- 处置时间 -->
            <el-form-item>
              <el-date-picker
                v-model="form.dateValue_find"
                type="daterange"
                :change="dataCreate_change(form.dateValue_find)"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                
                :clearable="false"
              >
              <!-- value-format="yyyy-MM-dd HH:mm:ss"
                :default-time="['00:00:00', '23:59:59']" 之前的-->
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-input v-model="form.url" placeholder="请输入域名"></el-input>
            </el-form-item></div
        ></el-col>
        <el-col :span="4"
          ><div class="grid-content bg-purple" style="float: right;">
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
            <!-- <el-button size="mini" type="success" plain @click="uploadwj"
              >上传</el-button
            > -->
          </div></el-col
        >
      </el-row>
    </el-form>

    <!-- 流程记录页面模块——列表 -->
    <el-table
      border
      v-loading="loading"
      ref="multipleTable"
      :data="tableData"
      style="width: 100%"
      max-height="550px"
      size="mini"
      class="tableStyle"
      empty-text="暂无数据"
    >
      <el-table-column prop="id" label="序号" type="index">
        <template slot-scope="scope"
          ><span v-text="getIndex(scope.$index)"></span
        ></template>
      </el-table-column>
      <el-table-column prop="createTime" label="处置时间" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ time(scope.row.createTime) }}
        </template>
      </el-table-column>
      <el-table-column prop="title" label="网址标题" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="url" label="URL" show-overflow-tooltip>
      </el-table-column>
      <!-- <el-table-column prop="urlHash" label="URL哈希值" show-overflow-tooltip>
      </el-table-column> -->
      <el-table-column prop="reason" label="yjc类别" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="ip" label="网址对应IP" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="domesticOverseas"
        label="境内外"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          {{ scope.row.domesticOverseas }}
        </template>
      </el-table-column>
      <el-table-column prop="rank" label="排名" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.rank == -1 ? "无排名" : scope.row.rank }}
        </template>
      </el-table-column>

      <el-table-column prop="snapshot" label="截图名称" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="yjcType"
        label="yjc协议类型"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column prop="visits" label="访问量" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="source" label="数据归属地" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="fraudType" label="涉诈类型" show-overflow-tooltip>
      </el-table-column>

      <!-- <el-table-column prop="url9" label="备注"> </el-table-column> -->
    </el-table>
    <div class="bottom">
      <div class="ss">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="mypageable.pageNum"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="mypageable.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          class="pagePagination pageRight"
        >
        </el-pagination>
      </div>
    </div>

    <!-- 上传 -->
    <el-dialog
      :close-on-click-modal="false"
      title="文件上传"
      :visible.sync="shangchuan"
      width="20%"
      height="40%"
      :before-close="shangchuanclose"
      class="dialogInfo"
    >
      <div style="width: 100%">
        <el-upload
          ref="upload"
          class="upload-demo"
          accept=".xlsx"
          action="/treatment/uploadExcel"
          :before-remove="beforeRemove"
          :on-success="successSendFile"
          :on-exceed="handleExceed"
          multiple
          :limit="3"
        >
          <el-button size="mini" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">上传文件</div>
        </el-upload>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="shangchuan = false" size="mini"
          >取 消</el-button
        >
        <!-- <el-button type="primary" @click="wenjianshangchaun" size="mini"
          >确 定</el-button
        > -->
      </span>
    </el-dialog>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  data() {
    return {
      loading:false,
      selectDatacity: {
        fushen: [],
      },
      shangchuan: false,
      whiteSearchList: {
        startCreateTime:  dayjs().subtract(1, 'week').format("YYYY-MM-DD"),
        endCreateTime: dayjs(new Date()).format("YYYY-MM-DD"),
      },
      form: {
        name: null,
        shezhaType: null,
        fushen: null,
        zhongshen: null,
        dateValue_find:[
          dayjs().subtract(1, 'week').format("YYYY-MM-DD") ,dayjs(new Date()).format("YYYY-MM-DD")
        ],
        http: null,
        url: null,
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
        pageSize: 10,
      },
      total: 1,
      totalPages: "",
      selectData: {
        shezhaType: [
        
        ],
        fushen: [
        { value:1, label:'1'},
          { value:2, label:'2'},
          { value:3, label:'3'},
        ],
        zhongshen: [
          // {
          //   value: "1",
          //   label: "是",
          // },
          // {
          //   value: "2",
          //   label: "否",
          // },
          // {
          //   value: "3",
          //   label: "不确定",
          // },
        ],
      },
      loadingbuttext: "导出",
      loadingbut: false,
    };
  },
  created() {
    // this.suoshudi();
    // this.techlist();
    this.getSelectionData()
  },
  methods: {
    async getSelectionData(){
      this.loading = true
      const promise1 =  this.$http.get("/dictionary/datasource");
      const promise2 =  this.$http.get("/dictionary/fraudType")
      const [sourceData,fraudData] = await Promise.all([promise1,promise2])
      if(sourceData.data.code === 200 && fraudData.data.code === 200){
        // if(userData.data.data.length !== 0){
        //   this.newdomainSimpleVo.shezhaType = userData.data.data[0]
        // }
        // console.log(sourceData.data.data);
        // console.log(userData.data.dataList);
        this.selectDatacity.fushen = sourceData.data.data
        this.selectData.shezhaType = fraudData.data.data
        // console.log(this.selectDatacity.fushen);
        // console.log(this.selectData.fushen);
        // for(let i in this.selectData.chengshi){
        //   if(this.selectData.chengshi[i].name==="上海"){
        //     this.form.chengshi = this.selectData.chengshi[i]
        //     break
        //   }else{
        //     this.form.chengshi = this.selectData.chengshi[0]
        //   }
        // }
        // this.form.username = this.selectData.type[0]
      }
      this.techlist()
    },
    //初始化列表
    async techlist() {
      // let bigFraudTypesStr = this.form.shezhaType.join(',')
      // // 字符串为空的情况下，请求体会带此字段。 将其转为其他类型，请求体默认不带此字段
      // if(bigFraudTypesStr.length==0){
      //   bigFraudTypesStr = []
      // }
      this.loading = true
      let list = {
        page: this.mypageable.pageNum,
        pageSize: this.mypageable.pageSize,

        start: this.whiteSearchList.startCreateTime,
        end: this.whiteSearchList.endCreateTime,
        fraudType: this.form.shezhaType,
        source: this.form.name,
        yjcType: this.form.http,
        url: this.form.url,
      };
      const { data: res } = await this.$http.get(
        "/treat/list",
        {params:list}
      );
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
    async suoshudi() {
      const { data: res } = await this.$http.get("/check/sourcesGroup");
      if (res.code == 200) {
        // console.log(  res.data);
        // this.selectDatacity.fushen = res.data;
        // this.selectDatacity.fushen=
        let reslist=[]
        for (const key in res.data) {
      reslist.push(res.data[key])
        }
            this.selectDatacity.fushen =reslist.map((item) => {
          return {
            value: item.mapName,
            label: item.mapName,
          };
        });

        // console.log(this.selectData.fushen);
      }
    },

    chaxun() {
      this.mypageable.pageNum = 1;
      this.techlist();
    },
    chongzhi() {
      this.form.fushen = null;
      this.form.http = null;
      this.form.zhongshen = null;
      this.form.dateValue_find = [
          dayjs().subtract(1, 'week').format("YYYY-MM-DD") ,dayjs(new Date()).format("YYYY-MM-DD")
        ];
      this.whiteSearchList.startCreateTime = dayjs().subtract(1, 'week').format("YYYY-MM-DD");
      this.whiteSearchList.endCreateTime = dayjs(new Date()).format("YYYY-MM-DD");
      this.mypageable.pageNum = 1;
      this.mypageable.pageSize = 10;
      this.form.shezhaType = null;
      this.form.name = null
      this.form.url = null;
      this.techlist();
    },
    //精确导出

    async put() {
      this.loadingbuttext = "...加载中";
      this.loadingbut = true;
      let list = {

          // pageNum: this.mypageable.pageNum,
          // pageSize: this.mypageable.pageSize,
          source: this.form.name,
        start: this.whiteSearchList.startCreateTime,
        end: this.whiteSearchList.endCreateTime,
        fraudType: this.form.shezhaType,
        yjcType: this.form.http,
        url: this.form.url,
      };
      // if (res) {
      //   this.loadingbuttext = "导出";
      //   this.loadingbut = false;
      //   // // console.log(res.data);
      //   // let newurl = res.data.url;
      //   // let eleLink = document.createElement("a");
      //   // eleLink.download = name;
      //   // // const down = window.location.origin
      //   // // eleLink.href = "http://172.31.1.61:8080" + newurl;
      //   // // const down = window.location.origin
      //   // eleLink.href = newurl;
      //   // // console.log(eleLink);
      //   let binaryData = [];
      //   binaryData.push(res.data);
      //   var _url=window.URL.createObjectURL(new Blob(binaryData, {type: "application/vnd.ms-excel"}))
      //   const a = document.createElement("a");
      //   a.download = name;
      //   a.href = _url
      //   a.click()
      //   a.remove()
      //   this.$message('导出成功');
      // } else {
      //   this.$message('导出失败');
      // }
      if(this.tableData.length==0){
        this.$message("当前数据为空，无法导出！")
        this.loadingbuttext = "导出";
        this.loadingbut = false;
        return false
      }
      const res = await this.$http({
        methods:'get',
        url:"/treat/exportTreat",
        responseType: "blob",
        params:list
      })
      if (res) {
        this.loadingbuttext = "导出";
        this.loadingbut = false;
        // console.log(res.data);
           let binaryData = [];
        binaryData.push(res.data);
        var _url=window.URL.createObjectURL(new Blob(binaryData, {type: "application/vnd.ms-excel"}))
        const a = document.createElement("a");
        // a.download = dayjs(new Date()).format("YYYYMMDD")+'-处置库.xlsx';
  
        a.href = _url
        a.setAttribute('download', decodeURI(res.headers['content-disposition'].split('=')[1]));
        document.body.appendChild(a);
        
        a.click()
        // window.open(_url);
        a.remove()
        this.$message('导出成功');
      } else {
        this.$message('导出失败');
      }
    },
    uploadwj() {
      // this.listTemplate.moban = null;
      this.file = [];
      this.shangchuan = true;
    },
    // 文件上传
    successSendFile(res) {
      // this.loading=true
      if (res.code == 200) {
        // setTimeout(() => {
        this.$message.success("上传成功");
        this.getTabData();
        this.$refs.upload.clearFiles();
        // }, 1000)
      } else {
        this.$message(res.message);
      }
    },
    //删除
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    //上传
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    //文件上传关闭
    shangchuanclose() {
      this.shangchuan = false;
    },
    getIndex($index) {
      //$index为数据下标,对英序号要加一
      // console.log($index)
      return (
        (this.mypageable.pageNum - 1) * this.mypageable.pageSize + $index + 1
      );
    },
    chushen_clearFun(val) {
      if (val == "") {
        this.form.shezhaType = null;
      }
    },
    fushen_clearFun(val) {
      if (val == "") {
        this.form.http = null;
      }
    },
    zhongshen_clearFun(val) {
      if (val == "") {
        this.form.zhongshen = null;
      }
    },
    fushencity_clearFun(val) {
      if (val == "") {
        this.form.name = null;
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
    dataCreate_change(val) {
      if (val && val != "") {
        this.whiteSearchList.startCreateTime = val[0];
        this.whiteSearchList.endCreateTime = val[1];
      } else {
        this.whiteSearchList.startCreateTime = null;
        this.whiteSearchList.endCreateTime = null;
      }
    },
    time(val) {
      if (val == null) {
        return "无";
      } else {
        return dayjs(val).format("YYYY-MM-DD");
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
  },
};
</script>

<style scoped lang='less'>
.right_main_under {
  // margin: 20px 0 0 20px;
  // box-sizing: border-box;
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
/deep/ .el-upload--text {
  width: 100% !important;
}
</style>