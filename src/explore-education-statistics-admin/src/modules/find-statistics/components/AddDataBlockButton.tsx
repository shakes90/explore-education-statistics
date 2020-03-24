import Button from '@common/components/Button';
import React, { useState } from 'react';
import DatablockSelectForm from './DatablockSelectForm';

interface AddContentButtonProps {
  onAddDataBlock: (datablockId: string) => void;
}

const AddDataBlockButton = ({ onAddDataBlock }: AddContentButtonProps) => {
  const [showForm, setShowForm] = useState(false);

  return showForm ? (
    <DatablockSelectForm
      onSelect={selectedDataBlockId => {
        onAddDataBlock(selectedDataBlockId);
        setShowForm(false);
      }}
      onCancel={() => {
        setShowForm(false);
      }}
    />
  ) : (
    <Button variant="secondary" onClick={() => setShowForm(true)}>
      Add data block
    </Button>
  );
};

export default AddDataBlockButton;
