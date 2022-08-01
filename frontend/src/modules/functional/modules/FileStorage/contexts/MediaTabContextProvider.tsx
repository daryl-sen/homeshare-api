import { SettingsApplicationsOutlined } from "@mui/icons-material";
import React, { useContext, useState, createContext } from "react";

interface MediaTabContext {
  selectedFileId: string | undefined;
  isGalleryModalOpen: boolean;
}

interface MediaTabReadOnlyContext {
  openGalleryModal: (newFileId: string) => void;
  closeGalleryModal: () => void;
}

const MediaTabContext = createContext<MediaTabContext>({
  selectedFileId: undefined,
  isGalleryModalOpen: false,
});

const MediaTabReadOnlyContext = createContext<MediaTabReadOnlyContext>({
  openGalleryModal: (newFileId: string) => undefined,
  closeGalleryModal: () => undefined,
});

export function useMediaTabContext() {
  return useContext(MediaTabContext);
}

export function MediaTabContextProvider({
  children,
}: {
  children: JSX.Element;
}) {
  const [selectedFileId, setSelectedFileId] = useState<string | undefined>(
    undefined
  );
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState<boolean>(false);

  const openGalleryModal = (newFileId: string) => {
    setSelectedFileId(newFileId);
    setIsGalleryModalOpen(true);
  };

  const closeGalleryModal = () => {
    setIsGalleryModalOpen(false);
    setSelectedFileId(undefined);
  };

  return (
    <MediaTabContext.Provider
      value={{
        selectedFileId,
        isGalleryModalOpen,
      }}
    >
      <MediaTabReadOnlyContext.Provider
        value={{ openGalleryModal, closeGalleryModal }}
      >
        {children}
      </MediaTabReadOnlyContext.Provider>
    </MediaTabContext.Provider>
  );
}
