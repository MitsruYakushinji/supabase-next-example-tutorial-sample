'use client';

import {useEffect, useState} from 'react';

import {getComponentClient} from 'lib/component-client';

export function useFetchComponents(
  supabase: ReturnType<typeof getComponentClient>
) {
  const [components, setComponents] = useState<
    {
      id: string;
      name: string;
      has_image: boolean;
      description: string | null;
      tags: {
        id: number;
        name: string;
        color: string;
      }[];
    }[]
  >([]);

  useEffect(() => {
    async function fetchComponents() {
      const components = await supabase
        .from('components')
        .select('id, name, has_image, description, tags(id, name, color)');

      if (components.error) {
        console.error(components.error);
      }
      setComponents(components.data || []);
    }
    fetchComponents();
  }, [supabase]);

  return components;
}
