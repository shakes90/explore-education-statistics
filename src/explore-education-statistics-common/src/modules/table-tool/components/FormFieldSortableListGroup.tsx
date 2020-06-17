import { FormFieldset } from '@common/components/form';
import classNames from 'classnames';
import { useField } from 'formik';
import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import FormFieldSortableList from './FormFieldSortableList';
import styles from './FormFieldSortableListGroup.module.scss';

interface Props<FormValues> {
  id: string;
  name: keyof FormValues & string;
  legend: string;
  groupLegend: string;
}

const FormFieldSortableListGroup = <FormValues extends {}>({
  id,
  name,
  legend,
  groupLegend,
}: Props<FormValues>) => {
  const [field, meta] = useField(name);

  return (
    <Droppable droppableId={name} direction="horizontal">
      {(droppableProvided, droppableSnapshot) => (
        <div
          {...droppableProvided.droppableProps}
          ref={droppableProvided.innerRef}
          className={classNames(styles.groupsFieldset, {
            [styles.isDraggingOver]: droppableSnapshot.isDraggingOver,
          })}
        >
          <FormFieldset
            id={id}
            legend={legend}
            error={meta.error}
            legendSize="m"
          >
            <div className={styles.listsContainer}>
              {field.value.length === 0 && (
                <div className="govuk-inset-text govuk-!-margin-0">
                  Add groups by dragging them here
                </div>
              )}

              {field.value.map((_: string, index: number) => (
                <Draggable
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  draggableId={`${name}-${index}`}
                  index={index}
                >
                  {(draggableProvided, draggableSnapshot) => (
                    <div
                      {...draggableProvided.draggableProps}
                      {...draggableProvided.dragHandleProps}
                      className={classNames(styles.list, styles.listOneThird, {
                        [styles.isDragging]: draggableSnapshot.isDragging,
                      })}
                      ref={draggableProvided.innerRef}
                    >
                      <FormFieldSortableList<FormValues>
                        name={`${name}[${index}]`}
                        id={`${id}-${index}`}
                        legend={`${groupLegend} ${index + 1}`}
                        legendSize="s"
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {droppableProvided.placeholder}
            </div>
          </FormFieldset>
        </div>
      )}
    </Droppable>
  );
};

export default FormFieldSortableListGroup;
