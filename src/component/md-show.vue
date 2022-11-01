<script setup>
import { inject, reactive } from "vue";
import Markdown from "vue3-markdown-it";
import 'highlight.js/styles/monokai.css';
import 'github-markdown-css/github-markdown.css'

import MarkdownItEmoji from "markdown-it-emoji";
import MarkdownItDeflist from "markdown-it-deflist";
import MarkdownItSub from "markdown-it-sub";
import MarkdownItSup from "markdown-it-sup";
import MarkdownItAbbr from "markdown-it-abbr";

import MarkdownItcontainer from "markdown-it-container";
import MarkdownItFootnote from "markdown-it-footnote";
import MarkdownItForInline from "markdown-it-for-inline";
import MarkdownItIns from "markdown-it-ins";
import MarkdownItKatexExternal from "markdown-it-katex-external";

import MarkdownItMark from "markdown-it-mark";

import MarkdownItHighlightjs from 'markdown-it-highlightjs';

import MarkdownItTaskLists from "markdown-it-task-lists";
import MarkdownItTOC from 'markdown-it-toc-done-right';

const text = inject("text");
let plugins = reactive([
  {
    plugin: MarkdownItAbbr,
  },
  {
    plugin: MarkdownItSub,
  },
  {
    plugin: MarkdownItSup,
  },
  {
    plugin: MarkdownItDeflist,
  },
  {
    plugin: MarkdownItEmoji,
  },
  {
    plugin: MarkdownItcontainer,
  },
  {
    plugin: MarkdownItFootnote,
  },

  {
    plugin: MarkdownItIns,
  },
  {
    plugin: MarkdownItForInline,
  },
  {
    plugin: MarkdownItKatexExternal,
  },
  {
    plugin: MarkdownItMark,
  },
  {
    plugin: MarkdownItTaskLists,
  },
  {
    plugin: MarkdownItTOC,
  },
  {
    plugin: MarkdownItHighlightjs,
  },
]);
</script>
    
    
<template>
  <div class="markdown-body" style="width: 100%">
    <Markdown :source="text" :plugins="plugins" :breaks="true"  :html="true"  :linkify="true"  :typographer="true"/>
  </div>
</template>
    
<style scoped>
  .markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;

}


</style>