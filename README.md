# SchedulAI - AI Event Scheduler

SchedulAI is a modern, full-stack event scheduling application built with a React frontend and a Node.js (Express) backend, both written in TypeScript.

The application allows users to create, view, delete, and archive events. A key feature is its AI-like categorization: when a new event is created, the backend automatically assigns it a category ("Work," "Personal," or "Other") by scanning the event's title and notes for predefined keywords.

## Core Technologies

-   **Frontend**: React, Vite, TypeScript, Tailwind CSS
-   **Backend**: Node.js, Express, TypeScript
-   **API Client**: Axios
-   **Date Formatting**: date-fns

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

-   Node.js (v18 or later recommended)
-   npm (or a compatible package manager like yarn or pnpm)

### Backend Setup (Server)

1.  **Navigate to the server directory:**
    ```bash
    cd server
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

    The backend will be running on `http://localhost:5001`.

### Frontend Setup (Client)

1.  **Navigate to the client directory from the root:**
    ```bash
    cd client
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

    The React application will open in your browser, typically at `http://localhost:5173`.

## API Endpoints

The backend provides the following RESTful API endpoints.

---

### 1. Get All Events

-   **Endpoint**: `GET /events`
-   **Description**: Retrieves a list of all events, sorted by date and time in ascending order.
-   **Success Response**:
    -   **Code**: `200 OK`
    -   **Content**: An array of event objects.
      ```json
      [
        {
          "id": 1,
          "title": "Project Meeting",
          "date": "2025-07-22",
          "time": "10:00",
          "notes": "Discuss Q3 roadmap.",
          "category": "Work",
          "archived": false
        }
      ]
      ```

---

### 2. Create a New Event

-   **Endpoint**: `POST /events`
-   **Description**: Creates a new event. The `category` is automatically determined by the server based on keywords in the `title` and `notes`.
-   **Request Body**:
    ```json
    {
      "title": "Team Lunch",
      "date": "2025-07-23",
      "time": "12:30",
      "notes": "Celebrate project launch."
    }
    ```
-   **Success Response**:
    -   **Code**: `201 Created`
    -   **Content**: The newly created event object.
-   **Error Response**:
    -   **Code**: `400 Bad Request` if `title`, `date`, or `time` are missing.

---

### 3. Archive/Unarchive an Event

-   **Endpoint**: `PUT /events/:id`
-   **Description**: Toggles the `archived` status of a specific event.
-   **Success Response**:
    -   **Code**: `200 OK`
    -   **Content**: The updated event object.
-   **Error Response**:
    -   **Code**: `404 Not Found` if the event with the specified `id` does not exist.

---

### 4. Delete an Event

-   **Endpoint**: `DELETE /events/:id`
-   **Description**: Deletes a specific event from the server.
-   **Success Response**:
    -   **Code**: `204 No Content`
-   **Error Response**:
    -   **Code**: `404 Not Found` if the event with the specified `id` does not exist.