import {
  EditableContentBlock,
  EditableRelease,
} from '@admin/services/publicationService';
import {
  AbstractRelease,
  ContentSection,
} from '@common/services/publicationService';
import { State } from './ReleaseContext';

type PageError = { type: 'PAGE_ERROR'; payload: { pageError: string } };
type ClearState = { type: 'CLEAR_STATE' };
type SetNewState = { type: 'SET_STATE'; payload: State };
type SetAvailableDatablocks = {
  type: 'SET_AVAILABLE_DATABLOCKS';
  payload: Pick<State, 'availableDataBlocks'>;
};
export type RemoveBlockFromSection = {
  type: 'REMOVE_BLOCK_FROM_SECTION';
  payload: {
    meta: {
      sectionId: string;
      blockId: string;
      sectionKey: keyof Pick<
        AbstractRelease<EditableContentBlock>,
        | 'summarySection'
        | 'keyStatisticsSection'
        | 'keyStatisticsSecondarySection'
        | 'headlinesSection'
        | 'content'
      >;
    };
  };
};
export type UpdateBlockFromSection = {
  type: 'UPDATE_BLOCK_FROM_SECTION';
  payload: {
    block: EditableContentBlock;
    meta: RemoveBlockFromSection['payload']['meta'];
  };
};

export type AddBlockToSection = {
  type: 'ADD_BLOCK_TO_SECTION';
  payload: {
    block: EditableContentBlock;
    meta: Omit<RemoveBlockFromSection['payload']['meta'], 'blockId'>;
  };
};

export type UpdateSectionContent = {
  type: 'UPDATE_SECTION_CONTENT';
  payload: {
    sectionContent: EditableContentBlock[];
    meta: Omit<RemoveBlockFromSection['payload']['meta'], 'blockId'>;
  };
};

export type AddContentSection = {
  type: 'ADD_CONTENT_SECTION';
  payload: {
    section: ContentSection<EditableContentBlock>;
  };
};

export type SetReleaseContent = {
  type: 'SET_CONTENT';
  payload: {
    content: ContentSection<EditableContentBlock>[];
  };
};

export type UpdateContentSection = {
  type: 'UPDATE_CONTENT_SECTION';
  payload: {
    meta: { sectionId: string };
    section: ContentSection<EditableContentBlock>;
  };
};

type ReleaseDispatchAction =
  | PageError
  | ClearState
  | SetNewState
  | SetAvailableDatablocks
  | RemoveBlockFromSection
  | UpdateBlockFromSection
  | AddBlockToSection
  | UpdateSectionContent
  | AddContentSection
  | SetReleaseContent
  | UpdateContentSection;

// eslint-disable-next-line no-undef
export default ReleaseDispatchAction;
