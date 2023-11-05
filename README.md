# Image Gallery App Documentation

This documentation provides an overview of an image gallery app built with Next.js, TypeScript, Tailwind CSS, SCSS, and the DND-Kit library. The app allows users to upload, organize, and view images in a responsive and interactive gallery.

![Screenshots](https://i.ibb.co/DMb3qyP/Screenshot-from-2023-11-05-11-54-21.png)

## Table of content

1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Tech Stack](#techstack)
4. [Features](#features)
5. [Installation](#installation)
6. [Structure](#structure)

## Introduction

Welcome to our project! This README provides an overview of what our project is all about. It's a great starting point to understand the purpose and goals of our work. The Image Gallery App is a web application designed to showcase and manage images efficiently. It is built with modern web technologies, including Next.js for server-side rendering, TypeScript for type safety, Tailwind CSS for styling, SCSS for advanced styling customization, and the DND-Kit library for drag-and-drop interactions.

## Prerequisites

Before you begin, ensure you have met the following requirements:

```bash
    -   [Node.js](https://nodejs.org/) (v14 or later)
    -   [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
```

## Tech Stack

```bash
    **Client:** React, Next Js, TailwindCSS, ShadCN UI, Uploadthing, Context API & SCSS.
    **Server:** Node, Prisma & PostgreSQL.
```

## Features

-   **Image Upload:** Users can upload images from their local storage.
-   **Image Organization:** Images can be organized by sorting.
-   **Drag-and-Drop:** Utilizes DND-Kit for drag-and-drop functionality.
-   **Responsive Design:** The app is designed to work on desktop and mobile devices.
-   **Server:** These data comming from server user store images permanently here use `Supabse` for storage provider.

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/image-gallery-app.git

    ```

2. **Navigate to the project directory:**

    ```bash
    cd image-gallery-app

    ```

3. **Install the project dependencies:**

    ```bash
     npm install
     # or
     yarn
    ```

## Structure

```bash
    .
    ├── image-gallery           # Root folder for image gallery
    │   ├── app/                # Routes and Providers for app
    │   ├── components/         # All components have their own
    │       ├── dnd-kit/        # DND-KIT components (which are taken form dnd-kit)
    │       ├── image-gallery/  # Image Gallery components
    │       ├── ui/             # UI Related components generated with shadcn ui.
    │   ├── lib/                # Additional healper functions.
    └── ...
```

## Acknowledgements

-   [Next.js](https://nextjs.org/docs)
-   [TypeScript](https://www.typescriptlang.org/docs)
-   [Tailwind CSS](https://tailwindcss.com/docs)
-   [DND-Kit](https://docs.dndkit.com/)
