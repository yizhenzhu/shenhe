<template>
  <div class="home">
    <!-- <img src="./img/one.jpeg" alt="首页" > -->
    <div class="son">
      <h2 style="margin-bottom:10px">审核人员在完成审核工作中须遵循以下要求：</h2>
   <br/>
      <p>一、端正态度，严肃认真对待工作；</p>
      <p>二、严格查看每个网站，坚决杜绝误封误判情况的出现；</p>
      <p>
        三、严格遵守审核步骤流程，若因个人擅自修改审核步骤流程，出现任何问题，个人负全责；
      </p>
      <p>
        四、提高效率意识，对每天的工作量进行合理安排，及时准确地完成领导交付的任务；
      </p>
      <p>五、对于无法确定是否诈骗的网站，审核结果标为不确定；</p>
      <p>
        六、对于出现频率高并且有备案或者是境内的网站必须进行文档记录，及时提交审核组长；
      </p>
      <p>
        七、审核过程中发现审核系统存在的任何问题做好记录后交付开发人员；
      </p>
      <!-- <p>
        八、当月审核工作中按时按量完成工作指标并且没有出现误封的重大事故情况，全体审核成员按时发放奖金；
      </p> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style>
.home {
  width: 100%;
  height: 100%;
  background-color: rgb(84, 92, 100,.4);
  /* background: url(./img/4.png) no-repeat; */
  /* background-size: cover;
 */
 /* background-size: 100% 100%; */
  position: relative;
  /* width: 500px;
  height: 50px;
  line-height: 50px;
  font-size: 40px;
 margin: 100px auto; */
}
.son {
  position: absolute;
  top: 10%;
  left: 8%;
  width: 80%;
  height: 69%;
  /* border: 1px solid #000; */
  padding: 40px;
  box-sizing: border-box;
  font-size: 26px;
  color: #000;
  font-family: KaiTi;
  letter-spacing:3px;
  /* background-color: #fff; */
  /* background-color: rgb(84, 92, 100,.5); */
}
p{
  margin-bottom: 10px;
}
</style>