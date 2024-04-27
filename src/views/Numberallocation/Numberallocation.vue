<template>
  <div class="right_main_under">
    <div class="zhong">
      <div>
        <h2>初审人数配置</h2>
        <div class="rad">
          <el-radio v-model="radio" label="null">无</el-radio>
          <el-radio v-model="radio" label="1">1</el-radio>
          <el-radio v-model="radio" label="2">2</el-radio>
          <el-radio v-model="radio" label="3">3</el-radio>
          <el-radio v-model="radio" label="4">4</el-radio>
          <el-radio v-model="radio" label="5">5</el-radio>
          <el-radio v-model="radio" label="6">6</el-radio>
          <el-radio v-model="radio" label="7">7</el-radio>
          <el-radio v-model="radio" label="8">8</el-radio>
          <el-radio v-model="radio" label="9">9</el-radio>
          <el-radio v-model="radio" label="10">10</el-radio>
        </div>
      </div>
      <div>
        <h2>复审人数配置</h2>
        <div class="rad">
          <el-radio v-model="radio" label="null">无</el-radio>
          <el-radio v-model="radio1" label="1">1</el-radio>
          <el-radio v-model="radio1" label="2">2</el-radio>
          <el-radio v-model="radio1" label="3">3</el-radio>
          <el-radio v-model="radio1" label="4">4</el-radio>
          <el-radio v-model="radio1" label="5">5</el-radio>
          <el-radio v-model="radio1" label="6">6</el-radio>
          <el-radio v-model="radio1" label="7">7</el-radio>
          <el-radio v-model="radio1" label="8">8</el-radio>
          <el-radio v-model="radio1" label="9">9</el-radio>
          <el-radio v-model="radio1" label="10">10</el-radio>
        </div>
      </div>
      <div>
        <h2>终审人数配置</h2>
        <div class="rad">
          <el-radio v-model="radio" label="null">无</el-radio>
          <el-radio v-model="radio2" label="1">1</el-radio>
          <el-radio v-model="radio2" label="2">2</el-radio>
          <el-radio v-model="radio2" label="3">3</el-radio>
          <el-radio v-model="radio2" label="4">4</el-radio>
          <el-radio v-model="radio2" label="5">5</el-radio>
          <el-radio v-model="radio2" label="6">6</el-radio>
          <el-radio v-model="radio2" label="7">7</el-radio>
          <el-radio v-model="radio2" label="8">8</el-radio>
          <el-radio v-model="radio2" label="9">9</el-radio>
          <el-radio v-model="radio2" label="10">10</el-radio>
        </div>
      </div>
    </div>
    <div class="ti">
      <el-button style="width:100px;height:40px;float:right" @click="tijiao">提交</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: "",
      radio1: "",
      radio2: "",
    };
  },
  methods:{
async tijiao(){
  let list={
    againCheckCount:this.radio1,
    endCheckCount:this.radio2,
    startCheckCount:this.radio,
  }
  const  {data:res}=await this.$http.post('/conf/updatePersonCount',list)
  if(res.code==200){
    // console.log(res.data);
    this.$message(res.message)
    
  } 
}
  }
};
</script>

<style scoped lang='less'>
.right_main_under{
//  margin: 20px 0 0 20px;
//  box-sizing: border-box;
}
.zhong {
  width: 100%;
  height: 80%;
  padding: 20px 20px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
/deep/ .el-radio__inner{
    width: 25px;
    height: 25px;
}
/deep/ .el-radio__label{
    font-size: 18px;
}
.rad {
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.ti {
  width: 100%;
  height: 50px;
  margin-top: 10px;
}
</style>