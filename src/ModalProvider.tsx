import React, { useCallback, useState, useMemo } from "react";
import { ModalType, ModalContext } from "./ModalContext";
import { ModalRoot } from "./ModalRoot";

/**
 * Modal Provider Props
 */
export interface ModalProviderProps {
  /**
   * Container component for modals
   *
   * Modals will be rendered into a portal as children of the
   * specified component. React.Fragment is used by default.
   */
  container?: React.ComponentType<any>;

  /**
   * Children which will receive Modal Context
   */
  children: React.ReactNode;
}

/**
 * Modal Provider
 *
 * Provides Modal Context to children.
 */
export const ModalProvider = ({ container, children }: ModalProviderProps) => {
  const [modals, setModals] = useState<Record<string, ModalType>>({});
  const showModal = useCallback(
    (key: string, modal: ModalType) =>
      setModals(modals => ({
        ...modals,
        [key]: modal
      })),
    []
  );
  const hideModal = useCallback(
    (key: string) =>
      setModals(modals => {
        const newModals = { ...modals };
        delete newModals[key];
        return newModals;
      }),
    []
  );
  const contextValue = useMemo(() => ({ modals, showModal, hideModal }), [
    modals
  ]);

  return (
    <ModalContext.Provider value={contextValue}>
      <React.Fragment>
        {children}
        <ModalRoot container={container} />
      </React.Fragment>
    </ModalContext.Provider>
  );
};
