# Overview

This is a full-stack lens configurator application built with React, TypeScript, Express.js, and PostgreSQL. The application allows users to configure eyeglasses through an interactive questionnaire and displays filtered lens options with pricing information. It features a modern UI with shadcn/ui components, Drizzle ORM for database management, and supports file uploads for updating lens data.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **UI Components**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS with custom color scheme (golden/brown theme)
- **Animations**: Framer Motion for smooth transitions
- **State Management**: React hooks with custom configurator hook
- **Build Tool**: Vite for development and production builds

## Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **File Uploads**: Multer for handling Excel file uploads
- **Development**: tsx for TypeScript execution
- **Static Serving**: Vite middleware in development, static files in production

## Data Storage
- **Database**: PostgreSQL with Drizzle ORM
- **Schema**: Defined in shared/schema.ts with lens and user tables
- **Migrations**: Drizzle-kit for database schema management
- **Local Storage**: Browser localStorage for caching lens data
- **File Storage**: Local uploads directory for Excel files

# Key Components

## Database Schema
- **Lenses Table**: Stores lens information including features (incolor, antireflexo, fotosensivel, blueCut), measurements, thickness, and pricing tiers
- **Users Table**: Basic user authentication with username/password
- **Shared Types**: TypeScript interfaces for type safety across frontend/backend

## Application Screens
- **Welcome Screen**: Landing page with app introduction
- **Question Screen**: Interactive questionnaire with progress tracking
- **Results Screen**: Filtered lens results with pricing cards
- **Upload Screen**: Excel file upload for updating lens data

## Core Features
- **Lens Filtering**: Multi-step questionnaire filters lenses based on user preferences
- **Pricing Display**: Multiple payment options (cash, 3x, 6x, 10x installments)
- **File Management**: Upload and parse Excel files for lens data updates
- **Offline Support**: PWA capabilities with service worker and manifest

# Data Flow

1. **User Journey**: Welcome → Questionnaire → Results → Optional Upload
2. **Filtering Logic**: Each question answer filters the lens database progressively
3. **Data Sources**: Database for production data, localStorage for cached/uploaded data
4. **File Processing**: Excel uploads are handled server-side with client-side parsing utilities

# External Dependencies

## UI and Styling
- Radix UI for accessible component primitives
- Tailwind CSS for utility-first styling
- Framer Motion for animations
- Lucide React for icons

## Data Management
- Drizzle ORM for type-safe database operations
- @neondatabase/serverless for PostgreSQL connectivity
- Drizzle-zod for schema validation
- React Query for data fetching and caching

## File Handling
- Multer for multipart form uploads
- Client-side Excel parsing utilities (planned integration)

## Development Tools
- Vite for fast development and building
- TypeScript for type safety
- ESBuild for production server bundling

# Deployment Strategy

## Development Environment
- Replit-hosted with live reload
- PostgreSQL database provisioned via Replit modules
- Hot module replacement via Vite
- Environment variables for database connection

## Production Build
- Frontend built to dist/public via Vite
- Backend bundled to dist/index.js via ESBuild
- Static file serving from Express
- Database migrations via Drizzle-kit

## Configuration
- Port 5000 for development server
- External port 80 for production deployment
- Autoscale deployment target on Replit
- Environment-specific builds and startup scripts

# User Preferences

Preferred communication style: Simple, everyday language.

# Recent Changes

- June 21, 2025: **Substituição completa dos dados com nova planilha PRECIFICAÇÃO_REAL**
  - 100% dos dados atualizados com PRECIFICAÇÃO_REAL_1750530286686.xlsx (43 lentes)
  - Distribuição atualizada: LENTES SOLARES (8), VISÃO SIMPLES (26), BIFOCAIS CR-39 (1), PROGRESSIVAS ACABADAS (8)
  - Todos os preços, nomes e características atualizados conforme nova planilha
  - Sistema web (client/src/lib/lens-data.ts) completamente atualizado
  - Arquivos HTML standalone (standalone-app.html e standalone-app-iphone.html) atualizados
  - Dados autênticos extraídos diretamente da planilha Excel fornecida
  - Preços com formatação brasileira (R$ x,xx) e parcelas calculadas corretamente
  - Revisão completa de todos os sistemas com dados reais da planilha

- June 21, 2025: **Implementação completa do tipo de visão e correções para iPhone**
  - Sistema de tipo de visão implementado: VISÃO SIMPLES (26), LENTES SOLARES (8), BIFOCAIS CR-39 (1), PROGRESSIVAS ACABADAS (8)
  - Botão "Ver Todas as Lentes" adicionado para consulta direta sem questionário
  - Tipo de visão aparece como badge azul nos cards das lentes
  - Características das lentes (incolor, antirreflexo, fotossensível, blue cut) mostradas como badges coloridos
  - Correções específicas para iPhone: event listeners para touchstart/touchend com CSS otimizado para iOS
  - Arquivos HTML standalone atualizados com todas as funcionalidades
  - Sistema web e HTMLs agora totalmente sincronizados

- June 21, 2025: **Sistema offline completo com deployment implementado**
  - PWA configurado para funcionamento offline no celular
  - Service Worker implementado para cache completo da aplicação
  - Editor de preços integrado - sem necessidade de planilhas
  - Busca, edição, adição e remoção de lentes diretamente no app
  - Template de planilha para download com instruções de preenchimento
  - Guia de instalação offline para Android e iOS visível na tela inicial
  - Upload funcionando offline após instalação no dispositivo
  - Sistema usa dados reais da planilha PRECIFICAÇÃO_REAL (43 lentes)
  - **Deployment configurado**: App funciona independente do Replit via URL público

- June 20, 2025: **Sistema de filtragem progressiva implementado**
  - Sistema agora filtra dinamicamente as opções baseado nas respostas do usuário
  - Suporte para colunas ESF/CIL separadas ou campo MEDIDAS unificado
  - Nova paleta de cores azul escura com efeitos 3D e sombreamentos aprimorados
  - Upload de Excel funcionando com processamento real dos dados da planilha PRECIFICAÇÃO
  - Interface responsiva com animações e efeitos de brilho azul

- June 20, 2025: **Arquitetura atualizada**
  - Schema de banco expandido para suportar esf/cil separados ou medidas unificadas
  - Sistema de API para filtragem progressiva com fallback local
  - Parser Excel atualizado para detectar automaticamente formato da planilha
  - Paleta de cores migrada para tons azuis dominantes com acentos dourados

# Changelog

Changelog:
- June 20, 2025. Initial setup