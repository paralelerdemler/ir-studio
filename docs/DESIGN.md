# IR Studio Design

> This document defines the long-term product vision, architecture philosophy and design decisions behind IR Studio.
>
> It is intended to outlive implementation details.

---

# Product Vision

IR Studio is an Infrared Engineering Studio.

It is not simply a Broadlink utility or a Home Assistant helper.

Its goal is to become a professional environment for learning, organizing, testing, analyzing, generating and exporting infrared command databases.

The application should feel closer to Visual Studio Code, Figma or After Effects than a configuration utility.

---

# Product Philosophy

IR Studio is built around engineering workflows.

The application should help users understand infrared protocols rather than simply store IR codes.

Every feature should answer one of these questions:

- Learn
- Organize
- Verify
- Analyze
- Generate
- Export

If a feature does not support one of these goals, it probably does not belong inside IR Studio.

---

# Core Principles

## Project First

Everything belongs to a Project.

Commands never exist by themselves.

Projects represent physical devices.

Examples:

- Living Room Arçelik AC
- Bedroom LG AC
- Samsung TV
- Denon AVR
- Custom IR Device

---

## State Driven

Commands are identified by their state.

Not by arbitrary user names.

Instead of:

Power22

the application should understand:

- Cool
- 22°C
- Fan 2
- Swing Off

and generate human readable names automatically.

---

## Engineering First

The application should expose engineering information whenever possible.

Examples:

- protocol analysis
- code length
- timing information
- verification status
- confidence
- generated candidates

---

## Extensible

The architecture should support future protocols without redesign.

Current:

- Broadlink

Future:

- ESPHome
- Pronto
- LIRC
- Global Cache
- Raw IR

---

# Data Hierarchy

```text
Workspace
│
├── Project
│     ├── Commands
│     ├── Learn
│     ├── Analyzer
│     ├── Generator
│     └── Export
│
├── Project
│
└── Project
```

---

# Project Model

```ts
type Project = {
  id: string;

  name: string;

  brand: string;
  model: string;

  deviceType:
    | "air_conditioner"
    | "television"
    | "fan"
    | "audio"
    | "custom";

  protocol: "broadlink";

  region?: string;
  remoteType?: string;

  notes?: string;

  tags?: string[];

  createdAt: number;
  updatedAt: number;
}
```

---

# Command Model

Commands belong to a project.

Brand and model are NOT stored on every command.

```ts
type Command = {
  id: string;

  projectId: string;

  state: IRState;

  code: string;

  length: number;

  verified: boolean;

  createdAt: number;
  updatedAt: number;
}
```

---

# IR State Model

```ts
type IRState = {
  power: boolean;

  mode: string;

  temperature?: number;

  fan?: number;

  verticalSwing?: boolean;

  horizontalSwing?: boolean;

  clean?: boolean;

  sleep?: boolean;

  eco?: boolean;

  display?: boolean;
}
```

---

# Responsibility Rules

## Project owns

- Brand
- Model
- Device Type
- Protocol
- Region
- Export Settings
- Notes
- Analyzer Results

## Command owns

- IR State
- Raw Code
- Code Length
- Verification Status
- Learned Timestamp

---

# User Journey

The expected workflow is:

```text
Create Project

↓

Learn Commands

↓

Verify Commands

↓

Analyze Command Set

↓

Generate Missing Commands

↓

Export
```

---

# Application Structure

```text
Dashboard

Projects

Commands

Learn

Analyzer

Export

Settings
```

Dashboard should only provide an overview.

Every engineering workflow has its own page.

---

# UI Philosophy

The interface should resemble a professional desktop engineering application.

Inspirations:

- Visual Studio Code
- Figma
- After Effects
- Affinity Designer
- Linear

Avoid:

- Mobile app layouts
- Wizard-heavy workflows
- Large empty cards
- Consumer-style interfaces

---

# Technical Architecture

```text
Frontend

App
    ↓
IRStudioProvider
    ↓
Router
    ↓
Pages
    ↓
Components
    ↓
Hooks
    ↓
API

Backend

FastAPI
    ↓
Services
    ↓
Repositories
    ↓
Drivers
```

---

# Storage Strategy

Current

```text
backend/data/

projects.json

commands.json
```

Future

```text
backend/data/projects/

living-room-arcelik/

    project.json

    commands.json

bedroom-lg/

    project.json

    commands.json
```

Projects should become portable.

A project folder should be exportable, shareable and versionable.

---

# Long-Term Features

- Project Management
- Command Verification
- Analyzer
- Missing Command Generator
- SmartIR Export
- Batch Testing
- Timing Analysis
- Signal Visualization
- Protocol Detection
- Remote Database
- Workspace Support

---

# Non Goals

IR Studio is NOT intended to become:

- a Home Assistant frontend
- a Broadlink configuration utility
- a remote control replacement
- a generic IoT dashboard

Those may integrate with IR Studio, but they are not its purpose.

---

# Design Decisions

## 2026-06-29

Decision

Projects own commands.

Reason

Brand and model belong to the physical device, not individual IR commands.

Status

Accepted

---

## 2026-06-29

Decision

Verification is independent from sending.

Reason

A command may be sent many times but verified only once.

Status

Accepted

---

## Guiding Principle

Whenever a design decision is difficult, choose the solution that makes IR Studio feel more like an engineering platform than a simple utility.