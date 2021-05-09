<template>

  <div class="body-wrapper">
    <div class="search-wrapper">
      <el-input
          placeholder="请输入内容"
          v-model="searchText"
          class="input-with-select"
          @input="dSearchBook"
          @keyup.enter="searchBook"
      >
        <template #append>
          <el-button icon="el-icon-search" @click.stop="searchBook"></el-button>
        </template>
      </el-input>
    </div>
    <div class="body-wrapper">
      <div class="add-book">
        <el-tooltip class="item" effect="dark" content="添加书籍" placement="top">
          <el-button type="primary" icon="el-icon-plus" circle @click.stop="addBook"></el-button>
        </el-tooltip>

      </div>
      <!--      <div v-html="content.replace(/\n/g,'<br/>').replace(/cool18\.com/g,'')"></div>-->
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import {find} from '/@/api'

export default {
  name: 'home',
  data() {
    this.dSearchBook = _.debounce(this.searchBook, 700)
    return {
      searchText: '',
      content: ''
    }
  },
  methods: {
    // 查询
    async searchBook() {
      const res = await find()
      if (res.code === 200) {
        this.content = res.data.content
      }
    },
    // 添加书籍
    addBook() {
      this.$router.replace({path: '/addBook'})
    }

  }
}
</script>

<style scoped lang="less">
.body-wrapper {
  padding: 20px;

  .search-wrapper {

  }

  .body-wrapper {
    .add-book {
      position: fixed;
      right: 20px;
      top: 10%;
    }
  }
}
</style>
