<template>
  <div class="ideConfigure" ref="ideConfigure">
    <textarea ref="ideCode" name="code"></textarea>
  </div>
</template>

<script>
// 核心文件
import CodeMirror from "codemirror"
import "codemirror/lib/codemirror.css";

// 主题
import 'codemirror/theme/monokai.css';

// 高亮样式
import "codemirror/mode/vue/vue.js";


import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/show-hint.js';
import 'codemirror/addon/hint/javascript-hint.js';


// 括号闭合
import 'codemirror/addon/edit/closebrackets.js';
// 光标定位标签
import 'codemirror/addon/edit/matchtags.js';
// 自动补齐标签
import 'codemirror/addon/edit/closetag.js';
// 注释
import 'codemirror/addon/comment/comment.js';
// 折叠代码
import 'codemirror/addon/fold/foldgutter.js';
import 'codemirror/addon/fold/foldgutter.css';
export default {
  name: "ideConfigure",
  props: {
    languageValue: {
      type: String,
      default: 'text/x-vue'
    }
  },
  watch: {
    languageValue: {
      deep: true, //深度监听设置为 true
      handler(newV, oldV) {
        this.editor.setOption("mode", newV);
      }
    },
  },
  data() {
    return {
      editor: null,
      completionList: {
        xml: ['template', 'div', 'class', 'style', 'p', 'a', ''],
        javascript: ['return'],
        css: [''],
        sass: [''],
      },
      languageList: {
        '.vue': 'text/x-vue',
        '.js': 'text/javascript',
        '.scss': 'text/x-scss',
        '.html': 'text/html',
        '.jsx': 'text/jsx'
      },
      ideOptions: {
        theme: "monokai",
        extraKeys: {
          "Alt-/": "autocomplete",
          "Ctrl-/": function (e) {
            let cur = e.getCursor(),
              token = e.getTokenAt(cur),
              start = token.start,
              end = cur.ch;
            let isNotes = e.uncomment(
              CodeMirror.Pos(cur.line, start),
              CodeMirror.Pos(cur.line, end)
            )
            if (!isNotes) {
              e.lineComment(
                CodeMirror.Pos(cur.line, start),
                CodeMirror.Pos(cur.line, end)
              )
            }


          }        },
        autofocus: true,
        // extraKeys: { "Tab": "autocomplete" },
        lineWrapping: 'wrap', // 文字过长时，是换行(wrap)还是滚动(scroll),默认是滚动
        autoCloseTags: true,
        matchTags: true,
        autoCloseBrackets: true,
        lineNumbers: true,
        matchBrackets: true, //括号匹配

        // 注释

        // 折叠
        commentBlankLines: true,
        // 代码折叠
        foldGutter: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter", "CodeMirror-lint-markers"],
        // 缩进单位
        indentUnit: 2,
        matchBrackets: true, // 括号匹配
        // smartIndent: true, // 智能缩进
        // scanUp: true,
        // rangeFinder() {
        //   console.log('xxx')
        // },
        // 环境
        // mode: { name: 'text/x-vue', globalVars: true }
        mode: 'text/x-vue'

      }
    }
  },
  methods: {
    handleCompletion() {
      Object.keys(this.completionList).forEach(item => {
        CodeMirror.registerHelper("hint", item, (cm) => {
          //自动补全
          var hintList = this.completionList[item]

          console.log(item, '被监听')
          var cur = cm.getCursor(),
            token = cm.getTokenAt(cur);
          var start = token.start,
            end = cur.ch
          var str = token.string

          var list = hintList.filter(function (item) {
            return item.indexOf(str) === 0
          })
          console.log(CodeMirror.Pos(cur.line, start), CodeMirror.Pos(cur.line, end))
          if (list.length) return {
            list: list,
            from: CodeMirror.Pos(cur.line, start),
            to: CodeMirror.Pos(cur.line, end)
          };
        });
      })
    },
    getValue() {
      return this.editor.getValue()
    }
    // 
  },
  mounted() {
    this.$refs.ideConfigure.parentNode.style.height = "100%"
    this.editor = CodeMirror.fromTextArea(this.$refs.ideCode, this.ideOptions);
    // this.editor.setValue('<template></template>')
    // this.handleCompletion()
    // if (this.$refs.ideConfigur) {
    //   this.$refs.ideConfigure.on('shown', () => {
    //     console.log('xxx')
    //   })
    // }
    console.log()

    this.editor.on("keypress", (e) => {
      // console.log('xxssx')
      // //获取用户当前的编辑器中的编写的代码
      // var words = this.editor.getValue() + "";
      // // getValue()
      // //利用正则取出用户输入的所有的英文的字母

      // words = words.replace(/[a-z]+[\-|\']+[a-z]+/ig, '').match(/([a-z]+)/ig);
      // //将获取到的用户的单词传入CodeMirror,并在javascript-hint中做匹配
      // CodeMirror.ukeys = words;
      // //调用显示提示
      // console.log(words)


    });
    this.editor.showHint({
      render: () => {
        return 1
      }
    });
  }
}
</script>

<style>
.ideConfigure {
  height: 100%;
}
.CodeMirror {
  border: 1px solid #eee;
  height: 100%;
}

/* .CodeMirror-scroll {
  height: auto;
  overflow-y: hidden;
  overflow-x: auto;
} */
</style>