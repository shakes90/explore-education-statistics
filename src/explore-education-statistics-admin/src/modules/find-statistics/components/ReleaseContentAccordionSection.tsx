import AccordionSection, {
  EditableAccordionSectionProps,
} from '@admin/components/EditableAccordionSection';
import { ErrorControlContext } from '@admin/components/ErrorBoundary';
import ContentBlocks from '@admin/modules/editable-components/EditableContentBlocks';
import { ContentType } from '@admin/modules/find-statistics/components/ReleaseContentAccordion';
import useReleaseActions from '@admin/pages/release/edit-release/content/helpers';
import ManageReleaseContext, {
  ManageRelease,
} from '@admin/pages/release/ManageReleaseContext';
import { EditableRelease } from '@admin/services/publicationService';
import Button from '@common/components/Button';
import React, { useContext, useState } from 'react';
import AddDataBlockButton from './AddDataBlockButton';

export interface ReleaseContentAccordionSectionProps {
  id: string;
  contentItem: ContentType;
  index: number;
  onHeadingChange?: EditableAccordionSectionProps['onHeadingChange'];
  onRemoveSection?: EditableAccordionSectionProps['onRemoveSection'];
  canAddBlocks?: boolean;
  release: EditableRelease;
}

const ReleaseContentAccordionSection = ({
  release,
  id: sectionId,
  index,
  contentItem,
  onHeadingChange,
  onRemoveSection,
  canAddBlocks = true,
  ...restOfProps
}: ReleaseContentAccordionSectionProps) => {
  const { handleApiErrors } = useContext(ErrorControlContext);
  const { caption, heading } = contentItem;
  const { content: sectionContent = [] } = contentItem;
  const [isReordering, setIsReordering] = useState(false);
  const { releaseId } = useContext(ManageReleaseContext);
  const {
    addContentSectionBlock,
    attachContentSectionBlock,
    deleteContentSectionBlock,
    updateContentSectionBlock,
    updateSectionBlockOrder,
  } = useReleaseActions();

  return (
    <AccordionSection
      id={sectionId}
      index={index}
      heading={heading || ''}
      caption={caption}
      onHeadingChange={onHeadingChange}
      onRemoveSection={onRemoveSection}
      sectionId={sectionId}
      headerButtons={
        <Button
          onClick={() => setIsReordering(!isReordering)}
          className={`govuk-button ${!isReordering &&
            'govuk-button--secondary'}`}
        >
          {isReordering ? 'Save order' : 'Reorder'}
        </Button>
      }
      {...restOfProps}
    >
      <ContentBlocks
        id={`${heading}-content`}
        isReordering={isReordering}
        sectionId={sectionId}
        onBlockSaveOrder={order => {
          updateSectionBlockOrder(
            release.id,
            sectionId,
            'content',
            order,
          ).catch(handleApiErrors);
        }}
        onBlockContentChange={(blockId, bodyContent) =>
          updateContentSectionBlock(
            release.id,
            sectionId,
            blockId,
            'content',
            bodyContent,
          ).catch(handleApiErrors)
        }
        onBlockDelete={(blockId: string) =>
          deleteContentSectionBlock(
            release.id,
            sectionId,
            blockId,
            'content',
          ).catch(handleApiErrors)
        }
        content={sectionContent}
        allowComments
      />

      {!isReordering && canAddBlocks && (
        <div className="govuk-!-margin-bottom-8 dfe-align--center">
          <Button
            variant="secondary"
            onClick={() => {
              addContentSectionBlock(releaseId, sectionId, 'content', {
                type: 'MarkdownBlock',
                order: sectionContent.length,
                body: '',
              }).catch(handleApiErrors);
            }}
          >
            Add text block
          </Button>
          <AddDataBlockButton
            onAddDataBlock={(datablockId: string) => {
              attachContentSectionBlock(releaseId, sectionId, 'content', {
                contentBlockId: datablockId,
                order: sectionContent.length,
              }).catch(handleApiErrors);
            }}
          />
        </div>
      )}
    </AccordionSection>
  );
};

export default ReleaseContentAccordionSection;
