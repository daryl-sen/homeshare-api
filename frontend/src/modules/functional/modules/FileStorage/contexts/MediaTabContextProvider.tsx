import React, { useContext, useState, createContext } from "react";

interface IMediaTabContext {
  selectedFileId: string | undefined;
  isGalleryModalOpen: boolean;
}

interface IMediaTabReadOnlyContext {
  openGalleryModal: (newFileId: string) => void;
  closeGalleryModal: () => void;
}

const MediaTabContext = createContext<IMediaTabContext>({
  selectedFileId: undefined,
  isGalleryModalOpen: false,
});

const MediaTabReadOnlyContext = createContext<IMediaTabReadOnlyContext>({
  openGalleryModal: (newFileId: string) => undefined,
  closeGalleryModal: () => undefined,
});

export function useMediaTabContext() {
  return useContext(MediaTabContext);
}

export function useMediaTabContextFunctions() {
  return useContext(MediaTabReadOnlyContext);
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
    console.log("opening");
    setGalleryModalState({
      isGalleryModalOpen: true,
      selectedFileId: undefined,
    });
  };

  const closeGalleryModal = () => {
    setGalleryModalState({
      isGalleryModalOpen: true,
      selectedFileId: undefined,
    });
  };

  return (
    <MediaTabContext.Provider value={galleryModalState}>
      <MediaTabReadOnlyContext.Provider
        value={{ openGalleryModal, closeGalleryModal }}
      >
        {children}
      </MediaTabReadOnlyContext.Provider>
    </MediaTabContext.Provider>
  );
}
