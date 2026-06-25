# Dynamic Dashboard Builder

## Overview

Dynamic Dashboard Builder is a web-based application that allows users to create customizable dashboards by adding, arranging, and managing different UI components. The application provides a drag-and-drop interface similar to dashboard/page builders, enabling users to design layouts visually and save them for future use.

---

## Features

### Dashboard Components

* Add Text Elements
* Upload and Place Images
* Add Dynamic Charts (generated using dummy data)

### Editing Capabilities

* Drag and reposition elements
* Resize elements
* Rich text formatting:

  * Bold
  * Italic
  * Font Size Selection

### Layout Management

* Save dashboard layouts to MySQL
* Automatically load saved layouts on page refresh
* Create a New Dashboard
* Clear existing dashboard layout

### User Interface

* Responsive dashboard layout
* Left sidebar for tools
* Central canvas workspace
* Right sidebar for properties and formatting controls

---

## Technology Stack

### Frontend

* HTML5
* CSS3
* JavaScript
* Fabric.js
* Chart.js

### Backend

* PHP

### Database

* MySQL

### Environment

* MAMP (Apache + MySQL + PHP)

---

## Project Structure

```text
builder/

├── frontend/
│   ├── index.html
│   ├── style.css
│   └── app.js
│
├── backend/
│   ├── db.php
│   ├── save_layout.php
│   ├── get_layout.php
│   └── clear_layout.php
│
├── database/
│   └── schema.sql
│
└── README.md
```

---

## Database Schema

### Database

```sql
CREATE DATABASE dashboard_builder;
```

### Table Structure

```sql
CREATE TABLE layouts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL DEFAULT 'Untitled Dashboard',
    layout_data LONGTEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);
```

---

## Sample Data

```sql
INSERT INTO layouts (name, layout_data)
VALUES (
    'Sample Dashboard',
    '{"objects":[]}'
);
```

---

## Setup Instructions

### 1. Install MAMP

Download and install MAMP.

Start:

* Apache Server
* MySQL Server

---

### 2. Create Database

Open phpMyAdmin and run:

```sql
CREATE DATABASE dashboard_builder;
```

Import the schema from:

```text
database/schema.sql
```

---

### 3. Configure Database Connection

Update the database credentials in:

```text
backend/db.php
```

Example:

```php
$host = "localhost";
$user = "root";
$password = "root";
$database = "dashboard_builder";
```

---

### 4. Place Project in MAMP

Copy the project folder into:

```text
/Applications/MAMP/htdocs/
```

Example:

```text
/Applications/MAMP/htdocs/builder
```

---

### 5. Run the Application

Open:

```text
http://localhost:8888/builder/frontend/index.html
```

---

## API Endpoints

### Save Layout

**POST**

```text
backend/save_layout.php
```

Stores the current dashboard layout in MySQL.

---

### Get Layout

**GET**

```text
backend/get_layout.php
```

Retrieves the most recently saved dashboard layout.

---

### Clear Layout

**POST**

```text
backend/clear_layout.php
```

Removes the currently saved dashboard layout.

---

## Assumptions

* Dummy chart data is used for demonstration purposes.
* Single-user prototype implementation.
* Layout data is stored as JSON generated from Fabric.js.

---

## Future Enhancements

* Multiple dashboard support
* User authentication
* Dashboard templates
* Additional chart types
* Real-time collaboration
* Export dashboard as PDF/Image
* Theme customization

---

## Deliverables Included

✔ Working Dashboard Builder Prototype

✔ SQL Schema

✔ Sample Data

✔ PHP APIs

✔ MySQL Integration

✔ README with Setup Instructions

✔ Responsive User Interface
