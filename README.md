# Mastra Frontend

这是一个基于 React + TypeScript + Vite 的前端项目，集成了 Mastra AI 客户端。

## 环境变量设置

### 1. 创建环境变量文件

在项目根目录创建 `.env` 文件：

```bash
# Mastra API 配置
VITE_MASTRA_API_URL=http://localhost:4111
```

### 2. 环境变量说明

- `VITE_MASTRA_API_URL`: Mastra API 服务器地址
  - 开发环境: `http://localhost:4111`
  - 生产环境: 你的实际 API 地址

## 项目特性

### AI 对话框界面

项目包含一个美观的 AI 对话框界面 (`src/routes/test.tsx`)，具有以下特性：

- 🎨 现代化 UI 设计，使用 Tailwind CSS
- 💬 实时消息对话
- ⏱️ 消息时间戳显示
- 🔄 加载状态指示器
- 📱 响应式设计
- 🎯 示例问题功能
- 🗑️ 清空对话功能

### 主要功能

1. **智能对话**: 与 AI 进行自然语言对话
2. **消息历史**: 保存和显示对话历史
3. **实时反馈**: 显示 AI 正在思考的状态
4. **错误处理**: 优雅的错误提示
5. **用户体验**: 流畅的交互动画

## 开发

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 代码检查

```bash
npm run lint
```

## 技术栈

- **前端框架**: React 19
- **开发语言**: TypeScript
- **构建工具**: Vite
- **样式框架**: Tailwind CSS
- **AI 客户端**: @mastra/client-js
- **代码规范**: ESLint

## 项目结构

```
mastra-fe1/
├── src/
│   ├── routes/
│   │   └── test.tsx          # AI 对话框组件
│   ├── vite-env.d.ts         # Vite 环境变量类型
│   └── index.css             # 全局样式
├── lib/
│   └── mastra.ts             # Mastra 客户端配置
├── .env                      # 环境变量
├── tailwind.config.js        # Tailwind 配置
└── package.json
```

## 使用说明

1. 确保 Mastra API 服务器正在运行
2. 设置正确的环境变量
3. 启动开发服务器
4. 访问 `http://localhost:5173` 查看应用
5. 在对话框中与 AI 进行对话

## 注意事项

- 确保 Node.js 版本 >= 18.16.0
- 环境变量必须以 `VITE_` 开头才能在客户端使用
- 生产环境部署时需要配置正确的 API 地址
