import React from "react";

import Dashboard from "./modules/functional/modules/Dashboard/DashboardIndex";
import SharedClipboard from "./modules/functional/modules/Clipboard/SharedClipboardIndex";
import FileStorage from "./modules/functional/modules/FileStorage/FileStorageIndex";
import PasswordManager from "./modules/functional/modules/PasswordManager/PasswordManagerIndex";
import Todo from "./modules/functional/modules/Todo/TodoIndex";
import { Routes, Route } from "react-router-dom";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/shared-clipboard" element={<SharedClipboard />} />
      <Route path="/file-storage" element={<FileStorage />} />
      <Route path="/password-manager" element={<PasswordManager />} />
      <Route path="/todo" element={<Todo />} />
    </Routes>
  );
}
