## Kế hoạch thêm đa ngôn ngữ (i18n) cho ChatGPT2API Web

### Mục tiêu
Hỗ trợ 3 ngôn ngữ: **zh-CN** (giữ nguyên), **vi** (Tiếng Việt), **en** (English) sử dụng **next-intl**.

---

### Phase 1: Setup next-intl

1. **Cài đặt next-intl**
   ```bash
   cd web && bun add next-intl
   ```

2. **Tạo cấu trúc thư mục i18n**
   ```
   web/src/i18n/
   ├── request.ts        # getRequestConfig cho next-intl
   ├── routing.ts        # defineRouting config
   └── messages/
       ├── zh-CN.json    # Bản dịch tiếng Trung (gốc)
       ├── vi.json       # Bản dịch tiếng Việt
       └── en.json       # Bản dịch tiếng Anh
   ```

3. **Cấu hình routing** (`web/src/i18n/routing.ts`)
   - Locales: `['zh-CN', 'vi', 'en']`
   - DefaultLocale: `'zh-CN'`

4. **Cập nhật `next.config.ts`**
   - Thêm `createNextIntlPlugin` để tích hợp middleware

5. **Tạo middleware** (`web/src/middleware.ts`)
   - Dùng `createMiddleware(routing)` để detect locale

6. **Cập nhật `web/src/app/layout.tsx`**
   - Thêm `NextIntlClientProvider` 
   - Set `lang` attribute theo locale hiện tại

---

### Phase 2: Tạo message catalogs

Tạo 3 file JSON chứa key-value pairs cho tất cả text. Cấu trúc phân theo feature:

```json
{
  "common": {
    "save": "保存 / Lưu / Save",
    "cancel": "取消 / Hủy / Cancel",
    "delete": "删除 / Xóa / Delete",
    ...
  },
  "nav": {
    "image": "生图 / Tạo ảnh / Image",
    "accounts": "号池管理 / Quản lý tài khoản / Account Pool",
    ...
  },
  "login": {...},
  "accounts": {...},
  "image": {...},
  "settings": {...},
  ...
}
```

Ước tính ~500-800 keys cho toàn bộ UI.

---

### Phase 3: Refactor components (~30 files)

Thay thế hardcode strings bằng `useTranslations()`:

```tsx
// Trước
<h1>号池管理</h1>

// Sau
const t = useTranslations('accounts');
<h1>{t('title')}</h1>
```

**Files cần sửa:**
- `layout.tsx`, `top-nav.tsx`, `login/page.tsx`
- `accounts/page.tsx`, `account-import-dialog.tsx`
- `image/page.tsx`, `image-composer.tsx`, `image-results.tsx`, `image-sidebar.tsx`
- `image-manager/page.tsx`, `logs/page.tsx`
- `settings/page.tsx` + 14 settings components
- `debug/` components
- `version-release-dialog.tsx`, `date-range-filter.tsx`
- Toast messages, placeholders, aria-labels

---

### Phase 4: Language Switcher

Thêm dropdown chọn ngôn ngữ trong `top-nav.tsx` hoặc `header-actions.tsx`:
- Hiển thị flag/icon + tên ngôn ngữ
- Lưu selection vào localStorage
- Dùng `useRouter` để switch locale

---

### Phase 5: Test & Verify

1. `bun run build` - verify không lỗi
2. Test switch ngôn ngữ trên UI
3. Kiểm tra SEO: `<html lang="...">` đúng locale

---

### Lưu ý quan trọng
- Giá trị status accounts (`"正常"`, `"限流"`, ...) cần tách display text vs data value
- Date formatting `Intl.DateTimeFormat("zh-CN")` cần update theo locale
- Static export mode (`output: 'export'`) cần config prefix routing
- Toast messages cũng cần translate