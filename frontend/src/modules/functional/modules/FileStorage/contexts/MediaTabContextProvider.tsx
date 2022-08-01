import React, { useContext, useState, createContext } from "react";

interface IMediaTabContext {
  selectedFileId: string | undefined;
  isGalleryModalOpen: boolean;
  openGalleryModal: (newFileId: string) => void;
  closeGalleryModal: () => void;
}

const MediaTabContext = createContext<IMediaTabContext>({
  selectedFileId: undefined,
  isGalleryModalOpen: false,
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
  const [galleryModalState, setGalleryModalState] = useState({
    isGalleryModalOpen: false,
    selectedFileId: undefined,
  });

  const openGalleryModal = (newFileId: string) => {
    setGalleryModalState({
      isGalleryModalOpen: true,
      selectedFileId: undefined,
    });
  };

  const closeGalleryModal = () => {
    setGalleryModalState({
      isGalleryModalOpen: false,
      selectedFileId: undefined,
    });
  };

  return (
    <MediaTabContext.Provider
      value={{ ...galleryModalState, openGalleryModal, closeGalleryModal }}
    >
      {children}
    </MediaTabContext.Provider>
  );
}
