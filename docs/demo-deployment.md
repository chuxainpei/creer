# GitHub Pages 演示部署（半真实）

## 架构

- 前端：GitHub Pages（静态导出）
- 临时 API：Render/Railway 免费层（`POST /api/v1/qa/ask`）
- 模式：`NEXT_PUBLIC_DEMO_MODE=1`

## 1. 部署临时 API（Render）

1. 在 Render 新建 Web Service，指向本仓库。
2. Root Directory 设为 `demo-api`。
3. Build Command:
   - `pip install -r requirements.txt`
4. Start Command:
   - `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. 环境变量：
   - `ALLOWED_ORIGINS`：可留空（默认允许 `*.github.io`）
6. 部署后确认：
   - `GET /health` 返回 `{"ok": true}`
   - `POST /api/v1/qa/ask` 返回 `answer/source_tags/evidence/used_official`

## 2. 配置 GitHub Pages 自动发布

1. 仓库设置中开启 Pages（Source 选 GitHub Actions）。
2. 在仓库 Variables 中新增：
   - `DEMO_API_BASE_URL=https://<your-demo-api-domain>`
3. 推送到 `main` 或 `demo` 分支，触发 `pages-demo.yml`。
4. 发布完成后，访问 Actions 输出的 Pages URL 验证 `/` 与 `/qa`。

## 3. 现场兜底

- 若临时 API 不可用，前端 demo 模式会自动回退到本地 mock 回答，不会中断演示流程。
- `/admin` 在 demo 模式展示禁用提示，避免静态站误导。
