<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";


myApi.onUpdateCounter(() => {
    file.value = true;
})

//内容
const text = ref("");

//是否展示输入框
const file = ref(true);

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
          await myApi.saveFile(text.value);
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
const handleAutoSave = (text, html) => {
  myApi.autoSave(text);
};

//打开文件
const handleOpen = async () => {
  let res = await myApi.openFile();
  text.value = String(res);
  file.value = false;
};

//新建文件
const handleNewFile = async () => {
  myApi.newFile();
  file.value = false;
};

//打开上一次的文件
const handleLast = async () => {
  let res = await myApi.openFileLast();
  text.value = String(res);
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
    <div class="list-item" @click="handleOpen">
      <img src="../../public/open.png" alt="" />打开文件
    </div>
    <div class="list-item" @click="handleLast">
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
  margin: 100px;
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
  font-size:24px;

 
}

.list-item img{
  margin: 20px 30px 20px 0px;
  width:40px;
  height:40px

 
}
</style>