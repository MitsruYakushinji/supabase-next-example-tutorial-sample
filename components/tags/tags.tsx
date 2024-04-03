import {ComponentProps} from 'react';

import {Database} from 'lib/types/database';

import {Item} from './item';

export default function Tags({
  tags,
  disableClick,
}: {
  tags: Omit<Database['public']['Tables']['tags']['Row'], 'description'>[];
  disableClick?: ComponentProps<typeof Item>['disableClick'];
}) {
  if (tags.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-1">
      {tags.map(tag => (
        <Item
          key={tag.id}
          name={tag.name}
          color={tag.color}
          disableClick={disableClick}
        />
      ))}
    </div>
  );
}
