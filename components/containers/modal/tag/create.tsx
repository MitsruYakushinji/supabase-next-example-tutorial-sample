import {useCallback} from 'react';

import {useResultNotification} from 'lib/features/notification/hooks';

import {registerTag} from './actions';

export default function CreateTag({close}: {close: () => void}) {
  const notifyResult = useResultNotification();

  const registerTagForm = useCallback(
    async (e: FormData) => {
      const {result, error} = await registerTag(e);
      notifyResult(
        result,
        'Tag registered',
        error || 'Tag registration failed'
      );
      result && close();
    },
    [notifyResult, close]
  );

  return (
    <form action={registerTagForm}>
      <div className="form-control w-full gap-2">
        {/* tag name */}
        <div className="w-full">
          <label className="label" htmlFor="tag-name">
            <span className="label-text">Tag name</span>
          </label>
          <input
            type="text"
            id="tag-name"
            name="name"
            placeholder="Tag name"
            className="input input-bordered w-full"
            autoComplete="off"
            required
          />
        </div>

        {/* description */}
        <div className="w-full">
          <label className="label" htmlFor="tag-description">
            <span className="label-text">Description</span>
          </label>
          <textarea
            id="tag-description"
            name="description"
            placeholder="Description"
            className="textarea textarea-bordered w-full"
            autoComplete="off"
          />
        </div>

        {/* color */}
        <div className="w-32">
          <label className="label" htmlFor="tag-color">
            <span className="label-text">Color</span>
          </label>
          <input
            type="color"
            id="tag-color"
            name="color"
            className="input input-bordered w-full cursor-pointer px-0"
            autoComplete="off"
            required
          />
        </div>
      </div>

      {/* button */}
      <div className="mt-4 w-full">
        <button className="btn btn-primary btn-wide">Create</button>
      </div>
    </form>
  );
}
