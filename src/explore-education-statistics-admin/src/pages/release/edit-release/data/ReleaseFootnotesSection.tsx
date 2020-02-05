import {
  Footnote,
  FootnoteMeta,
  FootnoteProps,
  FootnoteMetaGetters,
} from '@admin/services/release/edit-release/footnotes/types';
import footnotesService from '@admin/services/release/edit-release/footnotes/service';
import permissionService from '@admin/services/permissions/service';
import { generateFootnoteMetaMap } from '@admin/services/release/edit-release/footnotes/util';
import Link from '@admin/components/Link';
import withErrorControl, {
  ErrorControlProps,
} from '@admin/validation/withErrorControl';
import LoadingSpinner from '@common/components/LoadingSpinner';
import ModalConfirm from '@common/components/ModalConfirm';
import React, { useCallback, useEffect, useState } from 'react';
import FootnotesList from '@admin/components/footnotes/FootnotesList';
import FootnoteForm, {
  FootnoteFormConfig,
} from '@admin/components/footnotes/form/FootnoteForm';

interface Props {
  publicationId: string;
  releaseId: string;
}

const ReleaseFootnotesSection = ({
  publicationId,
  releaseId,
  handleApiErrors,
}: Props & ErrorControlProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [footnoteMeta, setFootnoteMeta] = useState<FootnoteMeta>();
  const [footnotes, setFootnotes] = useState<Footnote[]>([]);
  const [footnoteForm, _setFootnoteForm] = useState<FootnoteFormConfig>({
    state: 'cancel',
  });
  const [footnoteMetaGetters, setFootnoteMetaGetters] = useState<
    FootnoteMetaGetters
  >();
  const [footnoteToBeDeleted, setFootnoteToBeDeleted] = useState<
    Footnote | undefined
  >();
  const [hasSufficientData, setHasSufficientData] = useState<boolean>(true);
  const [canUpdateRelease, setCanUpdateRelease] = useState(false);

  const getFootnoteData = useCallback(() => {
    setLoading(true);
    Promise.all([
      footnotesService.getReleaseFootnoteData(releaseId),
      permissionService.canUpdateRelease(releaseId),
    ])
      .then(([{ meta, footnotes: footnotesList }, canUpdateReleaseResult]) => {
        setFootnoteMeta(meta);
        setHasSufficientData(!!Object.keys(meta).length);
        setFootnotes(footnotesList);
        setFootnoteMetaGetters(generateFootnoteMetaMap(meta));
        setLoading(false);
        setCanUpdateRelease(canUpdateReleaseResult);
      })
      .catch(handleApiErrors);
  }, [handleApiErrors, releaseId]);

  useEffect(() => {
    getFootnoteData();
  }, [publicationId, releaseId, handleApiErrors, getFootnoteData]);

  const footnoteFormControls = {
    footnoteForm,
    create: () => _setFootnoteForm({ state: 'create' }),
    edit: (footnote: Footnote) => {
      _setFootnoteForm({ state: 'edit', footnote });
    },
    cancel: () => _setFootnoteForm({ state: 'cancel' }),
    save: (footnote: FootnoteProps, footnoteId?: string) => {
      if (footnoteId) {
        setLoading(true);
        footnotesService
          .updateFootnote(footnoteId, footnote)
          .then(updatedFootnote => {
            const index = footnotes.findIndex((searchElement: Footnote) => {
              return footnoteId === searchElement.id;
            });
            if (index > -1) {
              const updatedFootnotes = [...footnotes];
              updatedFootnotes[index] = {
                ...updatedFootnote,
                id: footnoteId,
              };
              setFootnotes(updatedFootnotes);
              setLoading(false);
            }
          })
          .catch(handleApiErrors);
      } else {
        setLoading(true);
        footnotesService
          .createFootnote(footnote)
          .then((newFootnote: Footnote) => {
            setFootnotes([...footnotes, newFootnote]);
            setLoading(false);
          })
          .catch(handleApiErrors);
      }
      _setFootnoteForm({ state: 'cancel' });
    },
    delete: setFootnoteToBeDeleted,
  };

  return (
    <>
      <h2>Footnotes</h2>
      {!hasSufficientData && (
        <p>
          Before footnotes can be created, relevant data files need to be
          uploaded. That can be done in the{' '}
          <Link to="#data-upload">Data uploads section</Link>.
        </p>
      )}
      {loading && <LoadingSpinner />}
      {!loading && hasSufficientData && footnoteMeta && footnoteMetaGetters && (
        <>
          {canUpdateRelease && (
            <FootnoteForm
              {...footnoteForm}
              footnote={undefined}
              onOpen={footnoteFormControls.create}
              onCancel={footnoteFormControls.cancel}
              onSubmit={footnoteFormControls.save}
              isFirst={footnotes && footnotes.length === 0}
              footnoteMeta={footnoteMeta}
              footnoteMetaGetters={footnoteMetaGetters}
            />
          )}
          {footnoteMeta && (
            <>
              <FootnotesList
                footnotes={footnotes}
                footnoteMeta={footnoteMeta}
                footnoteMetaGetters={footnoteMetaGetters}
                footnoteFormControls={footnoteFormControls}
                canUpdateRelease={canUpdateRelease}
              />
              {typeof footnoteToBeDeleted !== 'undefined' && (
                <ModalConfirm
                  title="Confirm deletion of footnote"
                  onExit={() => setFootnoteToBeDeleted(undefined)}
                  onCancel={() => setFootnoteToBeDeleted(undefined)}
                  onConfirm={() => {
                    footnotesService
                      .deleteFootnote((footnoteToBeDeleted as Footnote).id)
                      .then(() => setFootnoteToBeDeleted(undefined))
                      .then(getFootnoteData)
                      .catch(handleApiErrors);
                  }}
                >
                  The footnote:
                  <p className="govuk-inset-text">
                    {(footnoteToBeDeleted as Footnote).content}
                  </p>
                </ModalConfirm>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default withErrorControl(ReleaseFootnotesSection);
