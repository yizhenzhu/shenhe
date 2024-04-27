<template>
    <div class="right_main_under">
      <el-form size="mini" label-width="80px" :inline="true" >
        <el-row :gutter="20">
          <el-col :span="18"
            ><div class="grid-content bg-purple">             
              <el-form-item>
                <el-input v-model="inputCity" placeholder="推送城市" clearable @clear="onClear"></el-input>
              </el-form-item>
              <!-- 流程记录页面头部模块——初审 -->
              </div
          ></el-col>
          <el-col :span="6"
            ><div class="grid-content bg-purple" style="float:right">
              <!-- 流程记录页面头部模块——button -->
              <el-button size="mini" type="primary" plain @click="chaxun"
                >查询</el-button
              >              
              <!-- 导出 -->
              <!-- <el-button
                size="mini"                
                type="success"
                plain
                @click="put"
                :loading="loadingbut"
                >{{ loadingbuttext }}</el-button
              > -->
              <el-button size="mini" type="success" plain @click="tianjia"
              >添加</el-button
            >
            </div></el-col
          >
        </el-row>
      </el-form>
  
      <el-row style="margin-top: 20px">
      <el-col :span="24">
        <el-table
          border
          ref="multipleTable"
          :data="tableData"
          style="width: 100%"
          v-loading = "loading"
          max-height="550px"
          size="mini"
          class="tableStyle"
          empty-text="暂无数据"
        >
          <el-table-column prop="ID" label="序号" type="index">
            <template slot-scope="scope"
              ><span v-text="getIndex(scope.$index)"></span
            ></template>
          </el-table-column>
          <el-table-column prop="name" label="推送城市"> </el-table-column>
          <el-table-column prop="datasource" label="源城市"></el-table-column>
          <el-table-column  label="推送时间">
            <template slot-scope="scope">
              {{ time(scope.row.startDate) }} - {{ time(scope.row.endDate) }}
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              {{ scope.row.status == "Disabled" ? "未启用" : "启用" }}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="bianji(scope.row)"
                >编辑</el-button
              >
              <el-button size="mini" type="text" @click="xiangqing(scope.row)"
                >详情</el-button
              >
              <el-button size="mini" type="text" @click="ceshi(scope.row.id)">测试</el-button>
              
              <!-- <el-button size="mini" type="text" @click="del(scope.row.id)" class="textDangerBut">删除</el-button> -->
            </template>
          </el-table-column>
          <el-table-column >
            <template slot-scope="scope">
              <el-button v-if="scope.row.status=='Disabled'" size="mini" plain round type="success" @click="EnOrDisFn(scope.row,'Enabled')">启用</el-button>
              <el-button v-if="scope.row.status=='Enabled'" size="mini" plain round type="danger" @click="EnOrDisFn(scope.row,'Disabled')">停用</el-button>
              <!-- <el-button size="mini" type="primary" plain round @click="xiugai(scope.row)"
                >手动推送</el-button> -->
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
        </div>
      </el-col>
    </el-row>
    <!-- 新增的文件上传/数据推送dialog -->
    <!-- class="dialogInfo" -->
    <el-dialog
      title="添加"
      :visible.sync="dialogEdit"
      width="31%"
      :before-close="handleClose"
      top="10px"
      :close-on-click-modal="true"
    >
      <el-form
        ref="dialogFormData"
        label-width="130px"        
        :model="dialogFormData"
        size="mini"
        :rules="rules"
      >
      <!-- :inline="true" 原el-form的 -->
        <!-- 数据源 多选下拉框 -->
        <el-form-item label="推送城市：" prop="pushCity" label-width="130px">
          <el-input
            v-model="dialogFormData.pushCity"
            placeholder="请输入推送城市"
            style="width:220px"
          ></el-input>
        </el-form-item>
        <!-- 推送协议 -->
        <el-form-item label="源城市：" prop="multCitySelect">
          <el-select v-model="dialogFormData.multCitySelect" multiple placeholder="请选择">
            <el-option
              v-for="item in dialogFormData.multCityOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始日期：" prop="startDate" >
          <el-date-picker
          :picker-options="pickerOptions"
            v-model="dialogFormData.startDate"
            type="date"
            placeholder="选择日期"
            :clearable = "false">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束日期：" prop="endDate" >
          <el-date-picker
          :picker-options="pickerOptions"
            v-model="dialogFormData.endDate"
            type="date"
            placeholder="选择日期"
            :clearable = "false">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="推送协议：" prop="protocolSelect">
          <el-select v-model="dialogFormData.protocolSelect" placeholder="请选择">
            <el-option
              v-for="item in dialogFormData.protocolOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="推送文件类型：" prop="fileTypeSelect" >
          <el-select v-model="dialogFormData.fileTypeSelect" placeholder="请选择">
            <el-option
              v-for="item in dialogFormData.fileTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文件命名格式：" prop="filenamePattern" >
          <el-input
            v-model="dialogFormData.filenamePattern"
            placeholder="eg.beijing_${date}_${uuid}.csv"
          ></el-input>
        </el-form-item>
        <el-form-item label="推送类型：" prop="multPushTypeSelect" >
          <el-select v-model="dialogFormData.multPushTypeSelect" multiple placeholder="请选择">
            <el-option
              v-for="item in dialogFormData.multPushTypeOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="需要推送字段：" prop="multPushByteSelect" >
          <el-select v-model="dialogFormData.multPushByteSelect" multiple placeholder="请选择">
            <el-option
              v-for="item in dialogFormData.multPushByteOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否推送截图："  >
          <el-select v-model="dialogFormData.pushImageSelect" placeholder="请选择">
            <el-option
              v-for="item in dialogFormData.pushImageOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否需要header："  >
          <el-select v-model="dialogFormData.pushHeaderSelect" placeholder="请选择">
            <el-option
              v-for="item in dialogFormData.pushHeaderOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="推送服务器IP："  >
          <el-input
            v-model="dialogFormData.pushServerIP"
            placeholder="请输入推送服务器IP"
          ></el-input>
        </el-form-item>
        <el-form-item label="推送服务器端口："  >
          <el-input
            v-model="dialogFormData.pushServerPort"
            placeholder="请输入推送服务器端口"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户名："  >
          <el-input
            v-model="dialogFormData.sftpUsername"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码："  >
          <el-input
            v-model="dialogFormData.sftpPassword"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="推送路径："  >
          <el-input
            v-model="dialogFormData.sftpPushPath"
            placeholder="请输入推送路径"
          ></el-input>
        </el-form-item>
        <el-form-item label="推送用途：" prop="pushUse" >
          <el-input
            v-model="dialogFormData.pushUse"
            type="textarea"
            autosize
            placeholder="请输入推送用途"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态：">
          <el-radio v-model="dialogFormData.radio" label="Enabled">启用</el-radio>
          <el-radio v-model="dialogFormData.radio" label="Disabled"
            >未启用</el-radio
          >
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="xiaoyan('dialogFormData')" plain :loading="addLoading"
          >确 定</el-button
        >
        <el-button @click="quxiao" size="mini" plain>取 消</el-button>
      </span>
    </el-dialog>
    <!-- 编辑dialog -->
    <el-dialog
      title="编辑"
      :visible.sync="dialogEdit2"
      width="31%"
      :before-close="handleClose"
      top="10px"
      :close-on-click-modal="true"
    >
      <el-form
        ref="dialogFormData2"
        label-width="130px"        
        :model="dialogFormData2"
        size="mini"
        :rules="rules"
      >
      <!-- :inline="true" 原el-form的 -->
        <!-- 数据源 多选下拉框 -->
        <el-form-item label="推送城市：" prop="pushCity" label-width="130px">
          <el-input
            v-model="dialogFormData2.pushCity"
            placeholder="请输入推送城市"
            style="width:220px"
          ></el-input>
        </el-form-item>
        <!-- 推送协议 -->
        <el-form-item label="源城市：" prop="multCitySelect" >
          <el-select v-model="dialogFormData2.multCitySelect" multiple placeholder="请选择">
            <el-option
              v-for="item in dialogFormData2.multCityOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始日期：" prop="startDate" >
          <el-date-picker
          
          :picker-options="pickerOptions"
            v-model="dialogFormData2.startDate"
            type="date"
            placeholder="选择日期"
            :clearable = "false">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束日期：" prop="endDate" >
          <el-date-picker
          :picker-options="pickerOptions"
            v-model="dialogFormData2.endDate"
            type="date"
            placeholder="选择日期"
            :clearable = "false">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="推送协议：" prop="protocolSelect" >
          <el-select v-model="dialogFormData2.protocolSelect" placeholder="请选择">
            <el-option
              v-for="item in dialogFormData2.protocolOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="推送文件类型：" prop="fileTypeSelect" >
          <el-select v-model="dialogFormData2.fileTypeSelect" placeholder="请选择">
            <el-option
              v-for="item in dialogFormData2.fileTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文件命名格式：" prop="filenamePattern" >
          <el-input
            v-model="dialogFormData2.filenamePattern"
            placeholder="eg.beijing_${date}_${uuid}.csv"
          ></el-input>
        </el-form-item>
        <el-form-item label="推送类型：" prop="multPushTypeSelect" >
          <el-select v-model="dialogFormData2.multPushTypeSelect" multiple placeholder="请选择">
            <el-option
              v-for="item in dialogFormData2.multPushTypeOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="需要推送字段：" prop="multPushByteSelect" >
          <el-select v-model="dialogFormData2.multPushByteSelect" multiple placeholder="请选择">
            <el-option
              v-for="item in dialogFormData2.multPushByteOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否推送截图："  >
          <el-select v-model="dialogFormData2.pushImageSelect" placeholder="请选择">
            <el-option
              v-for="item in dialogFormData2.pushImageOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否需要header："  >
          <el-select v-model="dialogFormData2.pushHeaderSelect" placeholder="请选择">
            <el-option
              v-for="item in dialogFormData2.pushHeaderOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="推送服务器IP："  >
          <el-input
            v-model="dialogFormData2.pushServerIP"
            placeholder="请输入推送服务器IP"
          ></el-input>
        </el-form-item>
        <el-form-item label="推送服务器端口："  >
          <el-input
            v-model="dialogFormData2.pushServerPort"
            placeholder="请输入推送服务器端口"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户名："  >
          <el-input
            v-model="dialogFormData2.sftpUsername"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码："  >
          <el-input
            v-model="dialogFormData2.sftpPassword"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="推送路径："  >
          <el-input
            v-model="dialogFormData2.sftpPushPath"
            placeholder="请输入推送路径"
          ></el-input>
        </el-form-item>
        <el-form-item label="推送用途：" prop="pushUse" >
          <el-input
            v-model="dialogFormData2.pushUse"
            type="textarea"
            autosize
            placeholder="请输入推送用途"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态：">
          <el-radio v-model="dialogFormData2.radio" label="Enabled">启用</el-radio>
          <el-radio v-model="dialogFormData2.radio" label="Disabled"
            >未启用</el-radio
          >
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="xiaoyan('dialogFormData2')" plain :loading="editLoading"
          >确 定</el-button
        >
        <el-button @click="quxiao" size="mini" plain>取 消</el-button>
      </span>
    </el-dialog>
    <!-- 详情dialog -->
    <el-dialog
      title="数据详情"
      :visible.sync="dialogEdit3"
      width="31%"
      :before-close="handleClose"
      top="90px"
      :close-on-click-modal="true"
    >
    <span>推送城市：</span> <span>{{ dialogFormData2.pushCity }}</span><br/>
    <span>源城市：</span> <span>{{ dialogFormData2.cityString }}</span><br/>
    <span>开始日期：</span> <span>{{ dialogFormData2.startDate }}</span><br/>
    <span>结束日期：</span> <span>{{ dialogFormData2.endDate }}</span><br/>
    <span>推送协议：</span> <span>{{ dialogFormData2.protocolSelect }}</span><br/>
    <span>推动文件类型：</span> <span>{{ dialogFormData2.fileTypeSelect }}</span><br/>
    <span>文件命名格式：</span> <span>{{ dialogFormData2.filenamePattern }}</span><br/>
    <span>推送类型：</span> <span>{{ dialogFormData2.fraudTypeString }}</span><br/>
    <span>需要推送字段：</span> <span>{{ dialogFormData2.fieldsString }}</span><br/>
    <span>是否推动截图：</span> <span>{{ dialogFormData2.pushImageSelect }}</span><br/>
    <span>csv或xlsx推送时，是否需要header：</span> <span>{{ dialogFormData2.pushHeaderSelect }}</span><br/>
    <span>推送服务器IP为：</span> <span>{{ dialogFormData2.pushServerIP }}</span><br/>
    <span>推送服务器端口为：</span> <span>{{ dialogFormData2.pushServerPort }}</span><br/>
    <span>sftp/ftp/ssh用户名：</span> <span>{{ dialogFormData2.sftpUsername }}</span><br/>
    <span>sftp/ftp/ssh密码：</span> <span>{{ dialogFormData2.sftpPassword }}</span><br/>
    <span>sftp/ftp/ssh推送路径：</span> <span>{{ dialogFormData2.sftpPushPath }}</span><br/>
    <span>推送用途：</span> <span>{{ dialogFormData2.pushUse }}</span><br/>
    <span>状态：</span> <span> {{ dialogFormData2.radio == 'Enabled'?'启用':'未启用' }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="queding3" plain
          >确 定</el-button
        >
        <el-button @click="quxiao" size="mini" plain>取 消</el-button>
      </span>
    </el-dialog>
    </div>
  </template>
  
  <script>
  import dayjs from "dayjs";
  import qs from 'qs';
  export default {
    data() {
      return {
        addLoading:false,
        editLoading:false,
        pickerOptions: {
          disabledDate(time) {
            const today = new Date(new Date().toLocaleDateString()).getTime();
            return time.getTime() < today;
          }},
        rules:{
          multPushByteSelect:[{
            type:'array',required: true, message: '请至少选择一个推送字段', trigger: 'change',
          }],
          // multPushTypeSelect:[{
          //   type:'array',required: true, message: '请至少选择一个推送类型', trigger: 'change',
          // }],
          protocolSelect:[{
            required: true, message: '请选择推送协议', trigger: 'change',
          }],
          pushCity:[{
            required: true,  trigger: 'change', message: '请输入推送城市'
          }],
          fileTypeSelect:[{
            required: true, message: '请选择推送文件类型', trigger: 'change',
          }],
          multCitySelect:[{
            type:'array',required: true, message: '请至少选择一个源城市', trigger: 'change',
          }],
          endDate:[{
            required: true, message: '请选择日期', trigger: 'change',
          }],
          // fields:[{
          //   type:'array',required: true, message: '请至少选择一个推送字段', trigger: 'change',
          // }],
          filenamePattern:[{
            required: true,  message:'请输入命名格式', trigger: 'change'
          }],
          pushUse:[{
            required: true, message: '请输入推送用途', trigger: 'change',
          }],
          startDate:[{
            required: true, message: '请选择日期', trigger: 'change',
          }],
          
        },
        inputCity: null,
        dialogFormData:{
          id:null,
          pushCity:null,
          multCityOptions: [],
          multCitySelect:[],
          startDate:dayjs(new Date()).format("YYYY-MM-DD"),
          endDate:dayjs(new Date()).format("YYYY-MM-DD"),
          protocolSelect:null,
          protocolOptions: [{
            value: 'SFTP',
            label: 'SFTP'
          }, {
            value: 'FTP',
            label: 'FTP'
          }, {
            value: 'SSH',
            label: 'SSH'
          }],
          fileTypeSelect:null,
          fileTypeOptions:[{
            value: 'csv',
            label: 'csv'
          }, {
            value: 'json',
            label: 'json'
          }, {
            value: 'xlsx',
            label: 'xlsx'
          }
        ],
          multPushTypeSelect:[],
          multPushTypeOptions:[],
          multPushByteSelect:[],
          multPushByteOptions:[],
          pushImageSelect:'NO',
          pushImageOptions:[{
            value: 'YES',
            label: '是'
          }, {
            value: 'NO',
            label: '否'
          }],
          pushHeaderSelect:'NO',
          pushHeaderOptions:[{
            value: 'YES',
            label: '是'
          }, {
            value: 'NO',
            label: '否'
          }],
          filenamePattern:null,
          pushServerIP:null,
          pushServerPort:null,
          sftpUsername:null,
          sftpPassword:null,
          sftpPushPath:null,
          pushUse:null,
          radio:"Disabled"
        },        
        EnOrDis:true,
        
        dialogFormData2:{
          id:null,
          cityString:null,  // 详情dialog的city
          fieldsString:null, //详情dialog的fields
          fraudTypeString:null,
          pushCity:null,
          multCityOptions: [],
          multCitySelect:[],
          startDate:dayjs(new Date()).format("YYYY-MM-DD"),
          endDate:dayjs(new Date()).format("YYYY-MM-DD"),
          protocolSelect:null,
          protocolOptions: [{
            value: 'SFTP',
            label: 'SFTP'
          }, {
            value: 'FTP',
            label: 'FTP'
          }, {
            value: 'SSH',
            label: 'SSH'
          }],
          fileTypeSelect:null,
          fileTypeOptions:[{
            value: 'csv',
            label: 'csv'
          }, {
            value: 'json',
            label: 'json'
          }, {
            value: 'xlsx',
            label: 'xlsx'
          }
        ],
          multPushTypeSelect:[],
          multPushTypeOptions:[],
          multPushByteSelect:[],
          multPushByteOptions:[],
          pushImageSelect:'NO',
          pushImageOptions:[{
            value: 'YES',
            label: '是'
          }, {
            value: 'NO',
            label: '否'
          }],
          pushHeaderSelect:'NO',
          pushHeaderOptions:[{
            value: 'YES',
            label: '是'
          }, {
            value: 'NO',
            label: '否'
          }],
          filenamePattern:null,
          pushServerIP:null,
          pushServerPort:null,
          sftpUsername:null,
          sftpPassword:null,
          sftpPushPath:null,
          pushUse:null,
          radio:""
        },
        
        shangchuan:null,
        form: {
          name: null,
          shenhe: null,
          chuzhi: null,
          chengshi:null,
          dateValue_find:[
            dayjs(new Date()).format("YYYY-MM-DD") ,dayjs(new Date()).format("YYYY-MM-DD")
          ],
          username: null,
        },
        whiteSearchList: {
          startCreateTime:dayjs(new Date()).format("YYYY-MM-DD") ,
          endCreateTime: dayjs(new Date()).format("YYYY-MM-DD")
        },
        tableData: [
        ],
        mypageable: {
          pageNum: 1,
          pageSize: 10,
        },
        total: 1,
        totalPages: "",
        selectData: {
          type: [],
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
        loading:false,
        dialogEdit:false,
        dialogEdit2:false,
        dialogEdit3:false,
      };
    },
    created() {
      this.getSelectionData()
    },
    methods: {
      // fileNameCheck(rule, value, callback){
 
      //   // console.log(this.dialogFormData2.fileTypeSelect);
      //   const regex = /\.csv$/,regex2 = /\.json$/
      //   if(this.dialogFormData2.fileTypeSelect=='csv'){
      //     if(!regex.test(value)){
      //       callback(new Error('请正确输入命名格式'));
      //     }
      //   }else if(this.dialogFormData2.fileTypeSelect=='json'){
      //     if(!regex2.test(value)){
      //       callback(new Error('请正确输入命名格式'));
      //     }
      //   }
      // },
      async getSelectionData(){
        this.loading = true
        const promise1 = this.$http.get("/dictionary/datasource");
        const promise2 = this.$http.get("/dictionary/fraudType",{params:{isBig:true}})
        const promise3 = this.$http.get("/dictionary/pushFields")
        const [sourceData,fraudData,fieldData] = await Promise.all([promise1,promise2,promise3])
        // console.log(sourceData.data.data); 
        // console.log(fraudData.data.data);
        // console.log(fieldData.data.data)
        let fieldDataArr = []
        for (const key in fieldData.data.data) {
          // console.log(key);
          // console.log(fieldData.data.data[key]);
          fieldDataArr.push({
            value:key,
            label:fieldData.data.data[key]
          })
        }
        // console.log(fieldDataArr);
        if(sourceData.data.code === 200 && fraudData.data.code === 200){
          this.dialogFormData.multCityOptions = sourceData.data.data
          this.dialogFormData.multPushTypeOptions= fraudData.data.data
          this.dialogFormData.multPushByteOptions= fieldDataArr
          this.dialogFormData2.multCityOptions = sourceData.data.data
          this.dialogFormData2.multPushTypeOptions= fraudData.data.data
          this.dialogFormData2.multPushByteOptions= fieldDataArr
        }
        this.techlist()
    },
    onClear(){
      console.log('清空了');
      this.techlist()
    },
     //初始化列表
     async techlist() {
        let list = {
          name: this.inputCity,
          // status: 'Enabled',
          page: this.mypageable.pageNum,
          pageSize: this.mypageable.pageSize,
        };
        // console.log(list);
        const { data: res } = await this.$http.get("/admin/pushStrategy/list",{params:list});
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
      // 启用与停用
      async EnOrDisFn(row,sta){
        if(sta=="Enabled"){
          const url = "/admin/pushStrategy/enable?" + qs.stringify({id:row.id});
          const { data: res } = await this.$http.post(url);
          if (res.code == 200) {
            this.$message(res.message)
            row.status = sta
          }else{
            this.$message(res.message)
            // row.status = sta
          }
        }
        else if(sta=="Disabled"){
          const url = "/admin/pushStrategy/disable?" + qs.stringify({id:row.id});
          const { data: res } = await this.$http.post(url);
          if (res.code == 200) {
            this.$message(res.message)
            row.status = sta
          }else{
            this.$message(res.message)
            // row.status = sta
          }
        }
      },
      tianjia(){
        this.dialogFormData.pushCity = null
        this.dialogFormData.fileTypeSelect = null
        this.dialogFormData.startDate = null
        this.dialogFormData.endDate = null
        this.dialogFormData.multCitySelect = [] // 待改
        this.dialogFormData.multPushByteSelect = []
        this.dialogFormData.multPushTypeSelect = []
        this.dialogFormData.filenamePattern =null
        this.dialogFormData.fraudTypes =null
        this.dialogFormData.pushServerIP =null
        this.dialogFormData.pushServerPort =null
        this.dialogFormData.sftpUsername =null
        this.dialogFormData.pushHeaderSelect ='NO'
        this.dialogFormData.pushImageSelect ='NO'
        this.dialogFormData.sftpPassword =null
        this.dialogFormData.protocolSelect =null
        this.dialogFormData.sftpPushPath = null
        this.dialogFormData.id = null
        this.dialogFormData.pushUse = null
        // dialogFormData.multPushByteSelect =row.pushServer
        // this.dialogFormData.EnOrDis =null
        this.dialogEdit = true
      },
      bianji(row){
        // console.log(row.fields);
        if(row.fields!==null&&row.fields!==""&&row.fields!==undefined){
          let fieldsArr = row.fields.split(",")
          this.dialogFormData2.multPushByteSelect = Object.assign([],fieldsArr)
        }else{
          this.dialogFormData2.multPushByteSelect = []
        }
        // console.log(row.datasourceIds);
        if(row.datasourceIds!==null&&row.datasourceIds!==""&&row.datasourceIds!==undefined){
          let datasourceArr = row.datasourceIds.split(",").map(num=>parseInt(num))              
          this.dialogFormData2.multCitySelect = Object.assign([],datasourceArr)  // 为源城市的多选框赋值
        }else{
          this.dialogFormData2.multCitySelect = []
        }
        // console.log(this.dialogFormData2.multCitySelect );
        // console.log(row);
        if(row.bigFraudTypeIds!==null&&row.bigFraudTypeIds!==""&&row.bigFraudTypeIds!==undefined){
          let fraudTypeArr = row.bigFraudTypeIds.split(",").map(num=>parseInt(num))  
          this.dialogFormData2.multPushTypeSelect = Object.assign([],fraudTypeArr)
        }else{
          this.dialogFormData2.multPushTypeSelect = []
        }
        this.dialogFormData2.pushCity = row.name
        this.dialogFormData2.fileTypeSelect = row.contentType
        this.dialogFormData2.startDate = row.startDate
        this.dialogFormData2.endDate = row.endDate
        this.dialogFormData2.filenamePattern =row.filenamePattern
        this.dialogFormData2.pushServerIP =row.host
        this.dialogFormData2.pushServerPort =row.port
        this.dialogFormData2.sftpUsername =row.username
        this.dialogFormData2.pushHeaderSelect =row.needHeader
        this.dialogFormData2.pushImageSelect =row.needImage
        this.dialogFormData2.sftpPassword =row.password        
        this.dialogFormData2.protocolSelect =row.protocol
        this.dialogFormData2.sftpPushPath =row.path
        this.dialogFormData2.radio =row.status
        this.dialogFormData2.pushUse = row.remark
        this.dialogFormData2.id = row.id
        this.dialogEdit2 = true        
      },
      xiangqing(row){
        const map = {
          'id':'域名ID',
          'url': 'url', 
          'ip': '目标IP',
          'feature': '特征号',
          'bigFraudType':'涉诈大类型',
          'fraudType':'涉诈小类型', 
           'treatStatus' :'处置状态',  
           'rejectReason' :'未被处置原因',  
           'discoverDate': '发现日期',  
           'visits':'访问量',
           'treatDate': '处置日期',  
           'snapshot' :'截图名称'
          }
          const fieldsMap = []
          row.fields.split(',').map((field)=>{
            field = map[field]
            fieldsMap.push(field)
          })
        this.dialogFormData2.cityString = row.datasource
        this.dialogFormData2.fieldsString = fieldsMap.join(',')
        this.dialogFormData2.fraudTypeString = row.bigFraudTypes
        this.dialogFormData2.pushCity = row.name
        this.dialogFormData2.fileTypeSelect = row.contentType
        this.dialogFormData2.startDate = row.startDate
        this.dialogFormData2.endDate = row.endDate
        this.dialogFormData2.filenamePattern =row.filenamePattern
        // this.dialogFormData2.fraudTypes =row.fraudTypes
        this.dialogFormData2.pushServerIP =row.host
        this.dialogFormData2.sftpUsername =row.username
        this.dialogFormData2.pushHeaderSelect =row.needHeader
        this.dialogFormData2.pushImageSelect =row.needImage
        this.dialogFormData2.sftpPassword =row.password
        this.dialogFormData2.pushServerPort =row.port
        this.dialogFormData2.protocolSelect =row.protocol
        this.dialogFormData2.sftpPushPath =row.path
        this.dialogFormData2.pushUse =row.remark
        this.dialogFormData2.radio =row.status
        console.log();
        this.dialogEdit3 = true
      },
      async ceshi(row){
        console.log(row);
        const url = "/admin/pushStrategy/test?" + qs.stringify({id:row})
        const { data: res } = await this.$http.post(url);
        if (res.code == 200) {
          // this.tableData = res.dataList;
          // this.total = res.totalSum;
          this.$message(res.message)
          this.dialogEdit = false
        }else{
          this.$message(res.message)
          this.dialogEdit = false
        }
      },
      isEmpty(textbox) {
        
        var value = textbox.trim();        
        return value.length === 0;
      },
      xiaoyan(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(formName == 'dialogFormData'){
              const regex = /\.csv$/,regex2 = /\.json$/,regex3 = /\.xlsx$/,regex4 = /^(0|[1-9]\d{0,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/
              if(this.dialogFormData.fileTypeSelect=='csv'){
                if(!regex.test(this.dialogFormData.filenamePattern)){
                  this.$message('请输入以csv结尾的命名格式')
                  return false
                }
              }else if(this.dialogFormData.fileTypeSelect=='json'){
                if(!regex2.test(this.dialogFormData.filenamePattern)){
                  this.$message('请输入以json结尾的命名格式')
                  return false
                }
              }
              else if(this.dialogFormData.fileTypeSelect=='xlsx'){
                if(!regex3.test(this.dialogFormData.filenamePattern)){
                  this.$message('请输入以xlsx结尾的命名格式')
                  return false
                }
              }
              if(this.dialogFormData.pushServerPort == null||this.dialogFormData.pushServerPort.length == 0){
                this.queding()
              }else if(!regex4.test(this.dialogFormData.pushServerPort)){
                // if(!this.isEmpty(this.dialogFormData.pushServerPort)){
                  this.$message('端口号请输入0-65535的数字！')
                  return false
                // }
                
              }else{
                this.queding()
              }
              // if(!this.isEmpty(this.dialogFormData.pushCity)){
              //   this.$message('请正确输入推送城市！')
              //     return false
              // }
              
            }else if(formName == 'dialogFormData2'){
              const regex = /\.csv$/,regex2 = /\.json$/,regex3 = /\.xlsx$/,regex4 = /^(0|[1-9]\d{0,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/
              if(this.dialogFormData2.fileTypeSelect=='csv'){
                if(!regex.test(this.dialogFormData2.filenamePattern)){
                  this.$message('请输入以csv结尾的命名格式')
                  return false
                }
              }else if(this.dialogFormData2.fileTypeSelect=='json'){
                if(!regex2.test(this.dialogFormData2.filenamePattern)){
                  this.$message('请输入以json结尾的命名格式')
                  return false
                }
              }else if(this.dialogFormData2.fileTypeSelect=='xlsx'){
                if(!regex3.test(this.dialogFormData2.filenamePattern)){
                  this.$message('请输入以xlsx结尾的命名格式')
                  return false
                }
              }
              if(this.dialogFormData2.pushServerPort == null||this.dialogFormData2.pushServerPort.length == 0){
                this.queding2()
              }else if(!regex4.test(this.dialogFormData2.pushServerPort)){
                // if(!this.isEmpty(this.dialogFormData2.pushServerPort)){
                  this.$message('端口号请输入0-65535的数字！')
                  return false
                // }
              }else{
                this.queding2()
              }
              // if(!this.isEmpty(this.dialogFormData2.pushCity)){
              //   this.$message('请正确输入推送城市！')
              //     return false
              // }
              
            }
          } else {
            // console.log('error submit!!');
            // this.$message('error submit!!')
            return false;
          }
        });        
      },
      // dialog点击确定按钮 走接口
      async queding(){
        // console.log('走到添加 确定按钮了');
        this.addLoading = true
        let datasourceStr = this.dialogFormData.multCitySelect.join()
        let fieldsStr = this.dialogFormData.multPushByteSelect.join()
        let pushTypeSelectStr = this.dialogFormData.multPushTypeSelect.join()
        let list = 
          {
          bigFraudType: pushTypeSelectStr,
          datasource: datasourceStr,
          endDate:dayjs(this.dialogFormData.endDate).format('YYYY-MM-DD') ,
          contentType:this.dialogFormData.fileTypeSelect,
          fields:fieldsStr,
          filenamePattern: this.dialogFormData.filenamePattern,
          host: this.dialogFormData.pushServerIP,
          name: this.dialogFormData.pushCity,
          needHeader: this.dialogFormData.pushHeaderSelect,
          needImage: this.dialogFormData.pushImageSelect,
          password: this.dialogFormData.sftpPassword,
          path: this.dialogFormData.sftpPushPath,
          port: this.dialogFormData.pushServerPort,
          protocol: this.dialogFormData.protocolSelect,
          remark: this.dialogFormData.pushUse,
          startDate: dayjs(this.dialogFormData.startDate).format('YYYY-MM-DD') ,
          status: this.dialogFormData.radio,
          username: this.dialogFormData.sftpUsername
        };
        const { data: res } = await this.$http.post("/admin/pushStrategy/add", list);
        if (res.code == 200) {
          // this.tableData = res.dataList;
          // this.total = res.totalSum;
          this.$message('添加成功')
          this.techlist()
          this.dialogEdit = false
          this.addLoading = false
        }else{
          this.$message(res.message)
          // this.dialogEdit = false
          this.addLoading = false
        }
        
      },
      async queding2(){
        // console.log('走到编辑 确定按钮了');
        this.editLoading = true
        let datasourceStr = this.dialogFormData2.multCitySelect.join()
        let fieldsStr = this.dialogFormData2.multPushByteSelect.join()
        let pushTypeSelectStr = this.dialogFormData2.multPushTypeSelect.join()
        console.log(this.dialogFormData2.pushTypeSelectStr);
        let list = 
          {
            bigFraudType: pushTypeSelectStr,
          datasource: datasourceStr,
          endDate:dayjs(this.dialogFormData2.endDate).format('YYYY-MM-DD') ,
          contentType:this.dialogFormData2.fileTypeSelect,
          fields:fieldsStr,
          filenamePattern: this.dialogFormData2.filenamePattern,
          host: this.dialogFormData2.pushServerIP,
          name: this.dialogFormData2.pushCity,
          needHeader: this.dialogFormData2.pushHeaderSelect,
          needImage: this.dialogFormData2.pushImageSelect,
          password: this.dialogFormData2.sftpPassword,
          path: this.dialogFormData2.sftpPushPath,
          port: this.dialogFormData2.pushServerPort,
          protocol: this.dialogFormData2.protocolSelect,
          remark: this.dialogFormData2.pushUse,
          startDate:dayjs(this.dialogFormData2.startDate).format('YYYY-MM-DD') ,
          status: this.dialogFormData2.radio,
          username: this.dialogFormData2.sftpUsername,
          id: this.dialogFormData2.id,
        };
        const { data: res } = await this.$http.post("/admin/pushStrategy/edit", list);
        if (res.code == 200) {
          // this.tableData = res.dataList;
          // this.total = res.totalSum;
          this.$message('修改成功')
          this.techlist()
          this.dialogEdit2 = false
          this.editLoading = false
        }else{
          this.$message(res.message)
          // this.dialogEdit2 = false
          this.editLoading = false
        }
      },
      queding3(){
        this.dialogEdit3 = false
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
     
      chongzhi() {
        // this.form.chuzhi = null;
        // this.mypageable.pageNum = 1;
        // this.mypageable.pageSize = 50;
        // this.form.shenhe = null;
        // this.form.username = null;
        this.whiteSearchList.startCreateTime = dayjs(new Date()).format("YYYY-MM-DD");
        this.whiteSearchList.endCreateTime = dayjs(new Date()).format("YYYY-MM-DD");
        this.form.dateValue_find=[dayjs(new Date()).format("YYYY-MM-DD") ,dayjs(new Date()).format("YYYY-MM-DD")]
          //  this.form.username=JSON.parse(window.sessionStorage.getItem('one'))
        // this.techlist();
      },
      //精确导出  
      async put() {
      this.loadingbuttext = "...加载中";
      this.loadingbut = true;
      let list = {
        source: this.form.name,
        start: this.whiteSearchList.startCreateTime,
        end: this.whiteSearchList.endCreateTime,
        fraudType: this.form.shezhaType,
        yjcType: this.form.http,
        url: this.form.url,
      };
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
    handleClose() {
      this.dialogEdit = false;
      this.dialogEdit2 = false;
      this.dialogEdit3 = false;
    },
    quxiao() {
      this.dialogEdit = false;
      this.dialogEdit2 = false;
      this.dialogEdit3 = false;
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
          // return dayjs(val).format("YYYY-MM-DD  HH:mm:ss");
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
    watch:{
      // 'dialogFormData2.fileTypeSelect':{
      //   immediate:true,
      //   handler(newVal,oldVal){
      //   }
      // }
      'dialogFormData2.startDate':{
        handler(newVal,oldVal){
          // if(dayjs(this.dialogFormData2.endDate).format('YYYY-MM-DD') < dayjs(new Date()).format("YYYY-MM-DD")){
          //   this.dialogFormData2.endDate = new Date()
          // }
          // if(dayjs(newVal).format('YYYY-MM-DD') < dayjs(new Date()).format("YYYY-MM-DD")){
          //   this.dialogFormData2.startDate = new Date()
          // }
          if(dayjs(newVal).format('YYYY-MM-DD') > dayjs(this.dialogFormData2.endDate).format('YYYY-MM-DD')){
            this.dialogFormData2.startDate = this.dialogFormData2.endDate
          }
        }
      },
      'dialogFormData2.endDate':{
        handler(newVal,oldVal){
          // if(dayjs(newVal).format('YYYY-MM-DD') < dayjs(new Date()).format("YYYY-MM-DD")){
          //   this.dialogFormData2.endDate = new Date()
          // }
          if(dayjs(newVal).format('YYYY-MM-DD') < dayjs(this.dialogFormData2.startDate).format('YYYY-MM-DD')){
            this.dialogFormData2.endDate = this.dialogFormData2.startDate
          }
        }
      },
      'dialogFormData.startDate':{
        handler(newVal,oldVal){
          // if(dayjs(newVal).format('YYYY-MM-DD') < dayjs(new Date()).format("YYYY-MM-DD")){
          //   this.dialogFormData.startDate = new Date()
          // }
          if(dayjs(newVal).format('YYYY-MM-DD') > dayjs(this.dialogFormData.endDate).format('YYYY-MM-DD')){
            this.dialogFormData.startDate = this.dialogFormData.endDate
          }
        }
      },
      'dialogFormData.endDate':{
        handler(newVal,oldVal){
          // if(dayjs(newVal).format('YYYY-MM-DD') < dayjs(new Date()).format("YYYY-MM-DD")){
          //   this.dialogFormData.endDate = new Date()
          // }
          if(dayjs(newVal).format('YYYY-MM-DD') < dayjs(this.dialogFormData.startDate).format('YYYY-MM-DD')){
            this.dialogFormData.endDate = this.dialogFormData.startDate
          }
        }
      },
    }
  };
  </script>
  
  <style scoped lang='less'>
  .textDangerBut{
    color: red;
  }
  .textDangerBut:hover{
    color:rgb(254, 102, 102)
  }
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
    width: 220px;
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