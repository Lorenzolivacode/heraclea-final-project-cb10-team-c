import {
  useState,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

// Definizione dei tipi per i contesti
type ModalAudioContextType = boolean;
type SetModalAudioContextType = Dispatch<SetStateAction<boolean>>;
type ModalAudioStringContextType = string;
type SetModalAudioStringContextType = Dispatch<SetStateAction<string>>;

// Creazione dei contesti con tipi
export const IsModalAudioOpenContext = createContext<
  ModalAudioContextType | undefined
>(undefined);
export const SetIsModalAudioOpenContext = createContext<
  SetModalAudioContextType | undefined
>(undefined);

export const ModalAudioTitleContext = createContext<
  ModalAudioStringContextType | undefined
>(undefined);
export const SetModalAudioTitleContext = createContext<
  SetModalAudioStringContextType | undefined
>(undefined);

export const ModalAudioSrcContext = createContext<
  ModalAudioStringContextType | undefined
>(undefined);
export const SetModalAudioSrcContext = createContext<
  SetModalAudioStringContextType | undefined
>(undefined);

// Definizione del tipo per le props del provider
interface ModalAudioContextProps {
  children: ReactNode;
}

export function ModalAudioProvider({ children }: ModalAudioContextProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [audioTitle, setAudioTitle] = useState<string>("");
  const [audioSrc, setAudioSrc] = useState<string>("");

  return (
    <IsModalAudioOpenContext.Provider value={isOpen}>
      <SetIsModalAudioOpenContext.Provider value={setIsOpen}>
        <ModalAudioTitleContext.Provider value={audioTitle}>
          <SetModalAudioTitleContext.Provider value={setAudioTitle}>
            <ModalAudioSrcContext.Provider value={audioSrc}>
              <SetModalAudioSrcContext.Provider value={setAudioSrc}>
                {children}
              </SetModalAudioSrcContext.Provider>
            </ModalAudioSrcContext.Provider>
          </SetModalAudioTitleContext.Provider>
        </ModalAudioTitleContext.Provider>
      </SetIsModalAudioOpenContext.Provider>
    </IsModalAudioOpenContext.Provider>
  );
}
