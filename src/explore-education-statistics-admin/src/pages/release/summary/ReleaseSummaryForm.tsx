import Link from '@admin/components/Link';
import { findTimePeriodCoverageGroup } from '@admin/pages/release/util/releaseSummaryUtil';
import service from '@admin/services/common/service';
import {
  IdTitlePair,
  TimePeriodCoverageGroup,
} from '@admin/services/common/types';
import {
  validateMandatoryDayMonthYearField,
  validateOptionalPartialDayMonthYearField,
} from '@admin/validation/validation';
import Button from '@common/components/Button';
import { FormFieldset, Formik } from '@common/components/form';
import Form from '@common/components/form/Form';
import FormFieldDayMonthYear from '@common/components/form/FormFieldDayMonthYear';
import FormFieldRadioGroup from '@common/components/form/FormFieldRadioGroup';
import FormFieldSelect from '@common/components/form/FormFieldSelect';
import FormFieldTextInput from '@common/components/form/FormFieldTextInput';
import { SelectOption } from '@common/components/form/FormSelect';
import Yup from '@common/lib/validation/yup';
import { DayMonthYearInputs } from '@common/services/publicationService';
import { Dictionary } from '@common/types';
import { FormikActions, FormikProps } from 'formik';
import React, { useEffect, useState } from 'react';
import { ObjectSchemaDefinition } from 'yup';

export interface EditFormValues {
  timePeriodCoverageCode: string;
  timePeriodCoverageStartYear: string;
  releaseTypeId: string;
  scheduledPublishDate: DayMonthYearInputs;
  nextReleaseDate: DayMonthYearInputs;
}

interface Props<FormValues extends EditFormValues> {
  submitButtonText: string;
  initialValuesSupplier: (
    timePeriodCoverageGroups: TimePeriodCoverageGroup[],
  ) => FormValues;
  validationRulesSupplier?: (
    baseValidationRules: ObjectSchemaDefinition<EditFormValues>,
  ) => ObjectSchemaDefinition<FormValues>;
  onSubmitHandler: (
    values: FormValues,
    actions: FormikActions<FormValues>,
  ) => void;
  onCancelHandler: () => void;
  additionalFields?: React.ReactNode;
}

interface ReleaseSummaryFormModel {
  timePeriodCoverageGroups: TimePeriodCoverageGroup[];
  releaseTypes: IdTitlePair[];
}

const ReleaseSummaryForm = <FormValues extends EditFormValues>({
  submitButtonText,
  initialValuesSupplier,
  validationRulesSupplier,
  onSubmitHandler,
  onCancelHandler,
  additionalFields,
}: Props<FormValues>) => {
  const [model, setModel] = useState<ReleaseSummaryFormModel>();

  useEffect(() => {
    Promise.all([
      service.getReleaseTypes(),
      service.getTimePeriodCoverageGroups(),
    ]).then(([releaseTypesResult, timePeriodGroupsResult]) => {
      setModel({
        releaseTypes: releaseTypesResult,
        timePeriodCoverageGroups: timePeriodGroupsResult,
      });
    });
  }, []);

  const getTimePeriodOptions = (
    timePeriodGroups: TimePeriodCoverageGroup[],
  ) => {
    const optGroups: Dictionary<SelectOption[]> = {};
    timePeriodGroups.forEach(group => {
      optGroups[group.category.label] = group.timeIdentifiers.map(
        ({ identifier }) => identifier,
      );
    });
    return optGroups;
  };

  const baseValidationRules: ObjectSchemaDefinition<EditFormValues> = {
    timePeriodCoverageCode: Yup.string().required('Choose a time period'),
    timePeriodCoverageStartYear: Yup.string().required('Enter a year'),
    releaseTypeId: Yup.string().required('Choose a release type'),
    scheduledPublishDate: validateMandatoryDayMonthYearField,
    nextReleaseDate: validateOptionalPartialDayMonthYearField,
  };

  const formId = 'releaseSummaryForm';

  return (
    <>
      {model && (
        <Formik<FormValues>
          enableReinitialize
          initialValues={initialValuesSupplier(model.timePeriodCoverageGroups)}
          validationSchema={Yup.object<FormValues>(
            validationRulesSupplier
              ? validationRulesSupplier(baseValidationRules)
              : (baseValidationRules as ObjectSchemaDefinition<FormValues>),
          )}
          onSubmit={onSubmitHandler}
          render={(form: FormikProps<FormValues>) => {
            return (
              <Form id={formId}>
                <FormFieldset
                  id={`${formId}-timePeriodCoverageFieldset`}
                  legend="Select time period coverage"
                >
                  <FormFieldSelect<FormValues>
                    id={`${formId}-timePeriodCoverage`}
                    label="Type"
                    name="timePeriodCoverageCode"
                    optGroups={getTimePeriodOptions(
                      model.timePeriodCoverageGroups,
                    )}
                  />
                  <FormFieldTextInput<FormValues>
                    id={`${formId}-timePeriodCoverageStartYear`}
                    name="timePeriodCoverageStartYear"
                    label={
                      findTimePeriodCoverageGroup(
                        form.values.timePeriodCoverageCode,
                        model.timePeriodCoverageGroups,
                      ).category.label
                    }
                    width={4}
                    type="number"
                    pattern="[0-9]*"
                  />
                </FormFieldset>
                <FormFieldDayMonthYear<FormValues>
                  formId={formId}
                  fieldName="scheduledPublishDate"
                  fieldsetLegend="Schedule publish date"
                  day={form.values.scheduledPublishDate.day}
                  month={form.values.scheduledPublishDate.month}
                  year={form.values.scheduledPublishDate.year}
                />
                <FormFieldDayMonthYear<FormValues>
                  formId={formId}
                  fieldName="nextReleaseDate"
                  fieldsetLegend="Next release expected (optional)"
                  day={form.values.nextReleaseDate.day}
                  month={form.values.nextReleaseDate.month}
                  year={form.values.nextReleaseDate.year}
                />
                <FormFieldRadioGroup<FormValues>
                  id={`${formId}-releaseTypeId`}
                  legend="Release Type"
                  name="releaseTypeId"
                  options={model.releaseTypes.map(type => ({
                    label: type.title,
                    value: `${type.id}`,
                  }))}
                />
                {additionalFields}
                <Button type="submit" className="govuk-!-margin-top-6">
                  {submitButtonText}
                </Button>
                <div className="govuk-!-margin-top-6">
                  <Link to="#" onClick={onCancelHandler}>
                    Cancel update
                  </Link>
                </div>
              </Form>
            );
          }}
        />
      )}
    </>
  );
};

export default ReleaseSummaryForm;
