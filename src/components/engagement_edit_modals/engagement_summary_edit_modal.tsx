import React from 'react';
import { Engagement } from '../../schemas/engagement_schema';
import { Modal, ModalVariant, Button, Form } from '@patternfly/react-core';
import { useModalVisibility } from '../../context/edit_modal_visibility_context/edit_modal_visibility_hook';
import { EditModalTemplate } from '../../layout/edit_modal_template';
import { useEngagements } from '../../context/engagement_context/engagement_hook';
import { DescriptionFormField } from '../engagement_form_fields/description';
import { LocationFormField } from '../engagement_form_fields/location';
import { EngagementStartEndDateFormField } from '../engagement_form_fields/engagement_start_end_date';

export interface EngagementSummaryEditModalProps {
  onChange: (fieldName: string, value: any) => void;
  formOptions: object;
  engagement: Engagement;
  isOpen: boolean;
  onSave: (engagement: Engagement) => void;
}
export function EngagementSummaryEditModal(
  props: EngagementSummaryEditModalProps
) {
  const { requestClose } = useModalVisibility();
  const { engagementFormState } = useEngagements();

  const onSave = () => {
    props.onSave(engagementFormState);
    requestClose();
  };
  return (
    <Modal
      variant={ModalVariant.small}
      isOpen={props.isOpen}
      onClose={requestClose}
    >
      <EditModalTemplate
        actions={
          <div>
            <Button onClick={onSave}>Save</Button>
          </div>
        }
        title="Engagement Summary"
      >
        <Form>
          <DescriptionFormField
            onChange={props.onChange}
            engagement={props.engagement}
          />
          <LocationFormField
            onChange={props.onChange}
            engagement={props.engagement}
          />
          <EngagementStartEndDateFormField
            onChange={props.onChange}
            engagement={props.engagement}
          />
        </Form>
      </EditModalTemplate>
    </Modal>
  );
}
