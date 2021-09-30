import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Box } from '@strapi/parts/Box';
import { Button } from '@strapi/parts/Button';
import FilterIcon from '@strapi/icons/FilterIcon';
import { FilterListURLQuery, FilterPopoverURLQuery, useTracking } from '@strapi/helper-plugin';

const Filters = ({ displayedFilters }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { formatMessage } = useIntl();
  const buttonRef = useRef();
  const { trackUsage } = useTracking();

  const handleToggle = () => {
    if (!isVisible) {
      trackUsage('willFilterEntries');
    }
    setIsVisible(prev => !prev);
  };

  return (
    <>
      <Box padding={1}>
        <Button
          variant="tertiary"
          ref={buttonRef}
          startIcon={<FilterIcon />}
          onClick={handleToggle}
          size="S"
        >
          {formatMessage({ id: 'app.utils.filters', defaultMessage: 'Filters' })}
        </Button>
        {isVisible && (
          <FilterPopoverURLQuery
            displayedFilters={displayedFilters}
            isVisible={isVisible}
            onToggle={handleToggle}
            source={buttonRef}
          />
        )}
      </Box>
      <FilterListURLQuery filtersSchema={displayedFilters} />
    </>
  );
};

Filters.propTypes = {
  displayedFilters: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      metadatas: PropTypes.shape({ label: PropTypes.string }),
      fieldSchema: PropTypes.shape({ type: PropTypes.string }),
    })
  ).isRequired,
};

export default Filters;
