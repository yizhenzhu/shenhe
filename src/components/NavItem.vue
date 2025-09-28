<template>
  <div>
    <!-- 无子级 -->
    <el-menu-item
      :index="'/' + item.name + ''"
      v-if="item.menuType == 1"
      style="min-width: 0"
    >
      <!-- <i class="el-icon-location"></i> -->
      <span slot="title">{{ item.menuName }}</span>
    </el-menu-item>

    <!-- 有子级 -->
    <el-submenu :index="'/' + path + ''" v-else>
      <template slot="title">
        <!-- <i class="el-icon-menu"></i> -->
        <span>{{ item.menuName }}</span>
      </template>
      <NavItem
        v-for="child in item.children"
        :key="child.name"
        :item="child"
        :path="child.name"
        style="min-width: 0"
      />
    </el-submenu>
  </div>
</template>

<script>
export default {
  name: "NavItem",
  data() {
    return {
      items: [],
    };
  },
  props: ["item", "path"], //父传子参数
};
</script>

<style>
</style>