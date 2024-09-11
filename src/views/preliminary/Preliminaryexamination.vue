<template>
  <div class="right_main_under">
    <div class="toptitle">
      <el-form size="mini" class="form" :inline="true">
        <el-form-item prop="date">
          <!-- //待审核模块--时间 -->
          <el-date-picker
            class="timerq"
            v-model="newdomainSimpleVo.dateValue_find"
            :clearable="false"
            placeholder="选择日期"
            type="date"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="address">
          <el-select
            class="timerq"
            v-model="selectedGuishudi"
            placeholder="城市"
            @clear="fushen_clearFun(selectedGuishudi)"
            @visible-change="visibleSelect"
            :loading="selectLoading"
          >
            <el-option
              v-for="(item, index) in selectData.guishud"
              :label="item.name"
              :value="item.id"
              :key="index"
            >
              <span style="float: left">{{ item.name }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{
                item.cnt
              }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select
            class="timerq"
            collapse-tags
            v-model="newdomainSimpleVo.shezhaType"
            multiple
            placeholder="涉诈类型"
            @clear="fushen_clearFun(newdomainSimpleVo.shezhaType)"
          >
            <el-option
              v-for="(item, index) in selectData.shezha"
              :label="item.name"
              :value="item.id"
              :key="index"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="btn">
        <el-button size="mini" type="primary" plain @click="chaxun()"
          >查询</el-button
        >
        <el-button size="mini" type="success" plain @click="chongzhi()"
          >重置</el-button
        >
      </div>

      <div class="return">
        <el-button
          class="btn1"
          size="mini"
          type="success"
          plain
          @click="fanhui"
        >
          <i class="el-icon-refresh"></i> 刷新
        </el-button>
      </div>
    </div>
    <!-- //初审模块——日期列表 -->

    <div class="bottomlist">
      <div class="datalist">
        <!-- 审核列表 -->
        <el-tabs v-model="activeName" v-if="listloadingurl" v-loading="loading">
          <!-- @tab-click="handleClick" -->
          <el-tab-pane label="待审核" name="0">
            <!-- style="height:520px;overflow-y: auto;" -->
            <div style="max-height: 65vh; max-width: 100%; overflow-y: auto">
              <!--待审列表- 一页数据-->
              <div class="leftlist">
                <!-- 每个块 -->
                <div
                  class="listurl"
                  v-for="(item, index) in tableDatalist"
                  :key="index"
                >
                  <!-- 文字input -->
                  <el-form size="mini" label-width="80px">
                    <el-row>
                      <el-col :span="24">
                        <div class="grid-content bg-purple-dark">
                          <el-form-item label="域名：" class="inner">
                            <el-tooltip
                              :disabled="disabledTooltip"
                              effect="dark"
                              :content="item.url"
                              placement="top"
                            >
                              <!-- 加一个span防止input提示条不显示 -->
                              <span>
                                <el-input
                                  ref="url"
                                  type="textarea"
                                  v-model="item.url"
                                  disabled
                                  @mouseover.native="showTooltip"
                                ></el-input>
                              </span>
                            </el-tooltip>
                          </el-form-item>
                        </div>
                      </el-col>
                      <el-col :span="24"
                        ><div class="grid-content bg-purple-light">
                          <el-form-item label="类型：" class="inner">
                            <el-input v-model="item.fraudType" disabled>
                            </el-input>
                          </el-form-item></div
                      ></el-col>
                      <el-col :span="24"
                        ><div class="grid-content bg-purple-light">
                          <el-form-item label="访问量：" class="inner">
                            <el-input v-model="item.visits" disabled>
                            </el-input>
                          </el-form-item></div
                      ></el-col>
                    </el-row>
                  </el-form>
                  <!--初审模块- 图片 -->
                  <div class="images">
                    <el-image
                      :src="item.littleRemoteFile"
                      :preview-src-list="[item.remoteFile]"
                      class="img1"
                      title="移动端"
                    >
                      <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline" style="margin: 40%"
                          >无图片</i
                        >
                      </div>
                    </el-image>
                  </div>
                  <!--初审模块- radio -->
                  <div class="botcheck">
                    <el-radio-group v-model="formradio[index]">
                      <el-radio
                        class="mg_r_10"
                        :label="1"
                        @change="handleRadioChanges(item)"
                        >是</el-radio
                      >
                      <el-radio
                        class="mg_r_10"
                        :label="2"
                        @change="handleRadioChanges(item)"
                        >否</el-radio
                      >
                      <el-radio
                        class="mg_r_10"
                        :label="3"
                        @change="handleRadioChanges(item)"
                        >不确定</el-radio
                      >
                    </el-radio-group>
                  </div>
                </div>
              </div>
            </div>

            <!-- 页码 -->
            <div class="bottom1">
              <el-pagination
                @current-change="handleCurrentChangeurl"
                :current-page="mypageableurl.pageNumurl"
                :page-size="mypageableurl.pageSizeurl"
                layout="total, prev, pager, next, jumper"
                :total="totalurl"
                class="pagePagination pageRight"
                small
              >
              </el-pagination>
            </div>
            <div class="optbtn">
              <el-button @click="radioqx">全部是</el-button>
              <el-button @click="radiofx">全部否</el-button>
              <el-button @click="submit">提交</el-button>
            </div>
            <!-- 当前位置 -->
            <!-- <div class="location">
              <span
                class="guishudi"
                v-if="guishudiLoading"
                :title="this.gushudi"
                @click="qiehuanguishudi"
              >
                城市:{{ this.gushudi }}
              </span>
      
            </div> -->
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <!-- //提交前提示 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogtijiao"
      width="30%"
      :before-close="handleClose"
      :showClose="false"
    >
      <div>
        <p>
          当前是：{{ this.yes }}条，当前否：{{ this.no }}条，当前不确定：{{
            this.uncertain
          }}条
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" plain @click="determine" :disabled="disab"
          >确 定</el-button
        >
        <el-button type="primary" plain @click="dialogtijiao = false"
          >取 消</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Numlist from "@/utils/page.js";
import getIndexres from "@/utils/Indexxia.js";
import dayjs from "dayjs";
export default {
  name: "chushen",
  data() {
    return {
      selectLoading: false,
      disab: false,
      selectData: {
        guishud: [],
        shezha: [],
      },
      loading: false,
      selectedGuishudi: null,
      disabledTooltip: true,
      tableDatalist: [],
      gushudi: "",
      guishudiLoading: false,
      nums: 0,
      mapName: "",
      wenzi123: false,
      radio123: "",
      dialogVisible: true,
      loadingxuanze: false,
      radioloading: false,
      activeName: "0",
      newdomainSimpleVo: {
        dateValue_find: dayjs(new Date()).format("YYYY-MM-DD"), //时间
        guishud: {
          id: null,
        },
        shezhaType: [],
      },
      whiteSearchList: {
        startCreateTime: "",
        endCreateTime: "",
      },
      // 每页20条数据
      mypageable: {
        pageNum: 1,
        pageSize: 20,
      },
      total: 0,
      totalPages: "",
      // 每页20条数据
      mypageableurl: {
        pageNumurl: 1,
        pageSizeurl: 20,
      },
      totalurl: 0,
      totalPagesurl: "",
      tableData: [],
      tableData1wei: [],
      form: {
        yuming: "",
        laiyuan: "",
        title: "",
        question: "",
        tezheng: "",
        type: "",
        fangwenliang: "",
        ip: "",
        paiming: "",
        jingneiwai: "",
        img: "",
        img1: "",
        srcList: [],
        srcList1: [],
        shenhezhuangtai: "",
        id: "",
      },
      listloading: false,
      listloadingurl: true,
      // xqtime:'',
      xqurl: "",
      searchurl: "",
      sId: "",
      sId1: "",
      num: [],
      newnum: [],
      num1: [],
      newnum1: [],
      shangxian: true,
      xiaxian: true,
      newres: "",
      newres1: "",
      yinewres: "",
      yinewres1: "",
      shushoudione: [],
      suoshudiname: "",
      processid: "",
      // ————————————————————
      // 按钮
      formradio: [
        { radioArray0: "" },
        { radioArray1: "" },
        { radioArray2: "" },
        { radioArray3: "" },
        { radioArray4: "" },
        { radioArray5: "" },
        { radioArray6: "" },
        { radioArray7: "" },
        { radioArray8: "" },
        { radioArray9: "" },
        { radioArray10: "" },
        { radioArray11: "" },
        { radioArray12: "" },
        { radioArray13: "" },
        { radioArray14: "" },
        { radioArray15: "" },
        { radioArray16: "" },
        { radioArray17: "" },
        { radioArray18: "" },
        { radioArray19: "" },
      ],
      newsformradio: [], //新数组
      dialogtijiao: false, //提示弹窗
      yes: 0, //是
      no: 0, //否
      uncertain: 0, //不确定
      tabs: [
        {
          name: "是",
          id: 1,
        },
        {
          name: "否",
          id: 2,
        },
        {
          name: "不确定",
          id: 3,
        },
      ],
      tempGuishudi: null,
    };
  },
  created() {
    // this.listtime();

    this.suoshudi();
  },
  // mounted() {
  //   this.xq();
  // },
  methods: {
    async visibleSelect() {
      // console.log(this.selectData.guishud);

      this.selectLoading = true;
      this.$nextTick(async () => {
        const list = {
          discoverDate: dayjs(this.newdomainSimpleVo.dateValue_find).format(
            "YYYY-MM-DD"
          ),
          stage: "first",
        };
        const { data: res } = await this.$http.get(
          "/dictionary/first/datasourceTaskCnt",
          { params: list }
        );
        if (res.code == 200) {
          if (!res.data.length) {
            this.selectData.guishud.map((item) => {
              item.cnt = 0;
            });
          }
          // console.log(this.selectData.guishud);

          for (let i = 0; i < this.selectData.guishud.length; i++) {
            for (let j = 0; j < res.data.length; j++) {
              if (this.selectData.guishud[i].id == res.data[j].id) {
                this.selectData.guishud[i].cnt = res.data[j].cnt;
                // console.log(this.selectData.guishud[i].id,'走到map更新cnt',this.selectData.guishud[i].cnt);
                break;
              } else {
                this.selectData.guishud[i].cnt = 0;
                // console.log(this.selectData.guishud[i].id,'走到map更新cnt 0');
              }
            }
          }
          // res.data.forEach((item)=>{

          // console.log(item);
          // this.selectData.guishud.map((item2)=>{
          //   // console.log(item2.id);
          //   if(item2.id==item.id){

          //     item2.cnt = item.cnt
          //     console.log(item2.id,'走到map更新cnt',item2.cnt);
          //   }else{

          //     item2.cnt = 0
          //     console.log(item2.id,'走到map更新cnt为0');
          //   }
          // })
          // })
          this.$forceUpdate();
          this.selectLoading = false;
        } else {
          this.$message(res.message);
          this.selectLoading = false;
        }
      });
    },
    //鼠标移上去时显示input的所有内容
    showTooltip() {
      this.disabledTooltip = false; //false：不管url的长度都显示
      // const lifeW = this.$refs.url;
      // this.disabledTooltip = lifeW[0].value.length < 10; //url长度大于10时才显示
    },

    // },
    // 未用
    gsd() {
      // console.log( this.shushoudione);
      for (const key in this.shushoudione) {
        //  console.log(key,this.shushoudione[key]);
        if (this.radio123 == this.shushoudione[key].sources) {
          this.gushudi = this.shushoudione[key].mapName;
        }
      }
    },
    //初始化待处置条数 ：未用
    async daichuzhilist() {
      const num = this.radio123;
      const num1 = parseInt(num);
      const { data: res } = await this.$http.get("/check/checkNums", {
        params: {
          sources: num1,
          checkTime: this.searchurl,
        },
      });
      if (res.code == 200) {
        // console.log(res.data);
        // this.wenzi123 = true;
        this.nums = res.data.nums;
        this.mapName = res.data.mapName;
      }
    },

    // _________________________新的
    // 全选
    radioqx() {
      for (var i = 0; i < this.formradio.length; i++) {
        this.formradio[i] = 1;
      }
      this.$forceUpdate();
    },
    //反选
    radiofx() {
      for (var i = 0; i < this.formradio.length; i++) {
        this.formradio[i] = 2;
      }
      this.$forceUpdate();
    },
    //点击提交按钮
    submit() {
      // console.log(this.tableDatalist);
      if (this.tableDatalist.length === 0) {
        this.$message("提交错误，无数据！");
        return false;
      }
      for (var i = 0; i < this.formradio.length; i++) {
        this.newtableDatalist = this.tableDatalist.map((items, index) => {
          return {
            auditResult: this.chooseType(this.formradio[index]),
            id: items.id,
            did: items.did,
          };
        });
      }
      // console.log("刚刚处理完的");
      // console.log(this.newtableDatalist);
      // 拿当前页面的是否不确定数量
      let y = 0;
      let n = 0;
      let ny = 0;
      for (var j = 0; j < this.newtableDatalist.length; j++) {
        if (this.newtableDatalist[j].auditResult == "YES") {
          y++;
        } else if (this.newtableDatalist[j].auditResult == "NO") {
          n++;
        } else if (this.newtableDatalist[j].auditResult == "NOT_SURE") {
          ny++;
        }
      }
      this.yes = y;
      this.no = n;
      this.uncertain = ny;
      this.dialogtijiao = true;
    },
    // “提交” 弹窗确定
    determine() {
      let flag = true;
      for (var j = 0; j < this.newtableDatalist.length; j++) {
        // 判断当前是否有未选择项
        if (this.newtableDatalist[j].auditResult == undefined) {
          flag = false;
          this.$message("有未勾选项");
          break;
        }
      }
      // 当前flag为true  代表全部选则，直接走接口
      if (flag == true) {
        this.disab = true;
        this.checkresult();
      }
    },
    //弹窗页面的提交接口
    async checkresult() {
      let list = {
        auditList: this.newtableDatalist,
      };
      const { data: res } = await this.$http.post("/audit/first/audit", list);
      if (res.code == 200) {
        // 弹窗关闭
        this.$message(res.message);
        this.dialogtijiao = false;
        //判断当前页数
        let totalPage = this.totalurl / this.mypageableurl.pageSizeurl; // 总页数
        // 判断页数是否是小数
        if (String(totalPage).indexOf(".") > -1) {
          // 小数多加一页
          totalPage = parseInt(totalPage) + 1;
        }
        // console.log(totalPage);
        // console.log(this.mypageableurl.pageNumurl);
        if (this.mypageableurl.pageNumurl == totalPage) {
          --this.mypageableurl.pageNumurl;
        }
        this.formradio = [
          // 先置空所有按钮
          { radioArray0: "" },
          { radioArray1: "" },
          { radioArray2: "" },
          { radioArray3: "" },
          { radioArray4: "" },
          { radioArray5: "" },
          { radioArray6: "" },
          { radioArray7: "" },
          { radioArray8: "" },
          { radioArray9: "" },
          { radioArray10: "" },
          { radioArray11: "" },
          { radioArray12: "" },
          { radioArray13: "" },
          { radioArray14: "" },
          { radioArray15: "" },
          { radioArray16: "" },
          { radioArray17: "" },
          { radioArray18: "" },
          { radioArray19: "" },
        ];
        this.disab = false;
        this.xq(); //再请求下一页数据
      }
    },
    // _________________________
    handleRadioChanges(val, item) {},
    //点击查询按钮
    chaxun() {
      this.mypageableurl.pageNumurl = 1;
      this.xq();
    },
    //点击重置按钮
    chongzhi() {
      this.selectedGuishudi = this.tempGuishudi;
      this.mypageableurl.pageNumurl = 1;
      this.newdomainSimpleVo.shezhaType = null;
      this.newdomainSimpleVo.dateValue_find = dayjs(new Date()).format(
        "YYYY-MM-DD"
      );
      // this.newdomainSimpleVo.guishud = null;
      this.suoshudi();
    },
    handleClick(tab, event) {
      // console.log('待审核');
      this.mypageableurl.pageNumurl = 1;
      this.xq();
    },
    dataCreate_change(val) {
      if (val && val != "") {
        this.whiteSearchList.startCreateTime =
          this.newdomainSimpleVo.dateValue_find;
      } else {
        this.whiteSearchList.startCreateTime = null;
      }
    },
    getIndex($index) {
      return (
        (this.mypageableurl.pageNumurl - 1) * this.mypageable.pageSize +
        $index +
        1
      );
    },
    //自动请求待审核列表：未用
    search(val) {
      // console.log(val);
      this.listloading = false;
      this.listloadingurl = true;
      this.searchurl = val;
      this.activeName = "0";
      this.daichuzhilist(); // 未用
      this.xq();
    },
    // 查询操作————异步请求
    async xq() {
      this.num = [];
      this.newnum = [];
      // console.log(this.newdomainSimpleVo.shezhaType);

      let bigFraudTypesStr;
      if (this.newdomainSimpleVo.shezhaType) {
        bigFraudTypesStr = this.newdomainSimpleVo.shezhaType.join(",");
        // 字符串为空的情况下，请求体会带此字段。 将其转为其他类型，请求体默认不带此字段
        if (bigFraudTypesStr.length == 0) {
          bigFraudTypesStr = [];
        }
      }
      if (this.newdomainSimpleVo.dateValue_find == null) {
        this.$message.error("请选择时间！");
        return false;
      }
      this.loading = true;
      // 新的请求list
      let list = {
        // checkTime: this.searchurl,
        day: dayjs(this.newdomainSimpleVo.dateValue_find).format("YYYY-MM-DD"),
        source: this.selectedGuishudi,
        bigFraudTypes: bigFraudTypesStr,
        page: this.mypageableurl.pageNumurl,
        pageSize: this.mypageableurl.pageSizeurl,
      };
      const { data: res } = await this.$http.get("/audit/first/list", {
        params: list,
      });
      if (res.code == 200) {
        this.tableDatalist = res.dataList; // 每条数据
        this.totalurl = res.totalSum; // 总条数
        this.loading = false;
      } else if (res.code == 500) {
        this.$message(res.message);
        this.loading = false;
      }
    },
    //获取每个url详情，包括：url、类型、图片地址
    async chakanxiangq(n) {
      //  console.log(n);
      let ids = [];
      ids.push(n);
      const { data: res } = await this.$http.post(
        "/checking/findOriginById",
        ids[0]
      );
      if (res.code == 200) {
        this.tableDatalist = res.data;
      }
    },
    // 所属地和涉诈类型
    async suoshudi() {
      this.loading = true;
      const promise1 = this.$http.get("/dictionary/datasource");
      const promise2 = this.$http.get("dictionary/fraudType", {
        params: { isBig: true },
      });
      const [data1, data2] = await Promise.all([promise1, promise2]);
      if (data1.data.code === 200 && data2.data.code === 200) {
        this.selectData.guishud = data1.data.data;
        this.selectData.shezha = data2.data.data;
        for (let i in data1.data.data) {
          if (data1.data.data[i].name === "上海") {
            this.selectedGuishudi = data1.data.data[i].id;
            this.tempGuishudi = data1.data.data[i].id;
            break;
          } else {
            if (data1.data.data[0]) {
              this.selectedGuishudi = data1.data.data[0].id;
              this.tempGuishudi = data1.data.data[0].id;
            }
          }
        }
        // if(data2.data.data.length !== 0){
        //   this.newdomainSimpleVo.shezhaType = data2.data.data[0]
        // }
        // console.log(this.newdomainSimpleVo.guishud);
      }
      this.xq();
    },
    handleClose() {},
    // 点击刷新按钮
    fanhui() {
      // this.listloading = true;
      // this.listloadingurl = false;
      // this.wenzi123 = false;
      // 清空上次请求的结果
      this.formradio = [
        // 先置空所有按钮
        { radioArray0: "" },
        { radioArray1: "" },
        { radioArray2: "" },
        { radioArray3: "" },
        { radioArray4: "" },
        { radioArray5: "" },
        { radioArray6: "" },
        { radioArray7: "" },
        { radioArray8: "" },
        { radioArray9: "" },
        { radioArray10: "" },
        { radioArray11: "" },
        { radioArray12: "" },
        { radioArray13: "" },
        { radioArray14: "" },
        { radioArray15: "" },
        { radioArray16: "" },
        { radioArray17: "" },
        { radioArray18: "" },
        { radioArray19: "" },
      ];
      this.tableDatalist = [];
      this.totalurl = 0;
      this.mypageableurl.pageNumurl = 1;
      // this.newdomainSimpleVo.dateValue_find = dayjs(new Date()).format(
      //   "YYYY-MM-DD"
      // );
      // this.newdomainSimpleVo.guishud = 8;
      this.xq();
    },
    handleCurrentChange(val) {
      this.mypageableurl.pageNumurl = val;
      this.listtime();
    },
    handleCurrentChangeurl(val) {
      //点击页码
      this.mypageableurl.pageNumurl = val;
      this.formradio = [
        // 先置空所有按钮
        { radioArray0: "" },
        { radioArray1: "" },
        { radioArray2: "" },
        { radioArray3: "" },
        { radioArray4: "" },
        { radioArray5: "" },
        { radioArray6: "" },
        { radioArray7: "" },
        { radioArray8: "" },
        { radioArray9: "" },
        { radioArray10: "" },
        { radioArray11: "" },
        { radioArray12: "" },
        { radioArray13: "" },
        { radioArray14: "" },
        { radioArray15: "" },
        { radioArray16: "" },
        { radioArray17: "" },
        { radioArray18: "" },
        { radioArray19: "" },
      ];
      this.xq();
    },
    chooseType(val) {
      if (val == 1) {
        return "YES";
      } else if (val == 2) {
        return "NO";
      } else if (val == 3) {
        return "NOT_SURE";
      }
    },
    type(val) {
      if (val == "dk") {
        return "贷款";
      } else if (val == "lc") {
        return "理财";
      } else if (val == "gjf") {
        return "公检法";
      } else if (val == "gw") {
        return "网络购物";
      } else if (val == "qt") {
        return "其他类型";
      } else if (val == "normal") {
        return "正常网站";
      } else if (val == "sd") {
        return "刷单";
      }
    },
    // 清空“归属地”
    fushen_clearFun(val) {
      if (val == "") {
        val = null;
      }
    },
  },
};
</script>

<style  scoped lang='less'>
.right_main_under {
  // margin: 20px 0 0 20px;
  // box-sizing: border-box;
  // overflow-y: auto;
}
/deep/ .right_main_under .el-input--mini .el-input__inner {
  width: 200px !important;
}
.el-row {
  margin-bottom: 0px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col-6 {
  width: 34%;
}
.el-col {
  border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
  min-height: 24px;
  padding: 0 0 6px 8px;
}
.row-bg {
  padding: 1px 0px;
}
.btn {
  float: left;
  // display: inline-block;
  margin-left: 20px;
  // margin-left: 270px;
}
.bottom {
  width: 100%;
  height: 3.75rem /* 60/16 */ /* 40/16 */;
  // text-align: right;
  // float: right;
  // float: left;
  // margin-right: 20rem;
}
// .btn1 {

//   font-size: 12px;
// }
.form {
  position: relative;
  float: left;
}
.return {
  float: right;
}
.xiangqingbtn {
  font-size: 12px;
}
// .urlcolor:visited {
//   color: #909090;
//   text-decoration: underline;
// }
a {
  text-decoration: underline;
}
.urlcolor:visited {
  color: #0000ff;
  text-decoration: none;
}
// .urlcolor:visited {
//   color: #0000ff;
//   text-decoration: underline;
// }
.urlcolor:active {
  color: red;
  text-decoration: none;
}
/deep/ .el-table--mini td,
.el-table--mini th {
  padding: 5px 0;
}
/deep/ .el-pagination {
  padding: 10px !important;
}
.toptitle {
  position: relative;
  height: 40px;
  width: 100%;
}
.bottomlist {
  width: 100%;
  height: 100%;
  position: relative;
}
.location {
  padding: 20px 10px;
}
.wenzi {
  font-size: 14px;
  bottom: 0;
  left: 150px;
}
.guishudi {
  font-size: 15px;
  bottom: 0;
  left: 0;
  cursor: pointer;
}
.datalist {
  width: 100%;
  float: left;
}
.leftlist {
  // max-height: 550px;
  // overflow-y: auto;
  width: 100%;
  margin-top: 10px;
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
}
// /deep/.el-tabs__content{
//   max-height: 550px;
//   overflow-y: auto;
// }
.listurl {
  height: 93%;
  width: 230px;
  margin: 0 9px 30px 9px;
  // margin: 0 8px 30px 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.5);
  padding: 10px 0;
}
.leftbtoom {
  width: 100%;
  height: 200px;
  margin-top: 0px;
  // border: 1px solid red;
  box-sizing: border-box;
  padding: 20px;
}
.leftshang {
  position: absolute;
  top: 50%;
  left: 5px;
  font-size: 40px;
  cursor: pointer;
}
.leftxia {
  position: absolute;
  top: 50%;
  right: 5px;
  font-size: 40px;
  cursor: pointer;
}
/deep/ .inner .el-input--mini .el-input__inner {
  width: 96%;
  padding: 0 5px;
}
// /deep/ .el-form-item--mini {
//   margin-bottom: 0 !important;
// }
// /deep/ .el-form-item__label {
//   width: 60px !important;
//   padding: 0 !important;
//   text-align: left;
// }
// /deep/ .el-form-item__content {
//   // margin-left: 60px !important;
// }
.images {
  width: 95%;
  margin: 0 auto;
}
.botcheck {
  // margin-top: 5%;
  // height: 60px;
  // border: 1px solid red;
  padding: 0 10px;
  box-sizing: border-box;
  margin: 0 auto;
}
.img {
  margin-top: 5%;
  padding: 10px 0;
  width: 47%;
  height: 80%;
  margin-left: 1%;
  margin-right: 2%;
  border: 5px solid #ccc;
  box-sizing: border-box;
  cursor: pointer;
}
.img1 {
  // padding: 10px 0;
  width: 100%;
  height: 200px;
  // margin-left: 2%;
  // margin-right: 1%;
  border: 5px solid #ccc;
  box-sizing: border-box;
  cursor: pointer;
}
/deep/ .el-input.is-disabled .el-input__inner {
  color: #000;
}
.te {
  color: red;
}
.el-select {
  width: 9.375rem /* 150/16 */;
}
.mg_r_10 {
  margin-right: 10px;
}
.optbtn {
  position: sticky;
  bottom: 0px;
  text-align: right;
  padding: 5px 10px;
}
// /deep/ .sidebar-el-menu {
//   width: 9rem !important;
// }
// /deep/ .content-box {
//   background: #fff;
//   left: 10rem !important;
// }
/deep/ textarea.el-textarea__inner {
  width: 96%;
  color: black !important;
  resize: none;
  padding: 5px;
  font-family: none;
}
.timerq {
  width: 250px;
}
</style>