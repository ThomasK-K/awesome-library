import { atom } from 'recoil';

export type ErrorStateType = {
  [fieldname: string]: string | null;
} & {
  type?: 'validation' | 'api' | 'warning'; // Optionaler Fehlertyp
};

export const errorState = atom<ErrorStateType>({
  key: 'errorState',
  default: {
    ["message"]: null, // Initial kein Fehler
    type: 'validation', // Default-Typ
  },
});
