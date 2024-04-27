<template>
  <div class="right_main_under">
    <el-form size="mini" label-width="80px">
      <el-row :gutter="20">
        <el-col :span="6"
          ><div class="grid-content bg-purple">
            <el-form-item label="时间：">
              <!-- //待审核模块--时间 -->
              <el-date-picker
                v-model="newdomainSimpleVo.dateValue_find"
                type="daterange"
                :change="dataCreate_change(newdomainSimpleVo.dateValue_find)"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd "
              >
              </el-date-picker>
            </el-form-item></div
        ></el-col>
        <el-col :span="6"
          ><div class="grid-content bg-purple">
            <!-- //待审核模块--来源 -->
            <el-form-item label="来源：">
              <el-select
                v-model="newdomainSimpleVo.sourceType"
                placeholder="来源"
                clearable
                @clear="sourceType_clearFun(newdomainSimpleVo.sourceType)"
              >
                <el-option
                  v-for="item in selectData.sourceTypeData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item></div
        ></el-col>
        <el-col :span="6"
          ><div class="grid-content bg-purple">
            <!-- //待审核模块--类型 -->
            <el-form-item label="类型：">
              <el-select
                v-model="newdomainSimpleVo.modelType"
                placeholder="类型"
                clearable
                @clear="modelType_clearFun(newdomainSimpleVo.modelType)"
              >
                <el-option
                  v-for="item in selectData.model_typeData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item></div
        ></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6"
          ><div class="grid-content bg-purple">
            <el-form-item label="地区：">
              <el-select
                v-model="newdomainSimpleVo.city"
                placeholder="境内外"
                clearable
                @clear="city_clearFun(newdomainSimpleVo.city)"
              >
                <el-option
                  v-for="item in selectData.cityData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item></div
        ></el-col>
        <el-col :span="6"
          ><div class="grid-content bg-purple">
            <el-form-item label="排名：">
              <el-select
                v-model="newdomainSimpleVo.ranking"
                placeholder="排名"
                clearable
                @clear="ranking_clearFun(newdomainSimpleVo.ranking)"
              >
                <el-option
                  v-for="item in selectData.rankingData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item></div
        ></el-col>
        <el-col :span="6"
          ><div class="grid-content bg-purple">
            <el-form-item label="特征：">
              <el-select
                v-model="newdomainSimpleVo.features"
                placeholder="特征"
                clearable
                @clear="features_clearFun(newdomainSimpleVo.features)"
              >
                <el-option
                  v-for="item in selectData.featuresData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item></div
        ></el-col>
        <el-col :span="6"
          ><div class="grid-content bg-purple">
            <el-form-item>
              <el-button size="mini" type="primary" plain>查询</el-button>
              <el-button size="mini" type="success" plain>重置</el-button>
              <el-button size="mini"  type="info" plain>导出</el-button>
            </el-form-item>
          </div></el-col
        >
      </el-row>
    </el-form>
    <!-- //列表 -->
    <el-table
      border
      ref="multipleTable"
      :data="tableData"
      style="width: 100%"
      max-height="550px"
      size="mini"
      class="tableStyle "
      empty-text="暂无数据"
    >
      <el-table-column prop="ID" label="序号" type='index'> 
   <template slot-scope="scope"><span v-text='getIndex(scope.$index)'></span></template>
      </el-table-column>
      <el-table-column prop="url" label="URL"> </el-table-column>
      <el-table-column prop="url1" label="域名标题"> </el-table-column>

      <el-table-column prop="url2" label="原因"> </el-table-column>
      <el-table-column prop="url3" label="创建时间" sortable> </el-table-column>
      <el-table-column prop="url4" label="IP"> </el-table-column>
      <el-table-column prop="url5" label="类型"> </el-table-column>

      <el-table-column prop="url6" label="境内外"> </el-table-column>
      <el-table-column prop="url7" label="排名"> </el-table-column>
      <el-table-column prop="url8" label="访问量"> </el-table-column>
      <el-table-column prop="url9" label="特征"> </el-table-column>
      <el-table-column prop="url10" label="来源"> </el-table-column>
      <el-table-column prop="url11" label="截图"> </el-table-column>
    </el-table>
    <!-- //分页 -->
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


  </div>
</template>

<script>
import { selectData } from "./js/sourceTypeData.js";
export default {
  name: "daishenhe",
  data() {
    return {
      newdomainSimpleVo: {
        dateValue_find: null, //时间
        sourceType: null, //来源
        modelType: null, //类型
        city: null, //境内外
        ranking: null, //排名
        features: null, //特征
      },
      whiteSearchList: {
        startCreateTime: "",
        endCreateTime: "",
      },
      selectData: selectData,
      mypageable: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 1,
      totalPages: "",
      tableData: [
        {
        
          url: "www.baid.com",
          url1: "发财网",
          url2: "诈骗",
          url3: "2021-02-11 ",
          url4: "xxx.xx.xx.xx",
          url5: "sd",
          url6: "境外",
          url7: "无",
          url8: "200",
          url9: "1",
          url10: "上海1",
          url11: "xx.png",
        },
        {
        
          url: "www.baid.com",
          url1: "发财网",
          url2: "诈骗",
          url3: "2021-03-11 ",
          url4: "xxx.xx.xx.xx",
          url5: "sd",
          url6: "境外",
          url7: "无",
          url8: "200",
          url9: "1",
          url10: "上海",
          url11: "xx.png",
        },
        {
      
          url: "www.baid.com",
          url1: "发财网",
          url2: "诈骗",
          url3: "2021-04-11 ",
          url4: "xxx.xx.xx.xx",
          url5: "sd",
          url6: "境外",
          url7: "无",
          url8: "200",
          url9: "1",
          url10: "上海2",
          url11: "xx.png",
        },
        {
      
          url: "www.baid.com",
          url1: "发财网",
          url2: "诈骗",
          url3: "2021-05-11 ",
          url4: "xxx.xx.xx.xx",
          url5: "sd",
          url6: "境外",
          url7: "无",
          url8: "200",
          url9: "1",
          url10: "上海3",
          url11: "xx.png",
        },
        {
      
          url: "www.baid.com",
          url1: "发财网",
          url2: "诈骗",
          url3: "2021-06-11 ",
          url4: "xxx.xx.xx.xx",
          url5: "sd",
          url6: "境外",
          url7: "无",
          url8: "200",
          url9: "1",
          url10: "上海5",
          url11: "xx.png",
        },
        {
         
          url: "www.baid.com",
          url1: "发财网",
          url2: "诈骗",
          url3: "2021-07-11 ",
          url4: "xxx.xx.xx.xx",
          url5: "sd",
          url6: "境外",
          url7: "无",
          url8: "200",
          url9: "1",
          url10: "上海4",
          url11: "xx.png",
        },
        {
       
          url: "www.baid.com",
          url1: "发财网",
          url2: "诈骗",
          url3: "2021-08-11 ",
          url4: "xxx.xx.xx.xx",
          url5: "sd",
          url6: "境外",
          url7: "无",
          url8: "200",
          url9: "1",
          url10: "上海6",
          url11: "xx.png",
        },
        {
      
          url: "www.baid.com",
          url1: "发财网",
          url2: "诈骗",
          url3: "2021-09-11 ",
          url4: "xxx.xx.xx.xx",
          url5: "sd",
          url6: "境外",
          url7: "无",
          url8: "200",
          url9: "1",
          url10: "上海",
          url11: "xx.png",
        },
        {
     
          url: "www.baid.com",
          url1: "发财网",
          url2: "诈骗",
          url3: "2021-10-11",
          url4: "xxx.xx.xx.xx",
          url5: "sd",
          url6: "境外",
          url7: "无",
          url8: "200",
          url9: "1",
          url10: "上海",
          url11: "xx.png",
        },
        {
         
          url: "www.baid.com",
          url1: "发财网",
          url2: "诈骗",
          url3: "2021-11-11",
          url4: "xxx.xx.xx.xx",
          url5: "sd",
          url6: "境外",
          url7: "无",
          url8: "200",
          url9: "1",
          url10: "上海",
          url11: "xx.png",
        },
      ],
    };
  },
  mounted() {
    this.selectData = selectData;
  },
  methods: {
       getIndex($index){
      //$index为数据下标,对英序号要加一
      // console.log($index)
      return (this.mypageable.pageNum-1)*this.mypageable.pageSize+$index+1
    },
    handleSizeChange(val) {
     
      this.mypageable.pageSize = val;
    },
    handleCurrentChange(val) {
        
      this.mypageable.pageNum = val;
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
    sourceType_clearFun(val) {
      if (val == "") {
        this.newdomainSimpleVo.sourceType = null;
      }
    },
    modelType_clearFun(val) {
      if (val == "") {
        this.newdomainSimpleVo.modelType = null;
      }
    },
    city_clearFun(val) {
      if (val == "") {
        this.newdomainSimpleVo.city = null;
      }
    },
    ranking_clearFun(val) {
      if (val == "") {
        this.newdomainSimpleVo.ranking = null;
      }
    },
  },
};
</script>

<style scoped lang='less'>
.right_main_under{
//  margin: 20px 0 0 20px;
//  box-sizing: border-box;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 20px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.bottom {
  width: 100%;
  height: 3.75rem /* 60/16 */ /* 40/16 */;
  .ss {
    float: right;
  }
}
</style>