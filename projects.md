# Lencho Lemessa — Project Portfolio

## Portfolio Overview

Lencho Lemessa is an AI Automation Developer and Full-Stack Developer focused on turning emerging AI capabilities into practical software products and automated workflows.

His portfolio spans full-stack web development, academic productivity software, generative audio, generative vision, automated video production, AI content pipelines, and agentic automation. Across these projects, he consistently works at the intersection of **software engineering, artificial intelligence, automation, and product development**.

The projects below demonstrate his ability to move from an idea or technical problem to a working application, connect multiple technologies into an end-to-end system, and package complex AI capabilities behind usable interfaces.

\---

# Project 1: Wutete — Academic Planning Suite

## Overview

**Wutete** is a comprehensive academic planning toolkit designed for Ethiopian university students. It focuses on practical academic calculations and planning rather than unnecessary account systems or administrative complexity.

The platform provides students with tools for understanding their academic performance and modeling future outcomes.

Core capabilities include:

* GPA Calculator
* CGPA Calculator
* Target GPA Planner
* What-If Academic Simulator

Wutete is designed around accessibility and low friction: students can use the core tools without creating an account.

## The Problem

University students frequently need to calculate GPA and CGPA, determine the grades required to reach academic targets, and experiment with hypothetical results.

Manual calculations become increasingly difficult when courses have different credit values or when students need to model multiple future scenarios.

Students need quick answers to questions such as:

* What is my semester GPA?
* What is my current CGPA?
* What grades do I need to reach a target?
* How would a different grade affect my result?
* How could future semesters change my cumulative performance?

## The Solution

Lencho built Wutete as a browser-first academic toolkit that performs these calculations directly through the web application.

The target planner and what-if simulator extend the product beyond simple calculators by helping students reason about future academic outcomes.

A major product decision is the **zero-account architecture**. Core calculations can happen directly in the browser, meaning students do not need to surrender personal academic information simply to use the tools.

This creates a lightweight and scalable product model while keeping the experience fast and accessible.

## Technical Architecture

**Technology Stack**

* Next.js
* React
* TypeScript
* Tailwind CSS

**Architecture**

```text
Student
   |
   v
Wutete Web Interface
   |
   +--> GPA Calculator
   +--> CGPA Calculator
   +--> Target GPA Planner
   +--> What-If Simulator
            |
            v
     Client-Side Logic
            |
            v
       Academic Results
```

The application uses a component-based React architecture with TypeScript providing type safety across interfaces and calculation logic.

The browser-first processing model minimizes unnecessary backend dependencies for core academic functionality.

\---

# Project 2: Lencho's Voice Lab — 

## Overview

**Lencho's Voice Lab** is a self-hosted AI Voice Synthesis Studio built around Kokoro TTS.

The application provides a web interface for generating natural-sounding speech from text while keeping the underlying AI inference under the developer's control.

The project demonstrates how an open AI speech model can be transformed from a model-level capability into a usable application.

Core capabilities include:

* AI text-to-speech generation
* Web-based voice synthesis
* Voice selection and configuration
* Audio playback
* AI audio processing
* Self-hosted inference
* Streamlined generation workflows

## The Problem

Commercial voice platforms provide powerful speech synthesis but can introduce pricing, usage, API, and platform restrictions.

For experimentation and independent AI products, relying entirely on proprietary voice APIs can reduce control over the underlying generation process.

Lencho wanted a more open architecture that could provide high-quality speech synthesis while allowing greater control over the application and inference pipeline.

## The Solution

Lencho's Voice Lab wraps Kokoro TTS inside a clean Streamlit application.

Instead of requiring users to interact directly with model infrastructure, the application provides a product-level interface for text input, voice configuration, generation, and playback.

```text
User Text
    |
    v
Streamlit Interface
    |
    v
Python Application Layer
    |
    v
Kokoro TTS
    |
    v
Generated Audio
    |
    v
Playback / Export
```

The architecture can be extended with additional voices, generation settings, caching, audio post-processing, and long-form speech workflows.

## Technical Architecture

**Technology Stack**

* Python
* Streamlit
* Kokoro TTS
* AI Audio Processing

Python acts as the orchestration layer while Streamlit provides the application interface and Kokoro performs speech inference.

The project demonstrates Lencho's ability to integrate AI inference into an end-user application rather than treating a model as an isolated experiment.

\---

# Project 3: Lenchoxos AI Studio — Text-to-Image

## Overview

**Lenchoxos AI Studio** is an open-source text-to-image generation suite built around open-weight diffusion models.

The application provides a streamlined interface for generating high-fidelity visual content from natural-language prompts.

It is designed for creative experimentation and applications including:

* Storybook illustrations
* Concept art
* Character visualization
* Creative assets
* Visual experimentation
* High-fidelity image generation

## The Problem

Modern diffusion models can generate sophisticated images, but using them directly often requires knowledge of model loading, inference pipelines, generation parameters, hardware requirements, and technical tooling.

The challenge is therefore not only running a model, but turning it into a usable creative application.

## The Solution

Lencho built Lenchoxos AI Studio as an application layer over open-weight image-generation infrastructure.

The user interacts with a simple interface while Python handles the underlying model pipeline.

```text
Text Prompt
    |
    v
Streamlit UI
    |
    v
Generation Parameters
    |
    v
Diffusion Pipeline
    |
    v
Open-Weight Model
    |
    v
Generated Image
```

The modular approach allows different diffusion architectures and models to be evaluated and integrated without rebuilding the entire user experience.

## Technical Architecture

**Technology Stack**

* Python
* Streamlit
* Open-weight Diffusion Models
* Diffusion Inference Pipelines

The project highlights Lencho's ability to rapidly prototype AI products and create usable interfaces around complex generative models.

\---

# Project 4: AI Video Editor — Automated AI Video Production

## Overview

The **AI Video Editor** is an automated video-production system designed to reduce the manual work involved in creating polished short-form and social-media videos.

The project explores programmatic video generation using AI-assisted development and code-driven motion graphics rather than relying entirely on traditional timeline-based editing.

The system is designed around the idea that video production can be represented as structured data and generated through software.

Its workflow can support:

* Automated scene construction
* Programmatic motion graphics
* Text and typography animation
* Image and visual asset integration
* AI-assisted video composition
* Timeline-based sequencing
* Reusable visual components
* Social-media-oriented video output

## The Problem

Traditional video editing requires repetitive manual operations: placing assets, adjusting timing, creating transitions, animating text, synchronizing scenes, and exporting different versions.

This becomes particularly inefficient when producing many short-form videos.

For an AI-focused content workflow, the production system itself should be programmable so that a concept can move from script to visual composition with significantly less manual editing.

## The Solution

Lencho approaches video production as a software-engineering problem.

Instead of treating every video as a one-off project, the editor uses code-driven composition and reusable components. Scenes, animations, timing, typography, and visual elements can be described programmatically and rendered automatically.

A simplified architecture is:

```text
Script / Content Concept
        |
        v
AI-Assisted Planning
        |
        v
Structured Video Data
        |
        v
Reusable Scene Components
        |
        +--> Text / Typography
        +--> Motion Graphics
        +--> Images
        +--> Transitions
        +--> Audio
        |
        v
Programmatic Timeline
        |
        v
Video Renderer
        |
        v
Final Video
```

This approach makes video production reproducible and scalable. Once a visual component is created, it can be reused across multiple videos instead of manually rebuilding the same animation.

## Technical Architecture

**Technology Stack**

* React-based video composition
* TypeScript
* Remotion
* Tailwind CSS
* AI-assisted development workflows
* Programmatic motion graphics

The project uses Remotion's code-driven video composition model to represent video scenes as software components.

Lencho's workflow emphasizes **code-generated motion graphics** rather than relying exclusively on exported motion-graphics assets. This makes animations configurable, reusable, and easier to automate.

The architecture can support future AI agents that transform scripts into structured scene specifications before handing them to the renderer.

This project demonstrates the intersection of **AI automation, frontend engineering, animation systems, and media production**.

\---

# Project 5: AI News Automation Pipeline

## Overview

Lencho has developed an automated AI news-content pipeline designed to transform newly published AI content into structured, summarized social-media updates.

The system connects content discovery, duplicate detection, transcription, AI processing, and messaging automation into a single workflow.

Its goal is to reduce the repetitive work involved in monitoring AI developments and preparing them for distribution.

## The Problem

AI research and product releases move extremely quickly. Manually monitoring channels, watching videos, extracting information, writing summaries, and publishing updates is time-consuming.

For a developer or content creator trying to maintain consistent AI-focused publishing, the workflow itself can become the bottleneck.

## The Solution

Lencho designed an automation pipeline that connects multiple services into an event-driven content workflow.

A simplified architecture is:

```text
AI Content Sources
       |
       v
RSS / Content Discovery
       |
       v
Duplicate Detection
       |
       v
Transcript Extraction
       |
       v
LLM Processing
       |
       v
Structured AI Summary
       |
       v
Telegram / Content Distribution
```

The workflow uses persistent state to prevent already-processed content from being repeatedly published.

It can also handle intermediate processing states, allowing individual stages to be improved without rebuilding the entire pipeline.

## Technical Architecture

**Technology Stack**

* Make.com
* RSS feeds
* OpenRouter
* LLM APIs
* Transcript extraction APIs
* Data Stores / Google Sheets
* Telegram
* Automation workflows

The project demonstrates Lencho's ability to connect heterogeneous APIs and services into a coordinated automation system.

Rather than building one monolithic application, the system treats each external service as a specialized component in a larger pipeline.

This architecture provides a foundation for more advanced AI content agents capable of monitoring sources, evaluating relevance, summarizing information, and distributing content automatically.

\---

# Project 6: Lencho's Studio — AI Conversation \& Voice Production

## Overview

**Lencho's Studio** is an AI voice-production application focused on generating natural two-person conversations and reusable AI voice assets.

The project combines text-to-speech generation, voice management, persistent storage, and long-form audio production into a single application.

The system is designed for workflows such as:

* English practice conversations
* Podcast-style dialogue
* Educational audio
* AI-generated narration
* Multi-speaker scripts
* Reusable custom voice libraries

## The Problem

Generating long-form AI audio manually can be cumbersome.

A creator may need to repeatedly generate individual dialogue segments, keep track of which voice belongs to which speaker, combine audio files, and regenerate only failed portions when a long generation process is interrupted.

Starting an entire generation job from zero after a partial failure wastes time and computational resources.

## The Solution

Lencho designed the application around a two-speaker conversation model with persistent voice storage and generation-state management.

The system can conceptually operate as:

```text
Conversation Script
       |
       v
Speaker Segmentation
       |
       +------> Speaker A Voice
       |
       +------> Speaker B Voice
       |
       v
Per-Segment TTS Generation
       |
       v
Cached Completed Segments
       |
       v
Resume Remaining Segments
       |
       v
Audio Assembly
       |
       v
Final MP3
```

A key architectural capability is **generation caching and resume support**.

If a long conversation contains hundreds of generated segments and execution stops after a subset has completed, the system can retain completed results and continue from the remaining work rather than regenerating everything.

This transforms a fragile long-running generation process into a more resilient workflow.

## Technical Architecture

**Technology Stack**

* Python
* Streamlit
* Pocket TTS
* Supabase
* Audio processing
* Persistent voice library
* MP3 generation

Supabase provides persistent storage for voice-library metadata and generated voice assets, while the Python application manages generation orchestration.

The architecture separates voice storage, conversation processing, generation state, and final audio assembly.

This project demonstrates Lencho's focus on building AI applications that are not merely demonstrations, but resilient tools capable of handling real workloads.

\---

# Project 7: ScholarshipOS — AI-Assisted Opportunity Discovery

## Overview

**ScholarshipOS** is an AI-assisted automation  focused on helping students discover and manage scholarship opportunities.

The project explores how autonomous agents can reduce the repetitive work involved in searching for opportunities, evaluating eligibility, organizing information, and preparing applications.

It represents Lencho's broader interest in using AI agents to automate complex knowledge-work workflows.

## The Problem

Finding scholarships and other educational opportunities can require repeatedly searching different websites, checking eligibility requirements, comparing deadlines, collecting application requirements, and maintaining application information.

The repetitive nature of the process creates a strong opportunity for automation.

## The Solution

Lencho's approach is to build an agent-oriented workflow where specialized components can handle different parts of the scholarship-discovery process.

A conceptual architecture is:

```text
Opportunity Sources
       |
       v
Research / Discovery Agent
       |
       v
Eligibility Analysis
       |
       v
Opportunity Filtering
       |
       v
Structured Scholarship Database
       |
       v
Application Preparation
       |
       v
Human Review
```

The system is designed around human-in-the-loop automation. AI can perform repetitive research and organization while the user remains responsible for reviewing sensitive information and making final application decisions.

## Technical Architecture

The project explores:

* AI agents
* Web research
* Structured data extraction
* Eligibility reasoning
* Persistent opportunity tracking
* Workflow automation
* Human-in-the-loop approval

ScholarshipOS represents a broader architectural direction in Lencho's work: using autonomous agents not simply to answer questions, but to **perform multi-step tasks using tools and persistent state**.

\---

# Cross-Project Technical Capabilities

Across these projects, Lencho demonstrates experience working across multiple layers of modern AI product development.

## Full-Stack Engineering

His projects include modern frontend and application technologies such as:

* Next.js
* React
* TypeScript
* Tailwind CSS
* Streamlit
* Python

He is comfortable building user-facing interfaces and connecting them to application logic and AI infrastructure.

## Generative AI

Lencho has worked with multiple generative AI modalities:

* **Text** — LLM-powered automation
* **Audio** — Kokoro TTS and Pocket TTS
* **Images** — Open-weight diffusion models
* **Video** — Programmatic AI-assisted video composition

This multi-modal focus allows him to design systems where different AI capabilities can operate together inside a larger workflow.

## AI Automation

A recurring pattern throughout Lencho's work is automation.

He builds pipelines that connect:

```text
Input
  |
  v
AI Processing
  |
  v
Decision / Transformation
  |
  v
External Tool
  |
  v
Output
```

This mindset extends beyond individual AI features toward complete automated workflows.

## Agentic Systems

Lencho's longer-term technical direction is toward autonomous systems capable of:

* Breaking complex objectives into tasks.
* Calling external tools.
* Retrieving information.
* Maintaining state.
* Coordinating specialized agents.
* Recovering from partial failures.
* Continuing long-running workflows.
* Delivering completed outputs with minimal manual intervention.

## Product Engineering Philosophy

Across his portfolio, Lencho emphasizes a common principle:

> \\\*\\\*AI should solve a real problem, not exist merely because AI is available.\\\*\\\*

His projects therefore focus on turning complex underlying technology into accessible products.

Whether the system is calculating academic outcomes, generating speech, creating images, producing videos, monitoring AI news, or automating research, the engineering objective remains consistent: **reduce unnecessary manual work and create useful software around powerful technology.**

## Portfolio Summary

|Project|Domain|Primary Technologies|Core Capability|
|-|-|-|-|
|**Wutete**|Academic Technology|Next.js, React, TypeScript|Academic calculation and planning|
|**Lencho's Voice Lab**|Generative Audio|Python, Streamlit, Kokoro TTS|AI speech synthesis|
|**Lenchoxos AI Studio**|Generative Vision|Python, Streamlit, Diffusion|Text-to-image generation|
|**AI Video Editor**|Media Automation|Remotion, React, TypeScript|Programmatic video production|
|**AI News Automation**|Content Automation|Make.com, OpenRouter, RSS, Telegram|Automated AI news pipeline|
|**Lencho's Studio**|Voice Production|Python, Streamlit, Pocket TTS, Supabase|Multi-speaker AI audio|
|**ScholarshipOS**|Agentic Automation|AI Agents, APIs, Automation|Scholarship discovery and workflow automation|

Together, these projects form a portfolio centered on **AI engineering, automation, full-stack development, generative media, and practical product development**.

They demonstrate Lencho's ability to work across the full lifecycle of an AI-powered product: identifying a problem, designing an architecture, integrating models and APIs, building an interface, automating workflows, handling persistent state, and turning experimental technology into usable software.

