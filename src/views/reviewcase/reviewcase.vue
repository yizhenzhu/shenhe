<template>
  <div class="right_main_under">
    <div class="toptitle">
      <el-form size="mini" class="form" :inline="true">
        <el-form-item prop="date">
          <!-- //复审模块--时间 -->
          <el-date-picker
            v-model="newdomainSimpleVo.dateValue_find"
            :clearable="false"
            placeholder="选择日期"
            type="date"
             class="timerq"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="address">
          <el-select
          class="timerq"
            v-model="selectedGuishudi"
            placeholder="城市"
            @clear="fushen_clearFun(selectedGuishudi)"
            @visible-change = 'visibleSelect'
            :loading = "selectLoading"
          >
            <el-option
              v-for="(item, index) in selectData.fushen"
              :label="item.name"
              :value="item.id"
              :key="index"
            >
            <span style="float:left">{{ item.name }}</span>
            <span style="float:right; color: #8492a6; font-size: 13px">{{ item.cnt }}</span>
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
        <el-button size="mini" type="primary" plain @click="chaxun">查询</el-button>
        <el-button size="mini" type="success" plain @click="chongzhi">重置</el-button>
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
    <!-- //复审模块——日期列表 -->
    <div class="bottomlist">
      <div class="datalist">
        <!-- 复审模块——详情url列表 -->
        <el-tabs
          v-model="activeName"
          v-loading = "loading"
          v-if="listloadingurl"
        >
        <!-- @tab-click="handleClick" -->
          <el-tab-pane label="待审核" name="0">
            <div style="max-height: 65vh;max-width: 100%;overflow-y: auto;">
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
                          <el-input v-model="item.visits" disabled> </el-input>
                        </el-form-item></div
                    ></el-col>
                    <el-col :span="24">
                      <div class="grid-content bg-purple-dark">
                        <el-form-item label="初审时间：" class="inner">
                          <el-input
                            :value="time(item.firstAuditTime)"
                            disabled
                          ></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                    <el-col :span="24"
                      ><div class="grid-content bg-purple-light">
                        <el-form-item label="初审结果：" class="inner">
                          <el-input
                            :value="status(item.firstAuditResult)"
                            disabled
                          ></el-input>
                        </el-form-item></div
                    ></el-col>
                  </el-row>
                </el-form>
                <!--复审模块- 图片 -->
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
                <!--复审模块- radio -->
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
            <!--待审列表 -- 一页数据-->
            
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
 
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <!-- 选择归属地 -->
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
        <el-button type="primary" plain @click="determine" :disabled="disab">确 定</el-button>
        <el-button type="primary" plain @click="dialogtijiao = false"
          >取 消</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import dayjs from "dayjs";
import Numlist from "@/utils/page.js";
import getIndexres from "@/utils/Indexxia.js";
export default {
  name: "fushen",
  data() {
    return {
      disab:false,
      loading:false,
      selectData: {
        fushen: [],
        shezha:[]
      },
      selectedGuishudi:null,
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
        guishud: null,
        shezhaType: []
      },
      whiteSearchList: {
        startCreateTime: "",
        endCreateTime: "",
      },
      mypageable: {
        pageNum: 1,
        pageSize: 20,
      },
      total: 0,
      totalPages: "",
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
        // shenhezhuangtai: "",
        chuname: "",
        chutime: "",
        chuerr: "",
        id: "",
      },
      listloading: false,
      listloadingurl: true,
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
      tempGuishudi:null,
      selectLoading:false
    };
  },
  created() {
    // this.listtime();
    this.suoshudi();
    // this.xq()
  },
  methods: {
    async visibleSelect(){     
          this.selectLoading = true
          this.$nextTick(async()=>{
            const list = {
              discoverDate:dayjs(this.newdomainSimpleVo.dateValue_find).format("YYYY-MM-DD"),
              stage:'second'
            } 
            const {data:res} = await this.$http.get("/dictionary/second/datasourceTaskCnt",{params:list});
            if(res.code == 200){
              if(!res.data.length){
                this.selectData.fushen.map((item)=>{
                  item.cnt = 0
                })
              }
              for(let i=0;i<this.selectData.fushen.length;i++){
                  for(let j=0;j<res.data.length;j++){
                    if(this.selectData.fushen[i].id == res.data[j].id){
                      this.selectData.fushen[i].cnt = res.data[j].cnt
                      // console.log(this.selectData.fushen[i].id,'走到map更新cnt',this.selectData.fushen[i].cnt);  
                      break
                    }else{
                      this.selectData.fushen[i].cnt = 0
                      // console.log(this.selectData.fushen[i].id,'走到map更新cnt 0');  
                    }
                  }
                }
              // console.log(this.selectData.fushen);
              // res.data.forEach((item)=>{
              //   // console.log(item);
              //   this.selectData.fushen.map((item2)=>{
              //     // console.log(item2.id);
              //     if(item2.id==item.id){               
              //       item2.cnt = item.cnt
              //     }else{
              //       item2.cnt = 0
              //     }
              //   })
              // })
             this.$forceUpdate()
             this.selectLoading = false
            }else{
              this.$message(res.message)
              this.selectLoading = false
            }
          })
          
        
    },
    //鼠标移上去时显示input的所有内容
    showTooltip() {
      this.disabledTooltip = false; //false：不管url的长度都显示
      // const lifeW = this.$refs.url;
      // this.disabledTooltip = lifeW[0].value.length < 10; //url长度大于10时才显示
    },
    // qiehuanguishudi() {
    //   this.dialogVisible = true;
    //   this.listloading = true;
    //   this.listloadingurl = false;
    //   this.wenzi123 = false;
    // },
    errer1() {
      if (this.radio123 == "") {
        this.$message("请选择归属地");
      } else {
        this.mypageableurl.pageNumurl = 1;
        this.dialogVisible = false;
        this.gsd();
        this.guishudiLoading = true;
      }
    },
    gsd() {
      // console.log( this.shushoudione);
      for (const key in this.shushoudione) {
        //  console.log(key,this.shushoudione[key]);
        if (this.radio123 == this.shushoudione[key].sources) {
          this.gushudi = this.shushoudione[key].mapName;
        }
      }
    },
    //初始化待处置条数
    async daichuzhilist() {
      const num = this.radio123;
      // console.log(num);
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
    //初始化时间  : 新版本未用
    async listtime() {
      let list = {
        around: "",
        endCheckTime: this.whiteSearchList.endCreateTime,
        startCheckTime: this.whiteSearchList.startCreateTime,
        features: 0,
        fraudType: "",
        myPage: {
          pageNum: this.mypageableurl.pageNumurl,
          pageSize: this.mypageable.pageSize,
        },
        ranking: "",
      };
      const { data: res } = await this.$http.post("/checking/dateGroup", list);
      if (res.code == 200) {
        // console.log(res.data);
        // let list = [];
        // list = res.data.list.map((item) => ({ date: item }));
        this.tableData = res.data.list;
        this.totalPages = res.data.totalPages;
        this.total = res.data.total;
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
    //提交
    submit() {
     if(this.tableDatalist.length === 0){
      this.$message("提交错误，无数据！")
      return false
     }
      for (var i = 0; i < this.formradio.length; i++) {
       
        this.newtableDatalist = this.tableDatalist.map((items, index) => {
          return {
            auditResult: this.chooseType(this.formradio[index]) ,
            id: items.id,
            did: items.did
          };
        });
      }
      //console.log(this.newtableDatalist);
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
    async suoshudi() {
      // const { data: res } = await this.$http.get("/dictionary/datasource");
      // if (res.code == 200) {
      //   const downList = res.data
      //   this.selectData.fushen = downList
      //   for(let i in downList){
      //     if(downList[i].name==="上海"){
      //       this.selectedGuishudi = downList[i]
      //       break
      //     }else{
      //       this.selectedGuishudi = null
      //     }
      //   }
      //   // console.log(this.selectData.fushen);
      // }
      this.loading = true
      const promise1 =  this.$http.get("/dictionary/datasource");
      const promise2 =  this.$http.get("/dictionary/fraudType",{params:{isBig:true}})
      const [data1,data2] = await Promise.all([promise1,promise2])
      if(data1.data.code === 200 && data2.data.code === 200){
        this.selectData.fushen = data1.data.data
        this.selectData.shezha = data2.data.data
        for(let i in data1.data.data){
          if(data1.data.data[i].name==="上海"){
            this.selectedGuishudi = data1.data.data[i].id
            this.tempGuishudi = data1.data.data[i].id
            break
          }else{
            if(data1.data.data[0]){
              this.selectedGuishudi = data1.data.data[0].id
              this.tempGuishudi = data1.data.data[0].id
            }
            
          }
        }
        // if(data2.data.data.length !== 0){
        //   this.newdomainSimpleVo.shezhaType = data2.data.data[0]
        // }
        
      }
      this.xq()
    },
    // 弹窗确定
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
           this.disab=true
        this.checkresult();
      }
    },
    //弹窗页面的提交接口
    async checkresult() {
      let list = {auditList:this.newtableDatalist};
      const { data: res } = await this.$http.post(
        "/audit/second/audit",
        list
      );
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
        if(this.mypageableurl.pageNumurl == totalPage){
          --this.mypageableurl.pageNumurl
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
                this.disab=false
        this.xq(); //再请求下一页数据
      }
    },
    // _________________________
    handleRadioChanges(val, item) {
      // console.log(this.radio0);
      console.log(val, item);
    },
    //日期查询
    chaxun() {
      // this.listtime();
      this.mypageableurl.pageNumurl = 1;
         this.xq();
    },
    //重置
    chongzhi() {
      this.selectedGuishudi = this.tempGuishudi
      this.mypageableurl.pageNumurl = 1;
      this.newdomainSimpleVo.shezhaType = null
      // this.newdomainSimpleVo.dateValue_find = null;
      // this.whiteSearchList.endCreateTime = null;
      // this.whiteSearchList.startCreateTime = null;
      // this.listtime();
            // this.selectedGuishudi=8
      this.newdomainSimpleVo.dateValue_find = dayjs(new Date()).format(
        "YYYY-MM-DD"
      );
      // this.selectedGuishudi = null;
      this.suoshudi();
    },
    handleClick(tab, event) {
      // console.log('待审核');
      this.mypageableurl.pageNumurl = 1;
      this.xq();
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
    getIndex($index) {
      //$index为数据下标,对英序号要加一
      // console.log($index);
      return (
        (this.mypageableurl.pageNumurl - 1) * this.mypageable.pageSize + $index + 1
      );
    },
    //自动请求待审核列表
    search(val) {
      // console.log(val);
      this.listloading = false;
      this.listloadingurl = true;
      this.searchurl = val;
      this.activeName = "0";
      this.daichuzhilist();
      this.xq();
    },
    // 获取一页数据id
    async xq() {
      this.num = [];
      this.newnum = [];
      let bigFraudTypesStr
      if(this.newdomainSimpleVo.shezhaType){
        bigFraudTypesStr = this.newdomainSimpleVo.shezhaType.join(',')
        if(bigFraudTypesStr.length==0){
          bigFraudTypesStr = []
        }
      }
      if(this.newdomainSimpleVo.dateValue_find==null){
        this.$message.error('请选择时间！')
        return false
      }
      this.loading = true
      let list = {
       
       day: dayjs(this.newdomainSimpleVo.dateValue_find).format(
          "YYYY-MM-DD"
        ),
        source: this.selectedGuishudi,
        bigFraudTypes: bigFraudTypesStr,
        page: this.mypageableurl.pageNumurl,
        pageSize:this.mypageableurl.pageSizeurl
      };
      // console.log(list);
      const { data: res } = await this.$http.get(
        "/audit/second/list",
        {params:list}
      );
      if (res.code == 200) {
        // console.log(res.data);
        this.tableDatalist = res.dataList
        this.totalurl = res.totalSum
        // for (var i = 0; i < res.data.list.length; i++) {
        //   // console.log(res.data.list[i]);
        //   this.num.push(res.data.list[i].id);
        // }
        // this.newnum = this.num;
        // // console.log(this.newnum);
        // this.totalurl = res.data.total;
        // this.chakanxiangq(this.newnum);
        this.loading = false
      } else if (res.code == 500) {
        this.$message(res.message);
        this.loading = false
        // this.fanhui();
      }
    },
    //获取每个url详情，包括：url、类型、图片地址、初审结果
    async chakanxiangq(n) {
      // console.log(n);
      let ids = [];
      ids.push(n);
      const { data: res } = await this.$http.post(
        "/recheck/getOriginData",
        ids[0]
      );
      if (res.code == 200) {
        this.tableDatalist = res.data;
      }
    },
    // 所属地

    handleClose() {
 
    },
    time(val) {
      return dayjs(val).format("YYYY-MM-DD  HH:mm:ss");
    },
    status(val) {
      if (val == "YES") {
        return "是";
      } else if (val == "NO") {
        return "否";
      } else if (val == "NOT_SURE") {
        return "不确定";
      }
    },
    //返回
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
      this.mypageableurl.pageNumurl = 1
      //     this.newdomainSimpleVo.dateValue_find = dayjs(new Date()).format(
      //   "YYYY-MM-DD"
      // );
      // this.selectedGuishudi = 8;
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
    chooseType(val){
      if(val==1){
        return "YES"
      }else if(val==2){
        return "NO"
      }else if(val==3){
        return "NOT_SURE"
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
    fushen_clearFun(val) {
      if (val == "") {
        this.selectedGuishudi = null;
      }
    },
  },
};
</script>

<style  scoped lang='less'>
.right_main_under {
  // margin: 20px 0 0 20px;
  // box-sizing: border-box;
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
  display: inline-block;
  margin-left: 20px;
}
.bottom {
  width: 100%;
  // height: 3.75rem /* 60/16 */ /* 40/16 */;
  // text-align: right;
  // float: left;
  // margin-right: 20rem;
}
.btn1 {
  float: right;
  font-size: 12px;
}
.form {
  float: left;
  position: relative;
}
.return {
  // display: inline-block;
  // position: absolute;
  // z-index: 200;
  float: right;
  // margin-top: 5px;
  // right: 20px;
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
  width: 100%;
  margin-top: 10px;
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
}
.listurl {
  height: 93%;
  width: 230px;
  margin: 0 9px 30px 9px;
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
h4 {
  margin-bottom: 5px;
}
table {
  border-collapse: collapse;
  th,
  td {
    text-align: center;
  }
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
/deep/ .el-form-item--mini {
  margin-bottom: 0 !important;
}
/deep/ .el-form-item__label {
  width: 70px !important;
  padding: 0 !important;
  text-align: left;
}
/deep/ .el-form-item__content {
  // margin-left: 70px !important;
}
.images {
  width: 95%;
  margin: 0 auto;
}
.botcheck {
  //width: 45%;
  //height: 60px;
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
  //margin-left: 2%;
  //margin-right: 1%;
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
  text-align: right;
  padding: 5px 10px;
}
/deep/ textarea.el-textarea__inner {
  width: 96%;
  color: black !important;
  resize: none;
  padding: 5px;
  font-family: none;
}
.toptitle {
  height: 40px;
  width: 100%;
}
.timerq{
  width: 250px;
}
</style>