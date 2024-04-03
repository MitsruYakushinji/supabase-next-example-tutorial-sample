import {useCallback} from 'react';

import {getComponentClient} from 'lib/component-client';
import {projectRegisterComponentModalState} from 'lib/features/modal';
import {useResultNotification} from 'lib/features/notification/hooks';

import {RegisterComponentForm} from '../common/form';
import {useFetchComponents} from '../hooks/use-fetch-components';
import {registerComponent} from './actions';

type Props = ReturnType<typeof projectRegisterComponentModalState>['extra'];

export default function RegisterComponent({projectId, completed}: Props) {
  const supabase = getComponentClient();
  const components = useFetchComponents(supabase);
  const notifyResult = useResultNotification();

  const register = useCallback(
    async (e: FormData) => {
      e.append('project_id', projectId);
      e.append('params', '{}');
      const {result, error} = await registerComponent(e);
      notifyResult(result, 'Registered', error || 'Failed');
      result && completed();
    },
    [completed, projectId, notifyResult]
  );

  return (
    <RegisterComponentForm components={components} onRegister={register} />
  );
}
