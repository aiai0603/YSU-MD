<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";

//内容
const text = ref("");

//是否展示输入框
const file = ref(true);

const changeTitle = (title) => {
  document.title = title;
};

//系统关闭文件
myApi.systemClose(async () => {
  if (!file.value) {
    let re = await handleSave(!file.value);
    if (re === 0 || re === 1) {
      file.value = true;
      changeTitle("YSU-MD");
    }
  }
});

//系统保存文件（另存为）
myApi.systemSaveFile(async (event, data) => {
  if (!file.value) {
    await handleSave(file.value, data);
    if (document.title.endsWith("*")) {
      changeTitle(document.title.slice(0, document.title.length - 1));
    }
  }
});

//系统打开文件
myApi.systemOpenFile(async () => {
  if (file.value) {
    handleOpen(true);
  } else {
    let re = await handleSave(!file.value);
    if (re === 0 || re === 1) {
      handleOpen(true);
    }
  }
});

//系统新建文件
myApi.systemNewFile(async () => {
  if (file.value) {
    handleNewFile();
  } else {
    let re = await handleSave(!file.value);
    if (re === 0 || re === 1) {
      handleNewFile();
    }
  }
});

//键盘事件+绑定事件，优化todo
const handleEvent = async (event) => {
  if (!file.value) {
    switch (event.keyCode) {
      case 83:
        event.preventDefault();
        event.returnValue = false; // 阻止直接保存网页
        // eslint-disable-next-line no-prototype-builtins
        if (event.ctrlKey && event.code === "KeyS") {
          // 在这里写保存需要执行的逻辑
          let re = await handleSave(file.value);
          if (re === 0 || re === 1) {
            if (document.title.endsWith("*"))
              changeTitle(document.title.slice(0, document.title.length - 1));
          }
        }
        if (event.ctrlKey && event.code === "KeyS") return false;
        break;
    }
  }
};

onMounted(async () => {
  window.addEventListener("keydown", handleEvent);
});

onBeforeUnmount(async () => {
  window.removeEventListener("keydown", handleEvent); // 在页面销毁的时候记得解除
});

//自动保存本地的函数
const handleAutoSave = async (text, html) => {
  let change = await myApi.updateText();
  if (!change) {
    changeTitle(document.title + "*");
  }
  myApi.autoSave(text);
};

//保存文件
const handleSave = async (option, force = false) => {
  let re = await myApi.saveFile(text.value, option, force);
  return re;
};

//打开文件
const handleOpen = async (option) => {
  let res = await myApi.openFile(option);
  changeTitle(res.name);
  text.value = String(res.data);
  file.value = false;
};

//新建文件
const handleNewFile = async () => {
  myApi.newFile();
  changeTitle("new file1.md");
  text.value = "";
  file.value = false;
};
</script>


<template>
  <div class="list" v-if="file">
    <div class="list-title">欢迎使用YSU-MD</div>
    <div class="list-word">基于electron的轻量级md编译器</div>
    <div class="list-item" @click="handleNewFile">
      <img src="../../public/new.png" alt="" /> 新建文件
    </div>
    <div class="list-item" @click="handleOpen(true)">
      <img src="../../public/open.png" alt="" />打开文件
    </div>
    <div class="list-item" @click="handleOpen(false)">
      <img src="../../public/last.png" alt="" />上次打开
    </div>
    <!-- <div class="list-item" @click="resolve">恢复数据</div> -->
  </div>

  <v-md-editor
    v-else
    v-model="text"
    :autofocus="true"
    :default-fullscreen="true"
    right-toolbar="preview toc sync-scroll"
    height="100%"
    width="100%"
    ref="editor"
    @change="handleAutoSave"
  ></v-md-editor>
</template>

<style scoped>
.list {
  width: 100%;
  margin-top: 100px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}

.list-word {
  display: flex;
  font-size: 40px;
  letter-spacing: 2px;
  color: darkgrey;
  margin-bottom: 20px;
  word-break: break-all;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}

.list-title {
  display: flex;
  font-weight: 600;
  letter-spacing: 2px;
  font-size: 64px;
  margin-bottom: 32px;
  word-break: break-all;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}

.list-item {
  margin: 10px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
  font-size: 24px;
}

.list-item img {
  margin: 20px 30px 20px 0px;
  width: 40px;
  height: 40px;
}
</style>