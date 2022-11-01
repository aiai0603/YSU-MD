<script setup>
import { toRefs, ref, onMounted, nextTick } from "vue";
import mdShowVue from "./md-show.vue";
import tools from "../setting/tools";

const toolTab = tools;
const props = defineProps(["text"]);
const emits = defineEmits(["update:text", "editsave"]);
const { text } = toRefs(props);

const inputRef = ref(null);

const changeTitle = (title) => {
  document.title = title;
};
const handleInput = (e) => {
  let save_words = e.target.value;

  if (save_words.length - text.value.length == 1) {
    var reg = /^-?[1-9]\d*\.\s/g;
    if (save_words.endsWith("\n")) {
      let change_line = save_words
        .slice(0, save_words.length - 1)
        .lastIndexOf("\n");

      if (
        save_words
          .slice(change_line + 1, save_words.length)
          .trim()
          .startsWith("- ")
      ) {
        let space = "- ";
        for (
          var i = 0;
          i < save_words.slice(change_line + 1, save_words.length).indexOf("-");
          i++
        ) {
          space = " " + space;
        }
        save_words += space;
      } else if (
        reg.test(save_words.slice(change_line + 1, save_words.length).trim())
      ) {
        let space =
          (
            parseInt(
              save_words
                .slice(change_line + 1, save_words.length)
                .trim()
                .slice(
                  0,
                  save_words
                    .slice(change_line + 1, save_words.length)
                    .trim()
                    .indexOf(".")
                )
            ) + 1
          ).toString() + ". ";
        for (
          var i = 0;
          i <
          save_words
            .slice(change_line + 1, save_words.length)
            .indexOf(
              save_words.slice(change_line + 1, save_words.length).trim()[0]
            );
          i++
        ) {
          space = " " + space;
        }
        save_words += space;
      }
    }
  }

  handleAutoSave(save_words);
};
//自动保存本地的函数
const handleAutoSave = async (value) => {
  emits("update:text", value);
  if (!document.title.endsWith("*")) {
    changeTitle(document.title + "*");
  }
  await myApi.autoSave(value);
};

//修改的函数
const changeWord = (word, type) => {
  let word_length = word.length;
  let start = inputRef.value && inputRef.value.selectionStart;
  let end = inputRef.value && inputRef.value.selectionEnd;

  let selectText = text.value.slice(start, end);

  let insertText = "";
  if (type == 1) {
    insertText = word + selectText + word;
  } else if (type == 2) {
    insertText = word + selectText;
  } else {
    insertText = word;
  }

  document.execCommand("insertText", false, insertText);

  inputRef.value.dispatchEvent(
    new Event("input", {
      view: window,
    })
  );
  inputRef.value.focus();
  nextTick(() => {
    inputRef.value.setSelectionRange(start + word_length, start + word_length);
  });
};

const fun = (functionName) => {
  //根据函数名得到函数类型
  var func = eval(functionName);
  //创建函数对象，并调用
  return func();
};

myApi.systemBlack(() => {
  black();
});

const undo = () => {};

const redo = () => {};

const save = () => {
  emits("editsave");
};

const black = () => {
  changeWord("**", 1);
};

const tilt = () => {
  changeWord("*", 1);
};

const del = () => {
  changeWord("~~", 1);
};

const title = () => {
  changeWord("# ", 2);
};

const list = () => {
  changeWord("- ", 2);
};

const numlist = () => {
  changeWord("1. ", 2);
};

const refer = () => {
  changeWord(">", 2);
};

const table = () => {
  changeWord(
    "|column1|column2|column3|\n|-|-|-|\n|content1|content2|content3|",
    3
  );
};

const divide = () => {
  changeWord("**********************", 3);
};

const code = () => {
  changeWord("``` language\n```", 3);
};

onMounted(() => {});
</script>
        
        
<template>
  <div class="md-edit">
    <div class="md-tools">
      <div
        v-for="item in toolTab"
        :key="item.id"
        class="md-tools-item"
        :title="item.name"
        @click="fun(item.callback)"
      >
        <img :src="item.icon" />
      </div>
    </div>
    <div class="md-text">
      <div class="md-text-edit">
        <textarea
          :value="text"
          class="input"
          @input="handleInput"
          ref="inputRef"
        />
      </div>
      <div class="md-text-show">
        <mdShowVue></mdShowVue>
      </div>
    </div>
    <div class="md-fixed">字数:{{ text.length }}</div>
  </div>
</template>
        
<style scoped>
/* 整个滚动条 */
::-webkit-scrollbar {
  /* 对应纵向滚动条的宽度 */
  width: 10px;
  /* 对应横向滚动条的宽度 */
  height: 10px;
}

/* 滚动条上的滚动滑块 */
::-webkit-scrollbar-thumb {
  background-color: rgba(225, 225, 225, 0.6);
  border-radius: 32px;
}

/* 滚动条轨道 */
::-webkit-scrollbar-track {
  background-color: rgba(250, 250, 250, 0.5);
  border-radius: 32px;
}

.md-fixed {
  display: flex;
  flex-flow: row;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 2%;
  width: 96%;
  border-top: #cccccc 1px solid;
}

.input {
  color: #24292e;
  font-size: 14px;
  line-height: 22px;
  width: 96%;
  height: 96%;
  padding: 2%;
  border: 0px;
  outline: none;
  resize: none;
  overflow-y: auto;
}
.md-edit {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.md-tools {
  width: 100%;
  border-bottom: 1px solid #cccccc;
  display: flex;
  flex-flow: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: center;
}

.md-tools-item {
  width: 20px;
  height: 20px;
  margin: 10px;
}

.md-tools-item img {
  width: 100%;
  height: 100%;
}

.md-text {
  flex: 1;
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  overflow-y: hidden;
}

.md-text-edit {
  flex: 1;
  height: 100%;
  border-right: #cccccc 1px solid;
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
}

.md-text-show {
  width: 46%;
  height: 96%;
  padding: 2%;
  overflow-y: auto;
}
</style>