import { ModalProps } from '@/types';
import { ToasterProps } from 'react-hot-toast';

export const customToasterProps: ToasterProps = {
  position: 'top-center',
  toastOptions: {
    className: '',
    style: {
      backgroundColor: '#0f172b',
      color: '#cfff04',
      borderRadius: '0.5rem',
    },
  },
};

export const modals: Record<string, ModalProps[]> = {
  transactions: [
    {
      title: 'Create Transaction',
      id: 'create-transaction-modal',
      action: 'create',
    },
    {
      title: 'Update Transaction',
      id: 'update-transaction-modal',
      action: 'update'
    },
    {
      title: 'Delete Transaction',
      id: 'delete-transaction-modal',
      action: 'delete'
    },
  ],
};

export const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const neonColors = [
  "#FF6EC7", // Neon Pink
  "#7DF9FF", // Electric Blue
  "#39FF14", // Lime Green
  "#FF5F1F", // Neon Orange
  "#00FEEF", // Bright Turquoise
  "#FFFF33", // Neon Yellow
  "#FF00CC", // Hot Magenta
  "#BF00FF", // Bright Purple
  "#B0FF00", // Acid Green
  "#FF073A", // Neon Red
  "#00FFFF", // Neon Cyan
  "#FC0FC0", // Shocking Pink
  "#FFFF66", // Laser Lemon
  "#0FFF50", // Neon Green
  "#1F51FF", // Vivid Blue
  "#00FFEF", // Fluorescent Aqua
  "#9D00FF", // Radiant Violet
  "#AFFF00", // Toxic Slime
  "#FF6B6B", // Bright Coral
  "#6F00FF"  // Neon Indigo
];
