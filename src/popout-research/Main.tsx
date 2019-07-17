import React, { Fragment, useCallback, useState } from 'react';
// import { Popout } from 'react-popout-component';
import NewWindow from 'react-new-window';
// import NewWindow from 'react-new-window-ex';

import { URL_PATH as DETACHABLE_URL_PATH } from './Detachable';
import { Attachable } from './Attachable';
import { ValueApiContainer } from './ValueApi';
import { ValueContainer, URL_PATH as VALUE_CONTAINER_URL_PATH } from './Value';

export const Main = () => {
  const [ popout, setPopout ] = useState(false);
  const togglePopout = useCallback(
    () => {
      setPopout((popout) => !popout);
    },
    [ setPopout ],
  );
  const attachPopout = useCallback(
    () => {
      setPopout(false);
    },
    [ setPopout ],
  );

  return (
    <Fragment>
      <h2>Main</h2>
      <button onClick={togglePopout}>
        {`${!popout ? 'Open a' : 'Close the'} popout`}
      </button>

      {/* Let's pretend that this is hooked up to a socket... */}
      <ValueApiContainer>
        <ValueContainer />
      </ValueApiContainer>

      {/* And this isn't... */}
      {popout && (
        <NewWindow url={`${DETACHABLE_URL_PATH}${VALUE_CONTAINER_URL_PATH}`}>
          <Attachable onAttachClick={attachPopout} />
        </NewWindow>
      )}
    </Fragment>
  );
}
