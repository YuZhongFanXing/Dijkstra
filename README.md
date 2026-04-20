# Dijkstra
Dijkstra 最短路径算法**可视化前端项目**，基于现代前端技术栈构建，提供简洁直观的算法演示交互体验。

## 技术栈
- **核心框架**：React 18
- **开发语言**：TypeScript
- **构建工具**：Vite
- **包管理器**：pnpm
- **代码格式化**：Prettier
- **工程化**：ESModule、TypeScript 严格校验

## 项目结构
```
Dijkstra/
├── .github/workflows/    # GitHub Actions 自动化配置
├── client/                # 前端核心业务代码
├── patches/               # 依赖补丁文件
├── shared/                # 公共工具/类型/常量
├── .gitignore             # Git 忽略配置
├── .prettierrc            # Prettier 格式化规则
├── components.json        # 组件配置文件
├── package.json           # 项目依赖与脚本
├── pnpm-lock.yaml         # pnpm 依赖锁定
├── tsconfig.json          # TypeScript 全局配置
├── tsconfig.node.json     # TypeScript Node 环境配置
└── vite.config.ts         # Vite 工程配置
```

## 快速开始
### 环境要求
- Node.js >= 16
- pnpm >= 8

### 安装依赖
```bash
pnpm install
```

### 本地开发
启动开发服务器，实时热更新
```bash
pnpm dev
```

### 生产构建
打包构建优化产物
```bash
pnpm build
```

### 预览构建产物
```bash
pnpm preview
```

## 项目更新
- 2026-04-04：修复路由相关问题，全项目统一配置优化

## 许可证
MIT License
