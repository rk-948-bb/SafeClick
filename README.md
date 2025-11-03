# Safe Click - Computer Room Management System

מערכת ניהול חדר מחשבים עם ממשק לקוח-שרת מלא.

## 📋 תיאור הפרויקט

מערכת לניהול חדר מחשבים הכוללת:
- ניהול משתמשים והרשאות
- ניהול חבילות ומוצרים
- מעקב אחר רכישות ושכירויות
- ממשק משתמש אינטואיטיבי

## 🏗️ מבנה הפרויקט

```
safe-click/
├── ClientSide/          # ממשק משתמש (React + Vite)
├── ServerSide/          # שרת API (C# .NET)
└── Database/            # סקריפטים של SQL
```

---

## 💻 ClientSide - ממשק המשתמש

### טכנולוגיות
- ⚛️ **React** - ספריית UI
- ⚡ **Vite** - כלי בנייה מהיר
- 🔄 **Redux** - ניהול State
- 🎨 **CSS** - עיצוב

### התקנה והרצה

```bash
cd ClientSide
npm install
npm run dev
```

הפרויקט ירוץ על: `http://localhost:5173`

### תמונות ונכסים
- 🖼️ תמונות ממשק: `src/images/` (לוגו, אייקונים)
- 📦 תמונות מוצרים: ב-ServerSide

---

## 🖥️ ServerSide - שרת API

### טכנולוגיות
- 🔷 **ASP.NET Core** - Framework
- 🗄️ **Entity Framework Core** - ORM
- 🔐 **JWT** - אימות משתמשים
- 🗺️ **AutoMapper** - Mapping בין DTO ל-Entities

### מבנה
```
ServerSide/
├── ComputerRoom/        # Web API Project
├── BLL/                 # Business Logic Layer
├── DAL/                 # Data Access Layer (Entities)
└── DTO/                 # Data Transfer Objects
```

### התקנה והרצה

```bash
cd ServerSide
dotnet restore
dotnet build
dotnet run --project ComputerRoom
```

השרת ירוץ על: `https://localhost:7xxx`

### תמונות ונכסים
- 🖼️ תמונות מוצרים/קטגוריות: `ComputerRoom/images/`
- תמונות אלו מוגשות דרך ה-API

---

## 🗃️ Database - בסיס נתונים

### טכנולוגיה
- **SQL Server** / **MySQL**

### הגדרה

1. צור בסיס נתונים חדש
2. הרץ את הסקריפט:
```sql
-- הרץ את Database/script.sql
```

3. עדכן את ה-Connection String ב-`ServerSide/ComputerRoom/appsettings.json`:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=YOUR_SERVER;Database=ComputerRoom;..."
  }
}
```

---

## 🚀 התקנה מהירה (Quick Start)

### דרישות מקדימות
- Node.js (v18+)
- .NET 6.0 SDK או יותר
- SQL Server / MySQL

### שלבים

1. **שכפל את הפרויקט**
```bash
git clone <repository-url>
cd safe-click
```

2. **הגדר את בסיס הנתונים**
```bash
# הרץ את Database/script.sql
```

3. **הרץ את השרת**
```bash
cd ServerSide
dotnet restore
dotnet run --project ComputerRoom
```

4. **הרץ את הלקוח**
```bash
cd ClientSide
npm install
npm run dev
```

---

## 📦 תכונות עיקריות

- ✅ אימות והרשאות משתמשים (JWT)
- ✅ ניהול קטגוריות ומוצרים
- ✅ מערכת חבילות ומנויים
- ✅ מעקב אחר רכישות
- ✅ ממשק ניהול אינטואיטיבי
- ✅ Redux לניהול State

---

## 🛠️ פיתוח

### ClientSide
```bash
npm run dev      # הרצה במצב פיתוח
npm run build    # בנייה לפרודקשן
npm run preview  # תצוגה מקדימה
```

### ServerSide
```bash
dotnet watch run --project ComputerRoom    # Hot reload
dotnet test                                # הרצת בדיקות
```

---

## 📝 הערות

- ⚠️ אל תשכח לעדכן את ה-Connection String לפני הרצה ראשונה
- 🔐 קובץ `.env` לא נמצא ב-Git - צור אותו מקומית
- 📂 `appsettings.Development.json` לא נמצא ב-Git - צור אותו מקומית

---

## 👨‍💻 תורמים

[שמות המפתחים]

---

## 📄 רישיון

[סוג הרישיון]
