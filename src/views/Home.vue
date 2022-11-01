<script setup>
import { onMounted, onBeforeUnmount, ref, provide } from "vue";
import { apiGetUserInfo } from "../api/picture";
import mdEditerVue from "../component/md-editer.vue";

//内容
const text = ref("");

//是否展示输入框
const file = ref(true);

provide("text", text);

//操作一标题
const changeTitle = (title) => {
  document.title = title;
};

const notice = () => {
  var option = {
    title: "系统提示",
    body: "保存成功！",
  };
  new window.Notification(option.title, option);
};

//系统关闭
myApi.systemQuit(async () => {
  if (file.value) {
    handleQuit(true);
  } else {
    let re = await handleSave(!file.value);
    if (re !== 2) {
      handleQuit(true);
    }
  }
});

//系统关闭文件
myApi.systemClose(async () => {
  if (!file.value) {
    let re = await handleSave(!file.value);
    if (re !== 2) {
      file.value = true;
      changeTitle("YSU-MD");
    }
  }
});

//系统保存文件（另存为）
myApi.systemSaveFile(async (event, data) => {
  if (!file.value) {
    let re = await handleSave(file.value, data);
    if (re !== 2) {
      changeTitle(re);
    }
  }
});

//系统打开文件
myApi.systemOpenFile(async (event, data = true) => {
  if (data) {
    handleOpen(false);
    return;
  }
  if (file.value) {
    handleOpen(true);
  } else {
    let re = await handleSave(!file.value);
    if (re !== 2) {
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
    if (re !== 2) {
      handleNewFile();
    }
  }
});

const editsave = async () => {
  let re = await handleSave(file.value);
  if (re !== 2) {
    changeTitle(re);
  }
};
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
          if (re !== 2) {
            changeTitle(re);
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

//退出程序
const handleQuit = () => {
  myApi.quitFile();
};

//自动恢复
const handleCover = () => {
  let re = myApi.getSaved();
  text.value = re;
  file.value = false;
  changeTitle("new file1.md");
};

//保存文件
const handleSave = async (option, force = false) => {
  let re = await myApi.saveFile(text.value, option, force);
  if (re !== 2) {
    //notice();
  }
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
    <div class="list-item" @click="handleCover">
      <img src="../../public/recover.png" alt="" />恢复数据
    </div>
    <!-- <div class="list-item" @click="resolve">恢复数据</div> -->
  </div>

  <div v-else class="edit">
    <mdEditerVue v-model:text="text" @editsave="editsave" />
  </div>
</template>

<style scoped>
.edit {
  width: 100%;
  height: 100%;
}
.list {
  width: 100%;
  padding-top: 100px;
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