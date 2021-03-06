import React from 'react';
import {
  ExclamationTriangleIcon,
  CheckCircleIcon,
} from '@patternfly/react-icons';
import { Tooltip, Popover } from '@patternfly/react-core';
import { getHumanReadableFieldName } from '../../common/human_readable_engagement_field';
interface RequiredFieldsWarningProps {
  requiredFields: string[];
  missingRequiredFields: string[];
}
export function RequiredFieldsWarning({
  requiredFields = [],
  missingRequiredFields = [],
}: RequiredFieldsWarningProps) {
  const neededFields = requiredFields
    .filter(field => missingRequiredFields.includes(field))
    .map(field => getHumanReadableFieldName(field));
  if (!neededFields?.length) {
    return (
      <Tooltip content="All required fields are completed"
               entryDelay={10}
               exitDelay={10}>
        <CheckCircleIcon color="green" />
      </Tooltip>
    );
  }
  const tooltipText = neededFields.join(', ');
  return (
    <Popover
      headerContent="Missing required fields"
      aria-label="Missing fields warning"
      bodyContent={
        <div style={{ padding: '0 0 0 2rem' }}>
          <ul style={{ listStyleType: 'disc' }}>
            {neededFields.map(f => (
              <li key={f.toString()}>{f}</li>
            ))}
          </ul>
        </div>
      }
    >
      <span>
        <Tooltip content={`Missing required fields: ${tooltipText}`}
                 entryDelay={10}
                 exitDelay={10}>
          <ExclamationTriangleIcon
            style={{ cursor: 'pointer' }}
            color="#EC7A08"
          />
        </Tooltip>
      </span>
    </Popover>
  );
}
