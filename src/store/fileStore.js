import { defineStore } from "pinia";
import store from "store2";
import _ from "lodash";

const useFileStore = defineStore("fileStore", {
  state() {
    return {
      file: null,
    };
  },

  actions: {
    add(item) {
      if (_.find(file)) {
        myApi.alert("请先关闭当前文件");
      } else {
        this.file(item);
        store("websites", this.file);
      }
    },

    init() {
      this.file = store.get("file");
    },

    deleteItem() {
      // this.websites = _.dropWhile(this.websites, { url })
      this.file = "";
      store("websites", this.file);
    },
  },

  getters: {
    find() {
      return () => {
        return this.file;
      };
    },
  },
});

const useWebsiteStore = defineStore("websiteStore", {
  state() {
    return {
      websites: [],
    };
  },

  actions: {
    add(item) {
      if (_.find(this.websites, { url: item.url })) {
        myApi.alert("此网站已经被添加");
      } else {
        this.websites.unshift(item);
        store("websites", this.websites);
      }
    },

    init() {
      this.websites = store.get("websites");
    },

    deleteItem(url) {
      // this.websites = _.dropWhile(this.websites, { url })
      this.websites = this.websites.filter((value) => {
        return value.url !== url;
      });
      store("websites", this.websites);
    },
  },

  getters: {
    find() {
      return (keywords) => {
        if (keywords === "") {
          return this.websites;
        } else {
          const result = _.filter(this.websites, (item) => {
            let partten = new RegExp(keywords, "i");
            return partten.test(item.title);
          });
          return result;
        }
      };
    },
  },
});

export default useFileStore;
