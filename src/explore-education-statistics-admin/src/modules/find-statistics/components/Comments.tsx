import { LoginContext } from '@admin/components/Login';
import { User } from '@admin/services/sign-in/types';
import { ExtendedComment } from '@admin/services/publicationService';
import Details from '@common/components/Details';
import classNames from 'classnames';
import React from 'react';
import service from '@admin/services/release/edit-release/content/fake-comments-service';
import { EditingContentBlockContext } from '@admin/modules/find-statistics/components/EditableContentBlock';
import styles from './Comments.module.scss';

interface Props {
  contentBlockId: string;
  initialComments: ExtendedComment[];
  onCommentsChange?: (comments: ExtendedComment[]) => Promise<void>;
  canResolve?: boolean;
  canComment?: boolean;
}

const Comments = ({
  contentBlockId,
  initialComments,
  onCommentsChange = () => Promise.resolve(),
  canResolve = false,
  canComment = false,
}: Props) => {
  const [newComment, setNewComment] = React.useState<string>('');
  const [comments, setComments] = React.useState<ExtendedComment[]>(
    initialComments,
  );

  const context = React.useContext(LoginContext);
  const editingContext = React.useContext(EditingContentBlockContext);

  const addComment = (comment: string) => {
    const user: User = context.user || {
      name: 'guest',
      id: 'guest',
      permissions: [],
    };

    const additionalComment: ExtendedComment = {
      id: '0',
      name: user.name,
      time: new Date(),
      comment,
      state: 'open',
    };

    if (editingContext.releaseId && editingContext.sectionId) {
      service
        .addContentSectionComment(
          editingContext.releaseId,
          editingContext.sectionId,
          contentBlockId,
          additionalComment,
        )
        .then(populatedComment => {
          let newComments = [populatedComment];

          if (comments) {
            newComments = [...newComments, ...comments];
          }

          onCommentsChange(newComments).then(() => {
            setComments(newComments);
            setNewComment('');
          });
        });
    }
  };

  const removeComment = (index: number) => {
    const commentId = comments[index].id;

    if (editingContext.releaseId && editingContext.sectionId) {
      service
        .deleteContentSectionComment(
          editingContext.releaseId,
          editingContext.sectionId,
          contentBlockId,
          commentId,
        )
        .then(() => {
          const newComments = [...comments];

          newComments.splice(index, 1);

          onCommentsChange(newComments).then(() => {
            setComments(newComments);
          });
        });
    }
  };

  const resolveComment = (index: number) => {
    const resolvedComment = { ...comments[index] };

    resolvedComment.state = 'resolved';
    resolvedComment.resolvedOn = new Date();
    resolvedComment.resolvedBy = context.user && context.user.name;

    if (editingContext.releaseId && editingContext.sectionId) {
      service
        .updateContentSectionComment(
          editingContext.releaseId,
          editingContext.sectionId,
          contentBlockId,
          resolvedComment,
        )
        .then(() => {
          const newComments = [...comments];

          newComments[index] = resolvedComment;

          onCommentsChange(newComments).then(() => {
            setComments(newComments);
          });
        });
    }
  };

  const ref = React.createRef<HTMLDivElement>();

  return (
    <>
      <div
        role="presentation"
        ref={ref}
        className={classNames('dfe-comment-block', [styles.addComment])}
      >
        <Details
          summary={`${canComment ? `Add / ` : ''}View comments for section`}
          className="govuk-!-margin-bottom-1 govuk-body-s"
          onToggle={isOpen => {
            if (ref.current) {
              if (isOpen) {
                ref.current.classList.add(styles.top);
              } else {
                ref.current.classList.remove(styles.top);
              }
            }
          }}
        >
          {canComment && (
            <>
              <form>
                <textarea
                  name="comment"
                  id="comment"
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                />
                <button
                  type="button"
                  className="govuk-button"
                  disabled={newComment.length === 0}
                  onClick={() => {
                    addComment(newComment);
                  }}
                >
                  Submit
                </button>
              </form>
              <hr />
            </>
          )}
          <div className={styles.commentsContainer}>
            {comments &&
              comments.map(
                (
                  { id, name, time, comment, state, resolvedOn, resolvedBy },
                  index,
                ) => (
                  <div key={id}>
                    <h2 className="govuk-body-xs govuk-!-margin-0">
                      <strong>{`${name} ${time.toLocaleDateString()}`}</strong>
                    </h2>
                    <p className="govuk-body-xs govuk-!-margin-bottom-1">
                      {comment}
                    </p>
                    {state === 'open' &&
                      (canResolve ? (
                        <button
                          type="button"
                          className="govuk-body-xs govuk-!-margin-right-3"
                          onClick={() => resolveComment(index)}
                        >
                          Resolve
                        </button>
                      ) : (
                        <span className="govuk-body-xs govuk-!-margin-right-3">
                          Open
                        </span>
                      ))}
                    {state === 'resolved' && (
                      <p className="govuk-body-xs govuk-!-margin-bottom-1 ">
                        <em>
                          Resolved{' '}
                          {resolvedOn && resolvedOn.toLocaleDateString()} by{' '}
                          {resolvedBy}
                        </em>
                      </p>
                    )}
                    {canComment && (
                      <>
                        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
                        <a
                          className="govuk-body-xs"
                          role="button"
                          tabIndex={0}
                          onClick={() => removeComment(index)}
                          style={{ cursor: 'pointer' }}
                        >
                          Remove
                        </a>
                        <hr />
                      </>
                    )}
                  </div>
                ),
              )}
          </div>
        </Details>
      </div>
    </>
  );
};

export default Comments;