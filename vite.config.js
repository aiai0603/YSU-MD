import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    // 压缩
    minify: "esbuild",
    assetsDir: "",
    outDir: `./common`,
    // 进行压缩计算
    brotliSize: false
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  base:'./' // 添加这个属性
})


