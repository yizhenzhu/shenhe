<template>
  <div class="right_main_under">
    <el-form size="mini" label-width="80px" :inline="true">
      <!-- <el-row style="margin-bottom: 10px; padding: 0 10px"> -->
      <!-- <el-col :span="12"
          ><div class="grid-content bg-purple" style="text-align: center">
            <div
              v-on:click="jinque(0)"
              :class="{ topbtn: index == 0 }"
              class="blue"
            >
              精确导出
            </div>
          </div></el-col
        >
        <el-col :span="12"
          ><div class="grid-content bg-purple-light" style="text-align: center">
            <div
              @click="jinque(1)"
              :class="{ topbtn: index == 1 }"
              class="blue"
            >
              一键导出
            </div>
          </div></el-col
        > -->
      <!-- </el-row> -->
      <el-row :gutter="20">
        <el-col :span="16"
          ><div class="grid-content1 bg-purple">
            <!-- 审核结果页面头部模块——类型 -->
            <!-- <el-form-item>
              <el-select
                v-model="form.type"
                placeholder="请选择"
                clearable
                @clear="type_clearFun(form.type)"
              >
                <el-option
                  v-for="item in selectData.type"
                  :key="item.id"
                  :label="item.mapName"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item> -->
            <!-- 审核结果页面头部模块——来源 -->
            <!-- <el-form-item>
              <el-select
                v-model="form.laiyuan"
                placeholder="请选择来源"
                clearable
                @clear="laiyuan_clearFun(form.laiyuan)"
              >
                <el-option
                  v-for="item in selectData.laiyuan"
                  :key="item.id"
                  :label="item.mapName"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item> -->
            <!-- 审核结果页面头部模块——终审 -->
            <!-- <el-form-item>
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
            </el-form-item> -->
            <!-- 审核结果页面头部模块——时间 -->
            <!-- <el-form-item>
              <el-date-picker
                v-model="form.datetime"
            :clearable="false"
            placeholder="选择日期"
            type="date"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item>
                      <el-button size="mini" type="primary" plain @click="chaxun"
              >查询</el-button
            >
            <el-button size="mini" type="success" plain @click="chongzhi"
              >重置</el-button
            >
            </el-form-item> -->
            <!-- 审核结果页面头部模块——排名 -->
            <!-- <el-form-item>
              <el-select
                v-model="form.paiming"
                placeholder="请选择排名"
                clearable
                @clear="paiming_clearFun(form.paiming)"
              >
                <el-option
                  v-for="item in selectData.paiming"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item> -->
            <!-- 审核结果页面头部模块——境内外 -->
            <!-- <el-form-item>
              <el-select
                v-model="form.jinneiwai"
                placeholder="请选择境内外"
                clearable
                @clear="jinneiwai_clearFun(form.jinneiwai)"
              >
                <el-option
                  v-for="item in selectData.jinneiwai"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item> -->
          </div></el-col
        >
        <!-- <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="17"
          ><div class="grid-content bg-purple"> -->
        <!-- 审核结果页面头部模块——特征 -->
        <!-- <el-form-item>
              <el-select
                v-model="form.tezheng"
                placeholder="请选择特征"
                clearable
                @clear="tezheng_clearFun(form.tezheng)"
              >222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
                <el-option
                  v-for="item in selectData.tezheng"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item> -->
        <!-- 审核结果页面头部模块——初审结果 -->
        <!-- <el-form-item>
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
            </el-form-item> -->
        <!-- 审核结果页面头部模块——复审 -->
        <!-- <el-form-item>
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
            </el-form-item> -->

        <!-- </div
        ></el-col> -->
        <el-col :span="7"
          ><div class="grid-content bg-purple">
            <!-- 审核结果头部模块——button -->
    
            
            <!-- 一键导出 -->
            <button type="button" class="blue" @click="quanbudaochu">
              {{ loadingbuttextyijian }}
            </button>
          </div></el-col
        >
        <!-- <el-drawer
          :before-close="handleClose"
          :visible.sync="dialog"
          direction="rtl"
          custom-class="demo-drawer"
          ref="drawer"
          size="36%"
          :showClose="false"
        >
          <div class="demo-drawer__content">
            <el-date-picker
              v-model="formtime"
              :change="dataCreate_changedaochu(formtime)"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="center"
              :default-time="['00:00:00', '23:59:59']"
              value-format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker>

            <div class="demo-drawer__footer">
              <el-button type="primary" @click="quanbudaochu" plain
                >全部导出</el-button
              >
              <el-button @click="cancelForm" plain>取 消</el-button>
            </div>
          </div>
        </el-drawer> -->
      </el-row>
    </el-form>

    <!-- 审核结果页面模块——列表 -->
    <el-table
      border
      ref="multipleTable"
      :data="tableData"
      style="width: 100%"
      max-height="800px"
      size="mini"
      class="tableStyle"
      empty-text="暂无数据"
      v-loading = "loading"
    >
      <el-table-column prop="id" label="序号" type="index">
        <template slot-scope="scope"
          ><span v-text="getIndex(scope.$index)"></span
        ></template>
      </el-table-column>
      <el-table-column prop="url" label="URL" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="title" label="域名标题" show-overflow-tooltip>
      </el-table-column>

      <el-table-column prop="reason" label="原因"> </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        sortable
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column prop="ip" label="IP" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="fraudType" label="类型"> </el-table-column>

      <!-- <el-table-column prop="url6" label="境内外"> </el-table-column> -->
      <el-table-column prop="rank" label="排名">
        <template slot-scope="scope">
          {{ scope.row.rank == -1 ? '无排名' : scope.row.rank }}
        </template>
      </el-table-column>
      <el-table-column prop="visits" label="访问量"> </el-table-column>
      <el-table-column prop="features" label="特征"> </el-table-column>
      <el-table-column prop="source" label="来源"> </el-table-column>
      <!-- <el-table-column prop="url10" label="截图"> </el-table-column> -->
      <el-table-column prop="firstAuditResult" label="初审结果">
        <template slot-scope="scope">
          <span v-if="scope.row.firstAuditResult == 'YES'">
            <!-- <i class="el-icon-success dx green"></i> -->
            <i class="el-icon-success green"></i>
          </span>
          <span v-if="scope.row.firstAuditResult == 'NO'">
            <!-- <i class="el-icon-error dx red"></i> -->
            <i class="el-icon-error red"></i>
          </span>
          <span v-if="scope.row.firstAuditResult == 'NOT_SURE'">
            <!-- <i class="el-icon-error dx red"></i> -->
            <i class="el-icon-remove gy"></i>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="secondAuditResult" label="复审结果">
        <template slot-scope="scope">
          <span v-if="scope.row.secondAuditResult == 'YES'">
            <!-- <i class="el-icon-success dx green"></i> -->
            <i class="el-icon-success green"></i>
          </span>
          <span v-if="scope.row.secondAuditResult == 'NO'">
            <!-- <i class="el-icon-error dx red"></i> -->
            <i class="el-icon-error red"></i>
          </span>
          <span v-if="scope.row.secondAuditResult == 'NOT_SURE'">
            <!-- <i class="el-icon-error dx red"></i> -->
            <i class="el-icon-remove gy"></i>
          </span>
          <span v-if="scope.row.secondAuditResult == null">
            <!-- <i class="el-icon-error dx red"></i> -->
            <i></i>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="thirdAuditResult" label="终审结果">
        <template slot-scope="scope">
          <span v-if="scope.row.thirdAuditResult == 'YES'">
            <!-- <i class="el-icon-success dx green"></i> -->
            <i class="el-icon-success green"></i>
          </span>
          <span v-if="scope.row.thirdAuditResult == 'NO'">
            <!-- <i class="el-icon-error dx red"></i> -->
            <i class="el-icon-error red"></i>
          </span>
          <span v-if="scope.row.thirdAuditResult == 'NOT_SURE'">
            <!-- <i class="el-icon-error dx red"></i> -->
            <i class="el-icon-remove gy"></i>
          </span>
        </template>
      </el-table-column>
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

      <button type="button" class="weiding" @click="putyijianqingkong">清空</button>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  data() {
    return {
      dialog: false,
      loading:false,
      direction: "rtl",
      formtime: null,
      whiteSearchListdaochu: {
        startCreateTimedaochu: null,
        endCreateTimedaochu: null,
      },
      show1: false,
      loadingbut: false,
      loadingbuttext: "导出",
      loadingbuttextyijian: "一键导出",
      loadingbutyijian: false,
      index: 0,
      index1: 1,
      // jingque: false,
      form: {
        type: null,
        laiyuan: null,
        paiming: "",
        jinneiwai: "",
        tezheng: "",
        chushen: "",
        fushen: "",
        zhongshen: null,
        datetime:  dayjs(new Date()).format("YYYY-MM-DD"),
      },

      whiteSearchList: {
        startCreateTime: null,
        endCreateTime: null,
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
        //   url10: "无",
        //   url11: "1",
        //   url12: "0",
        //   url13: "1",
        // },
      ],
      mypageable: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 1,
      totalPages: "",
      selectData: {
        type: [
        
        ],
        laiyuan: [],
        paiming: [
          {
            value: "是",
            label: "是",
          },
        ],
        jinneiwai: [
          {
            value: "是",
            label: "是",
          },
        ],
        tezheng: [
          {
            value: "是",
            label: "是",
          },
        ],
        chushen: [
          {
            value: "是",
            label: "是",
          },
        ],
        fushen: [
          {
            value: "是",
            label: "是",
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
    };
  },
  created() {
    // this.type();
    // this.laiyuanselect();
    this.reslist();
  },

  methods: {
    // 查询异步请求
    async reslist() {
      let list = {
          page: this.mypageable.pageNum,
          pageSize: this.mypageable.pageSize,
      };
      this.loading = true
      const { data: res } = await this.$http.get("/treat/auditResult", {params:list});
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
    //查询
    // chaxun() {
    //   this.reslist();
    // },

    //重置:干掉了
    chongzhi() {
      this.form.datetime = null;
      this.form.zhongshen = null;
      this.whiteSearchList.endCreateTime = null;
      this.form.type = null;
      this.mypageable.pageNum = 1;
      this.mypageable.pageSize = 10;
      this.form.laiyuan = null;
      this.whiteSearchList.startCreateTime = null;
      this.reslist();
    },
    //选择框  类型
    async type() {
      let list = {
        fatherId: 0,
      };
      const { data: res } = await this.$http.post(
        "/mapping/examineMappingList",
        list
      );
      if (res.code == 200) {
        // console.log(res.data);
        res.data.forEach((ele) => {
          if (ele.mapName == "dk") {
            ele.mapName = "贷款";
          } else if (ele.mapName == "lc") {
            ele.mapName = "理财";
          } else if (ele.mapName == "gjf") {
            ele.mapName = "公检法";
          } else if (ele.mapName == "gw") {
            ele.mapName = "网络购物";
          } else if (ele.mapName == "qt") {
            ele.mapName = "其他类型";
          } else if (ele.mapName == "normal") {
            ele.mapName = "正常网站";
          } else if (ele.mapName == "sd") {
            ele.mapName = "刷单";
          }
        });
        this.selectData.type = res.data;
      }
    },

    //选择框  来源
    async laiyuanselect() {
      let list = {
        fatherId: 1,
      };
      const { data: res } = await this.$http.post(
        "/mapping/examineMappingList",
        list
      );
      if (res.code == 200) {
        // console.log(res.data);

        this.selectData.laiyuan = res.data;
      }
    },
    //精确导出

    async put() {
      this.loadingbuttext = "...加载中";
      this.loadingbut = true;
      let list = {
        checkResult3: this.form.zhongshen,
        endCheckTime: this.whiteSearchList.endCreateTime,
        fraudType: this.form.type,
        myPage: {
          pageNum: this.mypageable.pageNum,
          pageSize: this.mypageable.pageSize,
        },
        sources: this.form.laiyuan,
        startCheckTime: this.whiteSearchList.startCreateTime,
      };

      const { data: res } = await this.$http.post(
        "/end/exportExamineList",
        list
      );
      if (res.code == 200) {
        this.loadingbuttext = "导出";
        this.loadingbut = false;
        // console.log(res.data);
        let newurl = res.data.url;
        let eleLink = document.createElement("a");
        console.log(res.headers["content-disposition"]);
        eleLink.download = res.headers["content-disposition"];
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

    // 一键导出

    putyijian() {
      this.dialog = true;
    },
    //清空
    putyijianqingkong(){
           this.$confirm('您确定要清空当前所有数据吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!'
          // });
          this.putyijian123()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
           
  
    },
    async putyijian123() {
      const { data: res } = await this.$http.post("/treat/clear");
      if (res.code == 200) {
        // console.log(res.data);
        this.$message(res);
        this.reslist()
      }else{
        this.$message(res.message);
      }
    },
 
    async quanbudaochu() {
      this.loadingbuttextyijian = "...加载中";
      // this.loadingbutyijian = true;
      // let list = {
      //   startCheckTime: this.whiteSearchListdaochu.startCreateTimedaochu,
      //   endCheckTime: this.whiteSearchListdaochu.endCreateTimedaochu,
      // };
      if(this.tableData.length==0){
        this.$message("当前数据为空，无法导出！")
        this.loadingbuttextyijian = "一键导出";
        return false
      }
      const res = await this.$http({
        methods:'get',
        url:'/treat/exportResult',
        responseType: "blob",
      });
      if (res) {
        this.loadingbuttextyijian = "一键导出";
        // this.loadingbutyijian = false;
        // this.dialog = false;
        // this.quc();
        // console.log(res.data);
        // let newurl1 = res.data.url;
        // // let newurl1 = res
        // let eleLink1 = document.createElement("a");
        // eleLink1.download = name;
        // // const down = window.location.origin
        // // eleLink.href = "http://172.31.1.61:8080" + newurl;
        // // const down = window.location.origin
        // eleLink1.href = newurl1;
        // // console.log(eleLink);
        // eleLink1.click();
        // eleLink1.remove();
        let binaryData = [];
        // let temp = res.headers["content-disposition"]
        // let filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        // let matches = filenameRegex.exec(temp);
        // if (matches != null && matches[1]) { 
        //   var filename = matches[1].replace(/['"]/g, '');
        // }
        binaryData.push(res.data);
        var _url=window.URL.createObjectURL(new Blob(binaryData, {type: "application/vnd.ms-excel"}))
        const a = document.createElement("a");
        
        a.href = _url
        a.setAttribute('download', decodeURI(res.headers['content-disposition'].split('=')[1]));
        document.body.appendChild(a);
        a.click()
        a.remove()
        this.$message("导出成功");
      } else {
        this.$message(res);
        this.loadingbuttextyijian = "导出失败";
      }
    },
    // async shiijiandaochu() {
    //   this.loadingbuttextyijian = "...加载中";
    //   this.loadingbutyijian = true;
    //   let list = {
    //     startCheckTime: this.whiteSearchListdaochu.startCreateTimedaochu,
    //     endCheckTime: this.whiteSearchListdaochu.endCreateTimedaochu,
    //   };
    //   const { data: res } = await this.$http.post(
    //     "/end/exportFinalJudgment",
    //     list
    //   );
    //   if (res.code == 200) {
    //     this.loadingbuttextyijian = "一键导出";
    //     this.loadingbutyijian = false;
    //     this.dialog=false
    //      this.quc();
    //     // console.log(res.data);
    //     let newurl1 = res.data.url;
    //     let eleLink1 = document.createElement("a");
    //     eleLink1.download = name;
    //     // const down = window.location.origin
    //     // eleLink.href = "http://172.31.1.61:8080" + newurl;
    //     // const down = window.location.origin
    //     eleLink1.href = newurl1;
    //     // console.log(eleLink);
    //     eleLink1.click();
    //     eleLink1.remove();
    //     this.$message(res.message);
    //   } else {
    //     this.$message(res.message);
    //   }
    // },
    handleClose() {
      this.dialog = false;
    },
    cancelForm() {
      this.dialog = false;
      this.quc();
    },
    quc() {
      this.formtime = "";
      this.whiteSearchListdaochu.startCreateTimedaochu = null;
      this.whiteSearchListdaochu.endCreateTimedaochu = null;
    },
    getIndex($index) {
      //$index为数据下标,对英序号要加一
      // console.log($index)
      return (
        (this.mypageable.pageNum - 1) * this.mypageable.pageSize + $index + 1
      );
    },
    //头部切换
    // jinque(val) {
    //   this.index = val;

    //   if (val == 0) {
    //     this.jingque = true;
    //   } else if (val == 1) {
    //     this.jingque = false;
    //   }
    // },
    dataCreate_change(val) {
      if (val && val != "") {
        this.whiteSearchList.startCreateTime = val[0];
        this.whiteSearchList.endCreateTime = val[1];
      } else {
        this.whiteSearchList.startCreateTime = null;
        this.whiteSearchList.endCreateTime = null;
      }
    },
    dataCreate_changedaochu(val) {
      if (val && val != "") {
        this.whiteSearchListdaochu.startCreateTimedaochu = val[0];
        this.whiteSearchListdaochu.endCreateTimedaochu = val[1];
      } else {
        this.whiteSearchListdaochu.startCreateTimedaochu = null;
        this.whiteSearchListdaochu.endCreateTimedaochu = null;
      }
    },
    type_clearFun() {
      if (val == "") {
        this.form.type = null;
      }
    },
    laiyuan_clearFun(val) {
      if (val == "") {
        this.form.laiyuan = null;
      }
    },
    paiming_clearFun(val) {
      if (val == "") {
        this.form.paiming = null;
      }
    },
    jinneiwai_clearFun(val) {
      if (val == "") {
        this.form.jinneiwai = null;
      }
    },
    tezheng_clearFun(val) {
      if (val == "") {
        this.form.tezheng = null;
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
      this.reslist();
    },
    handleCurrentChange(val) {
      this.mypageable.pageNum = val;
      this.reslist();
    },
  },
};
</script>

<style scoped lang='less'>
// .blue {
//   background-color: rgb(64, 158, 255);
//   color: #fff;
// }
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
  text-align: right;
}
.grid-content1 {
  border-radius: 4px;
  min-height: 36px;
  text-align: left;
}
/deep/ .el-input--mini .el-input__inner {
  width: 210px;
}
//   /deep/ .el-form-item:nth-child(-n+4)  {
//   width: 250px;
//   .el-form-item__content {
//     width: 100%;
//     .el-input__inner {
//       width: 100%;
//     }
//   }
// }
.bottom {
  width: 100%;
  height: 3.75rem /* 60/16 */ /* 40/16 */;
  position: relative;
  .ss {
    float: right;
  }
}
.weiding {
  position: absolute;
  left: 0;
  top: 5px;
  width: 200px;
  font-size: 20px;
  background-color: #fc1e0e;
  border: 0px;
  color: #fff;
  height: 40px;
  line-height: 40px;
  border-radius: 5px;
  // border-top-left-radius: 5px;
  // border-top-right-radius: 5px;
  margin-left: 20px;
  cursor: pointer;
}
.dx {
  margin-right: 1rem;
}
.red {
  font-size: 18px;
  color: red;
}
.green {
  font-size: 18px;
  color: rgb(56, 233, 56);
}
.gy {
  font-size: 18px;
  color: gray;
}

// .blue {
//   background-color: #ecf5ff;
//   color: #fff;
//   height: 30px;
//   line-height: 30px;
//   cursor: pointer;
//   border: 1px solid #409eff;

//   color: #409eff;
//   box-sizing: border-box;
// }
// .topbtn {
//   background-color: #409eff;
//   color: #fff;
//   height: 30px;
//   line-height: 30px;
//   cursor: pointer;
//   border: 1px solid #409eff;
//   //  border-right:1px solid #409eff;
//   // border-left: 1px solid #409eff;
//   // color: #409eff;
//   box-sizing: border-box;
// }
.blue {
  width: 200px;
  font-size: 20px;
  background-color: #409eff;
  border: 0px;
  color: #fff;
  height: 40px;
  line-height: 40px;
  // border-radius: 5px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  margin-left: 20px;
  cursor: pointer;
  // position: relative;
}
// .shijian {
//   position: absolute;
//   top: 40px;
//   left: -200px;
//   width: 600px;
//   height: 600px;
//   border: 2px solid #409eff;
//   background-color: rgba(256, 256, 256, 0.8);
//   border-radius: 5px;

//   z-index: 10;
// }
/deep/ .demo-drawer__content {
  width: 63%;
  height: 80%;
  margin: 0 auto;
  position: relative;
}
/deep/ .demo-drawer__footer {
  position: absolute;
  bottom: 0px;
  left: 20%;
  // top:50%;
  // left:50%;
  // transform: translate(0%,-50%);
}
.daochu_weiyi{
  float: right;
}
</style>