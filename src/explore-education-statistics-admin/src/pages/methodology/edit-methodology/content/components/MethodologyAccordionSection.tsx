import EditableSectionBlocks from '@admin/components/editable/EditableSectionBlocks';
import EditableAccordionSection from '@admin/components/EditableAccordionSection';
import {
  EditableBlock,
  EditableContentBlock,
} from '@admin/services/publicationService';
import Button from '@common/components/Button';
import { EditingContext } from '@common/modules/find-statistics/util/wrapEditableComponent';
import { ContentSection } from '@common/services/publicationService';
import { Dictionary } from '@common/types';
import React, { useCallback, useContext, useState } from 'react';
import { ContentSectionKeys } from '../context/MethodologyContextActionTypes';
import useMethodologyActions from '../context/useMethodologyActions';

interface MethodologyAccordionSectionProps {
  id: string;
  section: ContentSection<EditableContentBlock>;
  sectionKey: ContentSectionKeys;
  methodologyId: string;
}

const MethodologyAccordionSection = ({
  sectionKey,
  section: { id: sectionId, caption, heading, content: sectionContent },
  methodologyId,
  ...props
}: MethodologyAccordionSectionProps) => {
  const { isEditing } = useContext(EditingContext);

  const {
    addContentSectionBlock,
    deleteContentSectionBlock,
    updateContentSectionBlock,
    updateSectionBlockOrder,
    updateContentSectionHeading,
    removeContentSection,
  } = useMethodologyActions();

  const [isReordering, setIsReordering] = useState(false);
  const [blocks, setBlocks] = useState<EditableBlock[]>(sectionContent);

  const addBlockToAccordionSection = useCallback(async () => {
    await addContentSectionBlock({
      methodologyId,
      sectionId,
      block: {
        type: 'MarkDownBlock',
        order: sectionContent.length,
        body: '',
      },
      sectionKey,
    });
  }, [
    addContentSectionBlock,
    methodologyId,
    sectionId,
    sectionContent.length,
    sectionKey,
  ]);

  const updateBlockInAccordionSection = useCallback(
    (blockId, bodyContent) => {
      updateContentSectionBlock({
        methodologyId,
        sectionId,
        blockId,
        bodyContent,
        sectionKey,
      });
    },
    [methodologyId, sectionId, sectionKey, updateContentSectionBlock],
  );

  const removeBlockFromAccordionSection = useCallback(
    (blockId: string) =>
      deleteContentSectionBlock({
        methodologyId,
        sectionId,
        blockId,
        sectionKey,
      }),
    [deleteContentSectionBlock, methodologyId, sectionId, sectionKey],
  );

  const reorderBlocksInAccordionSection = useCallback(async () => {
    const order = blocks.reduce<Dictionary<number>>((acc, block, newIndex) => {
      acc[block.id] = newIndex;
      return acc;
    }, {});

    await updateSectionBlockOrder({
      methodologyId,
      sectionId,
      order,
      sectionKey,
    });
  }, [blocks, methodologyId, sectionId, sectionKey, updateSectionBlockOrder]);

  const onSaveHeading = useCallback(
    (newHeading: string) =>
      updateContentSectionHeading({
        methodologyId,
        sectionId,
        heading: newHeading,
        sectionKey,
      }),
    [methodologyId, sectionId, sectionKey, updateContentSectionHeading],
  );

  const removeSection = useCallback(
    () =>
      removeContentSection({
        methodologyId,
        sectionId,
        sectionKey,
      }),
    [methodologyId, removeContentSection, sectionId, sectionKey],
  );

  return (
    <EditableAccordionSection
      {...props}
      id={sectionId}
      heading={heading}
      caption={caption}
      headerButtons={
        <Button
          variant={!isReordering ? 'secondary' : undefined}
          onClick={async () => {
            if (isReordering) {
              await reorderBlocksInAccordionSection();
              setIsReordering(false);
            } else {
              setIsReordering(true);
            }
          }}
        >
          {isReordering ? 'Save section order' : 'Reorder this section'}
        </Button>
      }
      onHeadingChange={onSaveHeading}
      onRemoveSection={removeSection}
    >
      <EditableSectionBlocks
        isReordering={isReordering}
        sectionId={sectionId}
        content={blocks}
        onBlockContentSave={updateBlockInAccordionSection}
        onBlockDelete={removeBlockFromAccordionSection}
        onBlocksChange={setBlocks}
      />
      {isEditing && !isReordering && (
        <div className="govuk-!-margin-bottom-8 dfe-align--center">
          <Button variant="secondary" onClick={addBlockToAccordionSection}>
            Add text block
          </Button>
        </div>
      )}
    </EditableAccordionSection>
  );
};

export default MethodologyAccordionSection;
