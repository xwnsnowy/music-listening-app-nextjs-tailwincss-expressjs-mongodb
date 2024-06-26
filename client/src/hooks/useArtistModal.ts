import { create } from "zustand";

interface UseArtistModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useArtistModal = create<UseArtistModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useArtistModal;