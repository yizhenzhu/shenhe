<template>
  <div class="right_main_under">
    <div  id="demoItem" class="topsd" >
    </div>
    <el-form size="mini" class="form" :inline="true">
      <el-form-item >
        <!-- //待审核模块--时间 -->
        <el-date-picker
          v-model="newdomainSimpleVo.dateValue_find"
          :clearable="false"
          placeholder="选择日期"
          type="date"
          class="timerq"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item >
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
      <el-button size="mini" type="primary" plain @click="chaxun"
        >查询</el-button
      >
      <el-button size="mini" type="success" plain @click="chongzhi"
        >重置</el-button
      >
    </div>
    <div class="return">
      <el-button class="btn1" size="mini" type="success" plain @click="fanhui">
        <i class="el-icon-refresh"></i> 刷新
      </el-button>
    </div>
    <!-- 终审模块——日期列表 -->
    <div class="bottomlist">
      <div class="datalist">        
        <!-- 终审模块——详情url列表 -->
        <div class="fuxiugai">
          <el-tabs
            v-model="activeName"
            @tab-click="handleClick"
            v-if="listloadingurl"
            v-loading = "loading"
          >
            <el-tab-pane label="初审是复审是" name="1">
              <div style="max-height: 65vh;max-width: 100%;overflow-y: auto;">
                <div class="leftlist">
                <!-- 每个块 -->
                <div
                  class="listurl"
                  v-for="(item, index) in tableDatalist1"
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
                  <!--终审模块- 图片 -->
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
                  <!--终审模块-初审是复审是 radio -->
                  <div class="botcheck">
                    <el-radio-group v-model="formradio1[index]">
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
              <div class="bottom">
                <el-pagination
                  @current-change="handleCurrentChangeurl1"
                  :current-page="mypageableurl1.pageNumurl"
                  :page-size="mypageableurl1.pageSizeurl"
                  layout="total, prev, pager, next, jumper"
                  :total="totalurl1"
                  class="pagePagination pageRight"
                  small
                >
                </el-pagination>
              </div>
              <!-- 批量操作按钮 -->
              <div class="optbtn">
                <el-button @click="radioqx(1)">全部是</el-button>
                <el-button @click="radiofx(1)">全部否</el-button>
                <el-button @click="submit_tab1">提交</el-button>
              </div>
              <!-- 提交前提示 -->
              <el-dialog
                title="提示"
                :visible.sync="dialogtijiao1"
                width="30%"
                :before-close="handleClose"
                :showClose="false"
              >
                <div>
                  <p>
                    当前是：{{ this.yes1 }}条，当前否：{{
                      this.no1
                    }}条，当前不确定：{{ this.uncertain1 }}条
                  </p>
                </div>
                <span slot="footer" class="dialog-footer">
                  <el-button type="primary" plain @click="determine_tab1" :disabled="disab"
                    >确 定</el-button
                  >
                  <el-button type="primary" plain @click="dialogtijiao1 = false"
                    >取 消</el-button
                  >
                </span>
              </el-dialog>
            </el-tab-pane>
            <el-tab-pane label="初复审有一个不确定" name="3">
              <div style="max-height: 65vh;max-width: 100%;overflow-y: auto;">
                <!--待审列表 -- 一页数据-->
              <div class="leftlist">
                <!-- 每个块 -->
                <div
                  class="listurl"
                  v-for="(item, index) in tableDatalist3"
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
                      <el-col :span="24">
                        <div class="grid-content bg-purple-dark">
                          <el-form-item label="复审时间：" class="inner">
                            <el-input
                              :value="time(item.secondAuditTime)"
                              disabled
                            ></el-input>
                          </el-form-item>
                        </div>
                      </el-col>
                      <el-col :span="24"
                        ><div class="grid-content bg-purple-light">
                          <el-form-item label="复审结果：" class="inner">
                            <el-input
                              :value="status(item.secondAuditResult)"
                              disabled
                            ></el-input>
                          </el-form-item></div
                      ></el-col>
                    </el-row>
                  </el-form>
                  <!--终审模块- 图片 -->
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
                  <!--终审模块-初复审有一个不确定 radio -->
                  <div class="botcheck">
                    <el-radio-group v-model="formradio3[index]">
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
              <div class="bottom">
                <el-pagination
                  @current-change="handleCurrentChangeurl3"
                  :current-page="mypageableurl3.pageNumurl"
                  :page-size="mypageableurl3.pageSizeurl"
                  layout="total, prev, pager, next, jumper"
                  :total="totalurl3"
                  class="pagePagination pageRight"
                  small
                >
                </el-pagination>
              </div>
              <!-- 批量操作按钮 -->
              <div class="optbtn">
                <el-button @click="radioqx(3)">全部是</el-button>
                <el-button @click="radiofx(3)">全部否</el-button>
                <el-button @click="submit_tab3">提交</el-button>
              </div>
              <!-- 提交前提示 -->
              <el-dialog
                title="提示"
                :visible.sync="dialogtijiao3"
                width="30%"
                :before-close="handleClose"
                :showClose="false"
              >
                <div>
                  <p>
                    当前是：{{ this.yes3 }}条，当前否：{{
                      this.no3
                    }}条，当前不确定：{{ this.uncertain3 }}条
                  </p>
                </div>
                <span slot="footer" class="dialog-footer">
                  <el-button type="primary" plain @click="determine_tab3" :disabled="disab"
                    >确 定</el-button
                  >
                  <el-button type="primary" plain @click="dialogtijiao3 = false"
                    >取 消</el-button
                  >
                </span>
              </el-dialog>
            </el-tab-pane>
            <el-tab-pane label="初复审都不确定" name="2">
              <div style="max-height: 65vh;max-width: 100%;overflow-y: auto;">
                <!-- 终审模块——详情url列表 -->
              <div class="leftlist">
                <!-- 每个块 -->
                <div
                  class="listurl"
                  v-for="(item, index) in tableDatalist2"
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
                  <!--终审模块- 图片 -->
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
                  <!--终审模块-初复审有一个不确定 radio -->
                  <div class="botcheck">
                    <el-radio-group v-model="formradio2[index]">
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
              <div class="bottom">
                <el-pagination
                  @current-change="handleCurrentChangeurl2"
                  :current-page="mypageableurl2.pageNumurl"
                  :page-size="mypageableurl2.pageSizeurl"
                  layout="total, prev, pager, next, jumper"
                  :total="totalurl2"
                  class="pagePagination pageRight"
                  small
                >
                </el-pagination>
              </div>
              <div class="optbtn">
                <el-button @click="submit_tab2">提交</el-button>
              </div>
              <!-- 提交前提示 -->
              <el-dialog
                title="提示"
                :visible.sync="dialogtijiao2"
                width="30%"
                :before-close="handleClose"
                :showClose="false"
              >
                <div>
                  <p>
                    当前是：{{ this.yes2 }}条，当前否：{{
                      this.no2
                    }}条，当前不确定：{{ this.uncertain2 }}条
                  </p>
                </div>
                <span slot="footer" class="dialog-footer">
                  <el-button type="primary" plain @click="determine_tab2" :disabled="disab"
                    >确 定</el-button
                  >
                  <el-button type="primary" plain @click="dialogtijiao2 = false"
                    >取 消</el-button
                  >
                </span>
              </el-dialog>
            </el-tab-pane>
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
               <span class="wenzi" v-if="wenzi123">
              当前日期 <span class="te">{{ this.mapName }}</span
              >待处置量为：<span class="te">{{ this.nums }}</span
              >条
            </span>
            </div> -->
          </el-tabs>
        </div>
      </div>
    </div>
    <!-- 选择城市 -->
    <!-- <el-dialog
      title="选择城市"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      :showClose="false"
    >
      <el-radio-group v-model="radio123">
        <el-radio
          v-for="(item, index) in this.shushoudione"
          :label="item.sources"
          :value="item.mapName"
          :key="index"
          >{{ item.mapName }}</el-radio
        >
      </el-radio-group>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" plain @click="errer1">确 定</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>

<script>
import dayjs from "dayjs";
import Numlist from "@/utils/page.js";
import getIndexres from "@/utils/Indexxia.js";
export default {
  name: "zhongshen",
  data() {
    return {
      disab:false,
      loading:false,
      selectedGuishudi:null,
      selectData: {
        fushen: [],
        shezha:[]
      },
      disabledTooltip: true,
      tableDatalist1: [],
      tableDatalist2: [],
      tableDatalist3: [],
      gushudi: "",
      guishudiLoading: false,
      nums: 0,
      mapName: "",
      wenzi123: false,
      piliang1: false,
      // xiugailoading: false,
      radioloading: false,
      radioloading1: true,
      loadingxuanze: false,
      activeName: "1",
      newdomainSimpleVo: {
        dateValue_find: dayjs(new Date()).format("YYYY-MM-DD"), //时间
        guishud: null,
        shezhaType: []
      },
      whiteSearchList: {
        startCreateTime: "",
        endCreateTime: "",
      },
      // 日期页码
      mypageable: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      totalPages: "",
      //tab1页码
      mypageableurl1: {
        pageNumurl: 1,
        pageSizeurl: 50,
      },
      totalurl1: 0,
      totalPagesurl1: "",
      //tab2页码
      mypageableurl2: {
        pageNumurl: 1,
        pageSizeurl: 50,
      },
      totalurl2: 0,
      totalPagesurl2: "",
      //tab3页码
      mypageableurl3: {
        pageNumurl: 1,
        pageSizeurl: 50,
      },
      totalurl3: 0,
      totalPagesurl3: "",

      tableData: [],
      tableData1: [],
      tableData1wei: [],
      tableData1weizhi: [],
      tableData1shuang: [],
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
        id: "",
      },
      radio: "",
      listloading: false,
      listloadingurl: true,
      searchurl: "",
      sId: "",
      sId1: "",
      sId2: "",
      sId3: "",
      num: [],
      newnum: [],
      shangxian: true,
      xiaxian: true,
      newres: "",
      newres1: "",
      yinewres: "",
      yinewres1: "",
      funewres: "",
      funewres1: "",
      csff: "",
      csff1: "",
      shushoudione: [],
      suoshudiname: "",
      processid: "",
      radio123: "",
      dialogVisible: true,
      tabnum: 1,
      // ————————————————————
      // 按钮
      formradio1: [
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
        { radioArray20: "" },
        { radioArray21: "" },
        { radioArray22: "" },
        { radioArray23: "" },
        { radioArray24: "" },
        { radioArray25: "" },
        { radioArray26: "" },
        { radioArray27: "" },
        { radioArray28: "" },
        { radioArray29: "" },
        { radioArray30: "" },
        { radioArray31: "" },
        { radioArray32: "" },
        { radioArray33: "" },
        { radioArray34: "" },
        { radioArray35: "" },
        { radioArray36: "" },
        { radioArray37: "" },
        { radioArray38: "" },
        { radioArray39: "" },
        { radioArray40: "" },
        { radioArray41: "" },
        { radioArray42: "" },
        { radioArray43: "" },
        { radioArray44: "" },
        { radioArray45: "" },
        { radioArray46: "" },
        { radioArray47: "" },
        { radioArray48: "" },
        { radioArray49: "" },
      ],
      formradio3: [
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
        { radioArray20: "" },
        { radioArray21: "" },
        { radioArray22: "" },
        { radioArray23: "" },
        { radioArray24: "" },
        { radioArray25: "" },
        { radioArray26: "" },
        { radioArray27: "" },
        { radioArray28: "" },
        { radioArray29: "" },
        { radioArray30: "" },
        { radioArray31: "" },
        { radioArray32: "" },
        { radioArray33: "" },
        { radioArray34: "" },
        { radioArray35: "" },
        { radioArray36: "" },
        { radioArray37: "" },
        { radioArray38: "" },
        { radioArray39: "" },
        { radioArray40: "" },
        { radioArray41: "" },
        { radioArray42: "" },
        { radioArray43: "" },
        { radioArray44: "" },
        { radioArray45: "" },
        { radioArray46: "" },
        { radioArray47: "" },
        { radioArray48: "" },
        { radioArray49: "" },
      ],
      newsformradio: [], //新数组
      dialogtijiao1: false, //tab1提示弹窗
      dialogtijiao3: false, //tab3提示弹窗
      dialogtijiao2: false,
      // tab1 初复审都是是
      yes1: 0, //是
      no1: 0, //否
      uncertain1: 0, //不确定
      // tab3 初复审有一个不确定
      yes3: 0,
      no3: 0,
      uncertain3: 0,
      // yes2 ， no2 ， uncertain2 初复审都不确定
      yes2: 0,
      no2: 0,
      uncertain2: 0,
      formradio2: [
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
        { radioArray20: "" },
        { radioArray21: "" },
        { radioArray22: "" },
        { radioArray23: "" },
        { radioArray24: "" },
        { radioArray25: "" },
        { radioArray26: "" },
        { radioArray27: "" },
        { radioArray28: "" },
        { radioArray29: "" },
        { radioArray30: "" },
        { radioArray31: "" },
        { radioArray32: "" },
        { radioArray33: "" },
        { radioArray34: "" },
        { radioArray35: "" },
        { radioArray36: "" },
        { radioArray37: "" },
        { radioArray38: "" },
        { radioArray39: "" },
        { radioArray40: "" },
        { radioArray41: "" },
        { radioArray42: "" },
        { radioArray43: "" },
        { radioArray44: "" },
        { radioArray45: "" },
        { radioArray46: "" },
        { radioArray47: "" },
        { radioArray48: "" },
        { radioArray49: "" },
      ],
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

    this.suoshudi();
  },
  methods: {
    async visibleSelect(){
      // console.log(this.selectData.guishud);
      
          this.selectLoading = true
          this.$nextTick(async()=>{
            const list = {
              discoverDate:dayjs(this.newdomainSimpleVo.dateValue_find).format("YYYY-MM-DD"),
              stage:'third'
            } 
            const {data:res} = await this.$http.get("/dictionary/third/datasourceTaskCnt",{params:list});
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
              // console.log(this.selectData.guishud);
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
        this.$message("请选择城市");
      } else {
        this.mypageableurl1.pageNumurl = 1;
        this.mypageableurl2.pageNumurl = 1;
        this.mypageableurl3.pageNumurl = 1;
        this.dialogVisible = false;
        this.gsd();
        this.guishudiLoading = true;
      }
      // this.daichuzhilist();
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
      const num_gsd = this.radio123;
      const num1_gsd = parseInt(num_gsd);
      const { data: res } = await this.$http.get("/check/checkNums", {
        params: {
          sources: num1_gsd,
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
    // 所属地
    async suoshudi() {
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
    handleClose() {
    
    },
    //初始化时间
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
        this.tableData = res.data.list;
        this.totalPages = res.data.totalPages;
        this.total = res.data.total;
      }
    },
    // _________________________新的
    // 全选
    radioqx(tabnum) {
      if (tabnum == 1) {
        for (var i = 0; i < this.formradio1.length; i++) {
          this.formradio1[i] = 1;
        }
      } else if (tabnum == 3) {
        for (var i = 0; i < this.formradio3.length; i++) {
          this.formradio3[i] = 1;
        }
      }
      this.$forceUpdate();
    },
    //反选
    radiofx(tabnum) {
      if (tabnum == 1) {
        for (var i = 0; i < this.formradio1.length; i++) {
          this.formradio1[i] = 2;
        }
      } else if (tabnum == 3) {
        for (var i = 0; i < this.formradio3.length; i++) {
          this.formradio3[i] = 2;
        }
      }
      this.$forceUpdate();
    },
    //tab1提交
    submit_tab1() {
      if(this.tableDatalist1.length === 0){
        this.$message("提交错误，无数据！");
          return false
      }
      for (var i = 0; i < this.formradio1.length; i++) {
        this.newtableDatalist1 = this.tableDatalist1.map((items, index) => {
          return {
            auditResult: this.chooseType(this.formradio1[index]),
            id: items.id,
            did: items.did,
          };
        });
      }
      // 拿当前页面的是否不确定数量
      let y = 0;
      let n = 0;
      let ny = 0;
      for (var j = 0; j < this.newtableDatalist1.length; j++) {
        if (this.newtableDatalist1[j].auditResult == "YES") {
          y++;
        } else if (this.newtableDatalist1[j].auditResult == "NO") {
          n++;
        } else if (this.newtableDatalist1[j].auditResult == "NOT_SURE") {
          ny++;
        }
      }
      
      this.yes1 = y;
      this.no1 = n;
      this.uncertain1 = ny;
      this.dialogtijiao1 = true;
      
    },
    //tab1弹窗确定
    determine_tab1() {
      let flag = true;
      for (var j = 0; j < this.newtableDatalist1.length; j++) {
        // 判断当前是否有未选择项
        if (this.newtableDatalist1[j].auditResult == undefined) {
          flag = false;
          this.$message("有未勾选项");
          break;
        }
      }
      // 当前flag为true  代表全部选则，直接走接口
      if (flag == true) {
              this.disab=true
        this.checkresult_tab1();
      }
    },
    //tab1弹窗页面的提交接口
    async checkresult_tab1() {
      let list = {auditList:this.newtableDatalist1};
      const { data: res } = await this.$http.post(
        "/audit/third/audit",
        list
      );
      if (res.code == 200) {
        // 弹窗关闭
        this.$message(res.message);
        this.dialogtijiao1 = false;
        //判断当前页数
        let totalPage = this.totalurl1 / this.mypageableurl1.pageSizeurl; // 总页数
        // 判断页数是否是小数
        if (String(totalPage).indexOf(".") > -1) {
          // 小数多加一页
          totalPage = parseInt(totalPage) + 1;
        }
        if(this.mypageableurl1.pageNumurl ==totalPage){
          --this.mypageableurl1.pageNumurl
        }
        this.formradio1 = [
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
          { radioArray20: "" },
          { radioArray21: "" },
          { radioArray22: "" },
          { radioArray23: "" },
          { radioArray24: "" },
          { radioArray25: "" },
          { radioArray26: "" },
          { radioArray27: "" },
          { radioArray28: "" },
          { radioArray29: "" },
          { radioArray30: "" },
          { radioArray31: "" },
          { radioArray32: "" },
          { radioArray33: "" },
          { radioArray34: "" },
          { radioArray35: "" },
          { radioArray36: "" },
          { radioArray37: "" },
          { radioArray38: "" },
          { radioArray39: "" },
          { radioArray40: "" },
          { radioArray41: "" },
          { radioArray42: "" },
          { radioArray43: "" },
          { radioArray44: "" },
          { radioArray45: "" },
          { radioArray46: "" },
          { radioArray47: "" },
          { radioArray48: "" },
          { radioArray49: "" },
        ];
              this.disab=false
              
        this.xq(1); //再请求下一页数据
      }/* else{
        this.$message(res.message);
      } */
    },

    //tab3提交
    submit_tab3() {
      if(this.tableDatalist3.length === 0){
          this.$message("提交错误，无数据！");
          return false
        }
      for (var i = 0; i < this.formradio3.length; i++) {
        this.newtableDatalist3 = this.tableDatalist3.map((items, index) => {
          return {
            auditResult: this.chooseType(this.formradio3[index]),
            id: items.id,
            did: items.did,
          };
        });
      }
      // console.log(this.newtableDatalist3);
      // 拿当前页面的是否不确定数量
      let y = 0;
      let n = 0;
      let ny = 0;
      for (var j = 0; j < this.newtableDatalist3.length; j++) {
        if (this.newtableDatalist3[j].auditResult == "YES") {
          y++;
        } else if (this.newtableDatalist3[j].auditResult == "NO") {
          n++;
        } else if (this.newtableDatalist3[j].auditResult == "NOT_SURE") {
          ny++;
        }
      }
      this.yes3 = y;
      this.no3 = n;
      this.uncertain3 = ny;
      this.dialogtijiao3 = true;
    },
    //tab3弹窗确定
    determine_tab3() {
      
      let flag = true;
      for (var j = 0; j < this.newtableDatalist3.length; j++) {
        // 判断当前是否有未选择项
        if (this.newtableDatalist3[j].auditResult == undefined) {
          flag = false;
          this.$message("有未勾选项");
          break;
        }
      }
      // 当前flag为true  代表全部选则，直接走接口
      if (flag == true) {
          this.disab=true
        this.checkresult_tab3();
      }
    },
    //tab3弹窗页面的提交接口
    async checkresult_tab3() {
      let list = {auditList:this.newtableDatalist3};
      const { data: res } = await this.$http.post(
        "/audit/third/audit",
        list
      );
      if (res.code == 200) {
        // 弹窗关闭
        this.$message(res.message);
        this.dialogtijiao3 = false;
        //判断当前页数
        let totalPage = this.totalurl3 / this.mypageableurl3.pageSizeurl; // 总页数
        // 判断页数是否是小数
        if (String(totalPage).indexOf(".") > -1) {
          // 小数多加一页
          totalPage = parseInt(totalPage) + 1;
        }
        if(this.mypageableurl3.pageNumurl ==totalPage){
          --this.mypageableurl3.pageNumurl
        }
        this.formradio3 = [
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
          { radioArray20: "" },
          { radioArray21: "" },
          { radioArray22: "" },
          { radioArray23: "" },
          { radioArray24: "" },
          { radioArray25: "" },
          { radioArray26: "" },
          { radioArray27: "" },
          { radioArray28: "" },
          { radioArray29: "" },
          { radioArray30: "" },
          { radioArray31: "" },
          { radioArray32: "" },
          { radioArray33: "" },
          { radioArray34: "" },
          { radioArray35: "" },
          { radioArray36: "" },
          { radioArray37: "" },
          { radioArray38: "" },
          { radioArray39: "" },
          { radioArray40: "" },
          { radioArray41: "" },
          { radioArray42: "" },
          { radioArray43: "" },
          { radioArray44: "" },
          { radioArray45: "" },
          { radioArray46: "" },
          { radioArray47: "" },
          { radioArray48: "" },
          { radioArray49: "" },
        ];
          this.disab=false
        this.xq(3); //再请求下一页数据
      }/* else{
        this.$message(res.message);
      } */
    },
    //tab2提交
    submit_tab2() {
      if(this.tableDatalist2.length === 0){
          this.$message("提交错误，无数据！");
          return false
        }
      for (var i = 0; i < this.formradio2.length; i++) {
        this.newtableDatalist2 = this.tableDatalist2.map((items, index) => {
          return {
            auditResult: this.chooseType(this.formradio2[index]),
            id: items.id,
            did: items.did,
          };
        });
      }
      // console.log(this.newtableDatalist3);
      // 拿当前页面的是否不确定数量
      let y = 0;
      let n = 0;
      let ny = 0;
      for (var j = 0; j < this.newtableDatalist2.length; j++) {
        if (this.newtableDatalist2[j].auditResult == "YES") {
          y++;
        } else if (this.newtableDatalist2[j].auditResult == "NO") {
          n++;
        } else if (this.newtableDatalist2[j].auditResult == "NOT_SURE") {
          ny++;
        }
      }
      this.yes2 = y;
      this.no2 = n;
      this.uncertain2 = ny;
      this.dialogtijiao2 = true;
    },
    //tab3弹窗确定
    determine_tab2() {
      
      let flag = true;
      // for (var j = 0; j < this.newtableDatalist2.length; j++) {
      //   // 判断当前是否有未选择项
      //   if (this.newtableDatalist2[j].auditResult == undefined) {
      //     flag = false;
      //     this.$message("有未勾选项");
      //     break;
      //   }
      // }
      // 当前flag为true  代表全部选则，直接走接口
      if (flag == true) {
          this.disab=true
        this.checkresult_tab2();
      }
    },
    //tab3弹窗页面的提交接口
    async checkresult_tab2() {
      let temptableDatalist = this.newtableDatalist2.filter((items)=>{
        return items.auditResult!==undefined
      })
      let list = {auditList:temptableDatalist};
      const { data: res } = await this.$http.post(
        "/audit/third/audit",
        list
      );
      if (res.code == 200) {
        // 弹窗关闭
        this.$message(res.message);
        this.dialogtijiao2 = false;
        //判断当前页数
        let totalPage = this.totalurl2 / this.mypageableurl2.pageSizeurl; // 总页数
        // 判断页数是否是小数
        if (String(totalPage).indexOf(".") > -1) {
          // 小数多加一页
          totalPage = parseInt(totalPage) + 1;
        }
        if(this.mypageableurl2.pageNumurl ==totalPage){
          --this.mypageableurl2.pageNumurl
        }
        this.formradio2 = [
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
          { radioArray20: "" },
          { radioArray21: "" },
          { radioArray22: "" },
          { radioArray23: "" },
          { radioArray24: "" },
          { radioArray25: "" },
          { radioArray26: "" },
          { radioArray27: "" },
          { radioArray28: "" },
          { radioArray29: "" },
          { radioArray30: "" },
          { radioArray31: "" },
          { radioArray32: "" },
          { radioArray33: "" },
          { radioArray34: "" },
          { radioArray35: "" },
          { radioArray36: "" },
          { radioArray37: "" },
          { radioArray38: "" },
          { radioArray39: "" },
          { radioArray40: "" },
          { radioArray41: "" },
          { radioArray42: "" },
          { radioArray43: "" },
          { radioArray44: "" },
          { radioArray45: "" },
          { radioArray46: "" },
          { radioArray47: "" },
          { radioArray48: "" },
          { radioArray49: "" },
        ];
          this.disab=false
        this.xq(2); //再请求下一页数据
      }/* else{
        this.$message(res.message);
      } */
    },
    // _________________________
    handleRadioChanges(val, item) {
      // console.log(this.radio0);
      console.log(val, item);
    },
    //日期查询
    chaxun() {
      // this.listtime();
      this.mypageableurl1.pageNumurl = 1;
      this.mypageableurl2.pageNumurl = 1;
      this.mypageableurl3.pageNumurl = 1;
      if (this.tabnum == 1) {
        for (var i = 0; i < this.formradio1.length; i++) {
          this.formradio1[i] = 1;
        }
        this.xq(1);
      } else if (this.tabnum == 3) {
        this.xq(3);
      } else if (this.tabnum == 2) {
        // console.log("初复审都不确定");
      
        this.xq(2);
      }
    },
    //重置
    chongzhi() {
      this.mypageableurl1.pageNumurl = 1;
      this.mypageableurl2.pageNumurl = 1;
      this.mypageableurl3.pageNumurl = 1;
      this.selectedGuishudi = this.tempGuishudi
      this.newdomainSimpleVo.shezhaType = null
      this.newdomainSimpleVo.dateValue_find = dayjs(new Date()).format(
        "YYYY-MM-DD"
      );

      if (this.tabnum == 1) {

        this.xq(1);
      } else if (this.tabnum == 3) {
        // console.log("初复审有一个不确定");

        this.xq(3);
      } else if (this.tabnum == 2) {
        // console.log("初复审都不确定");

        this.xq(2);
      }
    },
    //tab切换
    handleClick(tab, event) {
      if (tab.name == 1) {
        this.tabnum = 1;
        this.mypageableurl1.pageNumurl=1
          for (var i = 0; i < this.formradio1.length; i++) {
          this.formradio1[i] = 1;
        }
        console.log('执行handleClick 1');
        this.xq(1);
      } else if (tab.name == 3) {
        // console.log("初复审有一个不确定");
        this.tabnum = 3;
        this.mypageableurl3.pageNumurl=1
        this.xq(3);
      } else if (tab.name == 2) {
        // console.log("初复审都不确定");
        this.tabnum = 2;
          this.mypageableurl2.pageNumurl=1
      
        this.xq(2);
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
    //日期列表翻页
    getIndex($index) {
      //$index为数据下标,对英序号要加一
      // console.log($index)
      return (
        (this.mypageableurl.pageNumurl - 1) * this.mypageable.pageSize + $index + 1
      );
    },
    //tab1列表翻页
    getIndex1($index) {
      //$index为数据下标,对英序号要加一
      // console.log($index)
      return (
        (this.mypageableurl1.pageNumurl - 1) * this.mypageableurl1.pageSizeurl +
        $index +
        1
      );
    },
    //tab2列表翻页
    getIndex2($index) {
      return (
        (this.mypageableurl2.pageNumurl - 1) * this.mypageableurl2.pageSizeurl +
        $index +
        1
      );
    },
    //tab3列表翻页
    getIndex3($index) {
      return (
        (this.mypageableurl3.pageNumurl - 1) * this.mypageableurl3.pageSizeurl +
        $index +
        1
      );
    },
    //自动请求待审核列表
    search(val) {
      this.listloading = false;
      this.listloadingurl = true;
      // this.wenzi123 = true;
      // this.xiugailoading = true;
      this.searchurl = val;
      this.activeName = "1";
      this.daichuzhilist();
      this.xq(1);
    },
    notCntType(val){
      if(val === 1){
        return "zero"
      }else if(val === 2){
        return "two"
      }else if(val === 3){
        return "one"
      }
    },
    // 日期操作——详情
    async xq(tabnum) {
      this.num = [];
      this.newnum = [];
      let page_num = 0;
      let page_size = 0;

      if (tabnum == 1||tabnum==null) {
        tabnum = 1
        page_num = this.mypageableurl1.pageNumurl;
        page_size = this.mypageableurl1.pageSizeurl;
      } else if (tabnum == 2) {
        page_num = this.mypageableurl2.pageNumurl;
        page_size = this.mypageableurl2.pageSizeurl;
      } else if (tabnum == 3) {
        page_num = this.mypageableurl3.pageNumurl;
        page_size = this.mypageableurl3.pageSizeurl;
      }
      let bigFraudTypesStr
      if(this.newdomainSimpleVo.shezhaType){
        bigFraudTypesStr = this.newdomainSimpleVo.shezhaType.join(',')
        if(bigFraudTypesStr.length == 0){
          bigFraudTypesStr = []
        }
      }
      if(this.newdomainSimpleVo.dateValue_find==null){
        this.$message.error('请选择时间！')
        return false
      }
      this.loading = true
      let list = {
        notCnt: this.notCntType(tabnum), // 1:初复审都是是 3:初复审有一个不确定 2:初复审都是否
        day: dayjs(this.newdomainSimpleVo.dateValue_find).format(
          "YYYY-MM-DD"
        ),
        source: this.selectedGuishudi,
        bigFraudTypes: bigFraudTypesStr,
        page: page_num,
        pageSize: page_size,
      };
      console.log(list);
      const { data: res } = await this.$http.get(
        "/audit/third/list",
        {params:list}
      );
      if (res.code == 200) {

        // console.log(res.data);
        // for (var i = 0; i < res.dataList.length; i++) {
        //   this.num.push(res.dataList[i].id);
        // }

        this.newnum = this.num;
        if (tabnum == 1) {
          this.tableDatalist1 = res.dataList
          this.totalurl1 = res.totalSum;
          this.radioqx(1)
        } else if (tabnum == 2) {
          this.tableDatalist2 = res.dataList
          this.totalurl2 = res.totalSum;
        } else if (tabnum == 3) {
          this.tableDatalist3 = res.dataList
          this.totalurl3 = res.totalSum;
        }
        // this.chakanxiangq(this.newnum, tabnum);
        this.loading = false
      } else if (res.code == 500) {
        this.$message(res.message);
        // this.fanhui();
        this.loading = false
      }
    },
    //获取每个url详情，包括：url、类型、图片地址、初审结果
    async chakanxiangq(n, tabnum) {
      let ids = [];
      ids.push(n);
      const { data: res } = await this.$http.post(
        "/finalcheck/getOriginData",
        ids[0]
      );
      if (res.code == 200) {
                setTimeout(item=>{
        document.getElementById('demoItem').scrollIntoView()
    },1000)
        if (tabnum == 1) {
          this.tableDatalist1 = res.data;
        } else if (tabnum == 2) {
          this.tableDatalist2 = res.data;
        } else if (tabnum == 3) {
          this.tableDatalist3 = res.data;
        }
      }
    },
    handleCurrentChange(val) {
      this.mypageableurl.pageNumurl = val;
      this.listtime();
    },
    //tab1翻页
    handleCurrentChangeurl1(val) {
       console.log('翻页了全选“是”');
      this.mypageableurl1.pageNumurl = val;
         if (this.tabnum == 1) {
        for (var i = 0; i < this.formradio1.length; i++) {
          this.formradio1[i] = 1;
        }
      }
    this.radioqx(1)  // 翻页全选 “是”
      this.xq(1); //1:初复审都是是
     
    },
    //tab2翻页
    handleCurrentChangeurl3(val) {
      
      this.mypageableurl3.pageNumurl = val;
       if (  this.tabnum == 3) {
        // console.log("初复审有一个不确定");

        //    for (var i = 0; i < this.formradio3.length; i++) {
        //   this.formradio3[i] = 1;
        // }
        // this.xq(3);
      }
    //       setTimeout(item=>{
    //     document.getElementById('demoItem').scrollIntoView()
    // },1000)
    this.radioqx(3)  // 翻页全选 “是”
      this.xq(3); //3:初复审有一个不确定
   
    },
    //tab3翻页
    handleCurrentChangeurl2(val) {
        
      this.mypageableurl2.pageNumurl = val;
      this.xq(2); //2:初复审都是否

    },
    time(val) {
      if (val == null) {
        return "";
      } else {
        return dayjs(val).format("YYYY-MM-DD  HH:mm:ss");
      }
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
    chooseType(val){
      if(val==1){
        return "YES"
      }else if(val==2){
        return "NO"
      }else if(val==3){
        return "NOT_SURE"
      }
    },
    //返回
    fanhui() {
          if (this.tabnum == 1) {
        for (var i = 0; i < this.formradio1.length; i++) {
          this.formradio1[i] = 1;
        }
      }
      
      // else if (this.tabnum == 3) {
      //   for (var i = 0; i < this.formradio3.length; i++) {
      //     this.formradio3[i] = 1;
      //   }
      // }
      this.tableDatalist1 = [];
      this.totalurl1 = 0;
      this.tableDatalist2 = [];
      this.totalurl2 = 0;
      this.tableDatalist3 = [];
      this.totalurl3 = 0;

      // this.newdomainSimpleVo.dateValue_find = dayjs(new Date()).format(
      //   "YYYY-MM-DD"
      // );
      // this.selectedGuishudi = 8;
      if (this.tabnum == 1) {
this.mypageableurl1.pageNumurl=1
        this.xq(1);
      } else if (this.tabnum == 3) {
        // console.log("初复审有一个不确定");
 this.mypageableurl3.pageNumurl=1
        this.xq(3);
      } else if (this.tabnum == 2) {
        // console.log("初复审都不确定");
this.mypageableurl2.pageNumurl=1
        this.xq(2);
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
  // padding: 20px 0 0 20px;
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
  // float: right;
  // margin-right: 4rem;
}
.btn1 {
  float: right;
  font-size: 12px;
}
.form {
  position: relative;
  float: left;
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
  // box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.15);
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
  margin: 3px 0px;
}
table {
  border-collapse: collapse;
  th,
  td {
    font-weight: 400;

    text-align: center;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
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
}
.img1 {
  //padding: 10px 0;
  width: 100%;
  height: 200px;
  //margin-left: 2%;
  //margin-right: 1%;
  border: 5px solid #ccc;
  box-sizing: border-box;
  cursor: pointer;
}
.fuxiugai {
  width: 100%;
  position: relative;
}
.xiugai {
  position: absolute;
  top: 5px;
  right: -20px;
  height: 25px;
  width: 100px;
  // background-color: red;
}
.te {
  color: red;
}
/deep/ .el-input.is-disabled .el-input__inner {
  color: #000;
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
.topsd{position: absolute;
top: -10px;}
.timerq{
  width: 250px;
}
</style>