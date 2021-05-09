<template>
  <div class="edit-wrapper" @click="isContentEdit = false; isTitleEdit = false">
    <el-page-header @back="goBack" content="详情页面" class="page-header"/>
    <div class="body-wrapper">
      <el-row class="title-wrapper">
        <el-col :span="2">
          标题:
        </el-col>
        <el-col :span="22">
          <span v-if="!isTitleEdit"><span @click.stop="isTitleEdit = true">{{ title }}</span></span><span
            v-if="isTitleEdit" @click.stop><el-input v-model="title" placeholder="请输入内容"></el-input></span>
        </el-col>

      </el-row>
      <el-row class="content-wrapper">

        <el-col :span="2" style="padding-top: 15px;">
          内容：
        </el-col>
        <el-col :span="22">
          <div v-if="isContentEdit" style="padding-top: 15px;">
            <editor v-model:content="content" @click.stop/>
          </div>
          <div v-if="!isContentEdit" @click.stop>
            <div v-if="content" v-html="content" @click.stop="isContentEdit = true"/>
            <div v-else @click.stop="isContentEdit = true">请输入内容</div>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex" justify="end">
        <el-button @click="print">删除</el-button>
        <el-button @click="clear">上一章</el-button>
        <el-button @click="clear">保存</el-button>
        <el-button @click="clear">下一章</el-button>
        <el-button @click="disabled = true">取消</el-button>
      </el-row>


    </div>

  </div>
</template>
<script>
import Tinymce from '/@/components/Tinymce.vue'

export default {
  name: 'tinymcedemo',
  components: {
    'editor': Tinymce
  },
  data() {
    return {
      disabled: false,
      baseUrl: window.location.origin ? window.location.origin : '',
      msg: 'Welcome to Use Tinymce Editor',
      isabled: false,
      title: 'hhhhhhhh',
      isTitleEdit: false,
      content: '<p>23123123</p>',
      isContentEdit: false
    }
  },
  methods: {
    // 内容
    getContent() {
      console.log('内容', this.msg)
    },
    // 鼠标单击的事件
    onClick(e, editor) {
      console.log('Element clicked')
      console.log(e)
      console.log(editor)
    },
    // 清空内容
    clear() {
      this.content = ''
      // console.log(this.$refs.editor)
      // this.$refs.editor.clear()
    },
    // 打印
    print() {
      console.log(this.content)
    },
    goBack() {
      this.$router.replace({path: '/'})
    }
  }
}
</script>

<style scoped lang="less">
.edit-wrapper {


  .page-header {
    padding: 20px;
  }

  .body-wrapper {
    padding: 20px;

    .title-wrapper {
      padding-bottom: 5px;
    }

    .content-wrapper {
      margin-bottom: 10px;
    }

    //background: #00feff;
  }


}
</style>
