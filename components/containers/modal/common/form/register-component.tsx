import Image from 'next/image';

import {getComponentClient} from 'lib/component-client';
import {getThumbnailPath} from 'lib/thumbnail';

import {Tags} from '../../../../tags';
import {useFetchComponents} from '../../hooks/use-fetch-components';

export default function RegisterComponent({
  components,
  onRegister,
}: {
  components: ReturnType<typeof useFetchComponents>;
  onRegister: (e: FormData) => void;
}) {
  const supabase = getComponentClient();
  return (
    <form action={onRegister}>
      <div className="w-full overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Description</th>
              <th>Tag</th>
            </tr>
          </thead>
          <tbody>
            {components.map(component => (
              <tr key={component.id}>
                <td>
                  <input
                    id={`component-${component.id}`}
                    name="component_id"
                    type="radio"
                    className="radio-primary radio"
                    value={component.id}
                  />
                </td>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12 bg-base-300">
                        {component.has_image && (
                          <Image
                            src={getThumbnailPath(supabase, component.id)}
                            alt="Thumbnail"
                            width={48}
                            height={48}
                          />
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{component.name}</div>
                    </div>
                  </div>
                </td>
                <td>{component.description}</td>
                <td>
                  <Tags tags={component.tags} disableClick />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 w-full">
        <button className="btn btn-primary btn-wide">Register</button>
      </div>
    </form>
  );
}
