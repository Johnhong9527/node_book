<template>
  <editor
      v-model="myValue"
      :init="init"
      :disabled="disabled"
      api-key="v0e1dfqz3ywsmldk0ge6vohgy5ivbgla02xpioua0oukv7c1"
  />
</template>
<script>
// import TinymceEdit from '../components/TinymceEdit.vue'
import Editor from '@tinymce/tinymce-vue'

export default {
  name: 'tinymcedemo',
  components: {
    'editor': Editor
  },
  props: {
    // 默认的富文本内容
    content: {
      type: String,
      default: ''
    },
    plugins: {
      type: [String, Array],
      default: 'link lists image code table wordcount media preview fullscreen help'
    },
    // 禁用
    disabled: {
      type: Boolean,
      default: false
    },
    toolbar: {
      type: [String, Array],
      default: 'bold italic underline strikethrough | fontsizeselect | formatselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent blockquote | undo redo | link unlink code lists table image media | removeformat | fullscreen preview'
    }
  },
  data() {
    return {
      baseUrl: window.location.origin ? window.location.origin : '',
      msg: 'Welcome to Use Tinymce Editor',
      isabled: false,
      init: {
        language_url: `tinymce/langs/zh_CN.js`,
        language: 'zh_CN',
        skin_url: `tinymce/skins/ui/oxide`,
        // skin_url: 'tinymce/skins/ui/oxide-dark', // 暗色系
        convert_urls: false,
        height: 400,
        // content_css（为编辑区指定css文件）,加上就不显示字数统计了
        // content_css: `${this.baseUrl}tinymce/skins/content/default/content.css`,
        // （指定需加载的插件）
        plugins: 'link lists image code table wordcount media preview fullscreen help',
        toolbar: this.toolbar, // （自定义工具栏）

        statusbar: true, // 底部的状态栏
        menubar: 'file edit insert view format table tools help', // （1级菜单）最上方的菜单
        branding: false, // （隐藏右下角技术支持）水印“Powered by TinyMCE”
        // 此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
        // 如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
        images_upload_handler: (blobInfo, success, failure) => {
          const img = 'data:image/jpeg;base64,' + blobInfo.base64()
          success(img)
          console.log(failure)
        }
      },
      myValue: this.content
    }
  },
  watch: {
    content(newValue) {
      this.myValue = newValue
    },
    myValue(newValue) {
      this.$emit('update:content', newValue)
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
      console.log(this.$refs.editor)
      this.$refs.editor.clear()
    }
  }
}
</script>