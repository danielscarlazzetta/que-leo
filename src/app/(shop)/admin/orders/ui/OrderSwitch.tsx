'use client';

import { changeOrderSend } from '@/actions';
import { useState } from 'react';

interface Props {
  initialChecked: boolean;
  orderId: string;
}

export const OrderSwitch = ({ initialChecked, orderId }: Props) => {
  const [isChecked, setIsChecked] = useState(initialChecked);

  const handleSwitchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setIsChecked(isChecked);

    // Actualizar en la base de datos
    try {
      const response = await changeOrderSend(orderId, isChecked);
      if (!response.ok) {
        throw new Error('No se pudo actualizar el estado');
      }
      console.log('Actualizado correctamente', response);
    } catch (error) {
      console.error('Error al actualizar:', error);
      setIsChecked(!isChecked); // Revertir el estado si ocurre un error
    }
  };

  return (
    <label className="relative inline-flex cursor-pointer items-center">
      <input
        id="switch-2"
        type="checkbox"
        className="peer sr-only"
        checked={isChecked}
        onChange={handleSwitchChange}
      />
      <label className="hidden"></label>
      <div className="peer h-4 w-11 rounded-full border bg-slate-200 after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-300 peer-checked:after:translate-x-full peer-focus:ring-green-300"></div>
    </label>
  );
};

