# IR Studio Architecture

## Philosophy

IR Studio is designed as an engineering tool, not just a Broadlink utility.

The architecture should allow support for multiple infrared devices,
multiple export formats and advanced protocol analysis.

---

## Frontend

```
App
│
└── Dashboard
      │
      ├── StatusCard
      ├── StatsCard
      ├── DeviceList
      ├── LearnPanel
      └── CommandList
```

### Layers

```
UI Components
      │
Dashboard
      │
React Hooks
      │
API Service
      │
FastAPI Backend
```

---

## Backend

```
API
 │
 ├── IRService
 │
 ├── BroadlinkDriver
 │
 └── CommandRepository
```

---

## Future

```
Analyzer

Pattern Detector

Checksum Detector

Command Generator

SmartIR Export

LIRC Export

Pronto Export

ESPHome Export
```

---

## Data Flow

```
Learn Panel

↓

FastAPI

↓

Broadlink

↓

Raw IR

↓

Repository

↓

Command Library

↓

Analyzer

↓

Export
```

---

## Principles

- Single responsibility
- Shared types
- Service layer
- Reusable UI components
- Testable architecture
- Device-independent design
- Export-independent design