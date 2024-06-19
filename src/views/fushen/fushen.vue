<template>
    <div class="right_main_under">
      <el-form size="mini" label-width="80px" :inline="true">
        <el-row :gutter="24">
          <el-col :span="18">
            <div class="grid-content bg-purple">
              <el-form-item>
                <el-select v-model="form.source" placeholder="来源" clearable
                  >
                  <el-option
                    v-for="item in selectData.source"
                    :key="item.id"
                    :label="`${item.name}`"
                    :value="item.id"
                    >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-select v-model="form.label" placeholder="类型" clearable
                  >
                  <el-option
                    v-for="item in selectData.label"
                    :key="item.id"
                    :label="`${item.name}`"
                    :value="item.id"
                    >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
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
          <el-col :span="24">
            <div class="grid-content boxes-container">
              <el-row :gutter="20">
                <el-col v-for="(box, index) in form.boxes" :key="index" :span="5">
                  <div class="box">
                    <div class="box-item">
                      <!-- <span class="box-label">{{box.sample !== undefined ? '样本':'url'}}</span>
                      <el-input v-model="box.sample" placeholder="URL" :disabled="true"></el-input> -->
                      <span class="box-label">{{ index === 0 ? '样本' : 'URL' }}</span>
                      <el-input 
                        :value="index === 0 ? box.sample : box.url" 
                        placeholder="URL" 
                        :disabled="true"
                      ></el-input><!--  @input="index === 0 ? (box.sample = $event) : (box.url = $event)" -->
                    </div>
                    <div class="box-item" v-if="index === 0 ">
                      <!-- && box.label !== undefined -->
                      <span class="box-label">类型</span
                      >
                      <el-input v-model="box.label" placeholder="类型" :disabled="true"></el-input>
                    </div>
                    <div class="box-item" v-if="index === 0 ">
                      <!-- && box.source !== undefined -->
                      <span class="box-label">来源</span>
                      <el-select v-model="box.source" placeholder="类型">
                        <el-option
                          v-for="option in selectData.source"
                          :key="option"
                          :label="option"
                          :value="option"
                        ></el-option>
                      </el-select>
                    </div>

                    <div class="box-item images">
                      <el-image
                      :src="box.png"
                      :preview-src-list="[box.png]"
                      :class="{'img1': true, 'special-image':index !== 0 }"
                      title="图片"
                      >
                        <div slot="error" class="image-slot">
                          <i class="el-icon-picture-outline" style="margin: 30%">无图片</i>
                        </div>
                      </el-image>
                    </div>
  
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <!-- 页面页数 -->
          <el-col :span="24">
            <div class="pagination-container">
              <div class="pagination-left">
                共 {{ totalPages }} 页 / {{ total }} 条数据
              </div>
              <div class="pagination-center">
                <el-pagination
                  background
                  layout="prev, pager, next,jumper"
                  :total="total"
                  :page-size="mypageable.pageSize"
                  :current-page.sync="mypageable.pageNum"
                  @current-change="handleCurrentChange"
                >
                </el-pagination>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </template>
    
    <script>
  import axios from "axios";
  export default {
    data() {
      return {
        loading: false,
        form: {
          source: null, // laiyuan
          label:null,
          boxes: [],
          /* boxes: Array(1)
            .fill()
            .map(() => ({
              sample: "",
              label: "",
              source: "",
              png: "",
            })) */
          /*  boxes:[{
              sample: "",
              label: "",
              source: "",
              png: "",
           },
            {
              url:"www.",
              png:"2"
            },
            {
              url:"www.",
              png:"2"
            }
          ] */
        },
        mypageable: {
          pageNum: 1,
          pageSize: 8,
        },
        total: 1,
        selectData: {
            source:[],
            label:[]
        },
        // jumpPage: 1,
      };
    },
    created() {
      // this.techlist();
      this.loadSelectOptions();
    },
    computed: {
      totalPages() {
        return Math.ceil(this.total / this.mypageable.pageSize);
      },
    },
    
  methods:{
      async loadSelectOptions() {
        // 加载来源和类型的选项数据
        try {
          const { data } = await axios.get("/audit/second"); // 替换为实际获取选项数据的API
          this.selectData.source = data.sources;
          this.selectData.label = data.labels;
        } catch (error) {
          console.error("Error loading select options:", error);
        }
      },
      async techlist() {
        console.log('ok');
        this.loading = true;
        let params = {
        //   page: this.mypageable.pageNum,
        //   page_size: this.mypageable.pageSize,
          source: this.form.source,
          label:this.form.label
        };
        try {
          const { data } = await this.$http.get("/audit/second", { params });
          // console.log('...res',res);
          if (res.code === 200) {
            let boxes = [
            {
              sample: data.datas[0].sample||"",
              label: data.datas[0].label||"",
              source: data.datas[0].source||"",
              png:data.datas[0].png||"",
            },
            ...data.matched_datas.map((item) => ({
              url: item.url,
              png: item.png,
            })),
          ];
          this.form.boxes = boxes;
          this.total = data.total || 0;
        }else {
          console.error("Failed to fetch audit data:", data.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        this.loading = false;
      }
    },
      chaxun() {
        this.mypageable.pageNum = 1;
        this.techlist();
      },
      getIndex($index) {
        return (
          (this.mypageable.pageNum - 1) * this.mypageable.pageSize + $index + 1
        );
      },
      handleCurrentChange(val) {
        this.mypageable.pageNum = val;
        this.techlist();
      },
      
    }
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
  .img1 {
    max-width: 200px; /* 设置图片最大宽度 */
    max-height: 200px; /* 设置图片最大高度 */
    display: block; /* 设置为块级元素，使其可以水平居中 */
    margin: 0 auto; /* 设置左右边距为 auto，实现水平居中 */
  }
  .special-image {
    max-width: 200px; /* 设置图片最大宽度 */
    max-height: 200px; /* 设置图片最大高度 */
    margin-top:30px;
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
    margin-right: 10px;
  }
  /* 盒子上传格式 */
  .box {
    width: 262px;
    height:262px;
    padding: 10px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    box-sizing: border-box;
  }
  
  .box-item {
    display: flex;
    align-items: center;
    // color: #000000;
    margin-bottom: 10px;
  }
  
  .box-label {
    width: 60px;
    text-align: right;
    // background-color: #000;
    margin-right: 10px;
  }
  
  .box-item-image {
    width: 100px;
    height: 50px;
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
  .pagination-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
  }
  
  .pagination-left {
    flex: 1;
  }
  
  .pagination-center {
    flex: 2;
    text-align: center;
  }
  
  .pagination-right {
    flex: 1;
    text-align: center;
  }
  
  .jump-input {
    width: 80px;
  }
  
  .jump-button {
    margin-left: 5px;
    // padding:3%
  }
  </style>