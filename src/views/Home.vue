
<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";
const text = ref("");
const file = ref(true);

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

const open = async () => {
  let res = await myApi.openFile();
  text.value = String(res);
  file.value = false;
};

const last = async () => {
  let res = await myApi.openFileLast();
  text.value = String(res);
  file.value = false;
};
</script>


<template>
  <div class="list" v-if="file">
    <div class="list-item">新建文件</div>
    <div class="list-item" @click="open">打开文件</div>
    <div class="list-item" @click="last">上次打开</div>
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
  ></v-md-editor>
</template>

<style scoped>
.list {
  margin: 100px;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.list-item {
  margin: 10px;
  cursor: pointer;
  font-size: 16px;
}
</style>