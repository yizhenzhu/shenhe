<template>
  <div class="right_main_under">
    <el-form size="mini" label-width="80px" :inline="true">
      <el-row :gutter="24">
        <el-col :span="18">
          <div class="grid-content bg-purple">
            <el-form-item>
              <el-input v-model="form.task_id" placeholder="任务ID"></el-input>
            </el-form-item>
            <el-form-item>
              <!-- <el-input v-model="form.task_type" placeholder="任务类型"></el-input> -->
              <el-select v-model="form.task_type" placeholder="任务类型">
                <el-option
                  v-for="item in taskTypes"
                  :key="item.id"
                  :label="item.content"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <!-- <el-input v-model="form.status" placeholder="任务状态"></el-input> -->
              <el-select v-model="form.status" placeholder="任务状态">
                <el-option
                  v-for="item in taskStatuses"
                  :key="item.id"
                  :label="item.content"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-date-picker
                v-model="form.datetime"
                type="daterange"
                :change="dataCreate_change"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                :clearable="false"
              >
              </el-date-picker>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <!-- 流程记录页面头部模块——button -->
            <el-button
              size="mini"
              type="primary"
              plain
              @click="chaxun"
              class="custom-button"
              >查询
            </el-button>
            <el-button
              size="mini"
              type="success"
              plain
              @click="showUploadDialog"
              class="custom-button"
              >新建任务</el-button
            >
          </div>
        </el-col>
      </el-row>
    </el-form>
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
      <el-table-column
        prop="task_id"
        label="任务ID"
        show-overflow-tooltip
        min-width="8%"
      >
      </el-table-column>
      <el-table-column
        prop="task_type"
        label="任务类型"
        min-width="8%"
      ></el-table-column>

      <el-table-column
        prop="count"
        label="URL数量"
        min-width="8%"
      ></el-table-column>

      <el-table-column
        prop="status"
        label="任务状态"
        min-width="8%"
      ></el-table-column>

      <el-table-column prop="start_time" label="开始时间" min-width="8%">
      </el-table-column>
      <el-table-column prop="end_time" label="结束时间" min-width="8%">
      </el-table-column>
      <el-table-column  label="任务结果" min-width="8%">
        <!-- 1.a标签 2.query.selector   @click事件  DOM元素-->
        <template slot-scope="scope">
          <el-link
            type="primary"
            @click="downloadResult(scope.row.task_id)"
            >下载结果</el-link
          >
        </template>
      </el-table-column>


    </el-table>
    <!-- 新建任务弹框 -->
    <el-dialog
      title="新建任务"
      :visible.sync="dialogVisible"
      width="500px"
      @close="resetForm"
      
    >
      <el-form :model="taskForm" ref="taskForm" label-width="100px">
        <el-form-item label="任务类型">
          <!-- <el-select v-model="taskForm.taskType" placeholder="查询境外" class="small-select">
          </el-select> -->
          <el-select v-model="taskForm.taskType" placeholder="选择任务类型" class="small-select">
            <el-option
              v-for="item in taskTypes"
              :key="item.id"
              :label="item.content"
              :value="item.id"
            ></el-option>
          </el-select>
         
        </el-form-item>
        <el-form-item label="文件">
          <el-upload
            ref="upload"
            class="upload-demo"
            accept=".xlsx, .csv, text/plain"
            action="/urls/task/add"
            :on-remove="handleFileChange"
            :before-remove="beforeRemove"
            :on-success="successSendFile"
            multiple
            :limit="3"
            :file-list="fileList"
            :on-exceed="handleExceed"
            :before-upload="handleFileUpload"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传 .xlsx, .csv, .text 文件</div>
            
          </el-upload>
          <el-button size="small" type="primary" @click="createTask">创建任务</el-button>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitTask">确定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 页面脚底 -->
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
  </div>
</template>

    
<script>
    import axios from "axios";
    import dayjs from "dayjs";
    
    export default {
      data() {
        return {
          loading: true,
          form: {
            task_id: "",
            task_type: "",
            status: "",
            datetime: [
              dayjs().subtract(1, "week").format("YYYY-MM-DD"),
              dayjs(new Date()).format("YYYY-MM-DD"),
            ],
          },
          whiteSearchList: {
            startCreateTime: dayjs().subtract(1, "week").format("YYYY-MM-DD"),
            endCreateTime: dayjs(new Date()).format("YYYY-MM-DD"),
          },
          tableData: [],
          mypageable: {
            pageNum: 1,
            pageSize: 8,
          },
          total: 0,
          // totalPages: 0,
          dialogVisible: false, // 控制弹框的显示与隐藏
          taskTypes:"",
          taskStatuses:[],
          fileList: [], // 文件列表
          taskForm: {
            taskType: '', // 任务类型
            fileList: [] // 文件列表
          },
        };
      },
    
      created() {
        this.techlist();
        this.fetchTaskTypes();
        this.fetchTaskStatuses();
      },
      computed: {
        totalPages() {
          return Math.ceil(this.total / this.mypageable.pageSize);
        },
      },
      methods: {
        chaxun() {
          this.mypageable.pageNum = 1;
          this.techlist();
        },
         
        // 文件上传
        successSendFile(res) {
        // this.loading=true
        console.log('ooores',res);

        if (res.code == 200) {
          // setTimeout(() => {
          this.$message.success("上传成功");
          this.getTabData();
          this.$refs.upload.clearFiles();
          // }, 1000)
        } else {
          this.$message(res.message);
        }
        this.uploadInProgress = false; // 上传成功后重置标志
        console.log('oooresok-----',res);

        },
        //上传
        handleFileUpload(file) {
          this.taskForm.fileList = [file];
          console.log('file type:', file.type);  // 打印文件类型
          // this.uploadInProgress = true; // 设置上传标志
          console.log('上传-----------');
          console.log('--------wozhidao',file);
        },
        handleFileChange(file, fileList) {
          this.taskForm.fileList = fileList; // 更新文件列表
          // this.uploadInProgress = false; // 上传完成后重置标志
        },
        // 删除文件前确认
        beforeRemove(file, fileList) {
          console.log('删除文件前确认');
          return this.$confirm(`确定移除 ${file.name}？`);
        },
        
        handleExceed(files, fileList) {
          this.$message.warning(
            `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
              files.length + fileList.length
            } 个文件`
          );
        },
        createTask() {
          // 创建任务逻辑
          console.log('创建任务', this.taskForm);
          // 清空表单
          this.resetForm();
          this.dialogVisible = false;
        },
        resetForm() {
          this.taskForm = {
            taskType: '',
            fileList: []
          };
          this.fileList = [];
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
        time(val) {
          if (val == null) {
            return "无";
          } else {
            return dayjs(val).format("YYYY-MM-DD  HH:mm:ss");
          }
        },
        dataCreate_change(val) {
          if (val && val.length === 2) {
            this.form.start_time = val[0];
          this.form.end_time = val[1];
          this.techlist(); // 调用获取数据的方法
          }
        },
        showUploadDialog() {
          this.dialogVisible = true; // 显示弹框
        },

        
       
        async techlist() {
        try {
          const response = await axios.get("/urls/task", {
            params: {
              task_id: this.form.task_id,
              task_type: this.form.task_type,
              status: this.form.status,
              start_time: this.form.start_time,
              end_time: this.form.end_time,
              page_size: this.mypageable.pageSize,
              page: this.mypageable.pageNum,
            },
          });
          const data = response.data;
          this.tableData = data.datas;
          this.total = data.total;
          this.totalPages = data.total_page;
        } catch (error) {
          console.error("Error fetching data", error);
        }
      },
      async fetchTaskTypes() {
        try {
          const response = await axios.get("/urls/task/type");
          this.taskTypes = response.data.datas;
        } catch (error) {
          console.error("Error fetching task types", error);
        }
      },
      async fetchTaskStatuses() {
        try {
          const response = await axios.get("/urls/task/status");
          this.taskStatuses = response.data.datas;
        } catch (error) {
          console.error("Error fetching task statuses", error);
        }
      },
      async submitTask() {
      if (!this.taskForm.taskType || this.taskForm.fileList.length === 0) {
        this.$message.error("请选择任务类型并上传文件");
        return;
      }

      const formData = new FormData();
      formData.append("task_type", this.taskForm.taskType);
      formData.append("file", this.taskForm.fileList[0]);
      console.log('okkkk',this.taskForm.fileList[0]);

      try {
        await axios.post("/urls/task/add", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        this.$message.success("任务创建成功");
        this.dialogVisible = false;
        this.resetForm();
        this.techlist(); // 刷新列表
      } catch (error) {
        console.error("Error creating task", error);
        this.$message.error("任务创建失败");
      }
    },
    async downloadResult(taskId) {
      try {
        const response = await axios.get("/urls/task/result", {
          params: { task_id: taskId },
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `task_result_${taskId}.xlsx`);
        document.body.appendChild(link);
        link.click();
      } catch (error) {
        console.error("Error downloading result", error);
        this.$message.error("下载结果失败");
      }
    },
      },
      
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
    .bottom {
      width: 100%;
      height: 3.75rem /* 60/16 */ /* 40/16 */;
      .ss {
        float: right;
      }
    }
    .el-radio-button {
      margin-right: 10px;
      /* 调整单选按钮之间的间距 */
      border: 1px solid #dcdfe6; /* 添加边框 */
      // padding: 5px 10px; /* 添加内边距 */
      border-radius: 4px; /* 添加圆角 */
    }
    .small-select {
  width: 150px; 
  font-size: 12px; 
  padding-left: 5px;
}
    .custom-button {
      font-size: 16px; /* 调整文字大小 */
      padding: 10px 20px; /* 调整按钮大小 */
      margin-right: 10px;
    }
    .pagination-container {
      display: flex;
      justify-content: center; /* 居中对齐内容 */
      align-items: center;
      padding: 20px 0;
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
        
    .upload-demo {
      margin-top: 10px;
    }
    </style>
    